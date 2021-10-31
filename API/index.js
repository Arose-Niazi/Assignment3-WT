const express = require("express");
const app = express();
const data = require("./data.json");
app.use(express.json());

let facultyID = data.length;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, DELETE"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});

app.get("/", function (req, res) {
    res.status(200).send(
        "Please use the faculty API using " +
            "https://api.assign3.arose-niazi.me" +
            "/api/faculty"
    );
});

app.get("/api/faculty", function (req, res) {
    res.json(data);
});

app.get("/api/faculty/:index", function (req, res) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].id == req.params.index) return res.json(data[index]);
    }
    return res.status(400).send("Faculty member not found");
});

app.put("/api/faculty/:index", function (req, res) {
  for (let index = 0; index < data.length; index++) {
      if (data[index].id == req.params.index) 
    {
      var keys = Object.keys(req.body);
      for (let key = 0; key < keys.length; key++) {
          data[index][keys[key]] = req.body[keys[key]];
      }
      return res.json(data[index]);
    }
  }
  return res.status(400).send("Faculty member not found");
});
//delete one resource
app.delete("/api/faculty/:index", function (req, res) {
  for (let index = 0; index < data.length; index++) {
    if (data[index].id == req.params.index) {
      data.splice(index, 1);
      return res.status(200).send("Removed!");
    }
  }
  return res.status(400).send("Faculty member not found");
});
//create one resource
app.post("/api/faculty", function (req, res) {
    console.log();
    data.push(req.body);
    data[data.length - 1].id = facultyID++;
    res.send(data);
});

app.get("*", function (req, res) {
    res.send("Invalid API", 404);
});

app.listen(3000);
