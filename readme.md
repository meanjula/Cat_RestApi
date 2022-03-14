# Ghale_Timsina_cat_project

Create a project folder and generate package.json file for the project. Also Install all necessary libraries(mariadb, express and cors) for the project.

```js
npm init
npm install mariadb express cors
```

## storage folder

### database

create Database class with a constructor and doQuery function which establish connection with mariadb database.

### createStatement.json

#### createStatement

Create statement for database and create a table cat, for cat data. Table columns are:

- number integer
- name varchar(12)
- yearOfBirth integer
- length integer
- weightKg integer

* All columns are mandatory. The primary key is number.
* Add two insert statements into the create statements for testing.
* Create user grace@localhost with password fAemmjm6. Grant all necessary privileges to the user.

#### createDatabase.js

Includes all conditon and command for creating database(user and table and table containing row of data).

Go to storage folder in terminal and run 'node createDataBase.js' for creating database 'catdb';
After that go to shell and login to your databses and check catdb exist or not. If catdb exist check for table data.

```sh
mysql -u anjula -p
password
show databases;
use catdb;
describe cat;

```

#### sqlStatement.json

write all the sqlstaement for getAll, getOne, insert,delete and update.

```sh
{
	"get":["select number, name, yearOfBirth, length, weightKg from cat", "where number=?"]
}

```

#### dataStoragelayer.js

##### getAll

```
sh

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
```

##### getOne

```sh

getOne(number) {
return new Promise(async (resolve, reject) => {
try {
const result = this.db.doQuery(getSql,number;
if (result.queryResult.length > 0) {
          resolve(result.queryResult[0]);
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, number));
        }
} catch (err) {
console.log(err)
}
});
}
```

#### layerTest.js

If you want to make sure it is working well make testLayer and test all crud operations.

```sh
const storage = new Datastorage();
storage.get(2).then(console.log).catch(console.log);
storage.getAll().then(console.log).catch(console.log);
storage.remove(2).then(console.log).catch(console.log);
```
