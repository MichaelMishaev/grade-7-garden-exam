(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var Dl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ll(i){if(Object.prototype.hasOwnProperty.call(i,"__esModule"))return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var bs={exports:{}};const Il={},Ul=Object.freeze(Object.defineProperty({__proto__:null,default:Il},Symbol.toStringTag,{value:"Module"})),yo=Ll(Ul);/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */var So;function Fl(){return So||(So=1,(function(i){(function(){var e="input is invalid type",t=typeof window=="object",n=t?window:{};n.JS_SHA256_NO_WINDOW&&(t=!1);var r=!t&&typeof self=="object",s=!n.JS_SHA256_NO_NODE_JS&&typeof process=="object"&&process.versions&&process.versions.node&&process.type!="renderer";s?n=Dl:r&&(n=self);var a=!n.JS_SHA256_NO_COMMON_JS&&!0&&i.exports,o=!n.JS_SHA256_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",c="0123456789abcdef".split(""),l=[-2147483648,8388608,32768,128],u=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],h=["hex","array","digest","arrayBuffer"],p=[];(n.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(b){return Object.prototype.toString.call(b)==="[object Array]"}),o&&(n.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(b){return typeof b=="object"&&b.buffer&&b.buffer.constructor===ArrayBuffer});var M=function(b,R){return function(F){return new C(R,!0).update(F)[b]()}},E=function(b){var R=M("hex",b);s&&(R=m(R,b)),R.create=function(){return new C(b)},R.update=function(v){return R.create().update(v)};for(var F=0;F<h.length;++F){var g=h[F];R[g]=M(g,b)}return R},m=function(b,R){var F=yo,g=yo.Buffer,v=R?"sha224":"sha256",A;g.from&&!n.JS_SHA256_NO_BUFFER_FROM?A=g.from:A=function(I){return new g(I)};var B=function(I){if(typeof I=="string")return F.createHash(v).update(I,"utf8").digest("hex");if(I==null)throw new Error(e);return I.constructor===ArrayBuffer&&(I=new Uint8Array(I)),Array.isArray(I)||ArrayBuffer.isView(I)||I.constructor===g?F.createHash(v).update(A(I)).digest("hex"):b(I)};return B},f=function(b,R){return function(F,g){return new L(F,R,!0).update(g)[b]()}},D=function(b){var R=f("hex",b);R.create=function(v){return new L(v,b)},R.update=function(v,A){return R.create(v).update(A)};for(var F=0;F<h.length;++F){var g=h[F];R[g]=f(g,b)}return R};function C(b,R){R?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],b?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=b}C.prototype.update=function(b){if(!this.finalized){var R,F=typeof b;if(F!=="string"){if(F==="object"){if(b===null)throw new Error(e);if(o&&b.constructor===ArrayBuffer)b=new Uint8Array(b);else if(!Array.isArray(b)&&(!o||!ArrayBuffer.isView(b)))throw new Error(e)}else throw new Error(e);R=!0}for(var g,v=0,A,B=b.length,I=this.blocks;v<B;){if(this.hashed&&(this.hashed=!1,I[0]=this.block,this.block=I[16]=I[1]=I[2]=I[3]=I[4]=I[5]=I[6]=I[7]=I[8]=I[9]=I[10]=I[11]=I[12]=I[13]=I[14]=I[15]=0),R)for(A=this.start;v<B&&A<64;++v)I[A>>>2]|=b[v]<<u[A++&3];else for(A=this.start;v<B&&A<64;++v)g=b.charCodeAt(v),g<128?I[A>>>2]|=g<<u[A++&3]:g<2048?(I[A>>>2]|=(192|g>>>6)<<u[A++&3],I[A>>>2]|=(128|g&63)<<u[A++&3]):g<55296||g>=57344?(I[A>>>2]|=(224|g>>>12)<<u[A++&3],I[A>>>2]|=(128|g>>>6&63)<<u[A++&3],I[A>>>2]|=(128|g&63)<<u[A++&3]):(g=65536+((g&1023)<<10|b.charCodeAt(++v)&1023),I[A>>>2]|=(240|g>>>18)<<u[A++&3],I[A>>>2]|=(128|g>>>12&63)<<u[A++&3],I[A>>>2]|=(128|g>>>6&63)<<u[A++&3],I[A>>>2]|=(128|g&63)<<u[A++&3]);this.lastByteIndex=A,this.bytes+=A-this.start,A>=64?(this.block=I[16],this.start=A-64,this.hash(),this.hashed=!0):this.start=A}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},C.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var b=this.blocks,R=this.lastByteIndex;b[16]=this.block,b[R>>>2]|=l[R&3],this.block=b[16],R>=56&&(this.hashed||this.hash(),b[0]=this.block,b[16]=b[1]=b[2]=b[3]=b[4]=b[5]=b[6]=b[7]=b[8]=b[9]=b[10]=b[11]=b[12]=b[13]=b[14]=b[15]=0),b[14]=this.hBytes<<3|this.bytes>>>29,b[15]=this.bytes<<3,this.hash()}},C.prototype.hash=function(){var b=this.h0,R=this.h1,F=this.h2,g=this.h3,v=this.h4,A=this.h5,B=this.h6,I=this.h7,G=this.blocks,X,$,ie,q,te,K,fe,Se,Ce,Ie,Qe;for(X=16;X<64;++X)te=G[X-15],$=(te>>>7|te<<25)^(te>>>18|te<<14)^te>>>3,te=G[X-2],ie=(te>>>17|te<<15)^(te>>>19|te<<13)^te>>>10,G[X]=G[X-16]+$+G[X-7]+ie<<0;for(Qe=R&F,X=0;X<64;X+=4)this.first?(this.is224?(Se=300032,te=G[0]-1413257819,I=te-150054599<<0,g=te+24177077<<0):(Se=704751109,te=G[0]-210244248,I=te-1521486534<<0,g=te+143694565<<0),this.first=!1):($=(b>>>2|b<<30)^(b>>>13|b<<19)^(b>>>22|b<<10),ie=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7),Se=b&R,q=Se^b&F^Qe,fe=v&A^~v&B,te=I+ie+fe+d[X]+G[X],K=$+q,I=g+te<<0,g=te+K<<0),$=(g>>>2|g<<30)^(g>>>13|g<<19)^(g>>>22|g<<10),ie=(I>>>6|I<<26)^(I>>>11|I<<21)^(I>>>25|I<<7),Ce=g&b,q=Ce^g&R^Se,fe=I&v^~I&A,te=B+ie+fe+d[X+1]+G[X+1],K=$+q,B=F+te<<0,F=te+K<<0,$=(F>>>2|F<<30)^(F>>>13|F<<19)^(F>>>22|F<<10),ie=(B>>>6|B<<26)^(B>>>11|B<<21)^(B>>>25|B<<7),Ie=F&g,q=Ie^F&b^Ce,fe=B&I^~B&v,te=A+ie+fe+d[X+2]+G[X+2],K=$+q,A=R+te<<0,R=te+K<<0,$=(R>>>2|R<<30)^(R>>>13|R<<19)^(R>>>22|R<<10),ie=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7),Qe=R&F,q=Qe^R&g^Ie,fe=A&B^~A&I,te=v+ie+fe+d[X+3]+G[X+3],K=$+q,v=b+te<<0,b=te+K<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+b<<0,this.h1=this.h1+R<<0,this.h2=this.h2+F<<0,this.h3=this.h3+g<<0,this.h4=this.h4+v<<0,this.h5=this.h5+A<<0,this.h6=this.h6+B<<0,this.h7=this.h7+I<<0},C.prototype.hex=function(){this.finalize();var b=this.h0,R=this.h1,F=this.h2,g=this.h3,v=this.h4,A=this.h5,B=this.h6,I=this.h7,G=c[b>>>28&15]+c[b>>>24&15]+c[b>>>20&15]+c[b>>>16&15]+c[b>>>12&15]+c[b>>>8&15]+c[b>>>4&15]+c[b&15]+c[R>>>28&15]+c[R>>>24&15]+c[R>>>20&15]+c[R>>>16&15]+c[R>>>12&15]+c[R>>>8&15]+c[R>>>4&15]+c[R&15]+c[F>>>28&15]+c[F>>>24&15]+c[F>>>20&15]+c[F>>>16&15]+c[F>>>12&15]+c[F>>>8&15]+c[F>>>4&15]+c[F&15]+c[g>>>28&15]+c[g>>>24&15]+c[g>>>20&15]+c[g>>>16&15]+c[g>>>12&15]+c[g>>>8&15]+c[g>>>4&15]+c[g&15]+c[v>>>28&15]+c[v>>>24&15]+c[v>>>20&15]+c[v>>>16&15]+c[v>>>12&15]+c[v>>>8&15]+c[v>>>4&15]+c[v&15]+c[A>>>28&15]+c[A>>>24&15]+c[A>>>20&15]+c[A>>>16&15]+c[A>>>12&15]+c[A>>>8&15]+c[A>>>4&15]+c[A&15]+c[B>>>28&15]+c[B>>>24&15]+c[B>>>20&15]+c[B>>>16&15]+c[B>>>12&15]+c[B>>>8&15]+c[B>>>4&15]+c[B&15];return this.is224||(G+=c[I>>>28&15]+c[I>>>24&15]+c[I>>>20&15]+c[I>>>16&15]+c[I>>>12&15]+c[I>>>8&15]+c[I>>>4&15]+c[I&15]),G},C.prototype.toString=C.prototype.hex,C.prototype.digest=function(){this.finalize();var b=this.h0,R=this.h1,F=this.h2,g=this.h3,v=this.h4,A=this.h5,B=this.h6,I=this.h7,G=[b>>>24&255,b>>>16&255,b>>>8&255,b&255,R>>>24&255,R>>>16&255,R>>>8&255,R&255,F>>>24&255,F>>>16&255,F>>>8&255,F&255,g>>>24&255,g>>>16&255,g>>>8&255,g&255,v>>>24&255,v>>>16&255,v>>>8&255,v&255,A>>>24&255,A>>>16&255,A>>>8&255,A&255,B>>>24&255,B>>>16&255,B>>>8&255,B&255];return this.is224||G.push(I>>>24&255,I>>>16&255,I>>>8&255,I&255),G},C.prototype.array=C.prototype.digest,C.prototype.arrayBuffer=function(){this.finalize();var b=new ArrayBuffer(this.is224?28:32),R=new DataView(b);return R.setUint32(0,this.h0),R.setUint32(4,this.h1),R.setUint32(8,this.h2),R.setUint32(12,this.h3),R.setUint32(16,this.h4),R.setUint32(20,this.h5),R.setUint32(24,this.h6),this.is224||R.setUint32(28,this.h7),b};function L(b,R,F){var g,v=typeof b;if(v==="string"){var A=[],B=b.length,I=0,G;for(g=0;g<B;++g)G=b.charCodeAt(g),G<128?A[I++]=G:G<2048?(A[I++]=192|G>>>6,A[I++]=128|G&63):G<55296||G>=57344?(A[I++]=224|G>>>12,A[I++]=128|G>>>6&63,A[I++]=128|G&63):(G=65536+((G&1023)<<10|b.charCodeAt(++g)&1023),A[I++]=240|G>>>18,A[I++]=128|G>>>12&63,A[I++]=128|G>>>6&63,A[I++]=128|G&63);b=A}else if(v==="object"){if(b===null)throw new Error(e);if(o&&b.constructor===ArrayBuffer)b=new Uint8Array(b);else if(!Array.isArray(b)&&(!o||!ArrayBuffer.isView(b)))throw new Error(e)}else throw new Error(e);b.length>64&&(b=new C(R,!0).update(b).array());var X=[],$=[];for(g=0;g<64;++g){var ie=b[g]||0;X[g]=92^ie,$[g]=54^ie}C.call(this,R,F),this.update($),this.oKeyPad=X,this.inner=!0,this.sharedMemory=F}L.prototype=new C,L.prototype.finalize=function(){if(C.prototype.finalize.call(this),this.inner){this.inner=!1;var b=this.array();C.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(b),C.prototype.finalize.call(this)}};var w=E();w.sha256=w,w.sha224=E(!0),w.sha256.hmac=D(),w.sha224.hmac=D(!0),a?i.exports=w:(n.sha256=w.sha256,n.sha224=w.sha224)})()})(bs)),bs.exports}var Nl=Fl();function Ol(i){return Nl.sha256(JSON.stringify(i.questions.map(({id:e,prompt:t,choices:n,correct:r,difficulty:s})=>({id:e,prompt:t,choices:n,correct:r,difficulty:s??null}))))}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ja="181",Bl=0,Eo=1,zl=2,Ic=1,Uc=2,Rn=3,Qn=0,Wt=1,mn=2,In=0,zi=1,To=2,Ao=3,wo=4,kl=5,di=100,Vl=101,Gl=102,Hl=103,Wl=104,Xl=200,ql=201,$l=202,Yl=203,ia=204,ra=205,jl=206,Kl=207,Zl=208,Jl=209,Ql=210,eu=211,tu=212,nu=213,iu=214,sa=0,aa=1,oa=2,Gi=3,ca=4,la=5,ua=6,da=7,Fc=0,ru=1,su=2,Zn=0,au=1,ou=2,cu=3,Nc=4,lu=5,uu=6,du=7,Oc=300,Hi=301,Wi=302,fa=303,ha=304,cs=306,es=1e3,Dn=1001,pa=1002,Kt=1003,fu=1004,Ar=1005,Qt=1006,Ms=1007,hi=1008,_n=1009,Bc=1010,zc=1011,fr=1012,Qa=1013,mi=1014,Ln=1015,Yi=1016,eo=1017,to=1018,hr=1020,kc=35902,Vc=35899,Gc=1021,Hc=1022,cn=1023,pr=1026,mr=1027,Wc=1028,no=1029,io=1030,ro=1031,so=1033,Yr=33776,jr=33777,Kr=33778,Zr=33779,ma=35840,xa=35841,ga=35842,_a=35843,va=36196,ba=37492,Ma=37496,ya=37808,Sa=37809,Ea=37810,Ta=37811,Aa=37812,wa=37813,Ra=37814,Ca=37815,Pa=37816,Da=37817,La=37818,Ia=37819,Ua=37820,Fa=37821,Na=36492,Oa=36494,Ba=36495,za=36283,ka=36284,Va=36285,Ga=36286,hu=3200,pu=3201,Xc=0,mu=1,$n="",Ot="srgb",Xi="srgb-linear",ts="linear",rt="srgb",Si=7680,Ro=519,xu=512,gu=513,_u=514,qc=515,vu=516,bu=517,Mu=518,yu=519,Co=35044,Po="300 es",xn=2e3,ns=2001;function $c(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Su(){const i=is("canvas");return i.style.display="block",i}const Do={};function Lo(...i){const e="THREE."+i.shift();console.log(e,...i)}function ke(...i){const e="THREE."+i.shift();console.warn(e,...i)}function gt(...i){const e="THREE."+i.shift();console.error(e,...i)}function xr(...i){const e=i.join(" ");e in Do||(Do[e]=!0,ke(...i))}function Eu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ys=Math.PI/180,rs=180/Math.PI;function br(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Tu(i,e){return(i%e+e)%e}function Ss(i,e,t){return(1-t)*i+t*e}function nr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Gt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Je{constructor(e=0,t=0){Je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],p=s[a+1],M=s[a+2],E=s[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=p,e[t+2]=M,e[t+3]=E;return}if(d!==E||c!==h||l!==p||u!==M){let m=c*h+l*p+u*M+d*E;m<0&&(h=-h,p=-p,M=-M,E=-E,m=-m);let f=1-o;if(m<.9995){const D=Math.acos(m),C=Math.sin(D);f=Math.sin(f*D)/C,o=Math.sin(o*D)/C,c=c*f+h*o,l=l*f+p*o,u=u*f+M*o,d=d*f+E*o}else{c=c*f+h*o,l=l*f+p*o,u=u*f+M*o,d=d*f+E*o;const D=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=D,l*=D,u*=D,d*=D}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[a],h=s[a+1],p=s[a+2],M=s[a+3];return e[t]=o*M+u*d+c*p-l*h,e[t+1]=c*M+u*h+l*d-o*p,e[t+2]=l*M+u*p+o*h-c*d,e[t+3]=u*M-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),h=c(n/2),p=c(r/2),M=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*p*M,this._y=l*p*d-h*u*M,this._z=l*u*M+h*p*d,this._w=l*u*d-h*p*M;break;case"YXZ":this._x=h*u*d+l*p*M,this._y=l*p*d-h*u*M,this._z=l*u*M-h*p*d,this._w=l*u*d+h*p*M;break;case"ZXY":this._x=h*u*d-l*p*M,this._y=l*p*d+h*u*M,this._z=l*u*M+h*p*d,this._w=l*u*d-h*p*M;break;case"ZYX":this._x=h*u*d-l*p*M,this._y=l*p*d+h*u*M,this._z=l*u*M-h*p*d,this._w=l*u*d+h*p*M;break;case"YZX":this._x=h*u*d+l*p*M,this._y=l*p*d+h*u*M,this._z=l*u*M-h*p*d,this._w=l*u*d-h*p*M;break;case"XZY":this._x=h*u*d-l*p*M,this._y=l*p*d-h*u*M,this._z=l*u*M+h*p*d,this._w=l*u*d+h*p*M;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Io.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Io.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Es.copy(this).projectOnVector(e),this.sub(Es)}reflect(e){return this.sub(Es.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Es=new V,Io=new Mr;class Ve{constructor(e,t,n,r,s,a,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],M=n[8],E=r[0],m=r[3],f=r[6],D=r[1],C=r[4],L=r[7],w=r[2],b=r[5],R=r[8];return s[0]=a*E+o*D+c*w,s[3]=a*m+o*C+c*b,s[6]=a*f+o*L+c*R,s[1]=l*E+u*D+d*w,s[4]=l*m+u*C+d*b,s[7]=l*f+u*L+d*R,s[2]=h*E+p*D+M*w,s[5]=h*m+p*C+M*b,s[8]=h*f+p*L+M*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,p=l*s-a*c,M=t*d+n*h+r*p;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=d*E,e[1]=(r*l-u*n)*E,e[2]=(o*n-r*a)*E,e[3]=h*E,e[4]=(u*t-r*c)*E,e[5]=(r*s-o*t)*E,e[6]=p*E,e[7]=(n*c-l*t)*E,e[8]=(a*t-n*s)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ts.makeScale(e,t)),this}rotate(e){return this.premultiply(Ts.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ts.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ts=new Ve,Uo=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fo=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Au(){const i={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=Un(r.r),r.g=Un(r.g),r.b=Un(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=ki(r.r),r.g=ki(r.g),r.b=ki(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===$n?ts:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xi]:{primaries:e,whitePoint:n,transfer:ts,toXYZ:Uo,fromXYZ:Fo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Uo,fromXYZ:Fo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}}),i}const tt=Au();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ei;class wu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ei===void 0&&(Ei=is("canvas")),Ei.width=e.width,Ei.height=e.height;const r=Ei.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Ei}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=is("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Un(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Un(t[n]/255)*255):t[n]=Un(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ru=0;class ao{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(As(r[a].image)):s.push(As(r[a]))}else s=As(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function As(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let Cu=0;const ws=new V;class Dt extends ji{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=Dn,r=Dn,s=Qt,a=hi,o=cn,c=_n,l=Dt.DEFAULT_ANISOTROPY,u=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=br(),this.name="",this.source=new ao(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ws).x}get height(){return this.source.getSize(ws).y}get depth(){return this.source.getSize(ws).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case es:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case es:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Oc;Dt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,r=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],M=c[9],E=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-E)<.01&&Math.abs(M-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+E)<.1&&Math.abs(M+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,L=(p+1)/2,w=(f+1)/2,b=(u+h)/4,R=(d+E)/4,F=(M+m)/4;return C>L&&C>w?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=b/n,s=R/n):L>w?L<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(L),n=b/r,s=F/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=R/s,r=F/s),this.set(n,r,s,t),this}let D=Math.sqrt((m-M)*(m-M)+(d-E)*(d-E)+(h-u)*(h-u));return Math.abs(D)<.001&&(D=1),this.x=(m-M)/D,this.y=(d-E)/D,this.z=(h-u)/D,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pu extends ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Dt(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ao(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends Pu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yc extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Du extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(s,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(e.matrixWorld),this.union(wr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Rr.subVectors(this.max,ir),Ti.subVectors(e.a,ir),Ai.subVectors(e.b,ir),wi.subVectors(e.c,ir),zn.subVectors(Ai,Ti),kn.subVectors(wi,Ai),si.subVectors(Ti,wi);let t=[0,-zn.z,zn.y,0,-kn.z,kn.y,0,-si.z,si.y,zn.z,0,-zn.x,kn.z,0,-kn.x,si.z,0,-si.x,-zn.y,zn.x,0,-kn.y,kn.x,0,-si.y,si.x,0];return!Rs(t,Ti,Ai,wi,Rr)||(t=[1,0,0,0,1,0,0,0,1],!Rs(t,Ti,Ai,wi,Rr))?!1:(Cr.crossVectors(zn,kn),t=[Cr.x,Cr.y,Cr.z],Rs(t,Ti,Ai,wi,Rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yn=[new V,new V,new V,new V,new V,new V,new V,new V],nn=new V,wr=new yr,Ti=new V,Ai=new V,wi=new V,zn=new V,kn=new V,si=new V,ir=new V,Rr=new V,Cr=new V,ai=new V;function Rs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ai.fromArray(i,s);const o=r.x*Math.abs(ai.x)+r.y*Math.abs(ai.y)+r.z*Math.abs(ai.z),c=e.dot(ai),l=t.dot(ai),u=n.dot(ai);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Lu=new yr,rr=new V,Cs=new V;class ls{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Lu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(Cs)),this.expandByPoint(rr.copy(e.center).sub(Cs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Sn=new V,Ps=new V,Pr=new V,Vn=new V,Ds=new V,Dr=new V,Ls=new V;class oo{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ps.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(Ps);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),o=Vn.dot(this.direction),c=-Vn.dot(Pr),l=Vn.lengthSq(),u=Math.abs(1-a*a);let d,h,p,M;if(u>0)if(d=a*c-o,h=a*o-c,M=s*u,d>=0)if(h>=-M)if(h<=M){const E=1/u;d*=E,h*=E,p=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-M?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l):h<=M?(d=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ps).addScaledVector(Pr,h),p}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),r=Sn.dot(Sn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,r,s){Ds.subVectors(t,e),Dr.subVectors(n,e),Ls.crossVectors(Ds,Dr);let a=this.direction.dot(Ls),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,e);const c=o*this.direction.dot(Dr.crossVectors(Vn,Dr));if(c<0)return null;const l=o*this.direction.dot(Ds.cross(Vn));if(l<0||c+l>a)return null;const u=-o*Vn.dot(Ls);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,n,r,s,a,o,c,l,u,d,h,p,M,E,m){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,d,h,p,M,E,m)}set(e,t,n,r,s,a,o,c,l,u,d,h,p,M,E,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=M,f[11]=E,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Ri.setFromMatrixColumn(e,0).length(),s=1/Ri.setFromMatrixColumn(e,1).length(),a=1/Ri.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,M=o*u,E=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+M*l,t[5]=h-E*l,t[9]=-o*c,t[2]=E-h*l,t[6]=M+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,M=l*u,E=l*d;t[0]=h+E*o,t[4]=M*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-M,t[6]=E+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,M=l*u,E=l*d;t[0]=h-E*o,t[4]=-a*d,t[8]=M+p*o,t[1]=p+M*o,t[5]=a*u,t[9]=E-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,p=a*d,M=o*u,E=o*d;t[0]=c*u,t[4]=M*l-p,t[8]=h*l+E,t[1]=c*d,t[5]=E*l+h,t[9]=p*l-M,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,M=o*c,E=o*l;t[0]=c*u,t[4]=E-h*d,t[8]=M*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+M,t[10]=h-E*d}else if(e.order==="XZY"){const h=a*c,p=a*l,M=o*c,E=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+E,t[5]=a*u,t[9]=p*d-M,t[2]=M*d-p,t[6]=o*u,t[10]=E*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Iu,e,Uu)}lookAt(e,t,n){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Gn.crossVectors(n,Yt),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Gn.crossVectors(n,Yt)),Gn.normalize(),Lr.crossVectors(Yt,Gn),r[0]=Gn.x,r[4]=Lr.x,r[8]=Yt.x,r[1]=Gn.y,r[5]=Lr.y,r[9]=Yt.y,r[2]=Gn.z,r[6]=Lr.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],M=n[2],E=n[6],m=n[10],f=n[14],D=n[3],C=n[7],L=n[11],w=n[15],b=r[0],R=r[4],F=r[8],g=r[12],v=r[1],A=r[5],B=r[9],I=r[13],G=r[2],X=r[6],$=r[10],ie=r[14],q=r[3],te=r[7],K=r[11],fe=r[15];return s[0]=a*b+o*v+c*G+l*q,s[4]=a*R+o*A+c*X+l*te,s[8]=a*F+o*B+c*$+l*K,s[12]=a*g+o*I+c*ie+l*fe,s[1]=u*b+d*v+h*G+p*q,s[5]=u*R+d*A+h*X+p*te,s[9]=u*F+d*B+h*$+p*K,s[13]=u*g+d*I+h*ie+p*fe,s[2]=M*b+E*v+m*G+f*q,s[6]=M*R+E*A+m*X+f*te,s[10]=M*F+E*B+m*$+f*K,s[14]=M*g+E*I+m*ie+f*fe,s[3]=D*b+C*v+L*G+w*q,s[7]=D*R+C*A+L*X+w*te,s[11]=D*F+C*B+L*$+w*K,s[15]=D*g+C*I+L*ie+w*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],M=e[3],E=e[7],m=e[11],f=e[15];return M*(+s*c*d-r*l*d-s*o*h+n*l*h+r*o*p-n*c*p)+E*(+t*c*p-t*l*h+s*a*h-r*a*p+r*l*u-s*c*u)+m*(+t*l*d-t*o*p-s*a*d+n*a*p+s*o*u-n*l*u)+f*(-r*o*u-t*c*d+t*o*h+r*a*d-n*a*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],M=e[12],E=e[13],m=e[14],f=e[15],D=d*m*l-E*h*l+E*c*p-o*m*p-d*c*f+o*h*f,C=M*h*l-u*m*l-M*c*p+a*m*p+u*c*f-a*h*f,L=u*E*l-M*d*l+M*o*p-a*E*p-u*o*f+a*d*f,w=M*d*c-u*E*c-M*o*h+a*E*h+u*o*m-a*d*m,b=t*D+n*C+r*L+s*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return e[0]=D*R,e[1]=(E*h*s-d*m*s-E*r*p+n*m*p+d*r*f-n*h*f)*R,e[2]=(o*m*s-E*c*s+E*r*l-n*m*l-o*r*f+n*c*f)*R,e[3]=(d*c*s-o*h*s-d*r*l+n*h*l+o*r*p-n*c*p)*R,e[4]=C*R,e[5]=(u*m*s-M*h*s+M*r*p-t*m*p-u*r*f+t*h*f)*R,e[6]=(M*c*s-a*m*s-M*r*l+t*m*l+a*r*f-t*c*f)*R,e[7]=(a*h*s-u*c*s+u*r*l-t*h*l-a*r*p+t*c*p)*R,e[8]=L*R,e[9]=(M*d*s-u*E*s-M*n*p+t*E*p+u*n*f-t*d*f)*R,e[10]=(a*E*s-M*o*s+M*n*l-t*E*l-a*n*f+t*o*f)*R,e[11]=(u*o*s-a*d*s-u*n*l+t*d*l+a*n*p-t*o*p)*R,e[12]=w*R,e[13]=(u*E*r-M*d*r+M*n*h-t*E*h-u*n*m+t*d*m)*R,e[14]=(M*o*r-a*E*r-M*n*c+t*E*c+a*n*m-t*o*m)*R,e[15]=(a*d*r-u*o*r+u*n*c-t*d*c-a*n*h+t*o*h)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,p=s*u,M=s*d,E=a*u,m=a*d,f=o*d,D=c*l,C=c*u,L=c*d,w=n.x,b=n.y,R=n.z;return r[0]=(1-(E+f))*w,r[1]=(p+L)*w,r[2]=(M-C)*w,r[3]=0,r[4]=(p-L)*b,r[5]=(1-(h+f))*b,r[6]=(m+D)*b,r[7]=0,r[8]=(M+C)*R,r[9]=(m-D)*R,r[10]=(1-(h+E))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Ri.set(r[0],r[1],r[2]).length();const a=Ri.set(r[4],r[5],r[6]).length(),o=Ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],rn.copy(this);const l=1/s,u=1/a,d=1/o;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=d,rn.elements[9]*=d,rn.elements[10]*=d,t.setFromRotationMatrix(rn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=xn,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let M,E;if(c)M=s/(a-s),E=a*s/(a-s);else if(o===xn)M=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===ns)M=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=xn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let M,E;if(c)M=1/(a-s),E=a/(a-s);else if(o===xn)M=-2/(a-s),E=-(a+s)/(a-s);else if(o===ns)M=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=M,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ri=new V,rn=new ut,Iu=new V(0,0,0),Uu=new V(1,1,1),Gn=new V,Lr=new V,Yt=new V,No=new ut,Oo=new Mr;class vn{constructor(e=0,t=0,n=0,r=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return No.makeRotationFromQuaternion(e),this.setFromRotationMatrix(No,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class co{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fu=0;const Bo=new V,Ci=new Mr,En=new ut,Ir=new V,sr=new V,Nu=new V,Ou=new Mr,zo=new V(1,0,0),ko=new V(0,1,0),Vo=new V(0,0,1),Go={type:"added"},Bu={type:"removed"},Pi={type:"childadded",child:null},Is={type:"childremoved",child:null};class _t extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new V,t=new vn,n=new Mr,r=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new Ve}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.premultiply(Ci),this}rotateX(e){return this.rotateOnAxis(zo,e)}rotateY(e){return this.rotateOnAxis(ko,e)}rotateZ(e){return this.rotateOnAxis(Vo,e)}translateOnAxis(e,t){return Bo.copy(e).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zo,e)}translateY(e){return this.translateOnAxis(ko,e)}translateZ(e){return this.translateOnAxis(Vo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ir.copy(e):Ir.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(sr,Ir,this.up):En.lookAt(Ir,sr,this.up),this.quaternion.setFromRotationMatrix(En),r&&(En.extractRotation(r.matrixWorld),Ci.setFromRotationMatrix(En),this.quaternion.premultiply(Ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(gt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Go),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null):gt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bu),Is.child=e,this.dispatchEvent(Is),Is.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Go),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,Nu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Ou,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),M=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),M.length>0&&(n.nodes=M)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}_t.DEFAULT_UP=new V(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new V,Tn=new V,Us=new V,An=new V,Di=new V,Li=new V,Ho=new V,Fs=new V,Ns=new V,Os=new V,Bs=new st,zs=new st,ks=new st;class on{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),sn.subVectors(e,t),r.cross(sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){sn.subVectors(r,t),Tn.subVectors(n,t),Us.subVectors(e,t);const a=sn.dot(sn),o=sn.dot(Tn),c=sn.dot(Us),l=Tn.dot(Tn),u=Tn.dot(Us),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,M=(a*u-o*c)*h;return s.set(1-p-M,M,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,An.x),c.addScaledVector(a,An.y),c.addScaledVector(o,An.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Bs.setScalar(0),zs.setScalar(0),ks.setScalar(0),Bs.fromBufferAttribute(e,t),zs.fromBufferAttribute(e,n),ks.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Bs,s.x),a.addScaledVector(zs,s.y),a.addScaledVector(ks,s.z),a}static isFrontFacing(e,t,n,r){return sn.subVectors(n,t),Tn.subVectors(e,t),sn.cross(Tn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),sn.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return on.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Di.subVectors(r,n),Li.subVectors(s,n),Fs.subVectors(e,n);const c=Di.dot(Fs),l=Li.dot(Fs);if(c<=0&&l<=0)return t.copy(n);Ns.subVectors(e,r);const u=Di.dot(Ns),d=Li.dot(Ns);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Di,a);Os.subVectors(e,s);const p=Di.dot(Os),M=Li.dot(Os);if(M>=0&&p<=M)return t.copy(s);const E=p*l-c*M;if(E<=0&&l>=0&&M<=0)return o=l/(l-M),t.copy(n).addScaledVector(Li,o);const m=u*M-p*d;if(m<=0&&d-u>=0&&p-M>=0)return Ho.subVectors(s,r),o=(d-u)/(d-u+(p-M)),t.copy(r).addScaledVector(Ho,o);const f=1/(m+E+h);return a=E*f,o=h*f,t.copy(n).addScaledVector(Di,a).addScaledVector(Li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Vs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Tu(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Vs(a,s,e+1/3),this.g=Vs(a,s,e),this.b=Vs(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ot){function n(s){s!==void 0&&parseFloat(s)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=jc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return tt.workingToColorSpace(Ct.copy(this),e),Math.round(je(Ct.r*255,0,255))*65536+Math.round(je(Ct.g*255,0,255))*256+Math.round(je(Ct.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Ct.copy(this),t);const n=Ct.r,r=Ct.g,s=Ct.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Ot){tt.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,r=Ct.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Ur);const n=Ss(Hn.h,Ur.h,t),r=Ss(Hn.s,Ur.s,t),s=Ss(Hn.l,Ur.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new Ke;Ke.NAMES=jc;let zu=0;class Ki extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=br(),this.name="",this.type="Material",this.blending=zi,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=ra,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ro,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ia&&(n.blendSrc=this.blendSrc),this.blendDst!==ra&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ro&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ss extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new V,Fr=new Je;let ku=0;class dn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ku++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Co&&(e.usage=this.usage),e}}class Kc extends dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zc extends dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends dn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Vu=0;const Jt=new ut,Gs=new _t,Ii=new V,jt=new yr,ar=new yr,Tt=new V;class Ut extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($c(e)?Zc:Kc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return Gs.lookAt(e),Gs.updateMatrix(),this.applyMatrix4(Gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ar.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(jt.min,ar.min),jt.expandByPoint(Tt),Tt.addVectors(jt.max,ar.max),jt.expandByPoint(Tt)):(jt.expandByPoint(ar.min),jt.expandByPoint(ar.max))}jt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Tt.fromBufferAttribute(o,l),c&&(Ii.fromBufferAttribute(e,l),Tt.add(Ii)),r=Math.max(r,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let F=0;F<n.count;F++)o[F]=new V,c[F]=new V;const l=new V,u=new V,d=new V,h=new Je,p=new Je,M=new Je,E=new V,m=new V;function f(F,g,v){l.fromBufferAttribute(n,F),u.fromBufferAttribute(n,g),d.fromBufferAttribute(n,v),h.fromBufferAttribute(s,F),p.fromBufferAttribute(s,g),M.fromBufferAttribute(s,v),u.sub(l),d.sub(l),p.sub(h),M.sub(h);const A=1/(p.x*M.y-M.x*p.y);isFinite(A)&&(E.copy(u).multiplyScalar(M.y).addScaledVector(d,-p.y).multiplyScalar(A),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-M.x).multiplyScalar(A),o[F].add(E),o[g].add(E),o[v].add(E),c[F].add(m),c[g].add(m),c[v].add(m))}let D=this.groups;D.length===0&&(D=[{start:0,count:e.count}]);for(let F=0,g=D.length;F<g;++F){const v=D[F],A=v.start,B=v.count;for(let I=A,G=A+B;I<G;I+=3)f(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const C=new V,L=new V,w=new V,b=new V;function R(F){w.fromBufferAttribute(r,F),b.copy(w);const g=o[F];C.copy(g),C.sub(w.multiplyScalar(w.dot(g))).normalize(),L.crossVectors(b,g);const A=L.dot(c[F])<0?-1:1;a.setXYZW(F,C.x,C.y,C.z,A)}for(let F=0,g=D.length;F<g;++F){const v=D[F],A=v.start,B=v.count;for(let I=A,G=A+B;I<G;I+=3)R(e.getX(I+0)),R(e.getX(I+1)),R(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new V,s=new V,a=new V,o=new V,c=new V,l=new V,u=new V,d=new V;if(e)for(let h=0,p=e.count;h<p;h+=3){const M=e.getX(h+0),E=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,M),s.fromBufferAttribute(t,E),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,M),c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(M,o.x,o.y,o.z),n.setXYZ(E,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,M=0;for(let E=0,m=c.length;E<m;E++){o.isInterleavedBufferAttribute?p=c[E]*o.data.stride+o.offset:p=c[E]*u;for(let f=0;f<u;f++)h[M++]=l[p++]}return new dn(h,u,d)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new ut,oi=new oo,Nr=new ls,Xo=new V,Or=new V,Br=new V,zr=new V,Hs=new V,kr=new V,qo=new V,Vr=new V;class en extends _t{constructor(e=new Ut,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){kr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(Hs.fromBufferAttribute(d,e),a?kr.addScaledVector(Hs,u):kr.addScaledVector(Hs.sub(t),u))}t.add(kr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),oi.copy(e.ray).recast(e.near),!(Nr.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Nr,Xo)===null||oi.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(s).invert(),oi.copy(e.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,E=h.length;M<E;M++){const m=h[M],f=a[m.materialIndex],D=Math.max(m.start,p.start),C=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let L=D,w=C;L<w;L+=3){const b=o.getX(L),R=o.getX(L+1),F=o.getX(L+2);r=Gr(this,f,e,n,l,u,d,b,R,F),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const M=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let m=M,f=E;m<f;m+=3){const D=o.getX(m),C=o.getX(m+1),L=o.getX(m+2);r=Gr(this,a,e,n,l,u,d,D,C,L),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let M=0,E=h.length;M<E;M++){const m=h[M],f=a[m.materialIndex],D=Math.max(m.start,p.start),C=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let L=D,w=C;L<w;L+=3){const b=L,R=L+1,F=L+2;r=Gr(this,f,e,n,l,u,d,b,R,F),r&&(r.faceIndex=Math.floor(L/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const M=Math.max(0,p.start),E=Math.min(c.count,p.start+p.count);for(let m=M,f=E;m<f;m+=3){const D=m,C=m+1,L=m+2;r=Gr(this,a,e,n,l,u,d,D,C,L),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Gu(i,e,t,n,r,s,a,o){let c;if(e.side===Wt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Qn,o),c===null)return null;Vr.copy(o),Vr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Vr);return l<t.near||l>t.far?null:{distance:l,point:Vr.clone(),object:i}}function Gr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Or),i.getVertexPosition(c,Br),i.getVertexPosition(l,zr);const u=Gu(i,e,t,n,Or,Br,zr,qo);if(u){const d=new V;on.getBarycoord(qo,Or,Br,zr,d),r&&(u.uv=on.getInterpolatedAttribute(r,o,c,l,d,new Je)),s&&(u.uv1=on.getInterpolatedAttribute(s,o,c,l,d,new Je)),a&&(u.normal=on.getInterpolatedAttribute(a,o,c,l,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new V,materialIndex:0};on.getNormal(Or,Br,zr,h.normal),u.face=h,u.barycoord=d}return u}class Zi extends Ut{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,p=0;M("z","y","x",-1,-1,n,t,e,a,s,0),M("z","y","x",1,-1,n,t,-e,a,s,1),M("x","z","y",1,1,e,n,t,r,a,2),M("x","z","y",1,-1,e,n,-t,r,a,3),M("x","y","z",1,-1,e,t,n,r,s,4),M("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(d,2));function M(E,m,f,D,C,L,w,b,R,F,g){const v=L/R,A=w/F,B=L/2,I=w/2,G=b/2,X=R+1,$=F+1;let ie=0,q=0;const te=new V;for(let K=0;K<$;K++){const fe=K*A-I;for(let Se=0;Se<X;Se++){const Ce=Se*v-B;te[E]=Ce*D,te[m]=fe*C,te[f]=G,l.push(te.x,te.y,te.z),te[E]=0,te[m]=0,te[f]=b>0?1:-1,u.push(te.x,te.y,te.z),d.push(Se/R),d.push(1-K/F),ie+=1}}for(let K=0;K<F;K++)for(let fe=0;fe<R;fe++){const Se=h+fe+X*K,Ce=h+fe+X*(K+1),Ie=h+(fe+1)+X*(K+1),Qe=h+(fe+1)+X*K;c.push(Se,Ce,Qe),c.push(Ce,Ie,Qe),q+=6}o.addGroup(p,q,g),p+=q,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=qi(i[t]);for(const r in n)e[r]=n[r]}return e}function Hu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Wu={clone:qi,merge:Nt};var Xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xu,this.fragmentShader=qu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=Hu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qc extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new V,$o=new Je,Yo=new Je;class Ht extends Qc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z)}getViewSize(e,t){return this.getViewBounds(e,$o,Yo),t.subVectors(Yo,$o)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ys*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Fi=1;class $u extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(Ui,Fi,e,t);r.layers=this.layers,this.add(r);const s=new Ht(Ui,Fi,e,t);s.layers=this.layers,this.add(s);const a=new Ht(Ui,Fi,e,t);a.layers=this.layers,this.add(a);const o=new Ht(Ui,Fi,e,t);o.layers=this.layers,this.add(o);const c=new Ht(Ui,Fi,e,t);c.layers=this.layers,this.add(c);const l=new Ht(Ui,Fi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===xn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class el extends Dt{constructor(e=[],t=Hi,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yu extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new el(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zi(5,5,5),s=new Nn({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:In});s.uniforms.tEquirect.value=t;const a=new en(r,s),o=t.minFilter;return t.minFilter===hi&&(t.minFilter=Qt),new $u(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class ht extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ju={type:"move"};class Ws{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const E of e.hand.values()){const m=t.getJointPose(E,n),f=this._getHandJoint(l,E);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,M=.005;l.inputState.pinching&&h>p+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ju)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=t}clone(){return new lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ku extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Zu extends Dt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Kt,u=Kt,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xs=new V,Ju=new V,Qu=new Ve;class qn{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Xs.subVectors(n,t).cross(Ju.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Xs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Qu.getNormalMatrix(e),r=this.coplanarPoint(Xs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new ls,ed=new Je(.5,.5),Hr=new V;class uo{constructor(e=new qn,t=new qn,n=new qn,r=new qn,s=new qn,a=new qn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],p=s[7],M=s[8],E=s[9],m=s[10],f=s[11],D=s[12],C=s[13],L=s[14],w=s[15];if(r[0].setComponents(l-a,p-u,f-M,w-D).normalize(),r[1].setComponents(l+a,p+u,f+M,w+D).normalize(),r[2].setComponents(l+o,p+d,f+E,w+C).normalize(),r[3].setComponents(l-o,p-d,f-E,w-C).normalize(),n)r[4].setComponents(c,h,m,L).normalize(),r[5].setComponents(l-c,p-h,f-m,w-L).normalize();else if(r[4].setComponents(l-c,p-h,f-m,w-L).normalize(),t===xn)r[5].setComponents(l+c,p+h,f+m,w+L).normalize();else if(t===ns)r[5].setComponents(c,h,m,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){ci.center.set(0,0,0);const t=ed.distanceTo(e.center);return ci.radius=.7071067811865476+t,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Hr.x=r.normal.x>0?e.max.x:e.min.x,Hr.y=r.normal.y>0?e.max.y:e.min.y,Hr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class tl extends Ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jo=new ut,Ha=new oo,Wr=new ls,Xr=new V;class td extends _t{constructor(e=new Ut,t=new tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(r),Wr.radius+=s,e.ray.intersectsSphere(Wr)===!1)return;jo.copy(r).invert(),Ha.copy(e.ray).applyMatrix4(jo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let M=h,E=p;M<E;M++){const m=l.getX(M);Xr.fromBufferAttribute(d,m),Ko(Xr,m,c,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let M=h,E=p;M<E;M++)Xr.fromBufferAttribute(d,M),Ko(Xr,M,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ko(i,e,t,n,r,s,a){const o=Ha.distanceSqToPoint(i);if(o<t){const c=new V;Ha.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class qs extends Dt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nl extends Dt{constructor(e,t,n=mi,r,s,a,o=Kt,c=Kt,l,u=pr,d=1){if(u!==pr&&u!==mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ao(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class il extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bi extends Ut{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],u=t/2,d=Math.PI/2*e,h=t,p=2*d+h,M=n*2+s,E=r+1,m=new V,f=new V;for(let D=0;D<=M;D++){let C=0,L=0,w=0,b=0;if(D<=n){const g=D/n,v=g*Math.PI/2;L=-u-e*Math.cos(v),w=e*Math.sin(v),b=-e*Math.cos(v),C=g*d}else if(D<=n+s){const g=(D-n)/s;L=-u+g*t,w=e,b=0,C=d+g*h}else{const g=(D-n-s)/n,v=g*Math.PI/2;L=u+e*Math.sin(v),w=e*Math.cos(v),b=e*Math.sin(v),C=d+h+g*d}const R=Math.max(0,Math.min(1,C/p));let F=0;D===0?F=.5/r:D===M&&(F=-.5/r);for(let g=0;g<=r;g++){const v=g/r,A=v*Math.PI*2,B=Math.sin(A),I=Math.cos(A);f.x=-w*I,f.y=L,f.z=w*B,o.push(f.x,f.y,f.z),m.set(-w*I,b,w*B),m.normalize(),c.push(m.x,m.y,m.z),l.push(v+F,R)}if(D>0){const g=(D-1)*E;for(let v=0;v<r;v++){const A=g+v,B=g+v+1,I=D*E+v,G=D*E+v+1;a.push(A,B,I),a.push(B,G,I)}}}this.setIndex(a),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Yn extends Ut{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let M=0;const E=[],m=n/2;let f=0;D(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new pt(d,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(p,2));function D(){const L=new V,w=new V;let b=0;const R=(t-e)/n;for(let F=0;F<=s;F++){const g=[],v=F/s,A=v*(t-e)+e;for(let B=0;B<=r;B++){const I=B/r,G=I*c+o,X=Math.sin(G),$=Math.cos(G);w.x=A*X,w.y=-v*n+m,w.z=A*$,d.push(w.x,w.y,w.z),L.set(X,R,$).normalize(),h.push(L.x,L.y,L.z),p.push(I,1-v),g.push(M++)}E.push(g)}for(let F=0;F<r;F++)for(let g=0;g<s;g++){const v=E[g][F],A=E[g+1][F],B=E[g+1][F+1],I=E[g][F+1];(e>0||g!==0)&&(u.push(v,A,I),b+=3),(t>0||g!==s-1)&&(u.push(A,B,I),b+=3)}l.addGroup(f,b,0),f+=b}function C(L){const w=M,b=new Je,R=new V;let F=0;const g=L===!0?e:t,v=L===!0?1:-1;for(let B=1;B<=r;B++)d.push(0,m*v,0),h.push(0,v,0),p.push(.5,.5),M++;const A=M;for(let B=0;B<=r;B++){const G=B/r*c+o,X=Math.cos(G),$=Math.sin(G);R.x=g*$,R.y=m*v,R.z=g*X,d.push(R.x,R.y,R.z),h.push(0,v,0),b.x=X*.5+.5,b.y=$*.5*v+.5,p.push(b.x,b.y),M++}for(let B=0;B<r;B++){const I=w+B,G=A+B;L===!0?u.push(G,G+1,I):u.push(G+1,G,I),F+=3}l.addGroup(f,F,L===!0?1:2),f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fo extends Yn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new fo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $i extends Ut{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],M=[],E=[],m=[];for(let f=0;f<u;f++){const D=f*h-a;for(let C=0;C<l;C++){const L=C*d-s;M.push(L,-D,0),E.push(0,0,1),m.push(C/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let D=0;D<o;D++){const C=D+l*f,L=D+l*(f+1),w=D+1+l*(f+1),b=D+1+l*f;p.push(C,L,b),p.push(L,w,b)}this.setIndex(p),this.setAttribute("position",new pt(M,3)),this.setAttribute("normal",new pt(E,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.width,e.height,e.widthSegments,e.heightSegments)}}class jn extends Ut{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,p=new V,M=new Je;for(let E=0;E<=r;E++){for(let m=0;m<=n;m++){const f=s+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),M.x=(p.x/t+1)/2,M.y=(p.y/t+1)/2,u.push(M.x,M.y)}d+=h}for(let E=0;E<r;E++){const m=E*(n+1);for(let f=0;f<n;f++){const D=f+m,C=D,L=D+n+1,w=D+n+2,b=D+1;o.push(C,L,b),o.push(L,w,b)}}this.setIndex(o),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class as extends Ut{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new V,h=new V,p=[],M=[],E=[],m=[];for(let f=0;f<=n;f++){const D=[],C=f/n;let L=0;f===0&&a===0?L=.5/t:f===n&&c===Math.PI&&(L=-.5/t);for(let w=0;w<=t;w++){const b=w/t;d.x=-e*Math.cos(r+b*s)*Math.sin(a+C*o),d.y=e*Math.cos(a+C*o),d.z=e*Math.sin(r+b*s)*Math.sin(a+C*o),M.push(d.x,d.y,d.z),h.copy(d).normalize(),E.push(h.x,h.y,h.z),m.push(b+L,1-C),D.push(l++)}u.push(D)}for(let f=0;f<n;f++)for(let D=0;D<t;D++){const C=u[f][D+1],L=u[f][D],w=u[f+1][D],b=u[f+1][D+1];(f!==0||a>0)&&p.push(C,L,b),(f!==n-1||c<Math.PI)&&p.push(L,w,b)}this.setIndex(p),this.setAttribute("position",new pt(M,3)),this.setAttribute("normal",new pt(E,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vi extends Ut{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],c=[],l=[],u=new V,d=new V,h=new V;for(let p=0;p<=n;p++)for(let M=0;M<=r;M++){const E=M/r*s,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(E),d.y=(e+t*Math.cos(m))*Math.sin(E),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(E),u.y=e*Math.sin(E),h.subVectors(d,u).normalize(),c.push(h.x,h.y,h.z),l.push(M/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let M=1;M<=r;M++){const E=(r+1)*p+M-1,m=(r+1)*(p-1)+M-1,f=(r+1)*(p-1)+M,D=(r+1)*p+M;a.push(E,m,D),a.push(m,f,D)}this.setIndex(a),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Xn extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xc,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nd extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class id extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class us extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class rd extends us{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const $s=new ut,Zo=new V,Jo=new V;class ho{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Je(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uo,this._frameExtents=new Je(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Zo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zo),Jo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jo),t.updateMatrixWorld(),$s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($s,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($s)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class sd extends ho{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=rs*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ad extends us{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new sd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Qo=new ut,or=new V,Ys=new V;class od extends ho{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Je(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),or.setFromMatrixPosition(e.matrixWorld),n.position.copy(or),Ys.copy(n.position),Ys.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ys),n.updateMatrixWorld(),r.makeTranslation(-or.x,-or.y,-or.z),Qo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qo,n.coordinateSystem,n.reversedDepth)}}class js extends us{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new od}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class rl extends Qc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cd extends ho{constructor(){super(new rl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ec extends us{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new cd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ld extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const tc=new ut;class ud{constructor(e,t,n=0,r=1/0){this.ray=new oo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):gt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tc),this}intersectObject(e,t=!0,n=[]){return Wa(e,this,n,t),n.sort(nc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Wa(e[r],this,n,t);return n.sort(nc),n}}function nc(i,e){return i.distance-e.distance}function Wa(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Wa(s[a],e,t,!0)}}function ic(i,e,t,n){const r=dd(n);switch(t){case Gc:return i*e;case Wc:return i*e/r.components*r.byteLength;case no:return i*e/r.components*r.byteLength;case io:return i*e*2/r.components*r.byteLength;case ro:return i*e*2/r.components*r.byteLength;case Hc:return i*e*3/r.components*r.byteLength;case cn:return i*e*4/r.components*r.byteLength;case so:return i*e*4/r.components*r.byteLength;case Yr:case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xa:case _a:return Math.max(i,16)*Math.max(e,8)/4;case ma:case ga:return Math.max(i,8)*Math.max(e,8)/2;case va:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Da:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Na:case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(e/4)*16;case za:case ka:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Va:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dd(i){switch(i){case _n:case Bc:return{byteLength:1,components:1};case fr:case zc:case Yi:return{byteLength:2,components:1};case eo:case to:return{byteLength:2,components:4};case mi:case Qa:case Ln:return{byteLength:4,components:1};case kc:case Vc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ja}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ja);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sl(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fd(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,M)=>p.start-M.start);let h=0;for(let p=1;p<d.length;p++){const M=d[h],E=d[p];E.start<=M.start+M.count+1?M.count=Math.max(M.count,E.start+E.count-M.start):(++h,d[h]=E)}d.length=h+1;for(let p=0,M=d.length;p<M;p++){const E=d[p];i.bufferSubData(l,E.start*u.BYTES_PER_ELEMENT,u,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Md=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Td=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ad=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Nd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Od=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$d=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ef=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,af=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,df=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ff=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,th=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ih=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ah=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,oh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ch=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ph=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_h=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Th=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ah=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ch=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ph=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ih=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Uh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:hd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:xd,alphatest_fragment:gd,alphatest_pars_fragment:_d,aomap_fragment:vd,aomap_pars_fragment:bd,batching_pars_vertex:Md,batching_vertex:yd,begin_vertex:Sd,beginnormal_vertex:Ed,bsdfs:Td,iridescence_fragment:Ad,bumpmap_pars_fragment:wd,clipping_planes_fragment:Rd,clipping_planes_pars_fragment:Cd,clipping_planes_pars_vertex:Pd,clipping_planes_vertex:Dd,color_fragment:Ld,color_pars_fragment:Id,color_pars_vertex:Ud,color_vertex:Fd,common:Nd,cube_uv_reflection_fragment:Od,defaultnormal_vertex:Bd,displacementmap_pars_vertex:zd,displacementmap_vertex:kd,emissivemap_fragment:Vd,emissivemap_pars_fragment:Gd,colorspace_fragment:Hd,colorspace_pars_fragment:Wd,envmap_fragment:Xd,envmap_common_pars_fragment:qd,envmap_pars_fragment:$d,envmap_pars_vertex:Yd,envmap_physical_pars_fragment:af,envmap_vertex:jd,fog_vertex:Kd,fog_pars_vertex:Zd,fog_fragment:Jd,fog_pars_fragment:Qd,gradientmap_pars_fragment:ef,lightmap_pars_fragment:tf,lights_lambert_fragment:nf,lights_lambert_pars_fragment:rf,lights_pars_begin:sf,lights_toon_fragment:of,lights_toon_pars_fragment:cf,lights_phong_fragment:lf,lights_phong_pars_fragment:uf,lights_physical_fragment:df,lights_physical_pars_fragment:ff,lights_fragment_begin:hf,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:xf,logdepthbuf_pars_fragment:gf,logdepthbuf_pars_vertex:_f,logdepthbuf_vertex:vf,map_fragment:bf,map_pars_fragment:Mf,map_particle_fragment:yf,map_particle_pars_fragment:Sf,metalnessmap_fragment:Ef,metalnessmap_pars_fragment:Tf,morphinstance_vertex:Af,morphcolor_vertex:wf,morphnormal_vertex:Rf,morphtarget_pars_vertex:Cf,morphtarget_vertex:Pf,normal_fragment_begin:Df,normal_fragment_maps:Lf,normal_pars_fragment:If,normal_pars_vertex:Uf,normal_vertex:Ff,normalmap_pars_fragment:Nf,clearcoat_normal_fragment_begin:Of,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:kf,opaque_fragment:Vf,packing:Gf,premultiplied_alpha_fragment:Hf,project_vertex:Wf,dithering_fragment:Xf,dithering_pars_fragment:qf,roughnessmap_fragment:$f,roughnessmap_pars_fragment:Yf,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:Kf,shadowmap_vertex:Zf,shadowmask_pars_fragment:Jf,skinbase_vertex:Qf,skinning_pars_vertex:eh,skinning_vertex:th,skinnormal_vertex:nh,specularmap_fragment:ih,specularmap_pars_fragment:rh,tonemapping_fragment:sh,tonemapping_pars_fragment:ah,transmission_fragment:oh,transmission_pars_fragment:ch,uv_pars_fragment:lh,uv_pars_vertex:uh,uv_vertex:dh,worldpos_vertex:fh,background_vert:hh,background_frag:ph,backgroundCube_vert:mh,backgroundCube_frag:xh,cube_vert:gh,cube_frag:_h,depth_vert:vh,depth_frag:bh,distanceRGBA_vert:Mh,distanceRGBA_frag:yh,equirect_vert:Sh,equirect_frag:Eh,linedashed_vert:Th,linedashed_frag:Ah,meshbasic_vert:wh,meshbasic_frag:Rh,meshlambert_vert:Ch,meshlambert_frag:Ph,meshmatcap_vert:Dh,meshmatcap_frag:Lh,meshnormal_vert:Ih,meshnormal_frag:Uh,meshphong_vert:Fh,meshphong_frag:Nh,meshphysical_vert:Oh,meshphysical_frag:Bh,meshtoon_vert:zh,meshtoon_frag:kh,points_vert:Vh,points_frag:Gh,shadow_vert:Hh,shadow_frag:Wh,sprite_vert:Xh,sprite_frag:qh},_e={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},pn={basic:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Nt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Nt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Nt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Nt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Nt([_e.points,_e.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Nt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Nt([_e.common,_e.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Nt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Nt([_e.sprite,_e.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Nt([_e.common,_e.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Nt([_e.lights,_e.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};pn.physical={uniforms:Nt([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const qr={r:0,b:0,g:0},li=new vn,$h=new ut;function Yh(i,e,t,n,r,s,a){const o=new Ke(0);let c=s===!0?0:1,l,u,d=null,h=0,p=null;function M(C){let L=C.isScene===!0?C.background:null;return L&&L.isTexture&&(L=(C.backgroundBlurriness>0?t:e).get(L)),L}function E(C){let L=!1;const w=M(C);w===null?f(o,c):w&&w.isColor&&(f(w,1),L=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||L)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(C,L){const w=M(L);w&&(w.isCubeTexture||w.mapping===cs)?(u===void 0&&(u=new en(new Zi(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:qi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,R,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),li.copy(L.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4($h.makeRotationFromEuler(li)),u.material.toneMapped=tt.getTransfer(w.colorSpace)!==rt,(d!==w||h!==w.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=w,h=w.version,p=i.toneMapping),u.layers.enableAll(),C.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new en(new $i(2,2),new Nn({name:"BackgroundMaterial",uniforms:qi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=tt.getTransfer(w.colorSpace)!==rt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||h!==w.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=w,h=w.version,p=i.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function f(C,L){C.getRGB(qr,Jc(i)),n.buffers.color.setClear(qr.r,qr.g,qr.b,L,a)}function D(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(C,L=1){o.set(C),c=L,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(C){c=C,f(o,c)},render:E,addToRenderList:m,dispose:D}}function jh(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(v,A,B,I,G){let X=!1;const $=d(I,B,A);s!==$&&(s=$,l(s.object)),X=p(v,I,B,G),X&&M(v,I,B,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,L(v,A,B,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function d(v,A,B){const I=B.wireframe===!0;let G=n[v.id];G===void 0&&(G={},n[v.id]=G);let X=G[A.id];X===void 0&&(X={},G[A.id]=X);let $=X[I];return $===void 0&&($=h(c()),X[I]=$),$}function h(v){const A=[],B=[],I=[];for(let G=0;G<t;G++)A[G]=0,B[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:B,attributeDivisors:I,object:v,attributes:{},index:null}}function p(v,A,B,I){const G=s.attributes,X=A.attributes;let $=0;const ie=B.getAttributes();for(const q in ie)if(ie[q].location>=0){const K=G[q];let fe=X[q];if(fe===void 0&&(q==="instanceMatrix"&&v.instanceMatrix&&(fe=v.instanceMatrix),q==="instanceColor"&&v.instanceColor&&(fe=v.instanceColor)),K===void 0||K.attribute!==fe||fe&&K.data!==fe.data)return!0;$++}return s.attributesNum!==$||s.index!==I}function M(v,A,B,I){const G={},X=A.attributes;let $=0;const ie=B.getAttributes();for(const q in ie)if(ie[q].location>=0){let K=X[q];K===void 0&&(q==="instanceMatrix"&&v.instanceMatrix&&(K=v.instanceMatrix),q==="instanceColor"&&v.instanceColor&&(K=v.instanceColor));const fe={};fe.attribute=K,K&&K.data&&(fe.data=K.data),G[q]=fe,$++}s.attributes=G,s.attributesNum=$,s.index=I}function E(){const v=s.newAttributes;for(let A=0,B=v.length;A<B;A++)v[A]=0}function m(v){f(v,0)}function f(v,A){const B=s.newAttributes,I=s.enabledAttributes,G=s.attributeDivisors;B[v]=1,I[v]===0&&(i.enableVertexAttribArray(v),I[v]=1),G[v]!==A&&(i.vertexAttribDivisor(v,A),G[v]=A)}function D(){const v=s.newAttributes,A=s.enabledAttributes;for(let B=0,I=A.length;B<I;B++)A[B]!==v[B]&&(i.disableVertexAttribArray(B),A[B]=0)}function C(v,A,B,I,G,X,$){$===!0?i.vertexAttribIPointer(v,A,B,G,X):i.vertexAttribPointer(v,A,B,I,G,X)}function L(v,A,B,I){E();const G=I.attributes,X=B.getAttributes(),$=A.defaultAttributeValues;for(const ie in X){const q=X[ie];if(q.location>=0){let te=G[ie];if(te===void 0&&(ie==="instanceMatrix"&&v.instanceMatrix&&(te=v.instanceMatrix),ie==="instanceColor"&&v.instanceColor&&(te=v.instanceColor)),te!==void 0){const K=te.normalized,fe=te.itemSize,Se=e.get(te);if(Se===void 0)continue;const Ce=Se.buffer,Ie=Se.type,Qe=Se.bytesPerElement,J=Ie===i.INT||Ie===i.UNSIGNED_INT||te.gpuType===Qa;if(te.isInterleavedBufferAttribute){const oe=te.data,ye=oe.stride,ze=te.offset;if(oe.isInstancedInterleavedBuffer){for(let Ae=0;Ae<q.locationSize;Ae++)f(q.location+Ae,oe.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ae=0;Ae<q.locationSize;Ae++)m(q.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let Ae=0;Ae<q.locationSize;Ae++)C(q.location+Ae,fe/q.locationSize,Ie,K,ye*Qe,(ze+fe/q.locationSize*Ae)*Qe,J)}else{if(te.isInstancedBufferAttribute){for(let oe=0;oe<q.locationSize;oe++)f(q.location+oe,te.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let oe=0;oe<q.locationSize;oe++)m(q.location+oe);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let oe=0;oe<q.locationSize;oe++)C(q.location+oe,fe/q.locationSize,Ie,K,fe*Qe,fe/q.locationSize*oe*Qe,J)}}else if($!==void 0){const K=$[ie];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(q.location,K);break;case 3:i.vertexAttrib3fv(q.location,K);break;case 4:i.vertexAttrib4fv(q.location,K);break;default:i.vertexAttrib1fv(q.location,K)}}}}D()}function w(){F();for(const v in n){const A=n[v];for(const B in A){const I=A[B];for(const G in I)u(I[G].object),delete I[G];delete A[B]}delete n[v]}}function b(v){if(n[v.id]===void 0)return;const A=n[v.id];for(const B in A){const I=A[B];for(const G in I)u(I[G].object),delete I[G];delete A[B]}delete n[v.id]}function R(v){for(const A in n){const B=n[A];if(B[v.id]===void 0)continue;const I=B[v.id];for(const G in I)u(I[G].object),delete I[G];delete B[v.id]}}function F(){g(),a=!0,s!==r&&(s=r,l(s.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:F,resetDefaultState:g,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:E,enableAttribute:m,disableUnusedAttributes:D}}function Kh(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let M=0;M<d;M++)p+=u[M];t.update(p,n,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let M=0;M<l.length;M++)a(l[M],u[M],h[M]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let M=0;for(let E=0;E<d;E++)M+=u[E]*h[E];t.update(M,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Zh(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const F=R===Yi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==_n&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!F)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(ke("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),D=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),L=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=M>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:M,maxTextureSize:E,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:D,maxVaryings:C,maxFragmentUniforms:L,vertexTextures:w,maxSamples:b}}function Jh(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new qn,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const M=d.clippingPlanes,E=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||M===null||M.length===0||s&&!m)s?u(null):l();else{const D=s?0:n,C=D*4;let L=f.clippingState||null;c.value=L,L=u(M,h,C,p);for(let w=0;w!==C;++w)L[w]=t[w];f.clippingState=L,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=D}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,M){const E=d!==null?d.length:0;let m=null;if(E!==0){if(m=c.value,M!==!0||m===null){const f=p+E*4,D=h.matrixWorldInverse;o.getNormalMatrix(D),(m===null||m.length<f)&&(m=new Float32Array(f));for(let C=0,L=p;C!==E;++C,L+=4)a.copy(d[C]).applyMatrix4(D,o),a.normal.toArray(m,L),m[L+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,m}}function Qh(i){let e=new WeakMap;function t(a,o){return o===fa?a.mapping=Hi:o===ha&&(a.mapping=Wi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===fa||o===ha)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Yu(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Kn=4,rc=[.125,.215,.35,.446,.526,.582],fi=20,ep=256,cr=new rl,sc=new Ke;let Ks=null,Zs=0,Js=0,Qs=!1;const tp=new V;class ac{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=tp}=s;Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ks,Zs,Js),this._renderer.xr.enabled=Qs,e.scissorTest=!1,Ni(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===Wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Yi,format:cn,colorSpace:Xi,depthBuffer:!1},r=oc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=np(s)),this._blurMaterial=rp(s,e,t),this._ggxMaterial=ip(s,e,t)}return r}_compileMaterial(e){const t=new en(new Ut,e);this._renderer.compile(t,cr)}_sceneToCubeUV(e,t,n,r,s){const c=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(sc),d.toneMapping=Zn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new en(new Zi,new ss({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,m=E.material;let f=!1;const D=e.background;D?D.isColor&&(m.color.copy(D),e.background=null,f=!0):(m.color.copy(sc),f=!0);for(let C=0;C<6;C++){const L=C%3;L===0?(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[C],s.y,s.z)):L===1?(c.up.set(0,0,l[C]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[C],s.z)):(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[C]));const w=this._cubeSize;Ni(r,L*w,C>2?w:0,w,w),d.setRenderTarget(r),f&&d.render(E,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=D}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Hi||e.mapping===Wi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ni(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,cr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=.05+l*.95,p=d*h,{_lodMax:M}=this,E=this._sizeLods[n],m=3*E*(n>M-Kn?n-M+Kn:0),f=4*(this._cubeSize-E);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=M-t,Ni(s,m,f,3*E,2*E),r.setRenderTarget(s),r.render(o,cr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=M-n,Ni(e,m,f,3*E,2*E),r.setRenderTarget(e),r.render(o,cr)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&gt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const h=l.uniforms,p=this._sizeLods[n]-1,M=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*fi-1),E=s/M,m=isFinite(s)?1+Math.floor(u*E):fi;m>fi&&ke(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);const f=[];let D=0;for(let R=0;R<fi;++R){const F=R/E,g=Math.exp(-F*F/2);f.push(g),R===0?D+=g:R<m&&(D+=2*g)}for(let R=0;R<f.length;R++)f[R]=f[R]/D;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:C}=this;h.dTheta.value=M,h.mipInt.value=C-n;const L=this._sizeLods[r],w=3*L*(r>C-Kn?r-C+Kn:0),b=4*(this._cubeSize-L);Ni(t,w,b,3*L,2*L),c.setRenderTarget(t),c.render(d,cr)}}function np(i){const e=[],t=[],n=[];let r=i;const s=i-Kn+1+rc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-Kn?c=rc[a-i+Kn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,M=6,E=3,m=2,f=1,D=new Float32Array(E*M*p),C=new Float32Array(m*M*p),L=new Float32Array(f*M*p);for(let b=0;b<p;b++){const R=b%3*2/3-1,F=b>2?0:-1,g=[R,F,0,R+2/3,F,0,R+2/3,F+1,0,R,F,0,R+2/3,F+1,0,R,F+1,0];D.set(g,E*M*b),C.set(h,m*M*b);const v=[b,b,b,b,b,b];L.set(v,f*M*b)}const w=new Ut;w.setAttribute("position",new dn(D,E)),w.setAttribute("uv",new dn(C,m)),w.setAttribute("faceIndex",new dn(L,f)),n.push(new en(w,null)),r>Kn&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function oc(i,e,t){const n=new xi(i,e,t);return n.texture.mapping=cs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ni(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function ip(i,e,t){return new Nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ep,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function rp(i,e,t){const n=new Float32Array(fi),r=new V(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function cc(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function lc(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ds(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function sp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===fa||c===ha,u=c===Hi||c===Wi;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ac(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new ac(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ap(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&xr("WebGLRenderer: "+n+" extension not supported."),r}}}function op(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const M in h.attributes)e.remove(h.attributes[M]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,M=d.attributes.position;let E=0;if(p!==null){const D=p.array;E=p.version;for(let C=0,L=D.length;C<L;C+=3){const w=D[C+0],b=D[C+1],R=D[C+2];h.push(w,b,b,R,R,w)}}else if(M!==void 0){const D=M.array;E=M.version;for(let C=0,L=D.length/3-1;C<L;C+=3){const w=C+0,b=C+1,R=C+2;h.push(w,b,b,R,R,w)}}else return;const m=new($c(h)?Zc:Kc)(h,1);m.version=E;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function cp(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,p){i.drawElements(n,p,s,h*a),t.update(p,n,1)}function l(h,p,M){M!==0&&(i.drawElementsInstanced(n,p,s,h*a,M),t.update(p,n,M))}function u(h,p,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,h,0,M);let m=0;for(let f=0;f<M;f++)m+=p[f];t.update(m,n,1)}function d(h,p,M,E){if(M===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/a,p[f],E[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,h,0,E,0,M);let f=0;for(let D=0;D<M;D++)f+=p[D]*E[D];t.update(f,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function lp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:gt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function up(i,e,t){const n=new WeakMap,r=new st;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let v=function(){F.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var p=v;h!==void 0&&h.texture.dispose();const M=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],D=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let L=0;M===!0&&(L=1),E===!0&&(L=2),m===!0&&(L=3);let w=o.attributes.position.count*L,b=1;w>e.maxTextureSize&&(b=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*b*4*d),F=new Yc(R,w,b,d);F.type=Ln,F.needsUpdate=!0;const g=L*4;for(let A=0;A<d;A++){const B=f[A],I=D[A],G=C[A],X=w*b*4*A;for(let $=0;$<B.count;$++){const ie=$*g;M===!0&&(r.fromBufferAttribute(B,$),R[X+ie+0]=r.x,R[X+ie+1]=r.y,R[X+ie+2]=r.z,R[X+ie+3]=0),E===!0&&(r.fromBufferAttribute(I,$),R[X+ie+4]=r.x,R[X+ie+5]=r.y,R[X+ie+6]=r.z,R[X+ie+7]=0),m===!0&&(r.fromBufferAttribute(G,$),R[X+ie+8]=r.x,R[X+ie+9]=r.y,R[X+ie+10]=r.z,R[X+ie+11]=G.itemSize===4?r.w:1)}}h={count:d,texture:F,size:new Je(w,b)},n.set(o,h),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let M=0;for(let m=0;m<l.length;m++)M+=l[m];const E=o.morphTargetsRelative?1:1-M;c.getUniforms().setValue(i,"morphTargetBaseInfluence",E),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function dp(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const al=new Dt,uc=new nl(1,1),ol=new Yc,cl=new Du,ll=new el,dc=[],fc=[],hc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=dc[r];if(s===void 0&&(s=new Float32Array(r),dc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function yt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fs(i,e){let t=fc[e];t===void 0&&(t=new Int32Array(e),fc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(yt(t,n))return;mc.set(n),i.uniformMatrix2fv(this.addr,!1,mc),St(t,n)}}function gp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(yt(t,n))return;pc.set(n),i.uniformMatrix3fv(this.addr,!1,pc),St(t,n)}}function _p(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(yt(t,n))return;hc.set(n),i.uniformMatrix4fv(this.addr,!1,hc),St(t,n)}}function vp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Sp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function wp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(uc.compareFunction=qc,s=uc):s=al,t.setTexture2D(e||s,r)}function Rp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cl,r)}function Cp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ll,r)}function Pp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ol,r)}function Dp(i){switch(i){case 5126:return fp;case 35664:return hp;case 35665:return pp;case 35666:return mp;case 35674:return xp;case 35675:return gp;case 35676:return _p;case 5124:case 35670:return vp;case 35667:case 35671:return bp;case 35668:case 35672:return Mp;case 35669:case 35673:return yp;case 5125:return Sp;case 36294:return Ep;case 36295:return Tp;case 36296:return Ap;case 35678:case 36198:case 36298:case 36306:case 35682:return wp;case 35679:case 36299:case 36307:return Rp;case 35680:case 36300:case 36308:case 36293:return Cp;case 36289:case 36303:case 36311:case 36292:return Pp}}function Lp(i,e){i.uniform1fv(this.addr,e)}function Ip(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function Up(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function Fp(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Np(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Op(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Bp(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function zp(i,e){i.uniform1iv(this.addr,e)}function kp(i,e){i.uniform2iv(this.addr,e)}function Vp(i,e){i.uniform3iv(this.addr,e)}function Gp(i,e){i.uniform4iv(this.addr,e)}function Hp(i,e){i.uniform1uiv(this.addr,e)}function Wp(i,e){i.uniform2uiv(this.addr,e)}function Xp(i,e){i.uniform3uiv(this.addr,e)}function qp(i,e){i.uniform4uiv(this.addr,e)}function $p(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||al,s[a])}function Yp(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||cl,s[a])}function jp(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ll,s[a])}function Kp(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ol,s[a])}function Zp(i){switch(i){case 5126:return Lp;case 35664:return Ip;case 35665:return Up;case 35666:return Fp;case 35674:return Np;case 35675:return Op;case 35676:return Bp;case 5124:case 35670:return zp;case 35667:case 35671:return kp;case 35668:case 35672:return Vp;case 35669:case 35673:return Gp;case 5125:return Hp;case 36294:return Wp;case 36295:return Xp;case 36296:return qp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return Kp}}class Jp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Dp(t.type)}}class Qp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zp(t.type)}}class e0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function xc(i,e){i.seq.push(e),i.map[e.id]=e}function t0(i,e,t){const n=i.name,r=n.length;for(ea.lastIndex=0;;){const s=ea.exec(n),a=ea.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){xc(t,l===void 0?new Jp(o,i,e):new Qp(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new e0(o),xc(t,d)),t=d}}}class Jr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);t0(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function gc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const n0=37297;let i0=0;function r0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const _c=new Ve;function s0(i){tt._getMatrix(_c,tt.workingColorSpace,i);const e=`mat3( ${_c.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case ts:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+r0(i.getShaderSource(e),o)}else return s}function a0(i,e){const t=s0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function o0(i,e){let t;switch(e){case au:t="Linear";break;case ou:t="Reinhard";break;case cu:t="Cineon";break;case Nc:t="ACESFilmic";break;case uu:t="AgX";break;case du:t="Neutral";break;case lu:t="Custom";break;default:ke("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $r=new V;function c0(){tt.getLuminanceCoefficients($r);const i=$r.x.toFixed(4),e=$r.y.toFixed(4),t=$r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function l0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function u0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function d0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function bc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const f0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(f0,p0)}const h0=new Map;function p0(i,e){let t=Ge[e];if(t===void 0){const n=h0.get(e);if(n!==void 0)t=Ge[n],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Xa(t)}const m0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(i){return i.replace(m0,x0)}function x0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function g0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function _0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Wi:e="ENVMAP_TYPE_CUBE";break;case cs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function v0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Wi:e="ENVMAP_MODE_REFRACTION";break}return e}function b0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fc:e="ENVMAP_BLENDING_MULTIPLY";break;case ru:e="ENVMAP_BLENDING_MIX";break;case su:e="ENVMAP_BLENDING_ADD";break}return e}function M0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function y0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=g0(t),l=_0(t),u=v0(t),d=b0(t),h=M0(t),p=l0(t),M=u0(s),E=r.createProgram();let m,f,D=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(lr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(lr).join(`
`),f.length>0&&(f+=`
`)):(m=[Sc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),f=[Sc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Zn?o0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,a0("linearToOutputTexel",t.outputColorSpace),c0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=Xa(a),a=bc(a,t),a=Mc(a,t),o=Xa(o),o=bc(o,t),o=Mc(o,t),a=yc(a),o=yc(o),t.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Po?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Po?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const C=D+m+a,L=D+f+o,w=gc(r,r.VERTEX_SHADER,C),b=gc(r,r.FRAGMENT_SHADER,L);r.attachShader(E,w),r.attachShader(E,b),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function R(A){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(E)||"",I=r.getShaderInfoLog(w)||"",G=r.getShaderInfoLog(b)||"",X=B.trim(),$=I.trim(),ie=G.trim();let q=!0,te=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,E,w,b);else{const K=vc(r,w,"vertex"),fe=vc(r,b,"fragment");gt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+X+`
`+K+`
`+fe)}else X!==""?ke("WebGLProgram: Program Info Log:",X):($===""||ie==="")&&(te=!1);te&&(A.diagnostics={runnable:q,programLog:X,vertexShader:{log:$,prefix:m},fragmentShader:{log:ie,prefix:f}})}r.deleteShader(w),r.deleteShader(b),F=new Jr(r,E),g=d0(r,E)}let F;this.getUniforms=function(){return F===void 0&&R(this),F};let g;this.getAttributes=function(){return g===void 0&&R(this),g};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(E,n0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=i0++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=w,this.fragmentShader=b,this}let S0=0;class E0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new T0(e),t.set(e,n)),n}}class T0{constructor(e){this.id=S0++,this.code=e,this.usedTimes=0}}function A0(i,e,t,n,r,s,a){const o=new co,c=new E0,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(g){return l.add(g),g===0?"uv":`uv${g}`}function m(g,v,A,B,I){const G=B.fog,X=I.geometry,$=g.isMeshStandardMaterial?B.environment:null,ie=(g.isMeshStandardMaterial?t:e).get(g.envMap||$),q=ie&&ie.mapping===cs?ie.image.height:null,te=M[g.type];g.precision!==null&&(p=r.getMaxPrecision(g.precision),p!==g.precision&&ke("WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));const K=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=K!==void 0?K.length:0;let Se=0;X.morphAttributes.position!==void 0&&(Se=1),X.morphAttributes.normal!==void 0&&(Se=2),X.morphAttributes.color!==void 0&&(Se=3);let Ce,Ie,Qe,J;if(te){const Ye=pn[te];Ce=Ye.vertexShader,Ie=Ye.fragmentShader}else Ce=g.vertexShader,Ie=g.fragmentShader,c.update(g),Qe=c.getVertexShaderID(g),J=c.getFragmentShaderID(g);const oe=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),ze=I.isInstancedMesh===!0,Ae=I.isBatchedMesh===!0,He=!!g.map,vt=!!g.matcap,We=!!ie,at=!!g.aoMap,N=!!g.lightMap,Xe=!!g.bumpMap,qe=!!g.normalMap,nt=!!g.displacementMap,Me=!!g.emissiveMap,ct=!!g.metalnessMap,we=!!g.roughnessMap,Ne=g.anisotropy>0,P=g.clearcoat>0,y=g.dispersion>0,W=g.iridescence>0,ne=g.sheen>0,ae=g.transmission>0,Y=Ne&&!!g.anisotropyMap,Ee=P&&!!g.clearcoatMap,ge=P&&!!g.clearcoatNormalMap,Re=P&&!!g.clearcoatRoughnessMap,Te=W&&!!g.iridescenceMap,le=W&&!!g.iridescenceThicknessMap,Z=ne&&!!g.sheenColorMap,Ue=ne&&!!g.sheenRoughnessMap,Pe=!!g.specularMap,ve=!!g.specularColorMap,Fe=!!g.specularIntensityMap,O=ae&&!!g.transmissionMap,xe=ae&&!!g.thicknessMap,he=!!g.gradientMap,de=!!g.alphaMap,ue=g.alphaTest>0,Q=!!g.alphaHash,pe=!!g.extensions;let De=Zn;g.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(De=i.toneMapping);const $e={shaderID:te,shaderType:g.type,shaderName:g.name,vertexShader:Ce,fragmentShader:Ie,defines:g.defines,customVertexShaderID:Qe,customFragmentShaderID:J,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:Ae,batchingColor:Ae&&I._colorsTexture!==null,instancing:ze,instancingColor:ze&&I.instanceColor!==null,instancingMorph:ze&&I.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Xi,alphaToCoverage:!!g.alphaToCoverage,map:He,matcap:vt,envMap:We,envMapMode:We&&ie.mapping,envMapCubeUVHeight:q,aoMap:at,lightMap:N,bumpMap:Xe,normalMap:qe,displacementMap:h&&nt,emissiveMap:Me,normalMapObjectSpace:qe&&g.normalMapType===mu,normalMapTangentSpace:qe&&g.normalMapType===Xc,metalnessMap:ct,roughnessMap:we,anisotropy:Ne,anisotropyMap:Y,clearcoat:P,clearcoatMap:Ee,clearcoatNormalMap:ge,clearcoatRoughnessMap:Re,dispersion:y,iridescence:W,iridescenceMap:Te,iridescenceThicknessMap:le,sheen:ne,sheenColorMap:Z,sheenRoughnessMap:Ue,specularMap:Pe,specularColorMap:ve,specularIntensityMap:Fe,transmission:ae,transmissionMap:O,thicknessMap:xe,gradientMap:he,opaque:g.transparent===!1&&g.blending===zi&&g.alphaToCoverage===!1,alphaMap:de,alphaTest:ue,alphaHash:Q,combine:g.combine,mapUv:He&&E(g.map.channel),aoMapUv:at&&E(g.aoMap.channel),lightMapUv:N&&E(g.lightMap.channel),bumpMapUv:Xe&&E(g.bumpMap.channel),normalMapUv:qe&&E(g.normalMap.channel),displacementMapUv:nt&&E(g.displacementMap.channel),emissiveMapUv:Me&&E(g.emissiveMap.channel),metalnessMapUv:ct&&E(g.metalnessMap.channel),roughnessMapUv:we&&E(g.roughnessMap.channel),anisotropyMapUv:Y&&E(g.anisotropyMap.channel),clearcoatMapUv:Ee&&E(g.clearcoatMap.channel),clearcoatNormalMapUv:ge&&E(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&E(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&E(g.iridescenceMap.channel),iridescenceThicknessMapUv:le&&E(g.iridescenceThicknessMap.channel),sheenColorMapUv:Z&&E(g.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&E(g.sheenRoughnessMap.channel),specularMapUv:Pe&&E(g.specularMap.channel),specularColorMapUv:ve&&E(g.specularColorMap.channel),specularIntensityMapUv:Fe&&E(g.specularIntensityMap.channel),transmissionMapUv:O&&E(g.transmissionMap.channel),thicknessMapUv:xe&&E(g.thicknessMap.channel),alphaMapUv:de&&E(g.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(qe||Ne),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!X.attributes.uv&&(He||de),fog:!!G,useFog:g.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:g.flatShading===!0&&g.wireframe===!1,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:I.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Se,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:He&&g.map.isVideoTexture===!0&&tt.getTransfer(g.map.colorSpace)===rt,decodeVideoTextureEmissive:Me&&g.emissiveMap.isVideoTexture===!0&&tt.getTransfer(g.emissiveMap.colorSpace)===rt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===mn,flipSided:g.side===Wt,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:pe&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&g.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return $e.vertexUv1s=l.has(1),$e.vertexUv2s=l.has(2),$e.vertexUv3s=l.has(3),l.clear(),$e}function f(g){const v=[];if(g.shaderID?v.push(g.shaderID):(v.push(g.customVertexShaderID),v.push(g.customFragmentShaderID)),g.defines!==void 0)for(const A in g.defines)v.push(A),v.push(g.defines[A]);return g.isRawShaderMaterial===!1&&(D(v,g),C(v,g),v.push(i.outputColorSpace)),v.push(g.customProgramCacheKey),v.join()}function D(g,v){g.push(v.precision),g.push(v.outputColorSpace),g.push(v.envMapMode),g.push(v.envMapCubeUVHeight),g.push(v.mapUv),g.push(v.alphaMapUv),g.push(v.lightMapUv),g.push(v.aoMapUv),g.push(v.bumpMapUv),g.push(v.normalMapUv),g.push(v.displacementMapUv),g.push(v.emissiveMapUv),g.push(v.metalnessMapUv),g.push(v.roughnessMapUv),g.push(v.anisotropyMapUv),g.push(v.clearcoatMapUv),g.push(v.clearcoatNormalMapUv),g.push(v.clearcoatRoughnessMapUv),g.push(v.iridescenceMapUv),g.push(v.iridescenceThicknessMapUv),g.push(v.sheenColorMapUv),g.push(v.sheenRoughnessMapUv),g.push(v.specularMapUv),g.push(v.specularColorMapUv),g.push(v.specularIntensityMapUv),g.push(v.transmissionMapUv),g.push(v.thicknessMapUv),g.push(v.combine),g.push(v.fogExp2),g.push(v.sizeAttenuation),g.push(v.morphTargetsCount),g.push(v.morphAttributeCount),g.push(v.numDirLights),g.push(v.numPointLights),g.push(v.numSpotLights),g.push(v.numSpotLightMaps),g.push(v.numHemiLights),g.push(v.numRectAreaLights),g.push(v.numDirLightShadows),g.push(v.numPointLightShadows),g.push(v.numSpotLightShadows),g.push(v.numSpotLightShadowsWithMaps),g.push(v.numLightProbes),g.push(v.shadowMapType),g.push(v.toneMapping),g.push(v.numClippingPlanes),g.push(v.numClipIntersection),g.push(v.depthPacking)}function C(g,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),v.gradientMap&&o.enable(22),g.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),g.push(o.mask)}function L(g){const v=M[g.type];let A;if(v){const B=pn[v];A=Wu.clone(B.uniforms)}else A=g.uniforms;return A}function w(g,v){let A;for(let B=0,I=u.length;B<I;B++){const G=u[B];if(G.cacheKey===v){A=G,++A.usedTimes;break}}return A===void 0&&(A=new y0(i,v,g,s),u.push(A)),A}function b(g){if(--g.usedTimes===0){const v=u.indexOf(g);u[v]=u[u.length-1],u.pop(),g.destroy()}}function R(g){c.remove(g)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:L,acquireProgram:w,releaseProgram:b,releaseShaderCache:R,programs:u,dispose:F}}function w0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function R0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ec(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Tc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,h,p,M,E,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:M,renderOrder:d.renderOrder,z:E,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=M,f.renderOrder=d.renderOrder,f.z=E,f.group=m),e++,f}function o(d,h,p,M,E,m){const f=a(d,h,p,M,E,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,M,E,m){const f=a(d,h,p,M,E,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||R0),n.length>1&&n.sort(h||Ec),r.length>1&&r.sort(h||Ec)}function u(){for(let d=e,h=i.length;d<h;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function C0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Tc,i.set(n,[a])):r>=s.length?(a=new Tc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function P0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Ke};break;case"SpotLight":t={position:new V,direction:new V,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function D0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let L0=0;function I0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function U0(i){const e=new P0,t=D0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const r=new V,s=new ut,a=new ut;function o(l){let u=0,d=0,h=0;for(let g=0;g<9;g++)n.probe[g].set(0,0,0);let p=0,M=0,E=0,m=0,f=0,D=0,C=0,L=0,w=0,b=0,R=0;l.sort(I0);for(let g=0,v=l.length;g<v;g++){const A=l[g],B=A.color,I=A.intensity,G=A.distance,X=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=B.r*I,d+=B.g*I,h+=B.b*I;else if(A.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(A.sh.coefficients[$],I);R++}else if(A.isDirectionalLight){const $=e.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const ie=A.shadow,q=t.get(A);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=A.shadow.matrix,D++}n.directional[p]=$,p++}else if(A.isSpotLight){const $=e.get(A);$.position.setFromMatrixPosition(A.matrixWorld),$.color.copy(B).multiplyScalar(I),$.distance=G,$.coneCos=Math.cos(A.angle),$.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),$.decay=A.decay,n.spot[E]=$;const ie=A.shadow;if(A.map&&(n.spotLightMap[w]=A.map,w++,ie.updateMatrices(A),A.castShadow&&b++),n.spotLightMatrix[E]=ie.matrix,A.castShadow){const q=t.get(A);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,n.spotShadow[E]=q,n.spotShadowMap[E]=X,L++}E++}else if(A.isRectAreaLight){const $=e.get(A);$.color.copy(B).multiplyScalar(I),$.halfWidth.set(A.width*.5,0,0),$.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=$,m++}else if(A.isPointLight){const $=e.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),$.distance=A.distance,$.decay=A.decay,A.castShadow){const ie=A.shadow,q=t.get(A);q.shadowIntensity=ie.intensity,q.shadowBias=ie.bias,q.shadowNormalBias=ie.normalBias,q.shadowRadius=ie.radius,q.shadowMapSize=ie.mapSize,q.shadowCameraNear=ie.camera.near,q.shadowCameraFar=ie.camera.far,n.pointShadow[M]=q,n.pointShadowMap[M]=X,n.pointShadowMatrix[M]=A.shadow.matrix,C++}n.point[M]=$,M++}else if(A.isHemisphereLight){const $=e.get(A);$.skyColor.copy(A.color).multiplyScalar(I),$.groundColor.copy(A.groundColor).multiplyScalar(I),n.hemi[f]=$,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const F=n.hash;(F.directionalLength!==p||F.pointLength!==M||F.spotLength!==E||F.rectAreaLength!==m||F.hemiLength!==f||F.numDirectionalShadows!==D||F.numPointShadows!==C||F.numSpotShadows!==L||F.numSpotMaps!==w||F.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=E,n.rectArea.length=m,n.point.length=M,n.hemi.length=f,n.directionalShadow.length=D,n.directionalShadowMap.length=D,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=L,n.spotShadowMap.length=L,n.directionalShadowMatrix.length=D,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=L+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,F.directionalLength=p,F.pointLength=M,F.spotLength=E,F.rectAreaLength=m,F.hemiLength=f,F.numDirectionalShadows=D,F.numPointShadows=C,F.numSpotShadows=L,F.numSpotMaps=w,F.numLightProbes=R,n.version=L0++)}function c(l,u){let d=0,h=0,p=0,M=0,E=0;const m=u.matrixWorldInverse;for(let f=0,D=l.length;f<D;f++){const C=l[f];if(C.isDirectionalLight){const L=n.directional[d];L.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(m),d++}else if(C.isSpotLight){const L=n.spot[p];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(m),L.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(m),p++}else if(C.isRectAreaLight){const L=n.rectArea[M];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(m),a.identity(),s.copy(C.matrixWorld),s.premultiply(m),a.extractRotation(s),L.halfWidth.set(C.width*.5,0,0),L.halfHeight.set(0,C.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),M++}else if(C.isPointLight){const L=n.point[h];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(m),h++}else if(C.isHemisphereLight){const L=n.hemi[E];L.direction.setFromMatrixPosition(C.matrixWorld),L.direction.transformDirection(m),E++}}}return{setup:o,setupView:c,state:n}}function Ac(i){const e=new U0(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function F0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ac(i),e.set(r,[o])):s>=a.length?(o=new Ac(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const N0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function B0(i,e,t){let n=new uo;const r=new Je,s=new Je,a=new st,o=new nd({depthPacking:pu}),c=new id,l={},u=t.maxTextureSize,d={[Qn]:Wt,[Wt]:Qn,[mn]:mn},h=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:N0,fragmentShader:O0}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const M=new Ut;M.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new en(M,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ic;let f=this.type;this.render=function(b,R,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const g=i.getRenderTarget(),v=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),B=i.state;B.setBlending(In),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const I=f!==Rn&&this.type===Rn,G=f===Rn&&this.type!==Rn;for(let X=0,$=b.length;X<$;X++){const ie=b[X],q=ie.shadow;if(q===void 0){ke("WebGLShadowMap:",ie,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const te=q.getFrameExtents();if(r.multiply(te),s.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,q.mapSize.y=s.y)),q.map===null||I===!0||G===!0){const fe=this.type!==Rn?{minFilter:Kt,magFilter:Kt}:{};q.map!==null&&q.map.dispose(),q.map=new xi(r.x,r.y,fe),q.map.texture.name=ie.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const K=q.getViewportCount();for(let fe=0;fe<K;fe++){const Se=q.getViewport(fe);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),B.viewport(a),q.updateMatrices(ie,fe),n=q.getFrustum(),L(R,F,q.camera,ie,this.type)}q.isPointLightShadow!==!0&&this.type===Rn&&D(q,F),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(g,v,A)};function D(b,R){const F=e.update(E);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new xi(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,F,h,E,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,F,p,E,null)}function C(b,R,F,g){let v=null;const A=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)v=A;else if(v=F.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=v.uuid,I=R.uuid;let G=l[B];G===void 0&&(G={},l[B]=G);let X=G[I];X===void 0&&(X=v.clone(),G[I]=X,R.addEventListener("dispose",w)),v=X}if(v.visible=R.visible,v.wireframe=R.wireframe,g===Rn?v.side=R.shadowSide!==null?R.shadowSide:R.side:v.side=R.shadowSide!==null?R.shadowSide:d[R.side],v.alphaMap=R.alphaMap,v.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,v.map=R.map,v.clipShadows=R.clipShadows,v.clippingPlanes=R.clippingPlanes,v.clipIntersection=R.clipIntersection,v.displacementMap=R.displacementMap,v.displacementScale=R.displacementScale,v.displacementBias=R.displacementBias,v.wireframeLinewidth=R.wireframeLinewidth,v.linewidth=R.linewidth,F.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const B=i.properties.get(v);B.light=F}return v}function L(b,R,F,g,v){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&v===Rn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);const I=e.update(b),G=b.material;if(Array.isArray(G)){const X=I.groups;for(let $=0,ie=X.length;$<ie;$++){const q=X[$],te=G[q.materialIndex];if(te&&te.visible){const K=C(b,te,g,v);b.onBeforeShadow(i,b,R,F,I,K,q),i.renderBufferDirect(F,null,I,K,b,q),b.onAfterShadow(i,b,R,F,I,K,q)}}}else if(G.visible){const X=C(b,G,g,v);b.onBeforeShadow(i,b,R,F,I,X,null),i.renderBufferDirect(F,null,I,X,b,null),b.onAfterShadow(i,b,R,F,I,X,null)}}const B=b.children;for(let I=0,G=B.length;I<G;I++)L(B[I],R,F,g,v)}function w(b){b.target.removeEventListener("dispose",w);for(const F in l){const g=l[F],v=b.target.uuid;v in g&&(g[v].dispose(),delete g[v])}}}const z0={[sa]:aa,[oa]:ua,[ca]:da,[Gi]:la,[aa]:sa,[ua]:oa,[da]:ca,[la]:Gi};function k0(i,e){function t(){let O=!1;const xe=new st;let he=null;const de=new st(0,0,0,0);return{setMask:function(ue){he!==ue&&!O&&(i.colorMask(ue,ue,ue,ue),he=ue)},setLocked:function(ue){O=ue},setClear:function(ue,Q,pe,De,$e){$e===!0&&(ue*=De,Q*=De,pe*=De),xe.set(ue,Q,pe,De),de.equals(xe)===!1&&(i.clearColor(ue,Q,pe,De),de.copy(xe))},reset:function(){O=!1,he=null,de.set(-1,0,0,0)}}}function n(){let O=!1,xe=!1,he=null,de=null,ue=null;return{setReversed:function(Q){if(xe!==Q){const pe=e.get("EXT_clip_control");Q?pe.clipControlEXT(pe.LOWER_LEFT_EXT,pe.ZERO_TO_ONE_EXT):pe.clipControlEXT(pe.LOWER_LEFT_EXT,pe.NEGATIVE_ONE_TO_ONE_EXT),xe=Q;const De=ue;ue=null,this.setClear(De)}},getReversed:function(){return xe},setTest:function(Q){Q?oe(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(Q){he!==Q&&!O&&(i.depthMask(Q),he=Q)},setFunc:function(Q){if(xe&&(Q=z0[Q]),de!==Q){switch(Q){case sa:i.depthFunc(i.NEVER);break;case aa:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case ca:i.depthFunc(i.EQUAL);break;case la:i.depthFunc(i.GEQUAL);break;case ua:i.depthFunc(i.GREATER);break;case da:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Q}},setLocked:function(Q){O=Q},setClear:function(Q){ue!==Q&&(xe&&(Q=1-Q),i.clearDepth(Q),ue=Q)},reset:function(){O=!1,he=null,de=null,ue=null,xe=!1}}}function r(){let O=!1,xe=null,he=null,de=null,ue=null,Q=null,pe=null,De=null,$e=null;return{setTest:function(Ye){O||(Ye?oe(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(Ye){xe!==Ye&&!O&&(i.stencilMask(Ye),xe=Ye)},setFunc:function(Ye,Et,At){(he!==Ye||de!==Et||ue!==At)&&(i.stencilFunc(Ye,Et,At),he=Ye,de=Et,ue=At)},setOp:function(Ye,Et,At){(Q!==Ye||pe!==Et||De!==At)&&(i.stencilOp(Ye,Et,At),Q=Ye,pe=Et,De=At)},setLocked:function(Ye){O=Ye},setClear:function(Ye){$e!==Ye&&(i.clearStencil(Ye),$e=Ye)},reset:function(){O=!1,xe=null,he=null,de=null,ue=null,Q=null,pe=null,De=null,$e=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],M=null,E=!1,m=null,f=null,D=null,C=null,L=null,w=null,b=null,R=new Ke(0,0,0),F=0,g=!1,v=null,A=null,B=null,I=null,G=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ie=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ie>=2);let te=null,K={};const fe=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Ce=new st().fromArray(fe),Ie=new st().fromArray(Se);function Qe(O,xe,he,de){const ue=new Uint8Array(4),Q=i.createTexture();i.bindTexture(O,Q),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let pe=0;pe<he;pe++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(xe+pe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return Q}const J={};J[i.TEXTURE_2D]=Qe(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(i.DEPTH_TEST),a.setFunc(Gi),Xe(!1),qe(Eo),oe(i.CULL_FACE),at(In);function oe(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function ye(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function ze(O,xe){return d[O]!==xe?(i.bindFramebuffer(O,xe),d[O]=xe,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=xe),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ae(O,xe){let he=p,de=!1;if(O){he=h.get(xe),he===void 0&&(he=[],h.set(xe,he));const ue=O.textures;if(he.length!==ue.length||he[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,pe=ue.length;Q<pe;Q++)he[Q]=i.COLOR_ATTACHMENT0+Q;he.length=ue.length,de=!0}}else he[0]!==i.BACK&&(he[0]=i.BACK,de=!0);de&&i.drawBuffers(he)}function He(O){return M!==O?(i.useProgram(O),M=O,!0):!1}const vt={[di]:i.FUNC_ADD,[Vl]:i.FUNC_SUBTRACT,[Gl]:i.FUNC_REVERSE_SUBTRACT};vt[Hl]=i.MIN,vt[Wl]=i.MAX;const We={[Xl]:i.ZERO,[ql]:i.ONE,[$l]:i.SRC_COLOR,[ia]:i.SRC_ALPHA,[Ql]:i.SRC_ALPHA_SATURATE,[Zl]:i.DST_COLOR,[jl]:i.DST_ALPHA,[Yl]:i.ONE_MINUS_SRC_COLOR,[ra]:i.ONE_MINUS_SRC_ALPHA,[Jl]:i.ONE_MINUS_DST_COLOR,[Kl]:i.ONE_MINUS_DST_ALPHA,[eu]:i.CONSTANT_COLOR,[tu]:i.ONE_MINUS_CONSTANT_COLOR,[nu]:i.CONSTANT_ALPHA,[iu]:i.ONE_MINUS_CONSTANT_ALPHA};function at(O,xe,he,de,ue,Q,pe,De,$e,Ye){if(O===In){E===!0&&(ye(i.BLEND),E=!1);return}if(E===!1&&(oe(i.BLEND),E=!0),O!==kl){if(O!==m||Ye!==g){if((f!==di||L!==di)&&(i.blendEquation(i.FUNC_ADD),f=di,L=di),Ye)switch(O){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case To:i.blendFunc(i.ONE,i.ONE);break;case Ao:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:gt("WebGLState: Invalid blending: ",O);break}else switch(O){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case To:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ao:gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wo:gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:gt("WebGLState: Invalid blending: ",O);break}D=null,C=null,w=null,b=null,R.set(0,0,0),F=0,m=O,g=Ye}return}ue=ue||xe,Q=Q||he,pe=pe||de,(xe!==f||ue!==L)&&(i.blendEquationSeparate(vt[xe],vt[ue]),f=xe,L=ue),(he!==D||de!==C||Q!==w||pe!==b)&&(i.blendFuncSeparate(We[he],We[de],We[Q],We[pe]),D=he,C=de,w=Q,b=pe),(De.equals(R)===!1||$e!==F)&&(i.blendColor(De.r,De.g,De.b,$e),R.copy(De),F=$e),m=O,g=!1}function N(O,xe){O.side===mn?ye(i.CULL_FACE):oe(i.CULL_FACE);let he=O.side===Wt;xe&&(he=!he),Xe(he),O.blending===zi&&O.transparent===!1?at(In):at(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);const de=O.stencilWrite;o.setTest(de),de&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Me(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(O){v!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),v=O)}function qe(O){O!==Bl?(oe(i.CULL_FACE),O!==A&&(O===Eo?i.cullFace(i.BACK):O===zl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),A=O}function nt(O){O!==B&&($&&i.lineWidth(O),B=O)}function Me(O,xe,he){O?(oe(i.POLYGON_OFFSET_FILL),(I!==xe||G!==he)&&(i.polygonOffset(xe,he),I=xe,G=he)):ye(i.POLYGON_OFFSET_FILL)}function ct(O){O?oe(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function we(O){O===void 0&&(O=i.TEXTURE0+X-1),te!==O&&(i.activeTexture(O),te=O)}function Ne(O,xe,he){he===void 0&&(te===null?he=i.TEXTURE0+X-1:he=te);let de=K[he];de===void 0&&(de={type:void 0,texture:void 0},K[he]=de),(de.type!==O||de.texture!==xe)&&(te!==he&&(i.activeTexture(he),te=he),i.bindTexture(O,xe||J[O]),de.type=O,de.texture=xe)}function P(){const O=K[te];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function ne(){try{i.texSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function ae(){try{i.texSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Ee(){try{i.compressedTexSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function ge(){try{i.texStorage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Re(){try{i.texStorage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Te(){try{i.texImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function le(){try{i.texImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Z(O){Ce.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ce.copy(O))}function Ue(O){Ie.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ie.copy(O))}function Pe(O,xe){let he=l.get(xe);he===void 0&&(he=new WeakMap,l.set(xe,he));let de=he.get(O);de===void 0&&(de=i.getUniformBlockIndex(xe,O.name),he.set(O,de))}function ve(O,xe){const de=l.get(xe).get(O);c.get(xe)!==de&&(i.uniformBlockBinding(xe,de,O.__bindingPointIndex),c.set(xe,de))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},te=null,K={},d={},h=new WeakMap,p=[],M=null,E=!1,m=null,f=null,D=null,C=null,L=null,w=null,b=null,R=new Ke(0,0,0),F=0,g=!1,v=null,A=null,B=null,I=null,G=null,Ce.set(0,0,i.canvas.width,i.canvas.height),Ie.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:oe,disable:ye,bindFramebuffer:ze,drawBuffers:Ae,useProgram:He,setBlending:at,setMaterial:N,setFlipSided:Xe,setCullFace:qe,setLineWidth:nt,setPolygonOffset:Me,setScissorTest:ct,activeTexture:we,bindTexture:Ne,unbindTexture:P,compressedTexImage2D:y,compressedTexImage3D:W,texImage2D:Te,texImage3D:le,updateUBOMapping:Pe,uniformBlockBinding:ve,texStorage2D:ge,texStorage3D:Re,texSubImage2D:ne,texSubImage3D:ae,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ee,scissor:Z,viewport:Ue,reset:Fe}}function V0(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Je,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,y){return p?new OffscreenCanvas(P,y):is("canvas")}function E(P,y,W){let ne=1;const ae=Ne(P);if((ae.width>W||ae.height>W)&&(ne=W/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Y=Math.floor(ne*ae.width),Ee=Math.floor(ne*ae.height);d===void 0&&(d=M(Y,Ee));const ge=y?M(Y,Ee):d;return ge.width=Y,ge.height=Ee,ge.getContext("2d").drawImage(P,0,0,Y,Ee),ke("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Y+"x"+Ee+")."),ge}else return"data"in P&&ke("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function m(P){return P.generateMipmaps}function f(P){i.generateMipmap(P)}function D(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(P,y,W,ne,ae=!1){if(P!==null){if(i[P]!==void 0)return i[P];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Y=y;if(y===i.RED&&(W===i.FLOAT&&(Y=i.R32F),W===i.HALF_FLOAT&&(Y=i.R16F),W===i.UNSIGNED_BYTE&&(Y=i.R8)),y===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(Y=i.R8UI),W===i.UNSIGNED_SHORT&&(Y=i.R16UI),W===i.UNSIGNED_INT&&(Y=i.R32UI),W===i.BYTE&&(Y=i.R8I),W===i.SHORT&&(Y=i.R16I),W===i.INT&&(Y=i.R32I)),y===i.RG&&(W===i.FLOAT&&(Y=i.RG32F),W===i.HALF_FLOAT&&(Y=i.RG16F),W===i.UNSIGNED_BYTE&&(Y=i.RG8)),y===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(Y=i.RG8UI),W===i.UNSIGNED_SHORT&&(Y=i.RG16UI),W===i.UNSIGNED_INT&&(Y=i.RG32UI),W===i.BYTE&&(Y=i.RG8I),W===i.SHORT&&(Y=i.RG16I),W===i.INT&&(Y=i.RG32I)),y===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),W===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),W===i.UNSIGNED_INT&&(Y=i.RGB32UI),W===i.BYTE&&(Y=i.RGB8I),W===i.SHORT&&(Y=i.RGB16I),W===i.INT&&(Y=i.RGB32I)),y===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),W===i.UNSIGNED_INT&&(Y=i.RGBA32UI),W===i.BYTE&&(Y=i.RGBA8I),W===i.SHORT&&(Y=i.RGBA16I),W===i.INT&&(Y=i.RGBA32I)),y===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),y===i.RGBA){const Ee=ae?ts:tt.getTransfer(ne);W===i.FLOAT&&(Y=i.RGBA32F),W===i.HALF_FLOAT&&(Y=i.RGBA16F),W===i.UNSIGNED_BYTE&&(Y=Ee===rt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function L(P,y){let W;return P?y===null||y===mi||y===hr?W=i.DEPTH24_STENCIL8:y===Ln?W=i.DEPTH32F_STENCIL8:y===fr&&(W=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===mi||y===hr?W=i.DEPTH_COMPONENT24:y===Ln?W=i.DEPTH_COMPONENT32F:y===fr&&(W=i.DEPTH_COMPONENT16),W}function w(P,y){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Kt&&P.minFilter!==Qt?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function b(P){const y=P.target;y.removeEventListener("dispose",b),F(y),y.isVideoTexture&&u.delete(y)}function R(P){const y=P.target;y.removeEventListener("dispose",R),v(y)}function F(P){const y=n.get(P);if(y.__webglInit===void 0)return;const W=P.source,ne=h.get(W);if(ne){const ae=ne[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&g(P),Object.keys(ne).length===0&&h.delete(W)}n.remove(P)}function g(P){const y=n.get(P);i.deleteTexture(y.__webglTexture);const W=P.source,ne=h.get(W);delete ne[y.__cacheKey],a.memory.textures--}function v(P){const y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(y.__webglFramebuffer[ne]))for(let ae=0;ae<y.__webglFramebuffer[ne].length;ae++)i.deleteFramebuffer(y.__webglFramebuffer[ne][ae]);else i.deleteFramebuffer(y.__webglFramebuffer[ne]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ne])}else{if(Array.isArray(y.__webglFramebuffer))for(let ne=0;ne<y.__webglFramebuffer.length;ne++)i.deleteFramebuffer(y.__webglFramebuffer[ne]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ne=0;ne<y.__webglColorRenderbuffer.length;ne++)y.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ne]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const W=P.textures;for(let ne=0,ae=W.length;ne<ae;ne++){const Y=n.get(W[ne]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(W[ne])}n.remove(P)}let A=0;function B(){A=0}function I(){const P=A;return P>=r.maxTextures&&ke("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),A+=1,P}function G(P){const y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function X(P,y){const W=n.get(P);if(P.isVideoTexture&&ct(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&W.__version!==P.version){const ne=P.image;if(ne===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{J(W,P,y);return}}else P.isExternalTexture&&(W.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+y)}function $(P,y){const W=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){J(W,P,y);return}else P.isExternalTexture&&(W.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+y)}function ie(P,y){const W=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){J(W,P,y);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+y)}function q(P,y){const W=n.get(P);if(P.version>0&&W.__version!==P.version){oe(W,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+y)}const te={[es]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[pa]:i.MIRRORED_REPEAT},K={[Kt]:i.NEAREST,[fu]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[Ms]:i.LINEAR_MIPMAP_NEAREST,[hi]:i.LINEAR_MIPMAP_LINEAR},fe={[xu]:i.NEVER,[yu]:i.ALWAYS,[gu]:i.LESS,[qc]:i.LEQUAL,[_u]:i.EQUAL,[Mu]:i.GEQUAL,[vu]:i.GREATER,[bu]:i.NOTEQUAL};function Se(P,y){if(y.type===Ln&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Qt||y.magFilter===Ms||y.magFilter===Ar||y.magFilter===hi||y.minFilter===Qt||y.minFilter===Ms||y.minFilter===Ar||y.minFilter===hi)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,te[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,te[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,te[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,K[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,K[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,fe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Kt||y.minFilter!==Ar&&y.minFilter!==hi||y.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Ce(P,y){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",b));const ne=y.source;let ae=h.get(ne);ae===void 0&&(ae={},h.set(ne,ae));const Y=G(y);if(Y!==P.__cacheKey){ae[Y]===void 0&&(ae[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ae[Y].usedTimes++;const Ee=ae[P.__cacheKey];Ee!==void 0&&(ae[P.__cacheKey].usedTimes--,Ee.usedTimes===0&&g(y)),P.__cacheKey=Y,P.__webglTexture=ae[Y].texture}return W}function Ie(P,y,W){return Math.floor(Math.floor(P/W)/y)}function Qe(P,y,W,ne){const Y=P.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,W,ne,y.data);else{Y.sort((le,Z)=>le.start-Z.start);let Ee=0;for(let le=1;le<Y.length;le++){const Z=Y[Ee],Ue=Y[le],Pe=Z.start+Z.count,ve=Ie(Ue.start,y.width,4),Fe=Ie(Z.start,y.width,4);Ue.start<=Pe+1&&ve===Fe&&Ie(Ue.start+Ue.count-1,y.width,4)===ve?Z.count=Math.max(Z.count,Ue.start+Ue.count-Z.start):(++Ee,Y[Ee]=Ue)}Y.length=Ee+1;const ge=i.getParameter(i.UNPACK_ROW_LENGTH),Re=i.getParameter(i.UNPACK_SKIP_PIXELS),Te=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let le=0,Z=Y.length;le<Z;le++){const Ue=Y[le],Pe=Math.floor(Ue.start/4),ve=Math.ceil(Ue.count/4),Fe=Pe%y.width,O=Math.floor(Pe/y.width),xe=ve,he=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Fe,O,xe,he,W,ne,y.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ge),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Re),i.pixelStorei(i.UNPACK_SKIP_ROWS,Te)}}function J(P,y,W){let ne=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ne=i.TEXTURE_3D);const ae=Ce(P,y),Y=y.source;t.bindTexture(ne,P.__webglTexture,i.TEXTURE0+W);const Ee=n.get(Y);if(Y.version!==Ee.__version||ae===!0){t.activeTexture(i.TEXTURE0+W);const ge=tt.getPrimaries(tt.workingColorSpace),Re=y.colorSpace===$n?null:tt.getPrimaries(y.colorSpace),Te=y.colorSpace===$n||ge===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let le=E(y.image,!1,r.maxTextureSize);le=we(y,le);const Z=s.convert(y.format,y.colorSpace),Ue=s.convert(y.type);let Pe=C(y.internalFormat,Z,Ue,y.colorSpace,y.isVideoTexture);Se(ne,y);let ve;const Fe=y.mipmaps,O=y.isVideoTexture!==!0,xe=Ee.__version===void 0||ae===!0,he=Y.dataReady,de=w(y,le);if(y.isDepthTexture)Pe=L(y.format===mr,y.type),xe&&(O?t.texStorage2D(i.TEXTURE_2D,1,Pe,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Pe,le.width,le.height,0,Z,Ue,null));else if(y.isDataTexture)if(Fe.length>0){O&&xe&&t.texStorage2D(i.TEXTURE_2D,de,Pe,Fe[0].width,Fe[0].height);for(let ue=0,Q=Fe.length;ue<Q;ue++)ve=Fe[ue],O?he&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,Z,Ue,ve.data):t.texImage2D(i.TEXTURE_2D,ue,Pe,ve.width,ve.height,0,Z,Ue,ve.data);y.generateMipmaps=!1}else O?(xe&&t.texStorage2D(i.TEXTURE_2D,de,Pe,le.width,le.height),he&&Qe(y,le,Z,Ue)):t.texImage2D(i.TEXTURE_2D,0,Pe,le.width,le.height,0,Z,Ue,le.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){O&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Pe,Fe[0].width,Fe[0].height,le.depth);for(let ue=0,Q=Fe.length;ue<Q;ue++)if(ve=Fe[ue],y.format!==cn)if(Z!==null)if(O){if(he)if(y.layerUpdates.size>0){const pe=ic(ve.width,ve.height,y.format,y.type);for(const De of y.layerUpdates){const $e=ve.data.subarray(De*pe/ve.data.BYTES_PER_ELEMENT,(De+1)*pe/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,De,ve.width,ve.height,1,Z,$e)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ve.width,ve.height,le.depth,Z,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,Pe,ve.width,ve.height,le.depth,0,ve.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?he&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ve.width,ve.height,le.depth,Z,Ue,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,Pe,ve.width,ve.height,le.depth,0,Z,Ue,ve.data)}else{O&&xe&&t.texStorage2D(i.TEXTURE_2D,de,Pe,Fe[0].width,Fe[0].height);for(let ue=0,Q=Fe.length;ue<Q;ue++)ve=Fe[ue],y.format!==cn?Z!==null?O?he&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,Z,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,Pe,ve.width,ve.height,0,ve.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?he&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,Z,Ue,ve.data):t.texImage2D(i.TEXTURE_2D,ue,Pe,ve.width,ve.height,0,Z,Ue,ve.data)}else if(y.isDataArrayTexture)if(O){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Pe,le.width,le.height,le.depth),he)if(y.layerUpdates.size>0){const ue=ic(le.width,le.height,y.format,y.type);for(const Q of y.layerUpdates){const pe=le.data.subarray(Q*ue/le.data.BYTES_PER_ELEMENT,(Q+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,le.width,le.height,1,Z,Ue,pe)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Z,Ue,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,le.width,le.height,le.depth,0,Z,Ue,le.data);else if(y.isData3DTexture)O?(xe&&t.texStorage3D(i.TEXTURE_3D,de,Pe,le.width,le.height,le.depth),he&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Z,Ue,le.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,le.width,le.height,le.depth,0,Z,Ue,le.data);else if(y.isFramebufferTexture){if(xe)if(O)t.texStorage2D(i.TEXTURE_2D,de,Pe,le.width,le.height);else{let ue=le.width,Q=le.height;for(let pe=0;pe<de;pe++)t.texImage2D(i.TEXTURE_2D,pe,Pe,ue,Q,0,Z,Ue,null),ue>>=1,Q>>=1}}else if(Fe.length>0){if(O&&xe){const ue=Ne(Fe[0]);t.texStorage2D(i.TEXTURE_2D,de,Pe,ue.width,ue.height)}for(let ue=0,Q=Fe.length;ue<Q;ue++)ve=Fe[ue],O?he&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Z,Ue,ve):t.texImage2D(i.TEXTURE_2D,ue,Pe,Z,Ue,ve);y.generateMipmaps=!1}else if(O){if(xe){const ue=Ne(le);t.texStorage2D(i.TEXTURE_2D,de,Pe,ue.width,ue.height)}he&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Z,Ue,le)}else t.texImage2D(i.TEXTURE_2D,0,Pe,Z,Ue,le);m(y)&&f(ne),Ee.__version=Y.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function oe(P,y,W){if(y.image.length!==6)return;const ne=Ce(P,y),ae=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+W);const Y=n.get(ae);if(ae.version!==Y.__version||ne===!0){t.activeTexture(i.TEXTURE0+W);const Ee=tt.getPrimaries(tt.workingColorSpace),ge=y.colorSpace===$n?null:tt.getPrimaries(y.colorSpace),Re=y.colorSpace===$n||Ee===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Te=y.isCompressedTexture||y.image[0].isCompressedTexture,le=y.image[0]&&y.image[0].isDataTexture,Z=[];for(let Q=0;Q<6;Q++)!Te&&!le?Z[Q]=E(y.image[Q],!0,r.maxCubemapSize):Z[Q]=le?y.image[Q].image:y.image[Q],Z[Q]=we(y,Z[Q]);const Ue=Z[0],Pe=s.convert(y.format,y.colorSpace),ve=s.convert(y.type),Fe=C(y.internalFormat,Pe,ve,y.colorSpace),O=y.isVideoTexture!==!0,xe=Y.__version===void 0||ne===!0,he=ae.dataReady;let de=w(y,Ue);Se(i.TEXTURE_CUBE_MAP,y);let ue;if(Te){O&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Fe,Ue.width,Ue.height);for(let Q=0;Q<6;Q++){ue=Z[Q].mipmaps;for(let pe=0;pe<ue.length;pe++){const De=ue[pe];y.format!==cn?Pe!==null?O?he&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,0,0,De.width,De.height,Pe,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,Fe,De.width,De.height,0,De.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,0,0,De.width,De.height,Pe,ve,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,Fe,De.width,De.height,0,Pe,ve,De.data)}}}else{if(ue=y.mipmaps,O&&xe){ue.length>0&&de++;const Q=Ne(Z[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Fe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(le){O?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Z[Q].width,Z[Q].height,Pe,ve,Z[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,Z[Q].width,Z[Q].height,0,Pe,ve,Z[Q].data);for(let pe=0;pe<ue.length;pe++){const $e=ue[pe].image[Q].image;O?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,0,0,$e.width,$e.height,Pe,ve,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,Fe,$e.width,$e.height,0,Pe,ve,$e.data)}}else{O?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,ve,Z[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,Pe,ve,Z[Q]);for(let pe=0;pe<ue.length;pe++){const De=ue[pe];O?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,0,0,Pe,ve,De.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,Fe,Pe,ve,De.image[Q])}}}m(y)&&f(i.TEXTURE_CUBE_MAP),Y.__version=ae.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function ye(P,y,W,ne,ae,Y){const Ee=s.convert(W.format,W.colorSpace),ge=s.convert(W.type),Re=C(W.internalFormat,Ee,ge,W.colorSpace),Te=n.get(y),le=n.get(W);if(le.__renderTarget=y,!Te.__hasExternalTextures){const Z=Math.max(1,y.width>>Y),Ue=Math.max(1,y.height>>Y);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,Y,Re,Z,Ue,y.depth,0,Ee,ge,null):t.texImage2D(ae,Y,Re,Z,Ue,0,Ee,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Me(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ae,le.__webglTexture,0,nt(y)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,ae,le.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(P,y,W){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){const ne=y.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,Y=L(y.stencilBuffer,ae),Ee=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=nt(y);Me(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,Y,y.width,y.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,Y,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Y,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,P)}else{const ne=y.textures;for(let ae=0;ae<ne.length;ae++){const Y=ne[ae],Ee=s.convert(Y.format,Y.colorSpace),ge=s.convert(Y.type),Re=C(Y.internalFormat,Ee,ge,Y.colorSpace),Te=nt(y);W&&Me(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,Re,y.width,y.height):Me(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,Re,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Re,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(P,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(y.depthTexture);ne.__renderTarget=y,(!ne.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const ae=ne.__webglTexture,Y=nt(y);if(y.depthTexture.format===pr)Me(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(y.depthTexture.format===mr)Me(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function He(P){const y=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){const ne=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ne){const ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=ne}if(P.depthTexture&&!y.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const ne=P.texture.mipmaps;ne&&ne.length>0?Ae(y.__webglFramebuffer[0],P):Ae(y.__webglFramebuffer,P)}else if(W){y.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ne]),y.__webglDepthbuffer[ne]===void 0)y.__webglDepthbuffer[ne]=i.createRenderbuffer(),ze(y.__webglDepthbuffer[ne],P,!1);else{const ae=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Y)}}else{const ne=P.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ze(y.__webglDepthbuffer,P,!1);else{const ae=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(P,y,W){const ne=n.get(P);y!==void 0&&ye(ne.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&He(P)}function We(P){const y=P.texture,W=n.get(P),ne=n.get(y);P.addEventListener("dispose",R);const ae=P.textures,Y=P.isWebGLCubeRenderTarget===!0,Ee=ae.length>1;if(Ee||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=y.version,a.memory.textures++),Y){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let Re=0;Re<y.mipmaps.length;Re++)W.__webglFramebuffer[ge][Re]=i.createFramebuffer()}else W.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<y.mipmaps.length;ge++)W.__webglFramebuffer[ge]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let ge=0,Re=ae.length;ge<Re;ge++){const Te=n.get(ae[ge]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Me(P)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ge=0;ge<ae.length;ge++){const Re=ae[ge];W.__webglColorRenderbuffer[ge]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[ge]);const Te=s.convert(Re.format,Re.colorSpace),le=s.convert(Re.type),Z=C(Re.internalFormat,Te,le,Re.colorSpace,P.isXRRenderTarget===!0),Ue=nt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,Z,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,W.__webglColorRenderbuffer[ge])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(W.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),Se(i.TEXTURE_CUBE_MAP,y);for(let ge=0;ge<6;ge++)if(y.mipmaps&&y.mipmaps.length>0)for(let Re=0;Re<y.mipmaps.length;Re++)ye(W.__webglFramebuffer[ge][Re],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Re);else ye(W.__webglFramebuffer[ge],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(y)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ge=0,Re=ae.length;ge<Re;ge++){const Te=ae[ge],le=n.get(Te);let Z=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Z=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,le.__webglTexture),Se(Z,Te),ye(W.__webglFramebuffer,P,Te,i.COLOR_ATTACHMENT0+ge,Z,0),m(Te)&&f(Z)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ge=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,ne.__webglTexture),Se(ge,y),y.mipmaps&&y.mipmaps.length>0)for(let Re=0;Re<y.mipmaps.length;Re++)ye(W.__webglFramebuffer[Re],P,y,i.COLOR_ATTACHMENT0,ge,Re);else ye(W.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,ge,0);m(y)&&f(ge),t.unbindTexture()}P.depthBuffer&&He(P)}function at(P){const y=P.textures;for(let W=0,ne=y.length;W<ne;W++){const ae=y[W];if(m(ae)){const Y=D(P),Ee=n.get(ae).__webglTexture;t.bindTexture(Y,Ee),f(Y),t.unbindTexture()}}}const N=[],Xe=[];function qe(P){if(P.samples>0){if(Me(P)===!1){const y=P.textures,W=P.width,ne=P.height;let ae=i.COLOR_BUFFER_BIT;const Y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(P),ge=y.length>1;if(ge)for(let Te=0;Te<y.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Re=P.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Te=0;Te<y.length;Te++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),ge){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const le=n.get(y[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,W,ne,0,0,W,ne,ae,i.NEAREST),c===!0&&(N.length=0,Xe.length=0,N.push(i.COLOR_ATTACHMENT0+Te),P.depthBuffer&&P.resolveDepthBuffer===!1&&(N.push(Y),Xe.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,N))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let Te=0;Te<y.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const le=n.get(y[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function nt(P){return Math.min(r.maxSamples,P.samples)}function Me(P){const y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ct(P){const y=a.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function we(P,y){const W=P.colorSpace,ne=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Xi&&W!==$n&&(tt.getTransfer(W)===rt?(ne!==cn||ae!==_n)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):gt("WebGLTextures: Unsupported texture color space:",W)),y}function Ne(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=ie,this.setTextureCube=q,this.rebindTextures=vt,this.setupRenderTarget=We,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Me}function G0(i,e){function t(n,r=$n){let s;const a=tt.getTransfer(r);if(n===_n)return i.UNSIGNED_BYTE;if(n===eo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===to)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bc)return i.BYTE;if(n===zc)return i.SHORT;if(n===fr)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===Yi)return i.HALF_FLOAT;if(n===Gc)return i.ALPHA;if(n===Hc)return i.RGB;if(n===cn)return i.RGBA;if(n===pr)return i.DEPTH_COMPONENT;if(n===mr)return i.DEPTH_STENCIL;if(n===Wc)return i.RED;if(n===no)return i.RED_INTEGER;if(n===io)return i.RG;if(n===ro)return i.RG_INTEGER;if(n===so)return i.RGBA_INTEGER;if(n===Yr||n===jr||n===Kr||n===Zr)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Yr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Yr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ma||n===xa||n===ga||n===_a)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===ba||n===Ma)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===va||n===ba)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ma)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ya||n===Sa||n===Ea||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===Pa||n===Da||n===La||n===Ia||n===Ua||n===Fa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ya)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Aa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ca)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Da)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ia)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ua)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fa)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Na||n===Oa||n===Ba)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Na)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ba)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===za||n===ka||n===Va||n===Ga)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===za)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,W0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class X0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new il(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Nn({vertexShader:H0,fragmentShader:W0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new en(new $i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class q0 extends ji{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,M=null;const E=typeof XRWebGLBinding<"u",m=new X0,f={},D=t.getContextAttributes();let C=null,L=null;const w=[],b=[],R=new Je;let F=null;const g=new Ht;g.viewport=new st;const v=new Ht;v.viewport=new st;const A=[g,v],B=new ld;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let oe=w[J];return oe===void 0&&(oe=new Ws,w[J]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(J){let oe=w[J];return oe===void 0&&(oe=new Ws,w[J]=oe),oe.getGripSpace()},this.getHand=function(J){let oe=w[J];return oe===void 0&&(oe=new Ws,w[J]=oe),oe.getHandSpace()};function X(J){const oe=b.indexOf(J.inputSource);if(oe===-1)return;const ye=w[oe];ye!==void 0&&(ye.update(J.inputSource,J.frame,l||a),ye.dispatchEvent({type:J.type,data:J.inputSource}))}function $(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ie);for(let J=0;J<w.length;J++){const oe=b[J];oe!==null&&(b[J]=null,w[J].disconnect(oe))}I=null,G=null,m.reset();for(const J in f)delete f[J];e.setRenderTarget(C),p=null,h=null,d=null,r=null,L=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&E&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ie),D.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(R),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,ze=null,Ae=null;D.depth&&(Ae=D.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=D.stencil?mr:pr,ze=D.stencil?hr:mi);const He={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(He),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),L=new xi(h.textureWidth,h.textureHeight,{format:cn,type:_n,depthTexture:new nl(h.textureWidth,h.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:D.stencil,colorSpace:e.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ye={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ye),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),L=new xi(p.framebufferWidth,p.framebufferHeight,{format:cn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Qe.setContext(r),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(J){for(let oe=0;oe<J.removed.length;oe++){const ye=J.removed[oe],ze=b.indexOf(ye);ze>=0&&(b[ze]=null,w[ze].disconnect(ye))}for(let oe=0;oe<J.added.length;oe++){const ye=J.added[oe];let ze=b.indexOf(ye);if(ze===-1){for(let He=0;He<w.length;He++)if(He>=b.length){b.push(ye),ze=He;break}else if(b[He]===null){b[He]=ye,ze=He;break}if(ze===-1)break}const Ae=w[ze];Ae&&Ae.connect(ye)}}const q=new V,te=new V;function K(J,oe,ye){q.setFromMatrixPosition(oe.matrixWorld),te.setFromMatrixPosition(ye.matrixWorld);const ze=q.distanceTo(te),Ae=oe.projectionMatrix.elements,He=ye.projectionMatrix.elements,vt=Ae[14]/(Ae[10]-1),We=Ae[14]/(Ae[10]+1),at=(Ae[9]+1)/Ae[5],N=(Ae[9]-1)/Ae[5],Xe=(Ae[8]-1)/Ae[0],qe=(He[8]+1)/He[0],nt=vt*Xe,Me=vt*qe,ct=ze/(-Xe+qe),we=ct*-Xe;if(oe.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(we),J.translateZ(ct),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ae[10]===-1)J.projectionMatrix.copy(oe.projectionMatrix),J.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Ne=vt+ct,P=We+ct,y=nt-we,W=Me+(ze-we),ne=at*We/P*Ne,ae=N*We/P*Ne;J.projectionMatrix.makePerspective(y,W,ne,ae,Ne,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function fe(J,oe){oe===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(oe.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let oe=J.near,ye=J.far;m.texture!==null&&(m.depthNear>0&&(oe=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),B.near=v.near=g.near=oe,B.far=v.far=g.far=ye,(I!==B.near||G!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),I=B.near,G=B.far),B.layers.mask=J.layers.mask|6,g.layers.mask=B.layers.mask&3,v.layers.mask=B.layers.mask&5;const ze=J.parent,Ae=B.cameras;fe(B,ze);for(let He=0;He<Ae.length;He++)fe(Ae[He],ze);Ae.length===2?K(B,g,v):B.projectionMatrix.copy(g.projectionMatrix),Se(J,B,ze)};function Se(J,oe,ye){ye===null?J.matrix.copy(oe.matrixWorld):(J.matrix.copy(ye.matrixWorld),J.matrix.invert(),J.matrix.multiply(oe.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(oe.projectionMatrix),J.projectionMatrixInverse.copy(oe.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=rs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(J){c=J,h!==null&&(h.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(J){return f[J]};let Ce=null;function Ie(J,oe){if(u=oe.getViewerPose(l||a),M=oe,u!==null){const ye=u.views;p!==null&&(e.setRenderTargetFramebuffer(L,p.framebuffer),e.setRenderTarget(L));let ze=!1;ye.length!==B.cameras.length&&(B.cameras.length=0,ze=!0);for(let We=0;We<ye.length;We++){const at=ye[We];let N=null;if(p!==null)N=p.getViewport(at);else{const qe=d.getViewSubImage(h,at);N=qe.viewport,We===0&&(e.setRenderTargetTextures(L,qe.colorTexture,qe.depthStencilTexture),e.setRenderTarget(L))}let Xe=A[We];Xe===void 0&&(Xe=new Ht,Xe.layers.enable(We),Xe.viewport=new st,A[We]=Xe),Xe.matrix.fromArray(at.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(at.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(N.x,N.y,N.width,N.height),We===0&&(B.matrix.copy(Xe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ze===!0&&B.cameras.push(Xe)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){d=n.getBinding();const We=d.getDepthInformation(ye[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Ae&&Ae.includes("camera-access")&&E){e.state.unbindTexture(),d=n.getBinding();for(let We=0;We<ye.length;We++){const at=ye[We].camera;if(at){let N=f[at];N||(N=new il,f[at]=N);const Xe=d.getCameraImage(at);N.sourceTexture=Xe}}}}for(let ye=0;ye<w.length;ye++){const ze=b[ye],Ae=w[ye];ze!==null&&Ae!==void 0&&Ae.update(ze,oe,l||a)}Ce&&Ce(J,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),M=null}const Qe=new sl;Qe.setAnimationLoop(Ie),this.setAnimationLoop=function(J){Ce=J},this.dispose=function(){}}}const ui=new vn,$0=new ut;function Y0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Jc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,D,C,L){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,L)):f.isMeshMatcapMaterial?(s(m,f),M(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),E(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,D,C):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Wt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Wt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const D=e.get(f),C=D.envMap,L=D.envMapRotation;C&&(m.envMap.value=C,ui.copy(L),ui.x*=-1,ui.y*=-1,ui.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),m.envMapRotation.value.setFromMatrix4($0.makeRotationFromEuler(ui)),m.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,D,C){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*D,m.scale.value=C*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,D){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Wt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=D.texture,m.transmissionSamplerSize.value.set(D.width,D.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function M(m,f){f.matcap&&(m.matcap.value=f.matcap)}function E(m,f){const D=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(D.matrixWorld),m.nearDistance.value=D.shadow.camera.near,m.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function j0(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(D,C){const L=C.program;n.uniformBlockBinding(D,L)}function l(D,C){let L=r[D.id];L===void 0&&(M(D),L=u(D),r[D.id]=L,D.addEventListener("dispose",m));const w=C.program;n.updateUBOMapping(D,w);const b=e.render.frame;s[D.id]!==b&&(h(D),s[D.id]=b)}function u(D){const C=d();D.__bindingPointIndex=C;const L=i.createBuffer(),w=D.__size,b=D.usage;return i.bindBuffer(i.UNIFORM_BUFFER,L),i.bufferData(i.UNIFORM_BUFFER,w,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,L),L}function d(){for(let D=0;D<o;D++)if(a.indexOf(D)===-1)return a.push(D),D;return gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(D){const C=r[D.id],L=D.uniforms,w=D.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let b=0,R=L.length;b<R;b++){const F=Array.isArray(L[b])?L[b]:[L[b]];for(let g=0,v=F.length;g<v;g++){const A=F[g];if(p(A,b,g,w)===!0){const B=A.__offset,I=Array.isArray(A.value)?A.value:[A.value];let G=0;for(let X=0;X<I.length;X++){const $=I[X],ie=E($);typeof $=="number"||typeof $=="boolean"?(A.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,B+G,A.__data)):$.isMatrix3?(A.__data[0]=$.elements[0],A.__data[1]=$.elements[1],A.__data[2]=$.elements[2],A.__data[3]=0,A.__data[4]=$.elements[3],A.__data[5]=$.elements[4],A.__data[6]=$.elements[5],A.__data[7]=0,A.__data[8]=$.elements[6],A.__data[9]=$.elements[7],A.__data[10]=$.elements[8],A.__data[11]=0):($.toArray(A.__data,G),G+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(D,C,L,w){const b=D.value,R=C+"_"+L;if(w[R]===void 0)return typeof b=="number"||typeof b=="boolean"?w[R]=b:w[R]=b.clone(),!0;{const F=w[R];if(typeof b=="number"||typeof b=="boolean"){if(F!==b)return w[R]=b,!0}else if(F.equals(b)===!1)return F.copy(b),!0}return!1}function M(D){const C=D.uniforms;let L=0;const w=16;for(let R=0,F=C.length;R<F;R++){const g=Array.isArray(C[R])?C[R]:[C[R]];for(let v=0,A=g.length;v<A;v++){const B=g[v],I=Array.isArray(B.value)?B.value:[B.value];for(let G=0,X=I.length;G<X;G++){const $=I[G],ie=E($),q=L%w,te=q%ie.boundary,K=q+te;L+=te,K!==0&&w-K<ie.storage&&(L+=w-K),B.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=L,L+=ie.storage}}}const b=L%w;return b>0&&(L+=w-b),D.__size=L,D.__cache={},this}function E(D){const C={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(C.boundary=4,C.storage=4):D.isVector2?(C.boundary=8,C.storage=8):D.isVector3||D.isColor?(C.boundary=16,C.storage=12):D.isVector4?(C.boundary=16,C.storage=16):D.isMatrix3?(C.boundary=48,C.storage=48):D.isMatrix4?(C.boundary=64,C.storage=64):D.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ke("WebGLRenderer: Unsupported uniform value type.",D),C}function m(D){const C=D.target;C.removeEventListener("dispose",m);const L=a.indexOf(C.__bindingPointIndex);a.splice(L,1),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function f(){for(const D in r)i.deleteBuffer(r[D]);a=[],r={},s={}}return{bind:c,update:l,dispose:f}}const K0=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let wn=null;function Z0(){return wn===null&&(wn=new Zu(K0,32,32,io,Yi),wn.minFilter=Qt,wn.magFilter=Qt,wn.wrapS=Dn,wn.wrapT=Dn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class J0{constructor(e={}){const{canvas:t=Su(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const M=new Set([so,ro,no]),E=new Set([_n,mi,fr,hr,eo,to]),m=new Uint32Array(4),f=new Int32Array(4);let D=null,C=null;const L=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let R=!1;this._outputColorSpace=Ot;let F=0,g=0,v=null,A=-1,B=null;const I=new st,G=new st;let X=null;const $=new Ke(0);let ie=0,q=t.width,te=t.height,K=1,fe=null,Se=null;const Ce=new st(0,0,q,te),Ie=new st(0,0,q,te);let Qe=!1;const J=new uo;let oe=!1,ye=!1;const ze=new ut,Ae=new V,He=new st,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function at(){return v===null?K:1}let N=n;function Xe(T,k){return t.getContext(T,k)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ja}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",Q,!1),t.addEventListener("webglcontextcreationerror",pe,!1),N===null){const k="webgl2";if(N=Xe(k,T),N===null)throw Xe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw T("WebGLRenderer: "+T.message),T}let qe,nt,Me,ct,we,Ne,P,y,W,ne,ae,Y,Ee,ge,Re,Te,le,Z,Ue,Pe,ve,Fe,O,xe;function he(){qe=new ap(N),qe.init(),Fe=new G0(N,qe),nt=new Zh(N,qe,e,Fe),Me=new k0(N,qe),nt.reversedDepthBuffer&&h&&Me.buffers.depth.setReversed(!0),ct=new lp(N),we=new w0,Ne=new V0(N,qe,Me,we,nt,Fe,ct),P=new Qh(b),y=new sp(b),W=new fd(N),O=new jh(N,W),ne=new op(N,W,ct,O),ae=new dp(N,ne,W,ct),Ue=new up(N,nt,Ne),Te=new Jh(we),Y=new A0(b,P,y,qe,nt,O,Te),Ee=new Y0(b,we),ge=new C0,Re=new F0(qe),Z=new Yh(b,P,y,Me,ae,p,c),le=new B0(b,ae,nt),xe=new j0(N,ct,nt,Me),Pe=new Kh(N,qe,ct),ve=new cp(N,qe,ct),ct.programs=Y.programs,b.capabilities=nt,b.extensions=qe,b.properties=we,b.renderLists=ge,b.shadowMap=le,b.state=Me,b.info=ct}he();const de=new q0(b,N);this.xr=de,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=qe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=qe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(q,te,!1))},this.getSize=function(T){return T.set(q,te)},this.setSize=function(T,k,x=!0){if(de.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}q=T,te=k,t.width=Math.floor(T*K),t.height=Math.floor(k*K),x===!0&&(t.style.width=T+"px",t.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(q*K,te*K).floor()},this.setDrawingBufferSize=function(T,k,x){q=T,te=k,K=x,t.width=Math.floor(T*x),t.height=Math.floor(k*x),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Ce)},this.setViewport=function(T,k,x,S){T.isVector4?Ce.set(T.x,T.y,T.z,T.w):Ce.set(T,k,x,S),Me.viewport(I.copy(Ce).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Ie)},this.setScissor=function(T,k,x,S){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,k,x,S),Me.scissor(G.copy(Ie).multiplyScalar(K).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(T){Me.setScissorTest(Qe=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){Se=T},this.getClearColor=function(T){return T.copy(Z.getClearColor())},this.setClearColor=function(){Z.setClearColor(...arguments)},this.getClearAlpha=function(){return Z.getClearAlpha()},this.setClearAlpha=function(){Z.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,x=!0){let S=0;if(T){let _=!1;if(v!==null){const U=v.texture.format;_=M.has(U)}if(_){const U=v.texture.type,z=E.has(U),j=Z.getClearColor(),ee=Z.getClearAlpha(),re=j.r,ce=j.g,me=j.b;z?(m[0]=re,m[1]=ce,m[2]=me,m[3]=ee,N.clearBufferuiv(N.COLOR,0,m)):(f[0]=re,f[1]=ce,f[2]=me,f[3]=ee,N.clearBufferiv(N.COLOR,0,f))}else S|=N.COLOR_BUFFER_BIT}k&&(S|=N.DEPTH_BUFFER_BIT),x&&(S|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(S)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Q,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),Z.dispose(),ge.dispose(),Re.dispose(),we.dispose(),P.dispose(),y.dispose(),ae.dispose(),O.dispose(),xe.dispose(),Y.dispose(),de.dispose(),de.removeEventListener("sessionstart",zt),de.removeEventListener("sessionend",_i),bt.stop()};function ue(T){T.preventDefault(),Lo("WebGLRenderer: Context Lost."),R=!0}function Q(){Lo("WebGLRenderer: Context Restored."),R=!1;const T=ct.autoReset,k=le.enabled,x=le.autoUpdate,S=le.needsUpdate,_=le.type;he(),ct.autoReset=T,le.enabled=k,le.autoUpdate=x,le.needsUpdate=S,le.type=_}function pe(T){gt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function De(T){const k=T.target;k.removeEventListener("dispose",De),$e(k)}function $e(T){Ye(T),we.remove(T)}function Ye(T){const k=we.get(T).programs;k!==void 0&&(k.forEach(function(x){Y.releaseProgram(x)}),T.isShaderMaterial&&Y.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,x,S,_,U){k===null&&(k=vt);const z=_.isMesh&&_.matrixWorld.determinant()<0,j=xs(T,k,x,S,_);Me.setMaterial(S,z);let ee=x.index,re=1;if(S.wireframe===!0){if(ee=ne.getWireframeAttribute(x),ee===void 0)return;re=2}const ce=x.drawRange,me=x.attributes.position;let Oe=ce.start*re,it=(ce.start+ce.count)*re;U!==null&&(Oe=Math.max(Oe,U.start*re),it=Math.min(it,(U.start+U.count)*re)),ee!==null?(Oe=Math.max(Oe,0),it=Math.min(it,ee.count)):me!=null&&(Oe=Math.max(Oe,0),it=Math.min(it,me.count));const mt=it-Oe;if(mt<0||mt===1/0)return;O.setup(_,S,j,x,ee);let xt,ot=Pe;if(ee!==null&&(xt=W.get(ee),ot=ve,ot.setIndex(xt)),_.isMesh)S.wireframe===!0?(Me.setLineWidth(S.wireframeLinewidth*at()),ot.setMode(N.LINES)):ot.setMode(N.TRIANGLES);else if(_.isLine){let Le=S.linewidth;Le===void 0&&(Le=1),Me.setLineWidth(Le*at()),_.isLineSegments?ot.setMode(N.LINES):_.isLineLoop?ot.setMode(N.LINE_LOOP):ot.setMode(N.LINE_STRIP)}else _.isPoints?ot.setMode(N.POINTS):_.isSprite&&ot.setMode(N.TRIANGLES);if(_.isBatchedMesh)if(_._multiDrawInstances!==null)xr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(_._multiDrawStarts,_._multiDrawCounts,_._multiDrawCount,_._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))ot.renderMultiDraw(_._multiDrawStarts,_._multiDrawCounts,_._multiDrawCount);else{const Le=_._multiDrawStarts,dt=_._multiDrawCounts,et=_._multiDrawCount,qt=ee?W.get(ee).bytesPerElement:1,yi=we.get(S).currentProgram.getUniforms();for(let $t=0;$t<et;$t++)yi.setValue(N,"_gl_DrawID",$t),ot.render(Le[$t]/qt,dt[$t])}else if(_.isInstancedMesh)ot.renderInstances(Oe,mt,_.count);else if(x.isInstancedBufferGeometry){const Le=x._maxInstanceCount!==void 0?x._maxInstanceCount:1/0,dt=Math.min(x.instanceCount,Le);ot.renderInstances(Oe,mt,dt)}else ot.render(Oe,mt)};function Et(T,k,x){T.transparent===!0&&T.side===mn&&T.forceSinglePass===!1?(T.side=Wt,T.needsUpdate=!0,bi(T,k,x),T.side=Qn,T.needsUpdate=!0,bi(T,k,x),T.side=mn):bi(T,k,x)}this.compile=function(T,k,x=null){x===null&&(x=T),C=Re.get(x),C.init(k),w.push(C),x.traverseVisible(function(_){_.isLight&&_.layers.test(k.layers)&&(C.pushLight(_),_.castShadow&&C.pushShadow(_))}),T!==x&&T.traverseVisible(function(_){_.isLight&&_.layers.test(k.layers)&&(C.pushLight(_),_.castShadow&&C.pushShadow(_))}),C.setupLights();const S=new Set;return T.traverse(function(_){if(!(_.isMesh||_.isPoints||_.isLine||_.isSprite))return;const U=_.material;if(U)if(Array.isArray(U))for(let z=0;z<U.length;z++){const j=U[z];Et(j,x,_),S.add(j)}else Et(U,x,_),S.add(U)}),C=w.pop(),S},this.compileAsync=function(T,k,x=null){const S=this.compile(T,k,x);return new Promise(_=>{function U(){if(S.forEach(function(z){we.get(z).currentProgram.isReady()&&S.delete(z)}),S.size===0){_(T);return}setTimeout(U,10)}qe.get("KHR_parallel_shader_compile")!==null?U():setTimeout(U,10)})};let At=null;function Mn(T){At&&At(T)}function zt(){bt.stop()}function _i(){bt.start()}const bt=new sl;bt.setAnimationLoop(Mn),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(T){At=T,de.setAnimationLoop(T),T===null?bt.stop():bt.start()},de.addEventListener("sessionstart",zt),de.addEventListener("sessionend",_i),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(k),k=de.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,k,v),C=Re.get(T,w.length),C.init(k),w.push(C),ze.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),J.setFromProjectionMatrix(ze,xn,k.reversedDepth),ye=this.localClippingEnabled,oe=Te.init(this.clippingPlanes,ye),D=ge.get(T,L.length),D.init(),L.push(D),de.enabled===!0&&de.isPresenting===!0){const U=b.xr.getDepthSensingMesh();U!==null&&Xt(U,k,-1/0,b.sortObjects)}Xt(T,k,0,b.sortObjects),D.finish(),b.sortObjects===!0&&D.sort(fe,Se),We=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,We&&Z.addToRenderList(D,T),this.info.render.frame++,oe===!0&&Te.beginShadows();const x=C.state.shadowsArray;le.render(x,T,k),oe===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();const S=D.opaque,_=D.transmissive;if(C.setupLights(),k.isArrayCamera){const U=k.cameras;if(_.length>0)for(let z=0,j=U.length;z<j;z++){const ee=U[z];tn(S,_,T,ee)}We&&Z.render(T);for(let z=0,j=U.length;z<j;z++){const ee=U[z];vi(D,T,ee,ee.viewport)}}else _.length>0&&tn(S,_,T,k),We&&Z.render(T),vi(D,T,k);v!==null&&g===0&&(Ne.updateMultisampleRenderTarget(v),Ne.updateRenderTargetMipmap(v)),T.isScene===!0&&T.onAfterRender(b,T,k),O.resetDefaultState(),A=-1,B=null,w.pop(),w.length>0?(C=w[w.length-1],oe===!0&&Te.setGlobalState(b.clippingPlanes,C.state.camera)):C=null,L.pop(),L.length>0?D=L[L.length-1]:D=null};function Xt(T,k,x,S){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)x=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)C.pushLight(T),T.castShadow&&C.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){S&&He.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ze);const z=ae.update(T),j=T.material;j.visible&&D.push(T,z,j,x,He.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const z=ae.update(T),j=T.material;if(S&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),He.copy(T.boundingSphere.center)):(z.boundingSphere===null&&z.computeBoundingSphere(),He.copy(z.boundingSphere.center)),He.applyMatrix4(T.matrixWorld).applyMatrix4(ze)),Array.isArray(j)){const ee=z.groups;for(let re=0,ce=ee.length;re<ce;re++){const me=ee[re],Oe=j[me.materialIndex];Oe&&Oe.visible&&D.push(T,z,Oe,x,He.z,me)}}else j.visible&&D.push(T,z,j,x,He.z,null)}}const U=T.children;for(let z=0,j=U.length;z<j;z++)Xt(U[z],k,x,S)}function vi(T,k,x,S){const{opaque:_,transmissive:U,transparent:z}=T;C.setupLightsView(x),oe===!0&&Te.setGlobalState(b.clippingPlanes,x),S&&Me.viewport(I.copy(S)),_.length>0&&ni(_,k,x),U.length>0&&ni(U,k,x),z.length>0&&ni(z,k,x),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function tn(T,k,x,S){if((x.isScene===!0?x.overrideMaterial:null)!==null)return;C.state.transmissionRenderTarget[S.id]===void 0&&(C.state.transmissionRenderTarget[S.id]=new xi(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?Yi:_n,minFilter:hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const U=C.state.transmissionRenderTarget[S.id],z=S.viewport||I;U.setSize(z.z*b.transmissionResolutionScale,z.w*b.transmissionResolutionScale);const j=b.getRenderTarget(),ee=b.getActiveCubeFace(),re=b.getActiveMipmapLevel();b.setRenderTarget(U),b.getClearColor($),ie=b.getClearAlpha(),ie<1&&b.setClearColor(16777215,.5),b.clear(),We&&Z.render(x);const ce=b.toneMapping;b.toneMapping=Zn;const me=S.viewport;if(S.viewport!==void 0&&(S.viewport=void 0),C.setupLightsView(S),oe===!0&&Te.setGlobalState(b.clippingPlanes,S),ni(T,x,S),Ne.updateMultisampleRenderTarget(U),Ne.updateRenderTargetMipmap(U),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let it=0,mt=k.length;it<mt;it++){const xt=k[it],{object:ot,geometry:Le,material:dt,group:et}=xt;if(dt.side===mn&&ot.layers.test(S.layers)){const qt=dt.side;dt.side=Wt,dt.needsUpdate=!0,ii(ot,x,S,Le,dt,et),dt.side=qt,dt.needsUpdate=!0,Oe=!0}}Oe===!0&&(Ne.updateMultisampleRenderTarget(U),Ne.updateRenderTargetMipmap(U))}b.setRenderTarget(j,ee,re),b.setClearColor($,ie),me!==void 0&&(S.viewport=me),b.toneMapping=ce}function ni(T,k,x){const S=k.isScene===!0?k.overrideMaterial:null;for(let _=0,U=T.length;_<U;_++){const z=T[_],{object:j,geometry:ee,group:re}=z;let ce=z.material;ce.allowOverride===!0&&S!==null&&(ce=S),j.layers.test(x.layers)&&ii(j,k,x,ee,ce,re)}}function ii(T,k,x,S,_,U){T.onBeforeRender(b,k,x,S,_,U),T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),_.onBeforeRender(b,k,x,S,T,U),_.transparent===!0&&_.side===mn&&_.forceSinglePass===!1?(_.side=Wt,_.needsUpdate=!0,b.renderBufferDirect(x,k,S,_,T,U),_.side=Qn,_.needsUpdate=!0,b.renderBufferDirect(x,k,S,_,T,U),_.side=mn):b.renderBufferDirect(x,k,S,_,T,U),T.onAfterRender(b,k,x,S,_,U)}function bi(T,k,x){k.isScene!==!0&&(k=vt);const S=we.get(T),_=C.state.lights,U=C.state.shadowsArray,z=_.state.version,j=Y.getParameters(T,_.state,U,k,x),ee=Y.getProgramCacheKey(j);let re=S.programs;S.environment=T.isMeshStandardMaterial?k.environment:null,S.fog=k.fog,S.envMap=(T.isMeshStandardMaterial?y:P).get(T.envMap||S.environment),S.envMapRotation=S.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,re===void 0&&(T.addEventListener("dispose",De),re=new Map,S.programs=re);let ce=re.get(ee);if(ce!==void 0){if(S.currentProgram===ce&&S.lightsStateVersion===z)return Qi(T,j),ce}else j.uniforms=Y.getUniforms(T),T.onBeforeCompile(j,b),ce=Y.acquireProgram(j,ee),re.set(ee,ce),S.uniforms=j.uniforms;const me=S.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(me.clippingPlanes=Te.uniform),Qi(T,j),S.needsLights=gs(T),S.lightsStateVersion=z,S.needsLights&&(me.ambientLightColor.value=_.state.ambient,me.lightProbe.value=_.state.probe,me.directionalLights.value=_.state.directional,me.directionalLightShadows.value=_.state.directionalShadow,me.spotLights.value=_.state.spot,me.spotLightShadows.value=_.state.spotShadow,me.rectAreaLights.value=_.state.rectArea,me.ltc_1.value=_.state.rectAreaLTC1,me.ltc_2.value=_.state.rectAreaLTC2,me.pointLights.value=_.state.point,me.pointLightShadows.value=_.state.pointShadow,me.hemisphereLights.value=_.state.hemi,me.directionalShadowMap.value=_.state.directionalShadowMap,me.directionalShadowMatrix.value=_.state.directionalShadowMatrix,me.spotShadowMap.value=_.state.spotShadowMap,me.spotLightMatrix.value=_.state.spotLightMatrix,me.spotLightMap.value=_.state.spotLightMap,me.pointShadowMap.value=_.state.pointShadowMap,me.pointShadowMatrix.value=_.state.pointShadowMatrix),S.currentProgram=ce,S.uniformsList=null,ce}function Er(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=Jr.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Qi(T,k){const x=we.get(T);x.outputColorSpace=k.outputColorSpace,x.batching=k.batching,x.batchingColor=k.batchingColor,x.instancing=k.instancing,x.instancingColor=k.instancingColor,x.instancingMorph=k.instancingMorph,x.skinning=k.skinning,x.morphTargets=k.morphTargets,x.morphNormals=k.morphNormals,x.morphColors=k.morphColors,x.morphTargetsCount=k.morphTargetsCount,x.numClippingPlanes=k.numClippingPlanes,x.numIntersection=k.numClipIntersection,x.vertexAlphas=k.vertexAlphas,x.vertexTangents=k.vertexTangents,x.toneMapping=k.toneMapping}function xs(T,k,x,S,_){k.isScene!==!0&&(k=vt),Ne.resetTextureUnits();const U=k.fog,z=S.isMeshStandardMaterial?k.environment:null,j=v===null?b.outputColorSpace:v.isXRRenderTarget===!0?v.texture.colorSpace:Xi,ee=(S.isMeshStandardMaterial?y:P).get(S.envMap||z),re=S.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,ce=!!x.attributes.tangent&&(!!S.normalMap||S.anisotropy>0),me=!!x.morphAttributes.position,Oe=!!x.morphAttributes.normal,it=!!x.morphAttributes.color;let mt=Zn;S.toneMapped&&(v===null||v.isXRRenderTarget===!0)&&(mt=b.toneMapping);const xt=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,ot=xt!==void 0?xt.length:0,Le=we.get(S),dt=C.state.lights;if(oe===!0&&(ye===!0||T!==B)){const Ft=T===B&&S.id===A;Te.setState(S,T,Ft)}let et=!1;S.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==dt.state.version||Le.outputColorSpace!==j||_.isBatchedMesh&&Le.batching===!1||!_.isBatchedMesh&&Le.batching===!0||_.isBatchedMesh&&Le.batchingColor===!0&&_.colorTexture===null||_.isBatchedMesh&&Le.batchingColor===!1&&_.colorTexture!==null||_.isInstancedMesh&&Le.instancing===!1||!_.isInstancedMesh&&Le.instancing===!0||_.isSkinnedMesh&&Le.skinning===!1||!_.isSkinnedMesh&&Le.skinning===!0||_.isInstancedMesh&&Le.instancingColor===!0&&_.instanceColor===null||_.isInstancedMesh&&Le.instancingColor===!1&&_.instanceColor!==null||_.isInstancedMesh&&Le.instancingMorph===!0&&_.morphTexture===null||_.isInstancedMesh&&Le.instancingMorph===!1&&_.morphTexture!==null||Le.envMap!==ee||S.fog===!0&&Le.fog!==U||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==Te.numPlanes||Le.numIntersection!==Te.numIntersection)||Le.vertexAlphas!==re||Le.vertexTangents!==ce||Le.morphTargets!==me||Le.morphNormals!==Oe||Le.morphColors!==it||Le.toneMapping!==mt||Le.morphTargetsCount!==ot)&&(et=!0):(et=!0,Le.__version=S.version);let qt=Le.currentProgram;et===!0&&(qt=bi(S,k,_));let yi=!1,$t=!1,tr=!1;const ft=qt.getUniforms(),kt=Le.uniforms;if(Me.useProgram(qt.program)&&(yi=!0,$t=!0,tr=!0),S.id!==A&&(A=S.id,$t=!0),yi||B!==T){Me.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ft.setValue(N,"projectionMatrix",T.projectionMatrix),ft.setValue(N,"viewMatrix",T.matrixWorldInverse);const Vt=ft.map.cameraPosition;Vt!==void 0&&Vt.setValue(N,Ae.setFromMatrixPosition(T.matrixWorld)),nt.logarithmicDepthBuffer&&ft.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(S.isMeshPhongMaterial||S.isMeshToonMaterial||S.isMeshLambertMaterial||S.isMeshBasicMaterial||S.isMeshStandardMaterial||S.isShaderMaterial)&&ft.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),B!==T&&(B=T,$t=!0,tr=!0)}if(_.isSkinnedMesh){ft.setOptional(N,_,"bindMatrix"),ft.setOptional(N,_,"bindMatrixInverse");const Ft=_.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ft.setValue(N,"boneTexture",Ft.boneTexture,Ne))}_.isBatchedMesh&&(ft.setOptional(N,_,"batchingTexture"),ft.setValue(N,"batchingTexture",_._matricesTexture,Ne),ft.setOptional(N,_,"batchingIdTexture"),ft.setValue(N,"batchingIdTexture",_._indirectTexture,Ne),ft.setOptional(N,_,"batchingColorTexture"),_._colorsTexture!==null&&ft.setValue(N,"batchingColorTexture",_._colorsTexture,Ne));const Zt=x.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0)&&Ue.update(_,x,qt),($t||Le.receiveShadow!==_.receiveShadow)&&(Le.receiveShadow=_.receiveShadow,ft.setValue(N,"receiveShadow",_.receiveShadow)),S.isMeshGouraudMaterial&&S.envMap!==null&&(kt.envMap.value=ee,kt.flipEnvMap.value=ee.isCubeTexture&&ee.isRenderTargetTexture===!1?-1:1),S.isMeshStandardMaterial&&S.envMap===null&&k.environment!==null&&(kt.envMapIntensity.value=k.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=Z0()),$t&&(ft.setValue(N,"toneMappingExposure",b.toneMappingExposure),Le.needsLights&&Tr(kt,tr),U&&S.fog===!0&&Ee.refreshFogUniforms(kt,U),Ee.refreshMaterialUniforms(kt,S,K,te,C.state.transmissionRenderTarget[T.id]),Jr.upload(N,Er(Le),kt,Ne)),S.isShaderMaterial&&S.uniformsNeedUpdate===!0&&(Jr.upload(N,Er(Le),kt,Ne),S.uniformsNeedUpdate=!1),S.isSpriteMaterial&&ft.setValue(N,"center",_.center),ft.setValue(N,"modelViewMatrix",_.modelViewMatrix),ft.setValue(N,"normalMatrix",_.normalMatrix),ft.setValue(N,"modelMatrix",_.matrixWorld),S.isShaderMaterial||S.isRawShaderMaterial){const Ft=S.uniformsGroups;for(let Vt=0,vs=Ft.length;Vt<vs;Vt++){const ri=Ft[Vt];xe.update(ri,qt),xe.bind(ri,qt)}}return qt}function Tr(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function gs(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return g},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(T,k,x){const S=we.get(T);S.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,S.__autoAllocateDepthBuffer===!1&&(S.__useRenderToTexture=!1),we.get(T.texture).__webglTexture=k,we.get(T.depthTexture).__webglTexture=S.__autoAllocateDepthBuffer?void 0:x,S.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const x=we.get(T);x.__webglFramebuffer=k,x.__useDefaultFramebuffer=k===void 0};const Mi=N.createFramebuffer();this.setRenderTarget=function(T,k=0,x=0){v=T,F=k,g=x;let S=!0,_=null,U=!1,z=!1;if(T){const ee=we.get(T);if(ee.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(N.FRAMEBUFFER,null),S=!1;else if(ee.__webglFramebuffer===void 0)Ne.setupRenderTarget(T);else if(ee.__hasExternalTextures)Ne.rebindTextures(T,we.get(T.texture).__webglTexture,we.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const me=T.depthTexture;if(ee.__boundDepthTexture!==me){if(me!==null&&we.has(me)&&(T.width!==me.image.width||T.height!==me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(T)}}const re=T.texture;(re.isData3DTexture||re.isDataArrayTexture||re.isCompressedArrayTexture)&&(z=!0);const ce=we.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ce[k])?_=ce[k][x]:_=ce[k],U=!0):T.samples>0&&Ne.useMultisampledRTT(T)===!1?_=we.get(T).__webglMultisampledFramebuffer:Array.isArray(ce)?_=ce[x]:_=ce,I.copy(T.viewport),G.copy(T.scissor),X=T.scissorTest}else I.copy(Ce).multiplyScalar(K).floor(),G.copy(Ie).multiplyScalar(K).floor(),X=Qe;if(x!==0&&(_=Mi),Me.bindFramebuffer(N.FRAMEBUFFER,_)&&S&&Me.drawBuffers(T,_),Me.viewport(I),Me.scissor(G),Me.setScissorTest(X),U){const ee=we.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,ee.__webglTexture,x)}else if(z){const ee=k;for(let re=0;re<T.textures.length;re++){const ce=we.get(T.textures[re]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+re,ce.__webglTexture,x,ee)}}else if(T!==null&&x!==0){const ee=we.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ee.__webglTexture,x)}A=-1},this.readRenderTargetPixels=function(T,k,x,S,_,U,z,j=0){if(!(T&&T.isWebGLRenderTarget)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ee=we.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&z!==void 0&&(ee=ee[z]),ee){Me.bindFramebuffer(N.FRAMEBUFFER,ee);try{const re=T.textures[j],ce=re.format,me=re.type;if(!nt.textureFormatReadable(ce)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(me)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-S&&x>=0&&x<=T.height-_&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+j),N.readPixels(k,x,S,_,Fe.convert(ce),Fe.convert(me),U))}finally{const re=v!==null?we.get(v).__webglFramebuffer:null;Me.bindFramebuffer(N.FRAMEBUFFER,re)}}},this.readRenderTargetPixelsAsync=async function(T,k,x,S,_,U,z,j=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ee=we.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&z!==void 0&&(ee=ee[z]),ee)if(k>=0&&k<=T.width-S&&x>=0&&x<=T.height-_){Me.bindFramebuffer(N.FRAMEBUFFER,ee);const re=T.textures[j],ce=re.format,me=re.type;if(!nt.textureFormatReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Oe),N.bufferData(N.PIXEL_PACK_BUFFER,U.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+j),N.readPixels(k,x,S,_,Fe.convert(ce),Fe.convert(me),0);const it=v!==null?we.get(v).__webglFramebuffer:null;Me.bindFramebuffer(N.FRAMEBUFFER,it);const mt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Eu(N,mt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Oe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,U),N.deleteBuffer(Oe),N.deleteSync(mt),U}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,x=0){const S=Math.pow(2,-x),_=Math.floor(T.image.width*S),U=Math.floor(T.image.height*S),z=k!==null?k.x:0,j=k!==null?k.y:0;Ne.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,x,0,0,z,j,_,U),Me.unbindTexture()};const _s=N.createFramebuffer(),er=N.createFramebuffer();this.copyTextureToTexture=function(T,k,x=null,S=null,_=0,U=null){U===null&&(_!==0?(xr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),U=_,_=0):U=0);let z,j,ee,re,ce,me,Oe,it,mt;const xt=T.isCompressedTexture?T.mipmaps[U]:T.image;if(x!==null)z=x.max.x-x.min.x,j=x.max.y-x.min.y,ee=x.isBox3?x.max.z-x.min.z:1,re=x.min.x,ce=x.min.y,me=x.isBox3?x.min.z:0;else{const Zt=Math.pow(2,-_);z=Math.floor(xt.width*Zt),j=Math.floor(xt.height*Zt),T.isDataArrayTexture?ee=xt.depth:T.isData3DTexture?ee=Math.floor(xt.depth*Zt):ee=1,re=0,ce=0,me=0}S!==null?(Oe=S.x,it=S.y,mt=S.z):(Oe=0,it=0,mt=0);const ot=Fe.convert(k.format),Le=Fe.convert(k.type);let dt;k.isData3DTexture?(Ne.setTexture3D(k,0),dt=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Ne.setTexture2DArray(k,0),dt=N.TEXTURE_2D_ARRAY):(Ne.setTexture2D(k,0),dt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const et=N.getParameter(N.UNPACK_ROW_LENGTH),qt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),yi=N.getParameter(N.UNPACK_SKIP_PIXELS),$t=N.getParameter(N.UNPACK_SKIP_ROWS),tr=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,re),N.pixelStorei(N.UNPACK_SKIP_ROWS,ce),N.pixelStorei(N.UNPACK_SKIP_IMAGES,me);const ft=T.isDataArrayTexture||T.isData3DTexture,kt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Zt=we.get(T),Ft=we.get(k),Vt=we.get(Zt.__renderTarget),vs=we.get(Ft.__renderTarget);Me.bindFramebuffer(N.READ_FRAMEBUFFER,Vt.__webglFramebuffer),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,vs.__webglFramebuffer);for(let ri=0;ri<ee;ri++)ft&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(T).__webglTexture,_,me+ri),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(k).__webglTexture,U,mt+ri)),N.blitFramebuffer(re,ce,z,j,Oe,it,z,j,N.DEPTH_BUFFER_BIT,N.NEAREST);Me.bindFramebuffer(N.READ_FRAMEBUFFER,null),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(_!==0||T.isRenderTargetTexture||we.has(T)){const Zt=we.get(T),Ft=we.get(k);Me.bindFramebuffer(N.READ_FRAMEBUFFER,_s),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,er);for(let Vt=0;Vt<ee;Vt++)ft?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Zt.__webglTexture,_,me+Vt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Zt.__webglTexture,_),kt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ft.__webglTexture,U,mt+Vt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ft.__webglTexture,U),_!==0?N.blitFramebuffer(re,ce,z,j,Oe,it,z,j,N.COLOR_BUFFER_BIT,N.NEAREST):kt?N.copyTexSubImage3D(dt,U,Oe,it,mt+Vt,re,ce,z,j):N.copyTexSubImage2D(dt,U,Oe,it,re,ce,z,j);Me.bindFramebuffer(N.READ_FRAMEBUFFER,null),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else kt?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(dt,U,Oe,it,mt,z,j,ee,ot,Le,xt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(dt,U,Oe,it,mt,z,j,ee,ot,xt.data):N.texSubImage3D(dt,U,Oe,it,mt,z,j,ee,ot,Le,xt):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,Oe,it,z,j,ot,Le,xt.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,Oe,it,xt.width,xt.height,ot,xt.data):N.texSubImage2D(N.TEXTURE_2D,U,Oe,it,z,j,ot,Le,xt);N.pixelStorei(N.UNPACK_ROW_LENGTH,et),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,yi),N.pixelStorei(N.UNPACK_SKIP_ROWS,$t),N.pixelStorei(N.UNPACK_SKIP_IMAGES,tr),U===0&&k.generateMipmaps&&N.generateMipmap(dt),Me.unbindTexture()},this.initRenderTarget=function(T){we.get(T).__webglFramebuffer===void 0&&Ne.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ne.setTextureCube(T,0):T.isData3DTexture?Ne.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ne.setTexture2DArray(T,0):Ne.setTexture2D(T,0),Me.unbindTexture()},this.resetState=function(){F=0,g=0,v=null,Me.reset(),O.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const ln=[{id:"bench",name:"הספסל ליד האגם",x:-6,z:10,range:3,kind:"rest",description:"פסק זמן קטן. הספסל לא ישאל מה הספקתם היום.",action:"לשבת לרגע"},{id:"door",name:"דלת המבואה",x:-2,z:-15.5,range:2.8,kind:"toggle",description:"הדלת הידנית של המבואה עדיין עובדת. בפנים: מקום שקט ולוח הפרויקט.",action:"לפתוח את הדלת"},{id:"lamp",name:"פנס הרחבה",x:-2,z:10,range:2.4,kind:"toggle",description:"מפסק מקומי. לפחות דבר אחד כאן לא דורש סיסמה.",action:"לכבות את הפנס"},{id:"basketball",name:"עמדת הקליעה",x:12,z:22,range:2.8,kind:"play",description:"הכדור נמצא על הקו. זריקה רגועה, בלי שעון ובלי טבלת דירוג.",action:"לזרוק לסל"},{id:"locker",name:"ארונית צוות איינשטיין",x:-10,z:-13,range:2.5,kind:"inspect",description:"על הדלת: ״ציוד משותף. רעיונות פחות״. בפנים נשאר פתק מסבב העבודה האחרון.",action:"לפתוח את הארונית"},{id:"noticeboard",name:"לוח ההאקתון",x:-4,z:5,range:2.4,kind:"clue",description:"רשימת סוף יום: כרטיס הגישה עבר מערבה מהספרייה; הגיבוי הונח ממזרח למעבדה; האנטנה נשארה בדרום־מערב. אף אחד לא סימן ״החזרתי״.",action:"לתעד את הרמז ביומן"},{id:"telescope",name:"עמדת תצפית לאגם",x:-8,z:16.7,range:2.5,kind:"observe",description:"עדשה מכוונת לאגם. אפשר להתקרב למראה בלי לרדוף אחרי בעלי החיים.",action:"להביט דרך העדשה"},{id:"water",name:"קערת המים",x:-8.5,z:8,range:2.5,kind:"care",description:"קערה נקייה בפינת הטבע. ממלאים מים ונותנים לבעלי החיים לבחור אם להתקרב.",action:"למלא מים"},{id:"planter",name:"ערוגת המעבדה",x:23,z:-6,range:2.5,kind:"care",description:"פרויקט השקיה שעובד גם בלי Wi-Fi. העלים קצת שמוטים; המשפך עדיין כאן.",action:"להשקות את הערוגה"},{id:"recycling",name:"פינת המחזור",x:5,z:10,range:2.5,kind:"help",description:"שלוש פחיות נשארו אחרי ההאקתון. ״מישהו יאסוף״ עדיין לא הגיע.",action:"לאסוף את הפחיות למחזור"},{id:"solar",name:"לוח תאורת השביל",x:19,z:8,range:2.6,kind:"puzzle",description:"שלושה מתגים, שלושה סימונים. הדליקו רק ירח ועץ כדי להאיר את פינת הטבע. אין קנס ואין לחץ זמן.",action:"לכוון את המתגים"},{id:"bike",name:"עמדת האופניים",x:-21,z:-8.5,range:2.5,kind:"play",description:"הפעמון תקוע בזווית. מיישרים, בודקים צלצול ומקווים שהשומר לא יחשוב שכבר בוקר.",action:"לבדוק את הפעמון"}];function Sr(i={}){const e=i&&typeof i=="object"&&!Array.isArray(i)?i:{},t=r=>Number.isSafeInteger(e[r])?Math.max(0,Math.min(9999,e[r])):0;return{visited:(r=>Array.isArray(r)?[...new Set(r.filter(s=>ln.some(a=>a.id===s)))]:[])(e.visited),doorOpen:e.doorOpen===!0,lampOn:e.lampOn!==!1,lockerOpen:e.lockerOpen===!0,waterFilled:e.waterFilled===!0,watered:e.watered===!0,recycled:e.recycled===!0,switches:[0,1,2].map(r=>Array.isArray(e.switches)&&e.switches[r]===!0),shots:t("shots"),observations:t("observations"),bells:t("bells"),helped:Array.isArray(e.helped)?[...new Set(e.helped.filter(r=>["owl","pigeon","raccoon"].includes(r)))]:[],animalNotes:Array.isArray(e.animalNotes)?[...new Set(e.animalNotes.filter(r=>Number.isInteger(r)&&r>=0&&r<19))]:[],following:Number.isInteger(e.following)&&e.following>=0&&e.following<16?e.following:null,seated:e.seated===!0}}const po=i=>i.switches[0]&&!i.switches[1]&&i.switches[2];function hs(i,e){return{bench:e.seated?"יושבים":"פנוי",door:e.doorOpen?"פתוחה":"סגורה",lamp:e.lampOn?"דולק":"כבוי",basketball:`${e.shots} קליעות`,locker:e.lockerOpen?"פתוחה":"סגורה",noticeboard:e.visited.includes("noticeboard")?"הרמז תועד":"רמז חדש",telescope:`${e.observations} תצפיות`,water:e.waterFilled?"הקערה מלאה":"הקערה ריקה",planter:e.watered?"הערוגה הושקתה":"זקוקה למים",recycling:e.recycled?"הרחבה נקייה":"3 פחיות בשטח",solar:po(e)?"השביל מואר":"התאורה כבויה",bike:`${e.bells} צלצולים`}[i.id]}function ul(i,e){return{bench:e.seated?"לקום ולהמשיך":i.action,door:e.doorOpen?"לסגור את הדלת":i.action,lamp:e.lampOn?i.action:"להדליק את הפנס",locker:e.lockerOpen?"לסגור את הארונית":i.action,water:e.waterFilled?"לצפות ליד קערת המים":i.action,planter:e.watered?"לבדוק את העלים":i.action,recycling:e.recycled?"לבדוק את הפינה הנקייה":i.action,noticeboard:e.visited.includes("noticeboard")?"לקרוא שוב את הרמז":i.action}[i.id]||i.action}function Q0({scene:i,box:e,ball:t,cyl:n,mesh:r,segment:s,mat:a,sign:o,softPool:c,doorLeaves:l,doorBlocker:u,lampFixture:d}){const h=new Set,p=new Map,M=K=>(h.add(K),K);for(const K of ln){const fe=M(r(new jn(.36,.4,24),"#c6b387",K.x,.09,K.z));fe.rotation.x=-Math.PI/2,p.set(K.id,fe)}l.forEach(M),M(d.bulb),e(-10,1.05,-13,.95,2.1,.6,"#50676e"),e(-10,1.05,-12.68,.76,1.9,.02,"#293941");const E=new ht;E.position.set(-10.46,0,-12.63),i.add(E),M(E),e(.46,1.05,0,.9,2.08,.055,"#718380",E),e(.78,1.03,.04,.045,.23,.05,"#c2bfa9",E);const m=M(e(-10,1.1,-12.65,.48,.34,.025,"#d9cfac"));o(-10,2.35,-12.6,2.5,"איינשטיין · ציוד משותף");const f=M(t(-4,2.35,5.13,.055,"#b47e56"));for(const K of[-.35,.35])s([-8,1.25,16.7],[-8+K,0,16.7+.35],.025,"#8b9491");s([-8,1.25,16.7],[-8,0,16.25],.025,"#8b9491");const D=r(new Yn(.14,.18,.95,12),"#6b777b",-8,1.45,16.7);D.rotation.z=Math.PI/2,D.rotation.y=-.35;const C=t(-8.46,1.45,16.54,.13,"#7fabb1");C.scale.x=.17,n(-8.5,.12,8,.42,.22,"#9caaa1");const L=M(n(-8.5,.245,8,.36,.015,"#5696a3"));e(23,.3,-6,2,.6,1.2,"#79644d"),e(23,.62,-6,1.85,.03,1.05,"#3e493c");const w=new ht;w.position.set(23,.62,-6),i.add(w),M(w);for(const K of[-.6,0,.6]){s([K,0,0],[K,.72,0],.025,"#708762",w);for(const fe of[-1,1]){const Se=t(K+fe*.14,.45,0,.19,"#7b936c",w);Se.scale.set(.8,.35,1.9),Se.rotation.z=fe*.7}}n(24.1,.3,-5.8,.25,.55,"#809595"),s([24.1,.4,-5.8],[24.6,.6,-5.8],.065,"#809595"),e(5,.6,10,.85,1.2,.85,"#536d67"),e(5,1.23,10,.96,.12,.96,"#718b7e"),o(5,1.45,10.44,1.7,"מחזור");const b=new ht;i.add(b),M(b);for(let K=0;K<3;K++){const fe=n(4.1+K*.4,.12,10.8+K%2*.4,.1,.3,["#a5aaa0","#a98b71","#7b979b"][K],b);fe.rotation.z=1.2+K*.2}e(19,.8,8,1.4,1.6,.55,"#465a61");const R=[-.43,0,.43].map(K=>M(e(19+K,1.05,8.32,.14,.35,.1,"#b39e78")));o(19,1.9,8.33,2.7,"תאורת השביל","ירח · שמש · עץ");const F=[];for(const[K,fe]of[[16,7],[13,6],[10,5]]){n(K,.32,fe,.08,.64,"#52615f");const Se=M(t(K,.67,fe,.13,"#d0bd8c")),Ce=c(K,fe,3.2);F.push({bulb:Se,pool:Ce})}const g=M(t(-21.48,.99,-8.5,.085,"#b6b7a5")),v=[0,1,2].map(K=>{const fe=M(r(new jn(.22,.24,24),"#d1c49f",-21.48,1.05,-8.4));return fe.visible=!1,fe}),A=M(t(12,.25,22,.24,"#a87848")),B=M(r(new Vi(.242,.01,4,24),"#3d3933",0,0,0,A));B.rotation.x=Math.PI/2;let I=Sr(),G=-1,X=-1,$=0,ie=0;function q(K,{animate:fe=!0}={}){I=K,l.forEach((Ce,Ie)=>{Ce.rotation.y=I.doorOpen?Ie===0?-Math.PI*.46:Math.PI*.46:0}),u.disabled=I.doorOpen,d.bulb.material=a(I.lampOn?"#d6b884":"#566368",I.lampOn),d.pool.visible=I.lampOn,E.rotation.y=I.lockerOpen?-Math.PI*.65:0,m.visible=I.lockerOpen,f.material=a(I.visited.includes("noticeboard")?"#a4c4a3":"#b47e56"),L.visible=I.waterFilled,w.scale.y=I.watered?1.3:.58,b.visible=!I.recycled;const Se=po(I);R.forEach((Ce,Ie)=>{Ce.rotation.x=I.switches[Ie]?-.55:.55,Ce.material=a(I.switches[Ie]?"#b8cdb0":"#b39e78")}),F.forEach(Ce=>{Ce.bulb.material=a(Se?"#dfc58e":"#66716a",Se),Ce.pool.visible=Se});for(const[Ce,Ie]of p)Ie.material=a(I.visited.includes(Ce)?"#8da892":"#c6b387");fe&&I.shots>$&&(G=0),fe&&I.bells>ie&&(X=0),$=I.shots,ie=I.bells}function te(K,fe){if(G>=0){G+=K;const Se=Math.min(G/1.35,1);if(A.position.set(12+3.58*Se,.25+2.58*Se+Math.sin(Se*Math.PI)*2.45,22),A.rotation.z-=K*4,Se===1){const Ce=Math.min((G-1.35)/.8,1);A.position.set(15.58-3.58*Ce,2.83*(1-Ce)+Math.sin(Ce*Math.PI)*.45,22),Ce===1&&(G=-1,A.position.set(12,.25,22))}}X>=0&&(X+=K,g.rotation.z=fe?0:Math.sin(X*34)*.2,v.forEach((Se,Ce)=>{Se.visible=X<1.2;const Ie=.6+(X+Ce*.16)*2;Se.scale.setScalar(Ie),Se.rotation.y=.6}),X>1.2&&(X=-1,g.rotation.z=0))}return{dynamic:h,sync:q,update:te,get animation(){return{basketballInFlight:G>=0,bellRinging:X>=0}}}}const em=JSON.parse('[{"id":"facts","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"עובדה או דעה?","description":"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"facts-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"„בפעילות השתתפו שלוש כיתות.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק כמה כיתות השתתפו בפעילות.","en":"The number of participating classes can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.","en":"“More interesting” is a personal judgment, so this is an opinion."},"ref":{"id":"garden-passage","part":"פסקה 3"}},{"id":"facts-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק אילו צמחים נשתלו בגינה.","en":"The plants in the garden can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.","en":"“The best” is a personal evaluation, not a defined measurable fact here."},"ref":{"id":"garden-passage","part":null}},{"id":"facts-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?","choices":["עובדה","דעה"],"correct":0,"explanation":{"he":"אפשר לבדוק את לוח ההשקיה של הכיתות.","en":"The class watering schedule can be checked."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"facts-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"„לדעתי, הפעילות בגינה נהדרת.” מה זה?","choices":["עובדה","דעה"],"correct":1,"explanation":{"he":"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.","en":"The word “in my opinion” clearly signals an opinion."},"ref":{"id":"garden-passage","part":null}}]},{"id":"questions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מילות שאלה","description":"בוחרים את מילת השאלה המתאימה למידע שמחפשים.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"questions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?","choices":["מתי","מי","כמה"],"correct":0,"explanation":{"he":"„מתי” מבקשת זמן או מועד.","en":"“When” asks about a time or date."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?","choices":["כיצד","כמה","היכן"],"correct":1,"explanation":{"he":"„כמה” מבקשת מספר או כמות.","en":"“How many” asks for a number or quantity."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?","choices":["מדוע","מתי","מי"],"correct":0,"explanation":{"he":"„מדוע” מבקשת סיבה: למה עשו זאת?","en":"“Why” asks for the reason something happened."},"ref":{"id":"garden-passage","part":"פסקה 2"}},{"id":"questions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?","choices":["כמה","היכן","כיצד"],"correct":1,"explanation":{"he":"„היכן” מבקשת מקום.","en":"“Where” asks about a place."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?","choices":["כיצד","מתי","מי"],"correct":0,"explanation":{"he":"„כיצד” מבקשת דרך או אופן פעולה.","en":"“How” asks about the way something was done."},"ref":{"id":"garden-passage","part":"פסקה 1"}},{"id":"questions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?","choices":["היכן","מי","מדוע"],"correct":1,"explanation":{"he":"„מי” מבקשת לזהות אדם.","en":"“Who” asks which person did something."},"ref":{"id":"garden-passage","part":"פסקה 3"}}]},{"id":"instructions","subject_id":"hebrew","exam_id":"hebrew-v1-garden","title":"מבינים הוראות","description":"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.","references":[{"id":"garden-passage","kind":"passage","title":"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”","url":"garden-exam.html#article","attribution":null,"parts":[{"part":"הכותרת ושורת הפרטים","title":"הכותרת, הכותבת, מקום הפרסום והתאריך"},{"part":"פסקה 1","title":"הקמת הגינה, הכיתות וההשקיה"},{"part":"פסקה 2","title":"ההכנות לפני השתילה ומטרת הפעילות"},{"part":"פסקה 3","title":"דברי התלמידים ומה יקרה בעוד חודש"},{"part":"הטקסט כולו","title":"הטקסט כולו"}]}],"questions":[{"id":"instructions-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?","choices":["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],"correct":0,"explanation":{"he":"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.","en":"“Copy” means use the wording from the passage."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?","choices":["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],"correct":1,"explanation":{"he":"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.","en":"“Justify” asks for a reason or evidence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?","choices":["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],"correct":0,"explanation":{"he":"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.","en":"“State” usually asks for the requested detail briefly."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הסבירו”. מה צריך לעשות?","choices":["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],"correct":1,"explanation":{"he":"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.","en":"“Explain” asks for details about how or why."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?","choices":["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],"correct":1,"explanation":{"he":"שאלה מלאה כוללת מילת שאלה ומשפט שלם.","en":"A full question includes a question word and a complete sentence."},"ref":{"id":"garden-passage","part":null}},{"id":"instructions-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?","choices":["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],"correct":1,"explanation":{"he":"צריך לציין מה חושבים ולתת סיבה אחת לפחות.","en":"State your view and give at least one supporting reason."},"ref":{"id":"garden-passage","part":null}}]},{"id":"physics-basics","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מדידה ושיטות מדידה","description":"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-basics-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חייבים לציין בתוצאת מדידה?","choices":["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?","choices":["ישירה","עקיפה","לא מדידה"],"correct":0,"explanation":{"he":"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?","choices":["ישירה","עקיפה","הערכה ללא מדידה"],"correct":1,"explanation":{"he":"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מחשבים עובי ממוצע של דף בערימה?","choices":["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],"correct":0,"explanation":{"he":"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?","choices":["0.1 מ״מ","1 מ״מ","10 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה כדאי למדוד ערימה של דפים מאותו סוג?","choices":["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],"correct":0,"explanation":{"he":"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהי מדידה?","choices":["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],"correct":0,"explanation":{"he":"מדידה משווה גודל ליחידת מידה מוסכמת.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מתאים לתיאור אורך עיפרון?","choices":["14 ס״מ","14 בלבד","ס״מ בלבד"],"correct":0,"explanation":{"he":"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזו פעולה היא מדידה עקיפה?","choices":["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],"correct":0,"explanation":{"he":"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 1"}},{"id":"physics-basics-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?","choices":["0.1 מ״מ","10 מ״מ","1 מ״מ"],"correct":0,"explanation":{"he":"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}},{"id":"physics-basics-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה מודדים ערימת דפים בלי הכריכה?","choices":["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],"correct":0,"explanation":{"he":"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 3"}}]},{"id":"physics-units","subject_id":"physics","exam_id":"physics-v1-assessment","title":"המרת יחידות אורך","description":"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-units-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים יש במטר אחד?","choices":["10","100","1,000"],"correct":1,"explanation":{"he":"מטר אחד שווה ל־100 סנטימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים יש בסנטימטר אחד?","choices":["10","100","1,000"],"correct":0,"explanation":{"he":"סנטימטר אחד שווה ל־10 מילימטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים יש ב־2 קילומטרים?","choices":["200","2,000","20,000"],"correct":1,"explanation":{"he":"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 2.4 מטרים?","choices":["24","240","2,400"],"correct":1,"explanation":{"he":"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מטרים הם 350 סנטימטרים?","choices":["3.5","35","0.35"],"correct":0,"explanation":{"he":"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה הם מטר אחד ועוד 25 ס״מ?","choices":["1.25 מטרים","26 מטרים","1.025 מטרים"],"correct":0,"explanation":{"he":"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה מילימטרים הם 3 ס״מ?","choices":["30 מ״מ","3 מ״מ","300 מ״מ"],"correct":0,"explanation":{"he":"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה סנטימטרים הם 12 מ״מ?","choices":["1.2 ס״מ","12 ס״מ","120 ס״מ"],"correct":0,"explanation":{"he":"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"כמה קילומטרים הם 1,500 מטרים?","choices":["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],"correct":0,"explanation":{"he":"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה ארוך יותר: 90 ס״מ או מטר אחד?","choices":["מטר אחד","90 ס״מ","הם שווים"],"correct":0,"explanation":{"he":"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}},{"id":"physics-units-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?","choices":["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],"correct":0,"explanation":{"he":"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 2"}}]},{"id":"physics-precision","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים נכון","description":"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-precision-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"מאיזו נקודה בסרגל מתחילים למדוד אורך?","choices":["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],"correct":0,"explanation":{"he":"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?","choices":["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?","choices":["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],"correct":0,"explanation":{"he":"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים יותר למדידת אורך של חדר?","choices":["סרט מדידה","סרגל קצר בלבד","שעון"],"correct":0,"explanation":{"he":"סרט מדידה מתאים יותר לאורכו של חדר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה מאפשרות שנתות קטנות יותר על כלי מדידה?","choices":["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],"correct":0,"explanation":{"he":"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"מדוע חוזרים על מדידה?","choices":["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],"correct":0,"explanation":{"he":"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?","choices":["6 ס״מ","9 ס״מ","12 ס״מ"],"correct":0,"explanation":{"he":"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה לא תמיד מתחילים למדוד מקצה הסרגל?","choices":["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],"correct":0,"explanation":{"he":"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה כלי מתאים למדידת אורך של עיפרון?","choices":["סרגל עם שנתות קטנות","שעון עצר","מדחום"],"correct":0,"explanation":{"he":"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה חזרה על מדידה אינה מתקנת בהכרח?","choices":["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],"correct":0,"explanation":{"he":"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}},{"id":"physics-precision-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה כדאי לבדוק לפני שרושמים תוצאה?","choices":["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],"correct":0,"explanation":{"he":"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 4"}}]},{"id":"physics-pole","subject_id":"physics","exam_id":"physics-v1-assessment","title":"מודדים גובה של עמוד","description":"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.","references":[{"id":"physics-pdf","kind":"pdf","title":"סיכום נושא מדידות (PDF)","url":"assets/materials/physics-measurements-grade-7.pdf","attribution":"שרית שרת","parts":[{"part":"עמוד 1","title":"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{"part":"עמוד 2","title":"המרת יחידות אורך"},{"part":"עמוד 3","title":"איך מודדים עובי של דף?"},{"part":"עמוד 4","title":"דיוק ומדידה נכונה"},{"part":"עמוד 5","title":"מודדים גובה של עמוד: הרעיון הגאומטרי"},{"part":"עמוד 6","title":"מדידת העמוד בפועל"}]}],"questions":[{"id":"physics-pole-01","position":1,"type":"mcq","topic":null,"difficulty":null,"prompt":"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?","choices":["45°","90°","180°"],"correct":0,"explanation":{"he":"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-02","position":2,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה שווה למרחק האופקי לעמוד בשיטת 45°?","choices":["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],"correct":0,"explanation":{"he":"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-03","position":3,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?","choices":["7.4 מטרים","6 מטרים","4.6 מטרים"],"correct":0,"explanation":{"he":"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-04","position":4,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה מרחק מודדים לצורך החישוב?","choices":["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],"correct":0,"explanation":{"he":"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-05","position":5,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה גובה מוסיפים למרחק האופקי?","choices":["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],"correct":0,"explanation":{"he":"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-06","position":6,"type":"mcq","topic":null,"difficulty":null,"prompt":"איזה תנאי נדרש לשיטה המתוארת?","choices":["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],"correct":0,"explanation":{"he":"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-07","position":7,"type":"mcq","topic":null,"difficulty":null,"prompt":"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?","choices":["5.5 מטרים","4 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-08","position":8,"type":"mcq","topic":null,"difficulty":null,"prompt":"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?","choices":["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],"correct":0,"explanation":{"he":"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-09","position":9,"type":"mcq","topic":null,"difficulty":null,"prompt":"מהו תפקיד המשולש בעל זווית 45°?","choices":["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],"correct":0,"explanation":{"he":"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}},{"id":"physics-pole-10","position":10,"type":"mcq","topic":null,"difficulty":null,"prompt":"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?","choices":["5 מטרים","10 מטרים","2.5 מטרים"],"correct":0,"explanation":{"he":"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 5"}},{"id":"physics-pole-11","position":11,"type":"mcq","topic":null,"difficulty":null,"prompt":"למה זו מדידה עקיפה?","choices":["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],"correct":0,"explanation":{"he":"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.","en":""},"ref":{"id":"physics-pdf","part":"עמוד 6"}}]}]'),ps={quizzes:em};function tm(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,c=new Ut;let l=0;for(let u=0;u<i.length;++u){const d=i[u];let h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.attributes[p]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in d.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0;const d=[];for(let h=0;h<i.length;++h){const p=i[h].index;for(let M=0;M<p.count;++M)d.push(p.getX(M)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(const u in s){const d=wc(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){const p=[];for(let E=0;E<a[u].length;++E)p.push(a[u][E][h]);const M=wc(p);if(!M)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(M)}}return c}function wc(i){let e,t,n,r=-1,s=0;for(let l=0;l<i.length;++l){const u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new dn(a,t,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const d=c/t;for(let h=0,p=u.count;h<p;h++)for(let M=0;M<t;M++){const E=u.getComponent(h,M);o.setComponent(h+d,M,E)}}else a.set(u.array,c);c+=u.count*t}return r!==void 0&&(o.gpuType=r),o}function nm(i=globalThis.crypto){if(typeof i.randomUUID=="function")return i.randomUUID();const e=i.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const Ze=[{id:"owl",name:"נועה",role:"צוות התוכנה · הספרייה",system:"מסוף הגישה",color:"#91b6c5",x:-13,z:-9,line:"המסוף נתקע וכולם שולחים לי הוראות שונות. אני צריכה לבדוק מה באמת קרה, לא עוד עשר השערות. אפשר לעבור איתי על הדברים אחד־אחד?",choices:["נקשיב למה שכבר בדקה ונבחר יחד צעד אחד","ננסה לשנות הכול בבת אחת","נחליט שהיא לא מבינה ונתפוס פיקוד"],need:0,reply:"מעולה. סוף סוף מישהו שלא מציע לכבות ולהדליק את כל בית הספר.",wrong:"נועה מצביעה על רשימת הבדיקות. היא מבקשת שיתוף פעולה וסדר, לא עוד רעש."},{id:"pigeon",name:"איתי",role:"צוות הרובוטיקה · החממה",system:"מערכת הגיבוי",color:"#b5bd9d",x:13,z:-7,line:"אני מחזיק את בקר הגיבוי כבר רבע שעה, ואף אחד לא שאל אם אני צריך עזרה. לא, הכול בסדר. ברור. רק קצת נגמרות לי הידיים.",choices:["נשאל מה אפשר לקחת ממנו ונתחלק במשימה","נגיד לו להפסיק להתלונן","נתחיל להסביר לו איך לעבוד מהר יותר"],need:0,reply:"קחו את החלק של למצוא ציוד. אני אקח את החלק של לא להפיל את הפרויקט של כל הכיתה.",wrong:"הוא מסתכל על הציוד שבידיים שלו. הבעיה היא עומס, לא חוסר ידע."},{id:"raccoon",name:"אדם",role:"צוות התקשורת · מגדל הקשר",system:"ערוץ הקשר",color:"#c6aa83",x:10,z:14,line:"שמעתם את הרעש מהיער? אני יודע שזאת כנראה חיה. עדיין, מעדיף לא לעבור שם לבד. לא צריך להכריז על זה בקבוצת הכיתה.",choices:["נציע להתקדם יחד ולשמור את זה בינינו","נצלם אותו כדי להצחיק את הקבוצה","נגיד שאין שום סיבה להרגיש ככה"],need:0,reply:"תודה. מסתבר שעבודת צוות היא גם לצאת מהמצגת וללכת ביחד.",wrong:"אדם ביקש חברה ודיסקרטיות. אפשר לעזור בלי לבטל את מה שהוא מרגיש."}],wt=[{id:"card",name:"כרטיס צוות איינשטיין",short:"כרטיס גישה",x:-21,z:-3,npc:0,hint:"על שולחן העבודה שממערב לספרייה, ליד השביל לאגם.",clue:"על הכרטיס כתוב: צוות איינשטיין — כיתת הייטק. בגב הכרטיס רשומה הערה: נוהל היציאה דורש אימות של שלושת מסופי הפרויקט.",report:"כרטיס הגישה נמצא. המסוף בספרייה יכול להתחבר עכשיו למערכת התרגול."},{id:"fuse",name:"יחידת גיבוי לפרויקט",short:"יחידת גיבוי",x:21,z:3,npc:1,hint:"בארגז הציוד שממזרח לחממה. חפשו את הסימון הצהוב.",clue:"זו יחידת גיבוי לימודית של הרובוטיקה. על המדבקה: מי שלוקח — מחזיר. מתחת, מישהו הוסיף: כן, גם אם זה עובד.",report:"יחידת הגיבוי נמצאה. איתי יוכל להפעיל את התחנה אחרי בדיקת התרגול."},{id:"antenna",name:"אנטנת תחנת הקשר",short:"אנטנה",x:-8,z:22,npc:2,hint:"ליד עמדת הקשר הישנה, בדרום־מערב המתחם.",clue:"מחברת פתוחה ליד האנטנה: צוות התקשורת, ז׳ איינשטיין. כששלוש התחנות פעילות, השער חוזר למצב יציאה. ברקע נשמע רעש — הפעם באמת ברווז.",report:"האנטנה נמצאה. חוזרים לאדם במגדל ומשלימים את בדיקת הקשר."}],pi={x:0,z:-25},qa=(i,e=Math.random)=>{const t=[...i];for(let n=t.length-1;n>0;n--){const r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t};function dl(i){return!!i&&typeof i.id=="string"&&typeof i.title=="string"&&Array.isArray(i.references)&&Array.isArray(i.questions)&&i.questions.length>0&&i.questions.length<=30&&new Set(i.questions.map(e=>e.id)).size===i.questions.length&&i.questions.every(e=>{var t;return typeof e.id=="string"&&typeof e.prompt=="string"&&e.type==="mcq"&&Array.isArray(e.choices)&&e.choices.length>=2&&e.choices.every(n=>typeof n=="string")&&Number.isInteger(e.correct)&&e.correct>=0&&e.correct<e.choices.length&&typeof((t=e.explanation)==null?void 0:t.he)=="string"&&i.references.some(n=>{var r,s;return n.id===((r=e.ref)==null?void 0:r.id)&&(!e.ref.part||((s=n.parts)==null?void 0:s.some(a=>a.part===e.ref.part)))})})}function im(i,e=Math.random){if(!dl(i))throw new Error("Invalid quiz");const t=qa(i.questions,e).map(n=>({...n,options:qa(n.choices.map((r,s)=>({text:r,original:s})),e)}));return{quizId:i.id,questions:t,assignments:Ze.map((n,r)=>t.filter((s,a)=>a%3===r).map(s=>s.id)),environment:Sr(),answers:{},understood:[],seals:[],items:[],collected:[],elapsed:0,player:{x:0,z:9},startedAt:Date.now(),attemptId:nm()}}function rm(i,e,t){if(Object.hasOwn(i.answers,e))return null;const n=i.questions.find(s=>s.id===e);if(!n||!Number.isInteger(t)||t<0||t>=n.choices.length)return null;const r={choice:t,correct:t===n.correct};return i.answers[e]=r,r}function On(i,e){const t=i.assignments[e];return{answered:t.filter(n=>Object.hasOwn(i.answers,n)).length,total:t.length,next:t.find(n=>!Object.hasOwn(i.answers,n))}}function fl(i){const e={easy:1,medium:1.5,hard:2},t=i.questions.reduce((n,r)=>n+(e[r.difficulty]||1.5),0);return Math.round(i.questions.reduce((n,r)=>{var s;return n+((s=i.answers[r.id])!=null&&s.correct?e[r.difficulty]||1.5:0)},0)/t*100)}const sm=i=>i>=90?3:i>=75?2:i>=50?1:0;function gn(i){return i.seals.length===3&&Object.keys(i.answers).length===i.questions.length}function hl(i,e){try{const t=JSON.parse(i);if(!t||t.quizId!==e.id||typeof t.attemptId!="string"||!Number.isFinite(t.startedAt)||!Number.isFinite(t.elapsed)||t.elapsed<0||!Array.isArray(t.questions)||t.questions.length!==e.questions.length||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||Math.abs(t.player.x)>27||Math.abs(t.player.z)>27||t.participantName!==void 0&&(typeof t.participantName!="string"||!t.participantName.trim()||t.participantName.length>60))return null;const n=new Set;for(const r of t.questions){const s=e.questions.find(a=>a.id===r.id);if(!s||n.has(r.id)||JSON.stringify({...r,options:void 0})!==JSON.stringify(s)||(n.add(r.id),!Array.isArray(r.options)||r.options.length!==s.choices.length||new Set(r.options.map(a=>a.original)).size!==r.options.length||r.options.some(a=>s.choices[a.original]!==a.text)))return null}if(!t.answers||typeof t.answers!="object")return null;for(const[r,s]of Object.entries(t.answers)){const a=e.questions.find(o=>o.id===r);if(!a||!Number.isInteger(s.choice)||s.choice<0||s.choice>=a.choices.length||s.correct!==(s.choice===a.correct))return null}return t.assignments=Ze.map((r,s)=>t.questions.filter((a,o)=>o%3===s).map(a=>a.id)),!Array.isArray(t.understood)||t.understood.some(r=>!Ze.some(s=>s.id===r))?null:(t.items=Array.isArray(t.items)?[...new Set(t.items.filter(r=>wt.some(s=>s.id===r)))]:[],t.seals=Ze.filter((r,s)=>t.understood.includes(r.id)&&t.items.includes(wt[s].id)&&On(t,s).answered===On(t,s).total).map(r=>r.id),t.collected=Array.isArray(t.collected)?[...new Set(t.collected.filter(r=>Number.isInteger(r)&&r>=0&&r<12))]:[],t.environment=Sr(t.environment),t)}catch{return null}}function am(i,{reduced:e=!1,onMove:t,onInteract:n,onCollect:r,onEnvironmentChange:s}){let a=7919;const o=()=>((a=a*16807%2147483647)-1)/2147483646,c=new Ku;c.background=new Ke("#1a2833"),c.fog=new lo("#1a2833",.011);const l=new Ht(46,innerWidth/innerHeight,.1,210),u=new J0({antialias:!0,powerPreference:"high-performance"});u.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.15:1.5)),u.setSize(innerWidth,innerHeight),u.shadowMap.enabled=!0,u.shadowMap.type=Uc,u.outputColorSpace=Ot,u.toneMapping=Nc,u.toneMappingExposure=1.25,u.domElement.setAttribute("aria-label","קמפוס בית הספר בתלת־ממד. זזים בחצים או במקשי WASD; אפשר ללחוץ על הקרקע."),i.appendChild(u.domElement),c.add(new rd("#b3c5de","#374039",1.25));const d=new ec("#a4bdd5",2);d.position.set(-22,34,12),d.castShadow=!0,d.shadow.mapSize.set(innerWidth<600?1024:1536,innerWidth<600?1024:1536),Object.assign(d.shadow.camera,{left:-38,right:38,top:38,bottom:-38,near:.1,far:100}),d.shadow.bias=-6e-4,d.shadow.normalBias=.035,c.add(d);const h=new ec("#d7a270",.65);h.position.set(12,7,-40),c.add(h);const p=new Map;function M(x,S=!1){const _=`${x}/${S}`;return p.has(_)||p.set(_,new Xn({color:x,roughness:.9,...S?{emissive:x,emissiveIntensity:1.15}:{}})),p.get(_)}function E(x){const S=document.createElement("canvas");S.width=S.height=256;const _=S.getContext("2d");_.fillStyle=x==="grass"?"#798073":x==="brick"?"#9b8a79":"#969a9b",_.fillRect(0,0,256,256);for(let z=0;z<11e3;z++){const j=Math.floor(o()*60),ee=o()*256,re=o()*256;_.fillStyle=`rgba(${j},${j},${j},${o()*.13})`,_.fillRect(ee,re,x==="grass"?1:2,x==="grass"?4:2)}if(x==="brick"){_.strokeStyle="#6b6f6b",_.lineWidth=2;for(let z=0;z<256;z+=32){_.beginPath(),_.moveTo(0,z),_.lineTo(256,z),_.stroke();for(let j=z%64?32:0;j<256;j+=64)_.beginPath(),_.moveTo(j,z),_.lineTo(j,z+32),_.stroke()}}const U=new qs(S);return U.colorSpace=Ot,U.wrapS=U.wrapT=es,U.repeat.set(x==="grass"?26:3,x==="grass"?26:3),U.anisotropy=4,U}const m=new Xn({color:"#667560",map:E("grass"),roughness:1}),f=new Xn({color:"#a8aba5",map:E("concrete"),roughness:.95}),D=new Xn({color:"#b0a698",map:E("brick"),roughness:1}),C=new Xn({color:"#717677",map:E("concrete"),roughness:.95});function L(x,S,_,U,z,j=c,ee=!1){const re=typeof S=="string"?M(S,ee):S,ce=new en(x,re);return ce.position.set(_,U,z),ce.castShadow=!ee,ce.receiveShadow=!ee,j.add(ce),ce}const w=(x,S,_,U,z,j,ee,re=c,ce=!1)=>L(new Zi(U,z,j),ee,x,S,_,re,ce),b=(x,S,_,U,z,j=c,ee=1,re=!1)=>L(new as(U,12,8),z,x,S,_,j,re),R=(x,S,_,U,z,j,ee=c,re=8)=>L(new fo(U,z,re),j,x,S,_,ee),F=(x,S,_,U,z,j,ee=c,re=10)=>L(new Yn(U,U,z,re),j,x,S,_,ee);function g(x,S,_,U,z,j,ee,re=c){const ce=b(x,S,_,1,ee,re);return ce.scale.set(U,z,j),ce}function v(x,S,_,U,z=c){const j=new V(...x),ee=new V(...S),re=ee.clone().sub(j),ce=L(new Yn(_*.7,_,re.length(),7),U,...j.clone().add(ee).multiplyScalar(.5).toArray(),z);return ce.quaternion.setFromUnitVectors(new V(0,1,0),re.normalize()),ce}const A=[],B=(x,S,_)=>A.push({x,z:S,r:_});function I(x,S){return Math.abs(x)>27||Math.abs(S)>27||A.some(_=>!_.disabled&&(_.hx!==void 0?Math.abs(x-_.x)<_.hx+.28&&Math.abs(S-_.z)<_.hz+.28:_.r?Math.hypot(x-_.x,S-_.z)<_.r+.35:((x-_.x)/(_.rx+.3))**2+((S-_.z)/(_.rz+.3))**2<1))}function G(x,S,_,U,z,j=.03){const ee=L(new Yn(1,1,.045,48),z,x,j,S);return ee.scale.set(_,1,U),ee}const X=w(0,-.2,0,180,.3,180,m);X.castShadow=!1;for(let x=0;x<9;x++){const S=x/9*Math.PI*2,_=g(Math.cos(S)*72,3,Math.sin(S)*72,24,9+o()*9,20,"#273c3d");_.castShadow=!1}function $(x,S=2.3){for(let _=0;_<x.length-1;_++){const U=x[_],z=x[_+1],j=Math.hypot(z[0]-U[0],z[1]-U[1]),ee=w((U[0]+z[0])/2,.015,(U[1]+z[1])/2,S,.055,j,C);ee.rotation.y=Math.atan2(z[0]-U[0],z[1]-U[1]),G(U[0],U[1],S/2,S/2,C,.046)}}$([[0,25],[0,12],[-3,4],[0,-4],[0,-12]],3.1),$([[-3,4],[-10,1],[-13,-9],[-15,-17]],2.5),$([[0,-4],[8,-5],[13,-7],[20,-13]],2.5),$([[0,12],[10,14],[19,18]],2.5),$([[-13,-9],[-7,-15],[0,-16],[8,-17],[13,-7]],2.1),$([[0,-12],[7,-17],[7,-24],[0,-25]],2.2),G(0,9,4.6,3.8,f,.05),G(-17,13,7.1,5.5,"#4c5c52",.025);const ie=new Xn({color:"#214d5b",roughness:.18,metalness:.45});G(-17,13,6.7,5.2,ie,.06),A.push({x:-17,z:13,rx:6.5,rz:5});for(let x=0;x<28;x++){const S=o()*Math.PI*2,_=-17+Math.cos(S)*7,U=13+Math.sin(S)*5.5;for(let z=0;z<3;z++)v([_+z*.1,0,U],[_+z*.1+.08,.5+o()*.5,U],.018,"#7a8464")}for(let x=0;x<7;x++){const S=x*.9;G(-17+Math.cos(S)*4.6,13+Math.sin(S)*3,.28,.23,"#71836b",.09)}const q=new Xn({color:"#687b83",roughness:.22,metalness:.55}),te=new Xn({color:"#c7b38d",emissive:"#b38551",emissiveIntensity:.55,roughness:.35}),K=[],fe={x:-2,z:-16.86,hx:1.34,hz:.09};function Se(){const x=new ht;x.position.set(-2,0,-20),c.add(x),w(0,4.9,0,12,3.2,6,D,x),w(0,6.65,0,12.6,.35,6.6,f,x),w(0,.03,0,12,.08,6,f,x),w(0,1.65,-2.85,12,3.3,.3,D,x);for(const S of[-1,1])w(S*5.85,1.65,0,.3,3.3,6,D,x),w(S*3.68,1.65,2.9,4.64,3.3,.2,D,x);w(0,1.2,-2.65,5,1.4,.04,"#526660",x),w(0,1.2,-2.6,2.2,.9,.04,"#d6cfb6",x),w(0,.2,3.5,13,.4,1.5,f,x),w(0,.08,4.15,6,.16,.7,f,x);for(const S of[-1,1]){const _=new ht;_.position.set(S*1.34,0,3.14),x.add(_),w(-S*.67,1.65,0,1.32,3.3,.07,q,_),F(-S*1.13,1.5,.08,.025,.5,"#b5b9b6",_),K.push(_)}w(0,3.7,3.8,3.4,.13,1.5,"#45555d",x);for(const S of[-4.75,-3.15,3.15,4.75])for(const _ of[1.9,4.65])w(S,_,3.045,1.3,1.7,.12,"#34424a",x),w(S,_,3.115,1.12,1.5,.03,(S+_)%2>.9?te:q,x),w(S,_,3.14,.04,1.55,.05,"#9a9e98",x),w(S,_+.02,3.14,1.16,.04,.05,"#9a9e98",x);for(const S of[-5.2,-1.7,1.7,5.2])w(S,3.25,3.11,.15,6.5,.15,"#c4c2b8",x);w(-3.9,7.05,-.8,2,.7,1.1,"#626e73",x);for(let S=0;S<7;S++)w(-4.7+S*.25,7.1,-.2,.05,.45,.05,"#34434b",x);F(4,8,-1,.06,2.7,"#7a868b",x),v([3.5,8.5,-1],[4.5,8.5,-1],.025,"#929a9b",x),A.push(fe,{x:-2,z:-22.85,hx:6,hz:.15},{x:-7.85,z:-20,hx:.15,hz:3},{x:3.85,z:-20,hx:.15,hz:3},{x:-5.68,z:-17.1,hx:2.32,hz:.1},{x:1.68,z:-17.1,hx:2.32,hz:.1})}Se();function Ce(x,S,_=!1){const U=new ht;if(U.position.set(x,0,S),c.add(U),w(0,1.9,0,5.5,3.8,4.4,_?"#445e60":D,U),w(0,3.95,0,5.8,.25,4.7,f,U),_){for(const z of[-2,-.7,.7,2])w(z,2,2.23,1.05,2.9,.08,q,U),w(z,2,2.3,.06,3.6,.08,"#a2b2ab",U);for(const z of[-1.5,0,1.5])w(-2.8,2,z,.08,2.9,1.1,q,U)}else w(-1.8,2.1,2.25,1.3,1.5,.08,te,U),w(1.8,2.1,2.25,1.3,1.5,.08,q,U);return w(0,1.5,2.3,1.2,3,.1,"#293b42",U),w(0,1.6,2.37,.9,2.5,.05,q,U),w(0,.12,2.8,3,.24,1.1,f,U),B(x,S,3.45),U}Ce(-17,-12),Ce(18,-11,!0);const Ie=new ht;Ie.position.set(16,0,16),c.add(Ie);for(const x of[-.85,.85])for(const S of[-.85,.85])v([x,0,S],[x*.6,8,S*.6],.085,"#737b7d",Ie);for(let x=0;x<8;x+=2)v([-.85,x,-.85],[.85,x+2,-.85],.04,"#646f73",Ie),v([-.85,x,.85],[.85,x+2,.85],.04,"#646f73",Ie),w(0,x,0,1.8,.08,1.8,"#566269",Ie);w(0,8.2,0,2.8,.2,2.8,"#59666b",Ie),F(0,9.5,0,.045,2.6,"#9aa9ad",Ie),w(0,10.4,0,1.7,.05,.05,"#9aa9ad",Ie);const Qe=L(new as(.65,16,10,0,Math.PI*2,0,Math.PI/2),"#819398",.85,7.8,.9,Ie);Qe.rotation.x=-Math.PI/2,B(16,16,1.7);function J(x,S){const _=Math.hypot(S[0]-x[0],S[1]-x[1]),U=Math.ceil(_/2.5);for(let z=0;z<=U;z++){const j=z/U;w(x[0]+(S[0]-x[0])*j,1.05,x[1]+(S[1]-x[1])*j,.07,2.1,.07,"#48585e")}for(const z of[.5,1.4,2.05])v([x[0],z,x[1]],[S[0],z,S[1]],.018,"#738184")}J([-27,-27],[-3,-27]),J([3,-27],[27,-27]),J([-27,-27],[-27,27]),J([27,-27],[27,27]),J([-27,27],[27,27]),w(-2.5,2.4,-25,.38,4.8,.5,f),w(2.5,2.4,-25,.38,4.8,.5,f),w(0,4.8,-25,5.4,.3,.6,"#5b686c");const oe=new ht;c.add(oe);const ye=[-1,1].map(x=>{const S=new ht;S.position.set(x*2.2,0,-25),oe.add(S);for(let _=0;_<7;_++)w(-x*_*.32,1.9,0,.045,3.8,.08,"#66757a",S);for(const _ of[.7,2.7,3.8])w(-x*1,_,0,2.15,.06,.08,"#66757a",S);return S}),ze=[-1.15,0,1.15].map(x=>w(x,4.8,-24.65,.28,.13,.06,"#b66c4f",c,!0)),Ae=new js("#accca0",0,8,2);Ae.position.set(0,3.5,-25),c.add(Ae);function He(x,S,_,U="#d9b574"){const z=document.createElement("canvas");z.width=z.height=64;const j=z.getContext("2d"),ee=j.createRadialGradient(32,32,1,32,32,32);ee.addColorStop(0,"rgba(244,211,153,.24)"),ee.addColorStop(1,"rgba(244,211,153,0)"),j.fillStyle=ee,j.fillRect(0,0,64,64);const re=new en(new $i(_,_),new ss({map:new qs(z),transparent:!0,depthWrite:!1,color:U}));return re.rotation.x=-Math.PI/2,re.position.set(x,.11,S),c.add(re),re}function vt(x,S){F(x,1.9,S,.045,3.8,"#43525b"),w(x,3.75,S+.24,.15,.13,.65,"#b8b6a3",c);const _=w(x,3.68,S+.35,.11,.025,.4,"#d6b884",c,!0),U=He(x,S+1.1,4.8);return{bulb:_,pool:U}}const We=vt(-2,10);[[2,-4],[-12,-7],[12,-5],[10,12],[-5,-13],[6,-22],[2,-25],[-8,2],[18,4]].forEach(x=>vt(...x));const at=new js("#e5b777",12,14,2);at.position.set(-2,3.8,-15.5),c.add(at);function N(x,S,_=0){const U=new ht;U.position.set(x,0,S),U.rotation.y=_,c.add(U);for(let z=0;z<4;z++)w(0,.56,-.33+z*.22,2.5,.06,.17,"#837864",U);for(let z=0;z<3;z++)w(0,.95+z*.17,-.48,2.5,.12,.06,"#837864",U);for(const z of[-.9,.9])w(z,.27,0,.07,.54,.73,"#3d4a51",U),w(z,.98,-.48,.06,.84,.06,"#3d4a51",U);B(x,S,1.15)}N(8,15),N(-10,-8,Math.PI/2),N(-6,10),w(11,.015,22,11,.05,7,"#606f6c");for(const x of[5.6,16.4])w(x,.06,22,.04,.01,6.7,"#b8b9ad");for(const x of[18.7,25.3])w(11,.06,x,10.8,.01,.04,"#b8b9ad");const Xe=L(new jn(1.75,1.78,48),"#b8b9ad",11,.07,22);Xe.rotation.x=-Math.PI/2,F(16.3,1.65,22,.07,3.3,"#6e7b7d"),w(15.95,3.1,22,.08,1.05,1.6,"#9da9a5"),w(15.89,3.05,22,.02,.5,.75,"#c1c6b5");const qe=L(new Vi(.27,.025,5,18),"#a87957",15.58,2.83,22);qe.rotation.x=Math.PI/2,B(16.3,22,.25);for(let x=0;x<3;x++){const S=-20.5+x*.5,_=L(new Vi(.35,.035,5,12,Math.PI),"#7e898a",S,.35,-8.5);_.rotation.y=Math.PI/2}for(const x of[-22,-21]){const S=L(new Vi(.31,.035,5,18),"#26353d",x,.35,-8.5);S.rotation.y=Math.PI/2}v([-22,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),v([-21,.35,-8.5],[-21.5,.9,-8.5],.025,"#93624d"),v([-22,.35,-8.5],[-21,.35,-8.5],.025,"#93624d");function nt(x,S,_=1){const U=new ht;U.position.set(x,0,S),U.scale.setScalar(_),c.add(U);const z=(o()-.5)*.6;v([0,0,0],[z,4.6,0],.19,"#665f51",U);for(let j=0;j<4;j++){const ee=j*Math.PI*.5+o()*.5,re=Math.cos(ee)*(1+o()*.5),ce=Math.sin(ee)*(1+o()*.5),me=3.5+o()*2;v([z*.6,2.4+j*.4,0],[re,me,ce],.075,"#605c4e",U);const Oe=g(re,me+.7,ce,1.4+o()*.6,1.5+o()*.6,1.3+o()*.6,["#344a3e","#405947","#465b49","#51634c"][j],U);Oe.rotation.z=(o()-.5)*.8}B(x,S,.45*_)}for(let x=0;x<56;x++){const S=x%4,_=-29+Math.floor(x/4)*4.1,U=o()*2;nt(S<2?_:(S===2?-29:29)+U,S<2?(S===0?-29:29)+U:_,.75+o()*.45)}[[-23,-8],[-24,-3],[-22,1],[-20,-3],[-8,20],[-5,23],[6,26],[21,5],[24,1],[21,-2],[8,-13],[-7,-5],[-9,-18],[22,22],[-24,22],[-9,16]].forEach(([x,S])=>nt(x,S,.65+o()*.4));for(let x=0;x<120;x++){const S=(o()-.5)*54,_=(o()-.5)*54;if(!(Math.abs(S)<4||A.some(U=>Math.hypot(S-U.x,_-U.z)<(U.r||7)+.8)))if(x%5===0){const U=g(S,.2,_,.45+o()*.3,.25,.4,"#737b72");U.rotation.y=o()*6}else for(let U=0;U<3;U++)v([S+U*.1,0,_],[S+U*.1+.08,.25+o()*.25,_+.06],.012,"#6c7c5d")}function Me(x,S,_,U,z,j=""){const ee=document.createElement("canvas");ee.width=1024,ee.height=256;const re=ee.getContext("2d");re.fillStyle="#243139",re.fillRect(0,0,1024,256),re.strokeStyle="#a5a894",re.lineWidth=4,re.strokeRect(12,12,1e3,232),re.textAlign="center",re.direction="rtl",re.fillStyle="#e1dfd1",re.font="bold 62px Arial",re.fillText(z,512,j?108:150),j&&(re.font="34px Arial",re.fillStyle="#bfc6bb",re.fillText(j,512,190));const ce=new qs(ee);ce.colorSpace=Ot,ce.anisotropy=4;const me=new en(new $i(U,U/4),new ss({map:ce,side:mn}));return me.position.set(x,S,_),c.add(me),me}Me(-2,5.75,-16.75,10,"בית הספר שי עגנון","כיתה ז׳ איינשטיין · כיתת הייטק"),Me(-17,3.55,-9.65,4.4,"01 · ספריית איינשטיין"),Me(18,3.55,-8.65,4.4,"02 · מעבדת ההייטק"),Me(16,3.2,17.1,3.2,"03 · תחנת הקשר"),Me(0,5.55,-24.8,4.8,"יציאה"),w(-4,1.1,5,.07,2.2,.07,"#64716d"),Me(-4,2.1,5.1,3.5,"קמפוס שי עגנון","ז׳ איינשטיין · כיתת הייטק"),b(-38,30,-57,1.7,"#bbcbd3",c,3,!0);const ct=[];for(let x=0;x<85;x++){const S=o()*Math.PI*2,_=65+o()*35;ct.push(Math.cos(S)*_,25+o()*40,Math.sin(S)*_)}const we=new Ut;we.setAttribute("position",new pt(ct,3)),c.add(new td(we,new tl({color:"#bbcad6",size:.08,transparent:!0,opacity:.65})));const Ne=new Map;function P(x,S,_){const U=new ht;return U.position.set(S,0,_),c.add(U),w(0,.45,0,.85,.9,.6,"#4b575a",U),w(0,.95,0,1.05,.1,.8,"#7c8580",U),Ne.set(x,U),U}const y=P("card",-21,-3);w(0,1.05,0,.48,.035,.3,"#c7c8b8",y),w(-.11,1.073,0,.12,.005,.18,"#507c86",y);for(let x=0;x<3;x++)w(.08,1.073,-.07+x*.065,.17,.005,.015,"#606765",y);const W=P("fuse",21,3),ne=F(0,1.09,0,.07,.45,"#d6ccac",W);ne.rotation.z=Math.PI/2;for(const x of[-.21,.21]){const S=F(x,1.09,0,.075,.07,"#a6b0b2",W);S.rotation.z=Math.PI/2}const ae=P("antenna",-8,22);w(0,1.12,0,.35,.25,.22,"#2e3e48",ae),v([0,1.25,0],[.24,2.05,.02],.018,"#bbc5c1",ae),w(0,1.14,.12,.19,.1,.025,"#718576",ae);const Y=Ze.map((x,S)=>{const _=new ht;_.position.set(x.x+1.2,0,x.z-.9),c.add(_),w(0,.65,0,.7,1.3,.45,"#4a585d",_);const U=w(0,1.05,.24,.48,.34,.025,"#a4784e",_,!0);w(0,.67,.25,.45,.06,.05,"#7b8988",_);const z=new js("#e3ae72",0,7,2);return z.position.set(x.x,2.5,x.z),c.add(z),{g:_,screen:U,light:z}}),Ee=Q0({scene:c,box:w,ball:b,cyl:F,mesh:L,segment:v,mat:M,sign:Me,softPool:He,doorLeaves:K,doorBlocker:fe,lampFixture:We});c.updateMatrixWorld(!0);const ge=new Set([oe,...ze,...Ne.values(),...Y.map(x=>x.g),...Ee.dynamic]),Re=new Map,Te=[];c.traverse(x=>{if(!x.isMesh)return;let S=x;for(;S;){if(ge.has(S))return;S=S.parent}if(x.material.transparent)return;const _=Re.get(x.material)||[];_.push(x.geometry.clone().applyMatrix4(x.matrixWorld)),Re.set(x.material,_),Te.push(x)});for(const[x,S]of Re){const _=tm(S);if(!_)continue;const U=new en(_,x);U.castShadow=!x.isMeshBasicMaterial&&!(x.emissiveIntensity>1),U.receiveShadow=!0,c.add(U);for(const z of S)z.dispose()}for(const x of Te)x.removeFromParent(),x.geometry.dispose();function le(x="#a26e4e",S="#c7a78b",_="#313236",U=!0){const z=new ht,j=[],ee=[];for(const re of[-1,1]){const ce=new ht;ce.position.set(re*.13,.91,0),z.add(ce),L(new Bi(.1,.59,4,8),"#3e4b55",0,-.36,0,ce),g(0,-.83,.09,.115,.08,.23,"#27343a",ce),j.push(ce)}L(new Bi(.235,.4,4,10),x,0,1.22,0,z).scale.z=.7,g(0,1.48,-.08,.24,.16,.18,x,z),F(0,1.57,0,.075,.15,S,z),g(0,1.77,.015,.17,.215,.16,S,z),g(0,1.89,-.035,.177,.12,.17,_,z),g(0,1.82,-.12,.17,.16,.06,_,z);for(const re of[-.065,.065])b(re,1.79,.169,.015,"#343833",z);g(0,1.73,.18,.025,.035,.045,S,z);for(const re of[-1,1]){const ce=new ht;ce.position.set(re*.27,1.47,0),z.add(ce),L(new Bi(.075,.36,4,8),x,0,-.21,0,ce),g(0,-.49,0,.07,.1,.065,S,ce),ce.rotation.z=re*.09,ee.push(ce)}if(U){const re=L(new Bi(.19,.26,4,8),"#33434a",0,1.2,-.24,z);re.scale.z=.55;for(const ce of[-1,1])w(ce*.14,1.31,.16,.04,.43,.025,"#c0b69b",z);w(0,1.2,-.37,.21,.1,.035,"#8b9b91",z)}return z.userData={legs:j,arms:ee},z}const Z=le();Z.position.set(0,0,9),c.add(Z);const Ue=L(new Yn(.035,.045,.18,8),"#303c42",.3,.92,.13,Z);Ue.rotation.x=Math.PI/2,b(.3,.92,.23,.03,"#e6d4a5",Z,1,!0);const Pe=new _t;Pe.position.set(.3,.1,6),Z.add(Pe);const ve=new ad("#f0dab1",18,13,.36,.65,1.6);ve.position.set(.3,.95,.24),ve.target=Pe,Z.add(ve);const Fe=L(new jn(.43,.46,40),"#b9c2b3",0,.1,9,c,!0);Fe.rotation.x=-Math.PI/2;function O(x="#9f704e",S=!1){const _=new ht,U=[];g(0,.48,0,.21,.26,.56,x,_),g(0,.67,.43,.22,.24,.24,x,_);const z=R(0,.61,.7,.115,.35,"#c7c3ac",_,10);z.rotation.x=Math.PI/2,b(0,.61,.88,.04,"#293533",_);for(const ee of[-.13,.13])R(ee,.99,.42,.1,.3,x,_,4),R(ee,.99,.45,.055,.18,"#62564c",_,4),b(ee,.73,.59,.022,"#252d2d",_);for(const ee of[-.14,.14])for(const re of[-.31,.32]){const ce=new ht;ce.position.set(ee,.45,re),_.add(ce),F(0,-.19,0,.045,.4,"#514c44",ce,7),g(0,-.39,.03,.05,.04,.1,"#353c39",ce),U.push(ce)}const j=g(0,.56,-.76,.16,.17,.49,x,_);return j.rotation.x=-.4,g(0,.72,-1.1,.13,.13,.2,"#c6c4ae",_),_.userData={legs:U},S&&_.scale.setScalar(.85),_}function xe(x,S){const _=new ht;if(x==="rabbit"){g(0,.24,0,.19,.22,.32,S,_),g(0,.43,.24,.15,.17,.16,S,_);for(const U of[-.075,.075]){const z=g(U,.71,.2,.04,.21,.045,S,_);z.rotation.z=U>0?-.15:.15,b(U,.47,.37,.014,"#263330",_)}g(0,.16,-.28,.085,.09,.08,"#bcbdb0",_);for(const U of[-.15,.15])g(U,.07,.13,.08,.06,.16,S,_)}else{g(0,.32,0,.18,.23,.3,S,_),g(0,.59,.18,.13,.14,.13,S,_);const U=R(0,.57,.37,.035,.15,"#ad9367",_,8);U.rotation.x=Math.PI/2;for(const z of[-.09,.09])b(z,.62,.28,.012,"#222e30",_);for(const z of[-.075,.075])F(z,.08,.04,.016,.16,"#887c62",_,6);g(-.16,.34,-.02,.04,.17,.25,"#58676b",_),g(.16,.34,-.02,.04,.17,.25,"#58676b",_)}return _}const he=Ze.map((x,S)=>{const _=le(["#65747c","#6c7357","#7c5350"][S],["#b5947b","#c7a88a","#af8c72"][S],["#353231","#3c332c","#292e31"][S],S!==1);_.position.set(x.x,0,x.z),_.rotation.y=.3-S*.45,c.add(_);const U=L(new jn(.65,.68,36),x.color,x.x,.1,x.z,c,!0);U.rotation.x=-Math.PI/2;const z=b(x.x,2.35,x.z,.065,"#c1b995",c,1,!0);return{g:_,marker:z,ring:U}}),de=[];for(let x=0;x<16;x++){const S=x%3===0?"fox":x%3===1?"rabbit":"bird",_=S==="fox"?O("#947553",!0):xe(S,S==="rabbit"?"#9d9d8c":"#7d8a8b");let U=(o()-.5)*43,z=(o()-.5)*43;for(let j=0;j<80&&I(U,z);j++)U=(o()-.5)*43,z=(o()-.5)*43;_.position.set(U,0,z),c.add(_),de.push({g:_,type:S,angle:o()*Math.PI*2,speed:.3+o()*.55,turn:o()*4})}for(let x=0;x<3;x++){const S=xe("duck","#8f947b");S.scale.setScalar(1.05),c.add(S),de.push({g:S,type:"duck",angle:x*2,speed:.3,turn:0})}const ue=Array.from({length:12},(x,S)=>{const _=[[-4,12],[-8,4],[-14,-3],[-9,-12],[4,-10],[10,-2],[18,2],[19,11],[9,21],[-7,20],[-23,-1],[5,-23]],[U,z]=_[S];return{x:U,z,mesh:b(U,1.1,z,.055,"#c9c693",c,1,!0)}}),Q=L(new jn(.26,.3,24),"#c1c9b4",0,.12,0,c,!0);Q.rotation.x=-Math.PI/2,Q.visible=!1;const pe=new Set;let De={x:0,z:0},$e=null,Ye=!1,Et=!1,At=0,Mn=0,zt=0,_i=!1,bt=Sr(),Xt=!1,vi=!1;const tn=new V;function ni(){Ye&&!Et&&Mn===0&&(ii(),Xt=!1,At=5.8)}function ii(){bt.seated&&(bt.seated=!1,Z.position.set(-6,0,11.8),s==null||s({seated:!1}))}function bi(x,S){bt=x,Ee.sync(x,S),x.seated?(Z.position.set(-6,-.35,10.1),Z.rotation.y=0,vi=!0):vi&&(Z.position.set(-6,0,11.8),vi=!1),he.forEach((_,U)=>{const z=x.helped.includes(Ze[U].id);_.g.userData.arms[0].rotation.x=z?-1.1:0,_.g.userData.arms[1].rotation.x=z?-.45:0,_.ring.material=M(z?"#bbd0ab":Ze[U].color,!0)})}function Er(x){Ye=x,$e=null,pe.clear(),Xt=!1}function Qi(x){Et=x,pe.clear(),De={x:0,z:0},$e=null,Q.visible=!1}function xs(){pe.clear(),De={x:0,z:0}}window.addEventListener("blur",xs),window.addEventListener("keydown",x=>{!Ye||Et||x.target.matches("input,select,textarea")||(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(x.code)&&x.preventDefault(),pe.add(x.code),x.code==="Space"&&ni(),x.code==="KeyE"&&!x.repeat&&n())}),window.addEventListener("keyup",x=>pe.delete(x.code));const Tr=new ud,gs=new qn(new V(0,1,0),0);let Mi=null;u.domElement.addEventListener("pointerdown",x=>{Mi={x:x.clientX,y:x.clientY}}),u.domElement.addEventListener("pointerup",x=>{if(!Ye||Et||!Mi||Math.hypot(x.clientX-Mi.x,x.clientY-Mi.y)>10)return;Tr.setFromCamera(new Je(x.clientX/innerWidth*2-1,1-x.clientY/innerHeight*2),l);const S=new V;Tr.ray.intersectPlane(gs,S)&&Math.abs(S.x)<27&&Math.abs(S.z)<27&&($e={x:S.x,z:S.z},Q.position.set(S.x,.12,S.z),Q.visible=!0)});const _s=new V(11.5,12.5,15.55);function er(x,S=!0){if(Et||(zt+=x),Ye&&!Et){let _=(pe.has("KeyD")||pe.has("ArrowRight")?1:0)-(pe.has("KeyA")||pe.has("ArrowLeft")?1:0)+De.x,U=(pe.has("KeyS")||pe.has("ArrowDown")?1:0)-(pe.has("KeyW")||pe.has("ArrowUp")?1:0)+De.z,z=_*.806+U*.592,j=-_*.592+U*.806;_||U?(ii(),Xt=!1,$e=null,Q.visible=!1):$e&&(z=$e.x-Z.position.x,j=$e.z-Z.position.z,Math.hypot(z,j)<.2&&($e=null,Q.visible=!1,z=j=0)),$e&&(ii(),Xt=!1);const ee=Math.hypot(z,j),re=ee>.05&&!bt.seated&&!Xt;if(re){const ce=pe.has("ShiftLeft")||pe.has("ShiftRight")?7.2:4.5,me=Z.position.x+z/ee*x*ce,Oe=Z.position.z+j/ee*x*ce;I(me,Z.position.z)||(Z.position.x=me),I(Z.position.x,Oe)||(Z.position.z=Oe),Math.abs(Z.position.x-me)>.01&&Math.abs(Z.position.z-Oe)>.01&&($e=null,Q.visible=!1),Z.rotation.y=Math.atan2(z,j)}(Mn>0||At>0)&&(At-=14*x,Mn=Math.max(0,Mn+At*x),Mn===0&&(At=0)),Z.position.y=bt.seated?-.35:Mn+(!e&&re?Math.sin(zt*14)*.025:0),Z.userData.legs.forEach((ce,me)=>ce.rotation.x=bt.seated?-1.3:!e&&re?Math.sin(zt*10+me*Math.PI)*.5:0),Z.userData.arms.forEach((ce,me)=>ce.rotation.x=bt.seated?-.35:!e&&re?Math.sin(zt*10+me*Math.PI+Math.PI)*.3:0),Fe.position.set(Z.position.x,.1,Z.position.z);for(let ce=0;ce<ue.length;ce++){const me=ue[ce];me.mesh.visible&&Math.hypot(Z.position.x-me.x,Z.position.z-me.z)<.95&&(me.mesh.visible=!1,r(ce))}t(Z.position.x,Z.position.z,x)}if(Et||(Ee.update(x,e),de.forEach((_,U)=>{if(_.type==="duck"){_.g.position.set(-17+Math.cos(zt*.13+U*2)*3,.08,13+Math.sin(zt*.13+U*2)*2),_.g.rotation.y=-(zt*.13+U*2);return}const z=bt.following===U,j=z?Z.position:bt.waterFilled&&U===1?{x:-8.5,z:8}:null;let ee=_.speed;if(j){const me=j.x-_.g.position.x,Oe=j.z-_.g.position.z;_.angle=Math.atan2(me,Oe),ee=Math.hypot(me,Oe)>(z?1.7:.6)?z?3.2:1:0}else _.turn-=x,_.turn<=0&&(_.angle+=(o()-.5)*2.4,_.turn=2+o()*4);const re=_.g.position.x+Math.sin(_.angle)*x*ee,ce=_.g.position.z+Math.cos(_.angle)*x*ee;I(re,ce)?_.angle+=Math.PI*.7:(_.g.position.x=re,_.g.position.z=ce),_.g.rotation.y=_.angle,!e&&_.g.userData.legs&&_.g.userData.legs.forEach((me,Oe)=>me.rotation.x=Math.sin(zt*7+Oe%2*Math.PI)*.35),e||(_.g.position.y=_.type==="rabbit"?Math.abs(Math.sin(zt*4+U))*.07:Math.abs(Math.sin(zt*5+U))*.015)}),e||ue.forEach((_,U)=>{_.mesh.position.y=1.1+Math.sin(zt*1.3+U)*.12})),Ye&&Xt)tn.set(-17,.6,13),l.position.set(-9,3.7,18.5),l.lookAt(tn);else if(Ye){const _=new V(Z.position.x,1,Z.position.z);tn.lerp(_,e?1:1-Math.exp(-x*5));const U=_s.clone().multiplyScalar(innerWidth<600?1.2:1);l.position.copy(tn).add(U),l.lookAt(tn)}else{const _=innerWidth<600;tn.set(_?0:7,1,_?-7:-2),l.position.set(_?35:38,_?25:27,_?39:38),l.lookAt(tn)}S&&u.render(c,l)}let T=performance.now();function k(x){const S=Math.min((x-T)/1e3,.05);T=x,_i||er(S),requestAnimationFrame(k)}return requestAnimationFrame(k),window.addEventListener("resize",()=>{l.aspect=innerWidth/innerHeight,l.updateProjectionMatrix(),u.setSize(innerWidth,innerHeight)}),u.domElement.addEventListener("webglcontextlost",x=>{x.preventDefault(),Qi(!0),i.dispatchEvent(new CustomEvent("worldlost"))}),er(0),{setActive:Er,setPaused:Qi,jump:ni,setJoystick(x,S){De={x,z:S}},setPlayer(x,S){bt.seated&&ii(),Xt=!1,$e=null,Z.position.set(x,0,S),tn.set(x,1,S)},getPlayer:()=>({x:Z.position.x,z:Z.position.z,y:Mn}),animals:()=>de.map((x,S)=>({id:S,type:x.type,x:+x.g.position.x.toFixed(1),z:+x.g.position.z.toFixed(1),following:bt.following===S,observed:bt.animalNotes.includes(S)})),setEnvironment:bi,observe(x){Xt=x,$e=null,pe.clear(),De={x:0,z:0}},isObserving:()=>Xt,environmentAnimation:()=>Ee.animation,performance:()=>({drawCalls:u.info.render.calls,triangles:u.info.render.triangles,pixelRatio:u.getPixelRatio()}),project(x,S,_){const U=new V(x,S,_).project(l);return{x:(U.x+1)/2*innerWidth,y:(1-U.y)/2*innerHeight,visible:U.z<1&&Math.abs(U.x)<1&&Math.abs(U.y)<1}},setProgress(x){ue.forEach((S,_)=>S.mesh.visible=!x.collected.includes(_)),he.forEach((S,_)=>S.marker.visible=!x.seals.includes(Ze[_].id));for(const[S,_]of Ne)_.visible=!(x.items||[]).includes(S);Y.forEach((S,_)=>{const U=x.seals.includes(Ze[_].id);S.screen.material=M(U?"#91aa8b":"#a4784e",!0),S.light.intensity=U?12:0}),ze.forEach((S,_)=>S.material=M(x.seals.length>_?"#a7c1a0":"#9f684f",!0)),ye.forEach((S,_)=>S.rotation.y=x.seals.length===3?_===0?-1.35:1.35:0),Ae.intensity=x.seals.length===3?10:0},advanceTime(x){_i=!0;for(let S=0;S<Math.min(x,6e4);S+=1e3/60)er(1/60,!1);u.render(c,l)},resumeRealtime(){_i=!1,T=performance.now()},blocked:I,dispose(){u.dispose()}}}const se=i=>document.getElementById(i),Be=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),om=matchMedia("(prefers-reduced-motion: reduce)").matches,gi={get(i){try{return localStorage.getItem(i)}catch{return null}},set(i,e){try{return localStorage.setItem(i,e),!0}catch{return!1}}},mo="prepx-afterbell-draft-v1",xo="prepx-afterbell-pending-v1";function go(){try{const i=JSON.parse(gi.get(xo)||"[]");return Array.isArray(i)?i:[]}catch{return[]}}function cm(i){const e=go().filter(t=>t.id!==i.id);return e.push(i),gi.set(xo,JSON.stringify(e))}async function pl(i){try{const e=await fetch("/api/afterbell/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(6e3)});return!e.ok||(await e.json()).saved!==!0?!1:(gi.set(xo,JSON.stringify(go().filter(n=>n.id!==i.id))),!0)}catch{return!1}}async function ml(){for(const i of go())await pl(i)&&lt==="complete"&&(H==null?void 0:H.attemptId)===i.id&&se("save-status")&&(se("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.")}window.addEventListener("online",ml);let ur=null,an=0,Jn=null,os="",$a=!1,xl=!1,Bt=ps.quizzes[0],H=null,lt="menu",Cn=null,Ya="snapshot",un=null,Rc=null,Pn=null,Oi=!1,hn=null,be=null,ta=0,ja=null,Qr=null,Cc=0;const ei=se("dialog"),gr=se("quiz");gr.innerHTML=ps.quizzes.map(i=>`<option value="${i.id}">${Be(i.title)}</option>`).join("");const Pc=new URLSearchParams(location.search).get("quiz");ps.quizzes.some(i=>i.id===Pc)&&(gr.value=Pc);se("player-name").value=gi.get("prepx-afterbell-name")||"";function fn(i){se("toast").textContent=i,se("toast").classList.add("visible"),clearTimeout(Rc),Rc=setTimeout(()=>se("toast").classList.remove("visible"),3300)}function ti(i=!0){if(Oi)try{hn??(hn=new AudioContext),hn.resume();const e=hn.createOscillator(),t=hn.createGain();e.connect(t),t.connect(hn.destination),e.type="sine",e.frequency.setValueAtTime(i?520:270,hn.currentTime),e.frequency.exponentialRampToValueAtTime(i?780:220,hn.currentTime+.12),t.gain.setValueAtTime(.035,hn.currentTime),t.gain.exponentialRampToValueAtTime(.001,hn.currentTime+.25),e.start(),e.stop(hn.currentTime+.26)}catch{}}function bn(){if(H)try{sessionStorage.setItem(mo,JSON.stringify(H)),$a=!0}catch{$a=!1}}function gl(){try{return sessionStorage.getItem(mo)}catch{return null}}function Dc(){try{sessionStorage.removeItem(mo)}catch{}}function _l(){const i=hl(gl(),Bt);se("resume").classList.toggle("hidden",!i)}async function vl(){const i=++Cc,e=gr.value;se("start").disabled=!0,se("resume").disabled=!0,se("source-status").textContent="מתחברים לשאלות של PrepX…";let t=ps.quizzes.find(r=>r.id===e),n="snapshot";try{const r=await fetch(`/api/afterbell/quizzes/${e}`,{signal:AbortSignal.timeout(3500)});if(r.ok){const s=await r.json();s.id===e&&dl(s)&&(t=s,n="database")}}catch{}i===Cc&&(Bt=t,Ya=n,se("source-status").textContent=Ya==="database"?`● ${Bt.questions.length} שאלות מחוברות למאגר PrepX`:`מצב לא מקוון · ${Bt.questions.length} שאלות מעותק מאגר PrepX`,se("start").disabled=!be,se("resume").disabled=!be,_l())}gr.addEventListener("change",()=>{const i=new URL(location.href);i.searchParams.set("quiz",gr.value),history.replaceState(null,"",i),vl()});function Lt(){clearTimeout(un),un=null,Pn=null,ei.open&&ei.close(),lt!=="menu"&&lt!=="complete"&&(lt="explore",Cn=null,be==null||be.setPaused(!1)),lt==="menu"&&(be==null||be.setPaused(!1)),Qr==null||Qr.focus()}function It(i,e,t){t!=="question"&&t!=="feedback"&&(Cn=null),clearTimeout(un),Pn=null,Qr=document.activeElement,lt=t,be==null||be.setPaused(!0),se("dialog-eyebrow").textContent=i,se("dialog-body").innerHTML=e,ei.open||ei.showModal(),se("dialog-body").scrollTop=0,se("close-dialog").focus(),hm(),Pl()}se("close-dialog").addEventListener("click",()=>{lt==="complete"?ms():Lt()});ei.addEventListener("cancel",i=>{i.preventDefault(),lt==="complete"?ms():Lt()});function bl(i=!1){if(!be)return;const e=se("player-name").value.trim();if(!e){se("player-name").setCustomValidity("רק שם או כינוי, ומתחילים."),se("player-name").reportValidity(),se("player-name").focus();return}se("player-name").setCustomValidity(""),gi.set("prepx-afterbell-name",e),H=i?hl(gl(),Bt):null,H??(H=im(Bt)),os=H.participantName||e,H.participantName=os,ja=null,lt="explore",se("welcome").classList.add("hidden"),se("hud").classList.remove("hidden"),se("pause").classList.remove("hidden"),document.body.classList.add("playing"),be.setPlayer(H.player.x,H.player.z),be.setActive(!0),be.setPaused(!1),be.setProgress(H),H.environment=Sr(H.environment),be.setEnvironment(H.environment,{animate:!1}),be.resumeRealtime(),Bn(),bn(),se("world-labels").innerHTML=Ze.map(t=>`<span class="world-label" id="label-${t.id}"><b>${Ze.indexOf(t)+1}</b>${Be(t.name)}</span>`).join("")+wt.map(t=>`<span class="world-label equipment-label" id="label-${t.id}">▣ ${Be(t.short)}</span>`).join("")+'<span class="world-label" id="label-exit">שער היציאה</span><span class="world-label environment-label" id="label-environment"></span>',an=Ze.findIndex(t=>!H.seals.includes(t.id)),Jn=null,Bn(),i||(It("תדריך · ז׳ איינשטיין",'<h2 id="dialog-title">החשמל נפל. השער נשאר נעול.</h2><p class="school-name">בית הספר שי עגנון · כיתת הייטק</p><p class="dialog-copy">נשארתם אחרי ההאקתון. שלוש תחנות הפרויקט כבו, וביער מסתובב שועל שלא מצא את הדרך החוצה. הצוות שלכם עדיין במתחם.</p><ol class="tutorial-steps"><li>בוחרים איש צוות במפה ומקשיבים למה שהוא צריך.</li><li>מאתרים את הציוד החסר בשטח. החץ והמפה עוזרים להגיע.</li><li>משלימים את שאלות התרגול בכל תחנה, מפעילים את שלוש המערכות ויוצאים בשער הצפוני.</li></ol><p class="feedback-note">עולם פתוח, בכל סדר. בלי ספירה לאחור. טעויות מובילות להסבר, לא לפסילה.</p><button id="begin-adventure" class="primary">יוצאים לבדוק את המתחם ←</button>',"tutorial"),se("begin-adventure").onclick=()=>{Lt(),fn("בחרו תחנה בלוח המשימה. החץ מצביע ליעד שלכם.")})}se("player-name").addEventListener("input",()=>{se("player-name").setCustomValidity("")});se("start").addEventListener("click",()=>bl());se("resume").addEventListener("click",()=>bl(!0));function ms(){Lt(),lt="menu",be.setActive(!1),be.setPaused(!1),be.resumeRealtime(),se("welcome").classList.remove("hidden"),se("hud").classList.add("hidden"),se("pause").classList.add("hidden"),document.body.classList.remove("playing"),_l()}function _o(){if(!H||!be)return null;const i=be.getPlayer();if(be.isObserving())return{type:"observation",d:0};if(H.environment.seated)return{type:"environment",id:"bench",d:0};let e=null;Ze.forEach((n,r)=>{const s=Math.hypot(i.x-n.x,i.z-n.z);s<3.5&&(!e||s<e.d)&&(e={type:"npc",i:r,d:s})}),wt.forEach((n,r)=>{if(H.items.includes(n.id))return;const s=Math.hypot(i.x-n.x,i.z-n.z);s<2.8&&(!e||s<e.d)&&(e={type:"equipment",i:r,d:s})});const t=Math.hypot(i.x-pi.x,i.z-pi.z);return t<3.5&&(!e||t<e.d)&&(e={type:"exit",d:t}),e||(ln.forEach(n=>{const r=Math.hypot(i.x-n.x,i.z-n.z);r<n.range&&(!e||r<e.d)&&(e={type:"environment",id:n.id,d:r})}),be.animals().forEach(n=>{if(n.type==="duck")return;const r=Math.hypot(i.x-n.x,i.z-n.z);r<2.4&&(!e||r<e.d-.8)&&(e={type:"animal",id:n.id,d:r})}),e)}function Ml(){if(lt!=="explore")return;const i=_o();if(i){if(i.type==="observation"){be.observe(!1),vo();return}if(i.type==="environment"){Za(i.id);return}if(i.type==="animal"){dm(i.id);return}i.type==="exit"?gn(H)?_m():fn(`עוד ${3-H.seals.length} מערכות צריכות לחזור לפעולה. בחרו תחנה במפה.`):i.type==="equipment"?um(i.i):yl(i.i)}}se("interact").addEventListener("click",Ml);const lm=["נ","א","א"];function _r(i){const e=Ze[i];return`<div class="character-chip"><div class="portrait" aria-hidden="true">${lm[i]}</div><div><h2 id="dialog-title">${Be(e.name)}</h2><small>${Be(e.role)}</small></div></div><button class="text-button npc-chat" data-npc-chat="${i}">לשוחח ולעזור לצוות ↗</button>`}function yl(i){const e=Ze[i];if(On(H,i),H.seals.includes(e.id)){It("חברים לדרך",_r(i)+`<p class="dialog-copy">${i===0?"מסוף הגישה פעיל. רשמתי את התקלה. עכשיו רק צריך להסביר למורה למה התאריך בדוח הוא מחר.":i===1?"מערכת הגיבוי פועלת. פעם הבאה נבדוק אותה לפני שכולם הולכים הביתה. רעיון מהפכני.":"הקשר חזר. אם תשמעו רעש מהיער — הפעם אני הולך לבדוק. עם פנס. ועם מישהו."}</p><button id="back-world" class="primary">ממשיכים לחקור ←</button>`,"dialogue"),se("back-world").onclick=Lt;return}if(H.understood.includes(e.id)){H.items.includes(wt[i].id)?dr(i):Ka(i);return}const t=qa(e.choices.map((n,r)=>({text:n,original:r})));It("לפני שפותרים, מקשיבים",_r(i)+`<p class="dialog-copy">${Be(e.line)}</p><div class="options">${t.map(n=>`<button class="option social" data-choice="${n.original}">${Be(n.text)}</button>`).join("")}</div><p id="social-feedback" class="feedback-note" role="status"></p>`,"dialogue"),document.querySelectorAll(".social").forEach(n=>n.onclick=()=>{if(Number(n.dataset.choice)!==e.need){se("social-feedback").textContent=e.wrong,ti(!1);return}H.understood.push(e.id),bn(),ti(),Ka(i)})}function Ka(i){const e=Ze[i],t=wt[i],n=H.items.includes(t.id);It(`תחנה ${i+1} · ${e.system}`,_r(i)+`<p class="dialog-copy">${Be(e.reply)}</p><div class="journal-entry"><h3>${n?"✓ הציוד איתכם":`נדרש: ${Be(t.name)}`}</h3><p>${Be(n?t.report:t.hint)}</p></div><p class="feedback-note">${On(H,i).total} שאלות מהתרגול הנבחר מפעילות את בדיקת התחנה. ציון הלימוד נפרד מהציוד ומהחקירה.</p><button class="primary" id="${n?"begin-questions":"track-equipment"}">${n?"מפעילים את מסוף התרגול":"סימון הציוד במפה"} ←</button>`,"mission"),n?se("begin-questions").onclick=()=>dr(i):se("track-equipment").onclick=()=>{an=i,Jn=t.id,Lt(),Bn(),fn(t.hint)}}function um(i){const e=wt[i];It("ממצא בשטח",`<h2 id="dialog-title">${Be(e.name)}</h2><p class="dialog-copy">${Be(e.clue)}</p><p class="feedback-note">ציוד למשימה · ${Be(Ze[e.npc].system)}</p><button class="primary" id="collect-equipment">לקחת ולהמשיך ←</button>`,"equipment"),se("collect-equipment").onclick=()=>{H.items.includes(e.id)||H.items.push(e.id),an=e.npc,Jn=null,bn(),be.setProgress(H),Lt(),Bn(),ti(),fn(e.report)}}function Pt(i={},e){H&&(Object.assign(H.environment,i),e&&!H.environment.visited.includes(e)&&H.environment.visited.push(e),be.setEnvironment(H.environment),bn(),Bn(),vo())}function na(i){const e=be.getPlayer();return Math.hypot(e.x-i.x,e.z-i.z)<i.range+.1}function Za(i){const e=ln.find(r=>r.id===i);if(!e||!na(e))return;const t=H.environment;if(i==="solar"){It("מנגנון מקומי · חקירה חופשית",`<h2 id="dialog-title">${Be(e.name)}</h2><p class="dialog-copy">${Be(e.description)}</p><div class="environment-switches">${["ירח","שמש","עץ"].map((r,s)=>`<button class="secondary env-switch" data-env-switch="${s}" aria-pressed="${t.switches[s]}"><span>${r}</span><b>${t.switches[s]?"פועל":"כבוי"}</b></button>`).join("")}</div><p id="env-puzzle-status" class="feedback" role="status">${po(t)?"התאורה פועלת. שלושה פנסי שביל נדלקו.":"ההערה על המכסה: ירח ועץ פועלים, שמש כבויה."}</p><button id="env-leave" class="primary">חזרה לשביל ←</button>`,"environment"),document.querySelectorAll("[data-env-switch]").forEach(r=>r.onclick=()=>{if(!na(e))return;const s=[...H.environment.switches];s[Number(r.dataset.envSwitch)]=!s[Number(r.dataset.envSwitch)],Pt({switches:s},i),Za(i)}),se("env-leave").onclick=Lt;return}const n=i==="locker"&&t.lockerOpen?"הפתק בארונית: ״אדם השאיר את האנטנה ליד עמדת הקשר הישנה בדרום־מערב. אם אתם מחזירים, באמת תחזירו.״":e.description;It("חקירה חופשית · ללא ציון",`<div class="environment-heading"><span class="environment-category">${Be(hs(e,t))}</span><h2 id="dialog-title">${Be(e.name)}</h2></div><p class="dialog-copy">${Be(n)}</p><p class="feedback-note">פעולה בקמפוס. אינה מוסיפה שאלות ואינה משנה את ציון התרגול.</p><button id="env-primary" class="primary" data-environment="${i}">${Be(ul(e,t))} ←</button>`,"environment"),se("env-primary").onclick=()=>{if(!na(e))return;const r=H.environment;let s="";if(i==="bench"&&(Pt({seated:!r.seated},i),s=r.seated?"אפשר להישאר רגע. כדי לקום: תנועה או כפתור הפעולה.":"חוזרים לשטח."),i==="door"){const a=be.getPlayer();if(r.doorOpen&&Math.abs(a.x+2)<1.6&&Math.abs(a.z+16.86)<.75){fn("זוזו מעט מפתח הדלת לפני שסוגרים אותה.");return}Pt({doorOpen:!r.doorOpen},i),s=r.doorOpen?"הדלת נפתחה. אפשר להיכנס למבואה.":"דלת המבואה נסגרה."}if(i==="lamp"&&(Pt({lampOn:!r.lampOn},i),s=r.lampOn?"הרחבה מוארת שוב.":"הפנס כובה. פנס היד שלכם עדיין פועל."),i==="basketball"){if(be.environmentAnimation().basketballInFlight){fn("הכדור בדרך חזרה. עוד רגע.");return}Pt({shots:r.shots+1},i),s=`קליעה ${r.shots}. הכדור חוזר לעמדה.`}if(i==="locker"){if(Pt({lockerOpen:!r.lockerOpen},i),r.lockerOpen){Za(i);return}s="הארונית סגורה. הרמז נשאר ביומן."}i==="noticeboard"&&(Pt({},i),s="שלושת מיקומי הציוד תועדו ביומן. גם כתב היד החשוד."),i==="telescope"&&(Pt({observations:r.observations+1},i),be.observe(!0),s="תצפית באגם. לחצו על סיום התצפית כדי לחזור."),i==="water"&&(Pt({waterFilled:!0},i),s="הקערה מלאה. ארנב מהחצר מתקרב בקצב שלו."),i==="planter"&&(Pt({watered:!0},i),s="העלים התרוממו. התברר שהפתרון היה מים."),i==="recycling"&&(Pt({recycled:!0},i),s="שלוש פחיות הגיעו למחזור. עכשיו נשאר לסדר את תיקיית הפרויקט."),i==="bike"&&(Pt({bells:r.bells+1},i),ti(),s="הפעמון מצלצל. בדיקת החומרה הסתיימה."),Lt(),fn(s)}}const Sl={fox:"שועל",rabbit:"ארנב",bird:"ציפור",duck:"ברווז"};function dm(i){const e=be.animals().find(n=>n.id===i);if(!e)return;const t=be.getPlayer();Math.hypot(t.x-e.x,t.z-e.z)>2.8||(Pt({animalNotes:[...new Set([...H.environment.animalNotes,i])]}),It("יומן טבע · הקמפוס אחרי הלימודים",`<h2 id="dialog-title">${Sl[e.type]} בשטח</h2><p class="dialog-copy">${e.type==="fox"?"הוא עוצר, מקשיב, וממשיך. נראה שיש לו תוכנית טובה משלנו. אפשר לתת לו ללכת לידכם בקצב שלו.":e.type==="rabbit"?"האוזניים זזות לפני כל השאר. התצפית נשמרה ביומן; אין צורך להתקרב יותר.":e.type==="duck"?"שלושה ברווזים ממשיכים בסיור באגם. כנראה הם לא קיבלו את הודעת הביטול.":"הציפור כבר מכירה את כל הקמפוס. היא לא מתרשמת במיוחד מכיתת ההייטק."}</p>${e.type!=="duck"?`<button id="animal-follow" class="primary">${e.following?"לתת לו להמשיך בדרכו":"ללכת יחד קצת"} ←</button>`:""}<button id="animal-leave" class="secondary">להמשיך לחקור</button>`,"environment"),se("animal-follow")&&(se("animal-follow").onclick=()=>{Pt({following:H.environment.following===i?null:i}),Lt(),fn(H.environment.following===i?"חבר חדש הולך לידכם. אפשר להיפרד דרך אותה פעולת מפגש.":"הוא חוזר לסיבוב שלו בקמפוס.")}),se("animal-leave").onclick=Lt)}function fm(i){const e=Ze[i],t=H.environment.helped.includes(e.id),n=[["היומן של נועה מלא בדיקות קטנות. ״כשכל אחד משנה דבר אחר, מתקבלים שלושה באגים ודיון ארוך. נתחיל בעובדות.״","היא מראה את הכיוון של הספרייה: ״כרטיס הצוות נשאר על שולחן העבודה ממערב. תיקי הפרויקט משום מה מסודרים פחות מהקוד.״"],["איתי מצביע על החממה. ״הרובוט היה אמור להשקות. כרגע הוא בעיקר מתעניין בלהיות כבוי.״","״יחידת הגיבוי נמצאת בארגז שממזרח למעבדה. מי שהניח אותה שם קרא לזה פתרון זמני. זה היה בשבוע שעבר.״"],["״הרעש היה מהאגם. בדקתי. ברווז. לא צריך לציין את זה בסיכום ההאקתון.״","״האנטנה נשארה בדרום־מערב. אם נלך יחד לשם, אני אבדוק את השביל ואתם תבדקו שאין עוד ברווז מפתיע.״"]][i];It("שיחה עם הצוות",_r(i)+`<div class="options"><button class="secondary" data-chat-topic="0">איך הולך בינתיים?</button><button class="secondary" data-chat-topic="1">יש עוד רמז לציוד?</button><button id="npc-help" class="primary">${t?"כבר עזרנו · לבדוק מה השתנה":["לעזור לסדר את הבדיקות","לעזור להניח את הבקר","לבדוק יחד את כיוון הרעש"][i]} ←</button></div><p id="npc-chat-reply" class="dialog-copy" role="status"></p><button id="npc-back" class="text-button">בחזרה למשימת התחנה ←</button>`,"conversation"),document.querySelectorAll("[data-chat-topic]").forEach(r=>r.onclick=()=>{se("npc-chat-reply").textContent=n[Number(r.dataset.chatTopic)]}),se("npc-help").onclick=()=>{Pt({helped:[...new Set([...H.environment.helped,e.id])]}),se("npc-chat-reply").textContent=["נועה מסמנת בדיקה אחת ברשימה ומרימה יד בתודה. ״מדהים, אפשר לפתור דברים בלי ישיבה של שעה.״","איתי מניח את הבקר על העמדה. ״עכשיו יש לי יד פנויה. בשביל להצביע על התקלה הבאה.״","אדם מסמן את כיוון האגם. ״תודה שבדקתם איתי. מוכן להחזיר את הקשר.״"][i],se("npc-help").textContent="העזרה תועדה ביומן"},se("npc-back").onclick=()=>yl(i)}function hm(){document.querySelectorAll("[data-npc-chat]").forEach(i=>i.onclick=()=>fm(Number(i.dataset.npcChat)))}function El(i){const e=Bt.references.find(n=>n.id===i.ref.id);if(!e)return"";let t;try{if(t=new URL(e.url||"subject.html?subject="+Bt.subject_id,"https://hitech.agnon.online/"),!["https:","http:"].includes(t.protocol))return""}catch{return""}return`<a class="reference" target="_blank" rel="noopener noreferrer" href="${Be(t.href)}">מקור: ${Be(e.title)}${i.ref.part?" · "+Be(i.ref.part):""} ↗</a>`}function dr(i){if(!H.items.includes(wt[i].id)){Ka(i);return}const e=On(H,i);if(!e.next){mm(i);return}const t=H.questions.find(n=>n.id===e.next);Cn=t,It(`${Ze[i].name} · ${Ze[i].system}`,`<div class="question-meta"><span>${Be(Bt.title)}</span><span>שאלה ${Object.keys(H.answers).length+1} מתוך ${H.questions.length}</span></div><div class="progress-line"><i style="width:${Object.keys(H.answers).length/H.questions.length*100}%"></i></div><h2 id="dialog-title">${Be(t.prompt)}</h2>${El(t)}<button class="text-button npc-chat" data-npc-chat="${i}">רגע לשיחה עם ${Be(Ze[i].name)} ↗</button><div class="options" id="answer-options">${t.options.map((n,r)=>`<button class="option answer" data-choice="${n.original}"><span class="number">${r+1}</span><span>${Be(n.text)}</span></button>`).join("")}</div><div id="answer-feedback" aria-live="polite"></div>`,"question"),Cn=t,document.querySelectorAll(".answer").forEach(n=>n.onclick=()=>pm(t,Number(n.dataset.choice),i))}function pm(i,e,t){const n=rm(H,i.id,e);n&&(lt="feedback",bn(),Bn(),ti(n.correct),document.querySelectorAll(".answer").forEach(r=>{r.disabled=!0;const s=Number(r.dataset.choice);s===i.correct&&r.classList.add("correct"),s===e&&r.classList.add("selected",n.correct?"correct":"wrong")}),se("answer-feedback").innerHTML=`<div class="feedback"><strong>${n.correct?"✓ תשובה נכונה.":"↺ לא הפעם. הנה ההסבר."}</strong><p>${Be(i.explanation.he)}</p>${i.explanation.en?`<p class="english" lang="en" dir="ltr">${Be(i.explanation.en)}</p>`:""}</div><button class="text-button" id="hold-feedback">להשהות ולקרוא את ההסבר</button><p class="feedback-note">התשובה נעולה. ההסבר נשאר גם ביומן.</p>`,Pn=()=>dr(t),un=setTimeout(()=>{Pn=null,dr(t)},1500),se("hold-feedback").onclick=()=>{clearTimeout(un),un=null,Pn=null,se("hold-feedback").textContent="חזרה להמשך אוטומטי",se("hold-feedback").onclick=()=>{Pn=()=>dr(t),un=setTimeout(Pn,1500),se("hold-feedback").disabled=!0}})}function mm(i){if(!H.items.includes(wt[i].id)||!H.understood.includes(Ze[i].id)||On(H,i).next)return;const e=Ze[i];H.seals.includes(e.id)||H.seals.push(e.id),an=Ze.findIndex(t=>!H.seals.includes(t.id)),Jn=null,bn(),be.setProgress(H),Bn(),ti(),It(`מערכת ${H.seals.length} מתוך 3 חזרה לפעולה`,_r(i)+`<div class="score-big" style="font-size:52px">✓</div><h2 class="finish-title">${Be(e.system)} — פעיל</h2><p class="dialog-copy">${gn(H)?"הגישה, הגיבוי והקשר פעילים. השער הצפוני נפתח. הגיע הזמן לצאת מהמתחם.":"התחנה מגיבה. אפשר להמשיך לכל אחת מהתחנות האחרות. המפה עודכנה."}</p><button id="continue-world" class="primary">${gn(H)?"לשער היציאה":"חזרה לשטח"} ←</button>`,"reward"),se("continue-world").onclick=Lt}function Bn(){H&&(se("seal-slots").innerHTML=Ze.map((i,e)=>`<button class="seal ${H.seals.includes(i.id)?"done":""} ${an===e?"selected":""}" data-npc="${e}" title="${Be(i.name)}" aria-label="חבר ${e+1}: ${Be(i.name)}. ${H.seals.includes(i.id)?"הושלם":"הצגת הכיוון"}" aria-pressed="${an===e}">${H.seals.includes(i.id)?"✓":e+1}</button>`).join(""),document.querySelectorAll("[data-npc]").forEach(i=>i.onclick=()=>{ur=null,an=Number(i.dataset.npc),Jn=H.understood.includes(Ze[an].id)&&!H.items.includes(wt[an].id)?wt[an].id:null,Bn()}),se("question-progress").innerHTML=`<bdi dir="ltr">${Object.keys(H.answers).length} / ${H.questions.length}</bdi> שאלות`,se("firefly-count").innerHTML=`✧ <bdi dir="ltr">${H.collected.length} / 12</bdi>`,se("objective").textContent=gn(H)?"השער פתוח. הביתה!":"מחזירים 3 מערכות לפעולה",se("environment-progress")&&(se("environment-progress").textContent=`${H.environment.visited.length}/12 תגליות`),se("quest-sub").textContent=gn(H)?"הולכים לשער שמאחורי בית הספר.":`בחרו תחנה במפה · ציוד ${H.items.length}/3`)}function vo(){var c;if(!be||!H)return;const i=be.getPlayer();se("minimap").innerHTML=`<path d="M0 25 L0 12 L-3 4 L0 -4 L0 -12 L7 -17 L7 -24 L0 -25 M-3 4 L-10 1 L-13 -9 M0 -4 L13 -7 M0 12 L10 14" fill="none" stroke="#719480" stroke-width="1.4"/><ellipse cx="-17" cy="13" rx="6.5" ry="5" fill="#467e86"/><rect x="-8" y="-23" width="12" height="6" fill="#718a78" rx="1"/>${Ze.map(l=>`<circle cx="${l.x}" cy="${l.z}" r="2.2" fill="${H.seals.includes(l.id)?"#5f8270":l.color}"/><text x="${l.x}" y="${l.z+1}" font-size="3" text-anchor="middle" fill="#152d30">${H.seals.includes(l.id)?"✓":Ze.indexOf(l)+1}</text>`).join("")}<path d="M-2 -26H2V-23H-2Z" fill="${gn(H)?"#daf69f":"#91a78d"}"/>${wt.filter(l=>!H.items.includes(l.id)&&(Jn===l.id||H.understood.includes(Ze[l.npc].id))).map(l=>`<rect x="${l.x-1.5}" y="${l.z-1.5}" width="3" height="3" fill="#d9b47d"/>`).join("")}${ln.map(l=>`<circle cx="${l.x}" cy="${l.z}" r="${ur===l.id?1.6:.7}" fill="${ur===l.id?"#fff1c7":H.environment.visited.includes(l.id)?"#8ba994":"#b39e7a"}"/>`).join("")}<circle cx="${i.x}" cy="${i.z}" r="2.1" fill="#e8a169" stroke="#fff4cd" stroke-width=".7"/>`,se("location").textContent=i.z<-14?"ליד בית הספר":i.x<-10?"הספרייה והאגם":i.x>8&&i.z>5?"מגדל הפנס":i.x>8?"החממה":"קרחת היער";const e=ln.find(l=>l.id===ur)||(gn(H)?pi:wt.find(l=>l.id===Jn)||Ze[Math.max(0,an)]),t=be.project(e.x,0,e.z),n=be.project(i.x,0,i.z);se("compass").style.transform=`rotate(${Math.atan2(t.x-n.x,n.y-t.y)*180/Math.PI}deg)`,se("direction-text").textContent=`${e===pi?"השער הביתה":e.name} · ${Math.round(Math.hypot(i.x-e.x,i.z-e.z))} צעדים`,Ze.forEach(l=>{const u=se("label-"+l.id);if(!u)return;const d=be.project(l.x,3.7,l.z);u.style.left=d.x+"px",u.style.top=d.y+"px",u.style.display=d.visible?"block":"none",u.classList.toggle("done",H.seals.includes(l.id))}),wt.forEach(l=>{const u=se("label-"+l.id);if(!u)return;const d=be.project(l.x,2,l.z),h=Math.hypot(i.x-l.x,i.z-l.z);u.style.left=d.x+"px",u.style.top=d.y+"px",u.style.display=!H.items.includes(l.id)&&d.visible&&(Jn===l.id||h<7)?"block":"none"});const r=se("label-exit"),s=be.project(pi.x,6.2,pi.z);r&&(r.style.left=s.x+"px",r.style.top=s.y+"px",r.style.display=s.visible?"block":"none");const a=_o();se("interact").classList.toggle("hidden",!a||lt!=="explore"),a&&(se("interact").innerHTML=a.type==="observation"?"סיום התצפית <kbd>E</kbd>":a.type==="environment"?`${Be(a.id==="bench"&&H.environment.seated?"לקום מהספסל":ln.find(l=>l.id===a.id).name)} <kbd>E</kbd>`:a.type==="animal"?`מפגש עם ${Sl[(c=be.animals().find(l=>l.id===a.id))==null?void 0:c.type]||"חיה"} <kbd>E</kbd>`:a.type==="exit"?`${gn(H)?"יוצאים הביתה":"לבדוק את השער"} <kbd>E</kbd>`:a.type==="equipment"?`לבדוק ${Be(wt[a.i].short)} <kbd>E</kbd>`:`לדבר עם ${Be(Ze[a.i].name)} <kbd>E</kbd>`);const o=se("label-environment");if(o){const l=(a==null?void 0:a.type)==="environment"?ln.find(u=>u.id===a.id):null;if(l&&lt==="explore"){const u=be.project(l.x,2.2,l.z);o.textContent=hs(l,H.environment)+" · "+l.name,o.style.left=u.x+"px",o.style.top=u.y+"px",o.style.display=u.visible?"block":"none"}else o.style.display="none"}}function Tl(){return H.questions.filter(i=>Object.hasOwn(H.answers,i.id)).map(i=>{const e=H.answers[i.id];return`<details class="review-item"><summary>${e.correct?"✓":"↺"} ${Be(i.prompt)}</summary><p>התשובה שלכם: ${Be(i.choices[e.choice])}</p><p>התשובה הנכונה: ${Be(i.choices[i.correct])}</p><p>${Be(i.explanation.he)}</p>${i.explanation.en?`<p lang="en" dir="ltr">${Be(i.explanation.en)}</p>`:""}${El(i)}</details>`}).join("")}function xm(){H&&(It("כל מה שגיליתם",`<h2 id="dialog-title">יומן ההרפתקה</h2>${Ze.map((i,e)=>`<div class="journal-entry"><h3>${H.seals.includes(i.id)?"✓":"◇"} ${Be(i.name)}</h3><p>${Be(i.role)} · ${On(H,e).answered} מתוך ${On(H,e).total} שאלות</p><p>${e===0?"מצפון־מערב, ליד הספרייה.":e===1?"מצפון־מזרח, ליד החממה.":"מדרום־מזרח, ליד מגדל הפנס."}</p></div>`).join("")}<h3>ציוד וממצאים</h3>${wt.map(i=>`<div class="journal-entry"><h3>${H.items.includes(i.id)?"✓":"□"} ${Be(i.name)}</h3><p>${Be(H.items.includes(i.id)?i.clue:i.hint)}</p></div>`).join("")}<h3>חקירה בקמפוס · ${H.environment.visited.length}/12</h3>${ln.map(i=>`<div class="journal-entry"><h3>${H.environment.visited.includes(i.id)?"✓":"□"} ${Be(i.name)}</h3><p>${Be(hs(i,H.environment))} · ${H.environment.visited.includes(i.id)?Be(i.description):"אפשר לגלות בשטח. המפה מציגה את המיקום."}</p><button class="text-button" data-track-environment="${i.id}">להציג מיקום במפה ←</button></div>`).join("")}<p class="feedback-note">מפגשי טבע: ${H.environment.animalNotes.length} · עזרה לצוות: ${H.environment.helped.length}/3</p><h3>השאלות שכבר פתרתם</h3><p class="feedback-note">התשובות נעולות. אפשר לקרוא וללמוד מהן בכל רגע.</p>${Tl()||'<p class="feedback-note">השאלות יופיעו כאן אחרי שתענו.</p>'}`,"journal"),document.querySelectorAll("[data-track-environment]").forEach(i=>i.onclick=()=>{const e=ln.find(t=>t.id===i.dataset.trackEnvironment);ur=e.id,Lt(),document.body.classList.add("map-open"),se("map-toggle").setAttribute("aria-expanded","true"),fn(`${e.name} סומן במפה.`)}))}se("journal").onclick=xm;const Fn=document.createElement("button");Fn.id="map-toggle";Fn.className="secondary map-toggle";Fn.textContent="מפה";Fn.setAttribute("aria-expanded","false");Fn.setAttribute("aria-controls","minimap");se("hud").appendChild(Fn);Fn.onclick=()=>{const i=document.body.classList.toggle("map-open");Fn.setAttribute("aria-expanded",String(i)),Fn.textContent=i?"סגירת מפה":"מפה"};const Al=document.createElement("span");Al.id="environment-progress";document.querySelector(".quest-bottom").appendChild(Al);function wl(){It("תדריך שטח",'<h2 id="dialog-title">איך יוצאים מכאן.</h2><div class="journal-entry"><h3>01 · משוטטים</h3><p>מקשי WASD או חצים כדי לזוז, רווח לקפוץ, Shift לרוץ. אפשר ללחוץ על הקרקע. בנייד: גוררים את העיגול וקופצים בכפתור החץ.</p></div><div class="journal-entry"><h3>02 · מקשיבים לחברים</h3><p>מתקרבים לדמות ולוחצים E או על כפתור השיחה. מבינים מה היא צריכה, מאתרים את הציוד שהוא צריך וחוזרים אליו להפעלת מסוף התרגול.</p></div><div class="journal-entry"><h3>03 · פותרים ויוצאים</h3><p>השאלות מגיעות מחומר התרגול שלכם. כל תשובה ננעלת ויש הסבר. אחרי הפעלת שלוש המערכות מגיעים לשער בצפון. אין זמן קצוב ואין קנס על טעות.</p></div><div class="journal-entry"><h3>חקירה חופשית</h3><p>מגלים 12 מקומות לפעולה: יושבים, פותחים דלתות, קולעים לסל, משקים וצופים בטבע. מתקרבים, לוחצים על הכפתור הגדול ובוחרים פעולה. ביומן יש מיקומים ורמזים. החקירה ועזרה לצוות אינן משנות את ציון הלימוד. F למסך מלא. Escape להשהיה.</p></div><button id="got-it" class="primary">חזרה למשימה ←</button>',H&&lt!=="menu"?"help":"menu"),se("got-it").onclick=Lt}se("how").onclick=wl;function bo(){if(!(lt==="menu"||lt==="complete")){if(ei.open){Lt();return}It("היער יכול לחכות",`<h2 id="dialog-title">רגע לנשום.</h2><p class="dialog-copy">${$a?"ההתקדמות נשמרה בלשונית הזאת.":"הדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה כדי להמשיך."} העולם ממתין לכם.</p><div class="options"><button id="unpause" class="primary">חזרה ליער ←</button><button id="show-controls" class="secondary">איך משחקים?</button><button id="menu" class="secondary">חזרה למסך הפתיחה</button></div>`,"paused"),se("unpause").onclick=Lt,se("show-controls").onclick=wl,se("menu").onclick=ms}}se("pause").onclick=bo;async function Rl(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{fn("הדפדפן הזה לא מאפשר מסך מלא. אפשר להמשיך לשחק כרגיל.")}}se("fullscreen").onclick=Rl;se("sound").onclick=()=>{Oi=!Oi,se("sound").setAttribute("aria-pressed",String(Oi)),se("sound").setAttribute("aria-label",Oi?"כיבוי צלילים":"הפעלת צלילים"),se("sound").style.color=Oi?"#d9bd85":"",ti()};window.addEventListener("keydown",i=>{var e;i.target.matches("input,select,textarea")||(i.code==="KeyF"&&(i.preventDefault(),Rl()),i.code==="Escape"&&!ei.open&&(i.preventDefault(),bo()),lt==="question"&&/^Digit[1-4]$/.test(i.code)&&((e=document.querySelectorAll(".answer")[Number(i.code.slice(-1))-1])==null||e.click()))});document.addEventListener("visibilitychange",()=>{document.hidden&&lt==="explore"&&bo(),document.hidden&&un?(clearTimeout(un),un=null):!document.hidden&&lt==="feedback"&&Pn&&(un=setTimeout(Pn,1500))});window.addEventListener("pagehide",bn);async function gm(i){return Ol(i)}async function Lc(i=H,e=Bt,t=os){const n={id:i.attemptId,name:t,quizId:e.id,answers:Object.entries(i.answers).map(([r,s])=>({id:r,choice:s.choice})),startedAt:i.startedAt,contentHash:await gm(e)};return xl=cm(n),pl(n)}async function _m(){if(!gn(H)||lt==="complete")return;const i=H,e=Bt,t=os,n=H.attemptId;bn();const r=fl(H),s=sm(r),a=Object.values(H.answers).filter(u=>u.correct).length,o=`prepx-best-${Bt.id}`,c=Number(gi.get(o));(!Number.isFinite(c)||r>c)&&gi.set(o,String(r)),It("הגעתם הביתה ✧",`<div class="stars" aria-label="${s} כוכבים מתוך שלושה">${"★".repeat(s)+"☆".repeat(3-s)}</div><h2 class="finish-title" id="dialog-title">המערכות פעילות.<br>הדרך החוצה פתוחה.</h2><p class="finish-title feedback-note">צוות איינשטיין, המשימה הושלמה. בפעם הבאה נשארים להאקתון בשעות האור.</p><div class="score-big">${r}<small> / 100</small></div><div class="stats-row"><div><strong>${a}/${H.questions.length}</strong><small>תשובות נכונות</small></div><div><strong>3</strong><small>מערכות פעילות</small></div><div><strong>${H.collected.length}</strong><small>גחליליות</small></div></div><p id="save-status" class="saved-note" role="status">שומרים את התוצאה בהיסטוריית המשחק…</p><div class="dialog-actions"><button id="replay" class="primary">משימה חדשה ↺</button><a class="secondary" href="https://hitech.agnon.online/subject.html?subject=${Bt.subject_id}">לחומר הלימוד ↗</a></div><button id="review-results" class="text-button">התשובות וההסברים שלכם <span>↓</span></button><div id="final-review" class="hidden">${Tl()}</div>`,"complete"),se("replay").onclick=()=>{Dc(),H=null,ms()},se("review-results").onclick=()=>se("final-review").classList.toggle("hidden"),ja=Lc(i,e,t);const l=await ja;if(lt==="complete"&&(H==null?void 0:H.attemptId)===n&&(se("save-status").textContent=l?"✓ התוצאה נשמרה בהיסטוריית המשחק. לא נשלח דוא״ל.":xl?"אין חיבור להיסטוריה כרגע. התוצאה נשמרה במכשיר וממתינה לשליחה.":"השמירה נכשלה והדפדפן חסם שמירה מקומית. השאירו את הלשונית פתוחה ונסו שוב.",!l)){const u=document.createElement("button");u.className="text-button",u.textContent="לנסות לשמור שוב",u.onclick=async()=>{u.disabled=!0,await Lc(i,e,t)?(se("save-status").textContent="✓ התוצאה נשמרה בהיסטוריית המשחק.",u.remove()):u.disabled=!1},se("save-status").after(u)}l&&(H==null?void 0:H.attemptId)===n&&Dc()}try{be=am(se("world"),{reduced:om,onInteract:Ml,onEnvironmentChange:i=>{H&&Pt(i)},onCollect:i=>{!H||H.collected.includes(i)||(H.collected.push(i),Bn(),bn(),ti(),H.collected.length%3===0&&fn(`${H.collected.length} נקודות טבע תועדו ביומן. החקירה לא משנה את ציון הלימוד.`))},onMove:(i,e,t)=>{H&&(H.player={x:i,z:e},H.elapsed+=t,ta+=t,ta>1&&(ta=0,bn()))}}),se("loading").classList.add("hidden")}catch{se("loading").innerHTML='<div style="max-width:320px;text-align:center"><h2>היער צריך דפדפן עם תלת־ממד.</h2><p>נסו לעדכן את הדפדפן או להפעיל האצת חומרה.</p><a href="https://hitech.agnon.online/" class="primary">בינתיים, לתרגול הרגיל ←</a></div>',se("start").disabled=!0}se("world").addEventListener("worldlost",()=>{It("החיבור לתלת־ממד נעצר",'<h2 id="dialog-title">נשמר לכם מקום ביער.</h2><p class="dialog-copy">רעננו את העמוד ובחרו בהמשך ההרפתקה השמורה.</p><button id="reload" class="primary">רענון וחזרה</button>',"paused"),se("reload").onclick=()=>location.reload()});const vr=se("joystick");let Mo=null;function Cl(i){if(Mo!==i.pointerId)return;const e=vr.getBoundingClientRect();let t=(i.clientX-e.left-e.width/2)/36,n=(i.clientY-e.top-e.height/2)/36;const r=Math.max(1,Math.hypot(t,n));t/=r,n/=r,be==null||be.setJoystick(t,n),se("stick").style.transform=`translate(${t*28}px,${n*28}px)`}vr.addEventListener("pointerdown",i=>{Mo=i.pointerId,vr.setPointerCapture(i.pointerId),Cl(i)});vr.addEventListener("pointermove",Cl);function Pl(){Mo=null,be==null||be.setJoystick(0,0),se("stick").style.transform=""}for(const i of["pointerup","pointercancel","lostpointercapture"])vr.addEventListener(i,Pl);se("jump").onclick=()=>be==null?void 0:be.jump();setInterval(vo,80);window.render_game_to_text=()=>JSON.stringify({mode:lt,coordinateSystem:"x east, z south; y up; world -27..27. Arrow/WASD movement is camera-relative.",source:Ya,quiz:Bt.id,player:be==null?void 0:be.getPlayer(),target:_o(),environment:H?ln.map(i=>({...i,state:hs(i,H.environment),visited:H.environment.visited.includes(i.id),action:ul(i,H.environment)})):[],environmentState:(H==null?void 0:H.environment)||null,environmentAnimation:be==null?void 0:be.environmentAnimation(),observing:(be==null?void 0:be.isObserving())||!1,rendering:be==null?void 0:be.performance(),npcs:Ze.map((i,e)=>({id:i.id,x:i.x,z:i.z,understood:(H==null?void 0:H.understood.includes(i.id))||!1,sealed:(H==null?void 0:H.seals.includes(i.id))||!1,progress:H?On(H,e):null})),equipment:wt.map(i=>({id:i.id,x:i.x,z:i.z,collected:(H==null?void 0:H.items.includes(i.id))||!1})),exit:{...pi,open:H?gn(H):!1},question:Cn&&["question","feedback"].includes(lt)?{id:Cn.id,prompt:Cn.prompt,options:Cn.options.map(i=>i.text),locked:!!(H!=null&&H.answers[Cn.id])}:null,answered:H?Object.keys(H.answers).length:0,total:Bt.questions.length,score:H?fl(H):0,fireflies:(H==null?void 0:H.collected.length)||0,elapsed:Math.floor((H==null?void 0:H.elapsed)||0),animals:be==null?void 0:be.animals(),paused:ei.open});window.advanceTime=i=>be==null?void 0:be.advanceTime(i);vl().then(ml);
