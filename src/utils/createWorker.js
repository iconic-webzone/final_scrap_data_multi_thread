import { Worker } from 'worker_threads';
const THREAD_COUNT = 4;
function createWorker() {
    return new Promise(function (resolve, reject) {
      const worker = new Worker("./src/utils/four_scrapWebsite.js", {
        workerData: { thread_count: THREAD_COUNT },
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