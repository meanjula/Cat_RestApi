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
  insert(catData) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.doQuery(insertSql, toArrayInsert(catData));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, catData[PRIMARY_KEY]));
      } catch (err) {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }
  update(number, data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (number && data) {
          if (data[PRIMARY_KEY] != number) {
            reject(MESSAGES.KEYS_DO_NOT_MATCH(number, data[PRIMARY_KEY]));
          } else {
            const resultGet = await this.db.doQuery(getSql, [number]);
            //if object exists resultGet.queryResult.length=1 else 0
            if (resultGet.queryResult.length > 0) {
              const result = await this.db.doQuery(
                updateSql,
                toArrayUpdate(data)
              );
              if (result.queryResult.rowsChanged === 0) {
                resolve(MESSAGES.NOT_UPDATED());
              } else {
                resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, data[PRIMARY_KEY]));
              }
            } else {
              this.insert(data)
                .then((status) => resolve(status))
                .catch((err) => reject(err));
            }
          }
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
