"use strict";

const http = require("http");
const fetch = require("./fetchlib");
const express = require("express"); //it takes care of down layer of app
const app = express();
const path = require("path");
const { port, host } = require("./config.json");

const server = http.createServer(app);
//single page server only get and post done here
//using rest server for data

app.use(express.json()); //used for post operation
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});
app.get("/getAll", (req, res) => {
  fetch("http://localhost:4000/api/cats", { mode: "cors" })
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/getOne", (req, res) => {
  const catNumber = req.body.number;

  if (catNumber && catNumber.length > 0) {
    fetch(`http://localhost:4000/api/cats/${catNumber}`, { mode: "cors" }) //GET is default method
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});
app.post("/remove", (req, res) => {
  const catNumber = req.body.number;

  if (catNumber && catNumber.length > 0) {
    fetch(`http://localhost:4000/api/cats/${catNumber}`, {
      method: "DELETE",
      mode: "cors",
    }) //GET is default method
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});
app.post("/add", (req, res) => {
  const cat = req.body;
  console.log(cat);
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  };

  fetch("http://localhost:4000/api/cats", options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/update", (req, res) => {
  const cat = req.body;

  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  };

  fetch(`http://localhost:4000/api/cats/${cat.number}`, options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

server.listen(port, host, () =>
  console.log(`Server ${host}: ${port} is running `)
);
//go to localhost:3000
