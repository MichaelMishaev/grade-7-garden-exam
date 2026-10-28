import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const file = resolve(root, `.${pathname}`);
  const type = types[extname(file)];
  if (!type || !file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.'))) {
    response.writeHead(404).end();
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'public, max-age=300' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0');
