"use strict";

const toArrayInsert = (cat) => [
  +cat.number,
  cat.name,
  +cat.yearOfBirth,
  +cat.length,
  +cat.weightKg,
];

//returns for example: [100,'abc','laptop','X1Z',23]
const toArrayUpdate = (cat) => [
  cat.name,
  +cat.yearOfBirth,
  +cat.length,
  +cat.weightKg,
  +cat.number,
];

module.exports = { toArrayInsert, toArrayUpdate };
