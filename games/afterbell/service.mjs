import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { createGameStore } from './persistence.mjs';
import { validQuiz, academicScore } from './src/core.js';
const root=dirname(fileURLToPath(import.meta.url));
const snapshot=JSON.parse(await readFile(resolve(root,'src/content-snapshot.json'),'utf8'));
export const contentHash=q=>createHash('sha256').update(JSON.stringify(q.questions.map(({id,prompt,choices,correct,difficulty})=>({id,prompt,choices,correct,difficulty:difficulty??null})))).digest('hex');
export function validateAttempt(body,quizzes=snapshot.quizzes){
  if(!body||typeof body!=='object'||Array.isArray(body)||typeof body.id!=='string'||!/^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(body.id)||typeof body.name!=='string'||!body.name.trim()||body.name.trim().length>60)return null;
  const q=quizzes.find(q=>q.id===body.quizId&&contentHash(q)===body.contentHash);if(!q||!validQuiz(q)||contentHash(q)!==body.contentHash||!Array.isArray(body.answers)||body.answers.length!==q.questions.length)return null;
  const ids=new Set(),answers={};
  for(const a of body.answers){if(!a||typeof a!=='object'||Array.isArray(a))return null;const question=q.questions.find(q=>q.id===a.id);if(!question||ids.has(a.id)||!Number.isInteger(a.choice)||a.choice<0||a.choice>=question.choices.length)return null;ids.add(a.id);answers[a.id]={choice:a.choice,correct:a.choice===question.correct};}
  if(!Number.isFinite(body.startedAt)||body.startedAt<0||body.startedAt>Date.now()+60000)return null;
  return {id:body.id,name:body.name.trim(),quizId:q.id,score:academicScore({questions:q.questions,answers}),answers:JSON.stringify(q.questions.map(q=>({id:q.id,choice:answers[q.id].choice}))),contentHash:body.contentHash,startedAt:body.startedAt};
}
export async function createGameService({databaseUrl,databasePath=resolve(root,'.data/attempts.sqlite'),fetchImpl=fetch,allowedOrigins=['http://127.0.0.1:5177','http://localhost:5177','http://127.0.0.1:4319','http://localhost:4319'],clock=()=>Date.now()}={}){
  const db=await createGameStore({databaseUrl,databasePath});
  const allowed=new Set(allowedOrigins),cache=new Map(snapshot.quizzes.map(q=>[q.id,q]));
  // Keep recent source versions so an in-progress round survives a content refresh.
  const versions=new Map(snapshot.quizzes.map(q=>[contentHash(q),q]));
  const remember=async q=>{const hash=contentHash(q);await db.saveVersion(hash,q.id,JSON.stringify(q),clock());cache.set(q.id,q);versions.delete(hash);versions.set(hash,q);if(versions.size>56)versions.delete(versions.keys().next().value);};
  let windowStart=clock(),attempts=0;
  const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
  const server=createServer(async(req,res)=>{
    try{
      const path=new URL(req.url,'http://local').pathname;
      if(path==='/api/afterbell/health'&&req.method==='GET')return json(res,200,{ok:true,history:'game-database'});
      if((path.startsWith('/api/quizzes/')||path.startsWith('/api/afterbell/quizzes/'))&&req.method==='GET'){
        const id=path.slice(path.startsWith('/api/afterbell/')?'/api/afterbell/quizzes/'.length:'/api/quizzes/'.length);if(!cache.has(id))return json(res,404,{error:'quiz_not_found'});
        try{const response=await fetchImpl(`https://hitech.agnon.online/api/quizzes/${id}`,{signal:AbortSignal.timeout(4000)});if(!response.ok)throw new Error('upstream');const q=await response.json();if(q.id!==id||!validQuiz(q))throw new Error('invalid');await remember(q);return json(res,200,q);}catch{return json(res,503,{error:'content_unavailable'});}
      }
      if(path==='/api/afterbell/attempts'){
        if(req.method!=='POST')return json(res,405,{error:'method_not_allowed'});
        const origin=req.headers.origin;if(!allowed.has(origin))return json(res,403,{error:'origin_rejected'});
        if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return json(res,415,{error:'json_required'});
        if(clock()-windowStart>=3600000){attempts=0;windowStart=clock();}if(attempts>=200)return json(res,429,{error:'rate_limited'});attempts++;
        let size=0,parts=[];for await(const chunk of req){size+=chunk.length;if(size>20000)return json(res,413,{error:'too_large'});parts.push(chunk);}
        let body;try{body=JSON.parse(Buffer.concat(parts).toString('utf8'));}catch{return json(res,400,{error:'invalid_json'});}
        if(!body||typeof body!=='object'||Array.isArray(body))return json(res,400,{error:'invalid_attempt'});
        // A retry of an already-saved attempt must survive a server restart or source change.
        // Return only the original grade after matching the complete saved request, never by ID alone.
        const saved=typeof body.id==='string'?await db.getAttempt(body.id):null;
        if(saved){
          const original=JSON.parse(saved.answers);
          const identical=typeof body.name==='string'&&saved.name===body.name.trim()&&saved.quiz_id===body.quizId&&saved.content_hash===body.contentHash&&saved.started_at===body.startedAt
            &&Array.isArray(body.answers)&&body.answers.length===original.length&&new Set(body.answers.map(a=>a?.id)).size===original.length
            &&body.answers.every(a=>a&&original.some(b=>b.id===a.id&&b.choice===a.choice));
          return identical?json(res,200,{saved:true,id:body.id,score:saved.score}):json(res,409,{error:'attempt_conflict'});
        }
        if(cache.has(body.quizId)&&typeof body.contentHash==='string'&&!versions.has(body.contentHash)){
          const stored=await db.getVersion(body.contentHash,body.quizId);
          if(stored){const q=JSON.parse(stored.content);if(validQuiz(q)&&q.id===body.quizId&&contentHash(q)===body.contentHash)versions.set(body.contentHash,q);}
        }
        // Refresh only this public quiz if live content changed; never forward names or answers upstream.
        if(cache.has(body.quizId)&&!versions.has(body.contentHash)){try{const response=await fetchImpl(`https://hitech.agnon.online/api/quizzes/${body.quizId}`,{signal:AbortSignal.timeout(3000)});const q=await response.json();if(response.ok&&q.id===body.quizId&&validQuiz(q))await remember(q);}catch{}}
        const record=validateAttempt(body,[...versions.values(),...snapshot.quizzes]);if(!record)return json(res,400,{error:'invalid_attempt'});
        await db.insertAttempt(record,clock());
        const existing=await db.getAttempt(record.id);
        if(existing&&(existing.name!==record.name||existing.quiz_id!==record.quizId||existing.answers!==record.answers||existing.content_hash!==record.contentHash||existing.started_at!==record.startedAt))return json(res,409,{error:'attempt_conflict'});
        return json(res,200,{saved:true,id:record.id,score:record.score});
      }
      if(path.startsWith('/api/'))return json(res,404,{error:'not_found'});
      if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'method_not_allowed'});
      let decoded;try{decoded=decodeURIComponent(path);}catch{return json(res,400,{error:'invalid_path'});}
      const file=resolve(root,'play','.'+(decoded==='/'?'/index.html':decoded));
      const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
      if(!file.startsWith(resolve(root,'play')+'/')||!types[extname(file)]||decoded.split('/').some(p=>p.startsWith('.')))return json(res,404,{error:'not_found'});
      try{const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff','Cache-Control':extname(file)==='.html'?'no-cache':'public, max-age=3600'});res.end(req.method==='HEAD'?undefined:body);}catch{return json(res,404,{error:'not_found'});}
    }catch{if(!res.headersSent)json(res,500,{error:'request_failed'});else res.end();}
  });
  server.on('close',()=>{db.close().catch(()=>{});});return server;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const port=Number(process.env.PORT||4319);const origins=['http://127.0.0.1:5177','http://localhost:5177',`http://127.0.0.1:${port}`,`http://localhost:${port}`];if(process.env.AFTERBELL_ORIGIN)origins.push(process.env.AFTERBELL_ORIGIN);const server=await createGameService({...(process.env.AFTERBELL_DATABASE_PATH?{databasePath:process.env.AFTERBELL_DATABASE_PATH}:{}),allowedOrigins:origins});server.listen(port,process.env.AFTERBELL_HOST||'127.0.0.1',()=>console.log(`Afterbell: http://${process.env.AFTERBELL_HOST||'127.0.0.1'}:${port}`));}
