"use strict";
const { CODES, TYPE, MESSAGES } = require("./statusCode");
const Database = require("./database");
const options = require("./databaseOption.json");
const sql = require("./sqlStatement.json");

const { toArrayInsert, toArrayUpdate } = require("./parameters");

const getAllSql = sql.getAll.join(" ");
//console.log(getAllSql); gives this: select number, name, yearOfBirth, length, weightKg from cat

const getSql = sql.get.join(" ");
const insertSql = sql.insert.join(" ");
const updateSql = sql.update.join(" ");
const removeSql = sql.remove.join(" ");
const PRIMARY_KEY = sql.primaryKey;

module.exports = class DataStorage {
  constructor() {
    this.db = new Database(options);
  }

  get CODES() {
    return CODES;
  }

  //async function otherwise gives undefined
  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
  get(number) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [number]);
        if (result.queryResult.length > 0) {
          resolve(result.queryResult[0]);
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, number));
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  } //end of get
  remove(number) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(removeSql, [number]);
        if (result.queryResult.rowsChanged === 1) {
          resolve(MESSAGES.DELETE_OK(PRIMARY_KEY, number));
        } else {
          resolve(MESSAGES.NOT_DELETED(PRIMARY_KEY, number));
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
