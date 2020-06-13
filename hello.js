const { Worker, isMainThread, parentPort } = require('worker_threads');
//isMainThread helps us know when we are either running inside the main thread or a worker thread
//new Worker(__filename) registers a new worker with the __filename variable which, in this case, is hello.js

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);
  });
  worker.postMessage('Main thread');
} else {
  //listen from parent thread
  parentPort.once('message', (message) => {
    console.log(message);
    //send message to parent thread
    parentPort.postMessage('worker thread');
  });
}
