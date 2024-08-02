import { Worker } from 'worker_threads';
import { cpus } from 'os';


const THREAD_COUNT = cpus().length;


function createWorker() {
    return new Promise(function (resolve, reject) {
      const worker = new Worker("./src/utils/four_scrapWebsite.js", {
        workerData: { THREAD_COUNT },
      });
      worker.on("message", (data) => {
        resolve(data);
      });
      worker.on("error", (msg) => {
        reject(`An error ocurred: ${msg}`);
      });
    });
  }

  export default createWorker;