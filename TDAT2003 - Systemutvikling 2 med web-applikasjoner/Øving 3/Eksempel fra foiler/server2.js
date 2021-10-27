var express = require("express");
var app = express();

app.get("/hello", (req, res) => {
    res.send("Du er søt");
})

app.get("/hello2", (req, res) => {
    res.json({ message: "Hei Lea" });
})

var server = app.listen(8080);
