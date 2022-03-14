"use strict";

const toArrayInsert = (cat) => [
  +cat.number,
  cat.name,
  +cat.yearOfBirth,
  +cat.length,
  +cat.weightKg,
];

const toArrayUpdate = (cat) => [
  cat.name,
  +cat.yearOfBirth,
  +cat.length,
  +cat.weightKg,
  +cat.number,
];

module.exports = { toArrayInsert, toArrayUpdate };
