"use strict";
const Datastorage = require("./storage/dataStorageLayer");

const storage = new Datastorage();
// console.log(storage);

const newCat = {
  name: "Sweetty",
  yearOfBirth: 2017,
  length: 21,
  weightKg: 1,
  number: 3,
};
const catData = {
  number: 9,
  name: "Tiger",
  yearOfBirth: 2013,
  length: 25,
  weightKg: 2,
};
// storage.get(3).then(console.log).catch(console.log);
// storage.remove(2).then(console.log).catch(console.log);
// storage.get(10).then(console.log).catch(console.log);
storage.insert(catData).then(console.log).catch(console.log);
// storage.update(3, newCat).then(console.log).catch(console.log);
storage.getAll().then(console.log).catch(console.log);
