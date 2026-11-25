const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const root=__dirname;
const pub=path.resolve(root,'public');
const db=path.join(process.env.DATA_DIR||path.join(root,'data'),'store.json');
const PORT=Number(process.env.PORT||4173);
async function state(){try{return JSON.parse(await fs.readFile(db,'utf8'))}catch{return {completed:[],trades:[]}}}
const server=http.createServer(async(req,res)=>{try{
 if(req.url==='/api/state'&&req.method==='GET'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(await state()))}
 if(req.url==='/api/state'&&req.method==='PUT'){let body='';for await(const chunk of req)body+=chunk;const data=JSON.parse(body);data.completed=data.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<30);data.trades=data.trades.slice(0,500);await fs.mkdir(path.dirname(db),{recursive:true});await fs.writeFile(db,JSON.stringify(data,null,2));res.setHeader('Content-Type','application/json');return res.end('{"ok":true}')}
 const url=new URL(req.url,'http://localhost');let file=path.resolve(pub,'.'+decodeURIComponent(url.pathname));
 if(file!==pub&&!file.startsWith(pub+path.sep)){res.statusCode=403;return res.end('Forbidden')}
 if(url.pathname==='/')file=path.join(pub,'index.html');
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Type',file.endsWith('.css')?'text/css; charset=utf-8':file.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8');res.end(await fs.readFile(file));
 }catch(err){res.statusCode=400;res.end(err.message)}});
server.listen(PORT,'0.0.0.0',()=>console.log('Open http://127.0.0.1:'+PORT));