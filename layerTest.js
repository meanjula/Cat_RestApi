"use strict";
const Datastorage = require("./storage/dataStorageLayer");

const storage = new Datastorage();
console.log(storage);
storage.get(2).then(console.log).catch(console.log);

// storage.remove(2).then(console.log).catch(console.log);
// storage.get(10).then(console.log).catch(console.log);
// storage.get().then(console.log).catch(console.log);
storage.getAll().then(console.log).catch(console.log);
