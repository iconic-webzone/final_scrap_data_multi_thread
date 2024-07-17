import os from 'node:os';
import cluster from 'node:cluster';
import http from 'http';
const cpus = os.cpus();
console.log(cpus);

if(cluster.isMaster){
    console.log('this is the master process', process.pid);
    for(let i = 0; i < cpus.length; i++){
        cluster.fork();
    }
}else{
    console.log("this is the worker process:", process.pid)
    http.createServer((req,res)=>{
        const message = `worker:${process.pid}`;
        console.log(message);
        res.end(message)
    }).listen(2020)
}