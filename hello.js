const { Worker, isMainThread } = require('worker_threads');
//isMainThread helps us know when we are either running inside the main thread or a worker thread
//new Worker(__filename) registers a new worker with the __filename variable which, in this case, is hello.js

if (isMainThread) {
  new Worker(__filename);
} else {
  console.log('Worker says: Its working');
}
