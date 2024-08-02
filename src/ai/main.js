import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the current module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the worker path
const workerPath = path.join(__dirname, 'worker.js');


const THREAD_COUNT = cpus().length;

// const urls = [
//   'https://example.com',
//   'https://anotherexample.com',
//   'https://yetanotherexample.com'
// ]; // Add more URLs as needed

function createWorker(urls) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { urls }
    });
    worker.on('message', (data) => {
      resolve(data);
    });
    worker.on('error', (msg) => {
      reject(`An error occurred: ${msg}`);
    });
    worker.on('exit', (code) => {
      if (code !== 0)
        console.error(`Worker stopped with exit code ${code}`);
    });
  });
}

async function startWorkers(urls) {
  const chunkSize = Math.ceil(urls.length / THREAD_COUNT);
  const promises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    const chunk = urls.slice(i * chunkSize, (i + 1) * chunkSize);
    if (chunk.length > 0) {
      promises.push(createWorker(chunk));
    }
  }

  try {
    const results = await Promise.all(promises);
    console.log('Results from workers:', results);
    return results;
  } catch (error) {
    console.error('Error in workers:', error);
  }
}

// startWorkers(urls);


export default startWorkers;
