"use strict";

const http = require("http");
const path = require("path");
const cors = require("cors");
const express = require("express");

const app = express();

// const { host, port } = require("./configRest.json");
const { host, port } = require(path.join(__dirname, "configRest.json"));

const Datastorage = require(path.join(
  __dirname,
  "storage",
  "dataStorageLayer.js"
));
const storage = new Datastorage();

const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json());

app.get("/api/cats", (req, res) =>
  storage
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/cats/:number", (req, res) =>
  storage
    .get(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.delete("/api/cats/:number", (req, res) =>
  storage
    .remove(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.post("/api/cats", (req, res) => {
  const cat = req.body;
  console.log(cat);
  storage
    .insert(cat)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.put("/api/cats/:number", (req, res) => {
  const cat = req.body;
  const number = req.params.number;

  storage
    .update(number, cat)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.all("*", (req, res) => res.json("resource not supported"));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available`)
);
