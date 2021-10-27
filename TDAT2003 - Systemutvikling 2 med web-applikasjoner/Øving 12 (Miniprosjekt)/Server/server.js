// @flow

import {type $Application, type $Request, type $Response} from 'express';

let express = require("express"); 
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser"); 
app.use(bodyParser.json()); // for å tolke JSON
const NyhetssakDao = require("./dao/Nyhetssakdao.js");
const KommentarDao = require("./dao/Kommentardao.js");
let pool = mysql.createPool({ 
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no", 
    user: "martijni",
    password: "rtjwkHFp", 
    database: "martijni", 
    debug: false
});

let nyhetssakDao = new NyhetssakDao(pool);
let kommentarDao = new KommentarDao(pool); 


app.use(function(req: $Request , res: $Response, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Vise alle nyhetssakene
app.get("/sak", (req: $Request, res: $Response) => { 
    console.log("/sak: fikk request fra klient");
    nyhetssakDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Viser alle nyhetssakene som har en gitt kategori
app.get("/sak/kat/:katNavn", (req: $Request, res: $Response) => { 
    console.log("/sak/kat/:katNavn: fikk request fra klient");
    nyhetssakDao.getArticlesWithCategory(req.params.katNavn, (status, data) => {
        res.status(status);
        res.json(data);
  });
});


//Viser en nyhetssak basert på id
app.get("/sak/:id", (req: $Request, res: $Response) => { 
    console.log("/sak/kat/:katNavn: fikk request fra klient");
    nyhetssakDao.getArticleWithId(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Viser alle nyhetssakene som har en gitt prioritet
app.get("/sak/pri/:priId", (req: $Request, res: $Response) => { 
    console.log("/sak/pri/:priId: fikk request fra klient");
    nyhetssakDao.getArticlesWithPriority(req.params.priId, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Legger til en nyhetssak og setter et tidspunkt
app.post("/sak", (req: $Request, res: $Response) => { 
    console.log("Fikk POST-request fra klienten");
    nyhetssakDao.postArticle(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Sletter en nyhetssak basert på id
app.delete("/sak", (req: $Request, res: $Response) => { 
    console.log("Fikk DELETE-request fra klienten");
    nyhetssakDao.deleteArticle(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Endrer en nyhetssak basert på id
app.put("/sak", (req: $Request, res: $Response) => { 
    console.log("Fikk PUT-request fra klienten");
    nyhetssakDao.editArticle(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Viser kommentarer basert på id
app.get("/kommentar/:nyhetssakId", (req: $Request, res: $Response) => { 
    console.log("/kommentar/:nyhetssakId: fikk request fra klient");
    kommentarDao.getCommentsWithArticleid(req.params.nyhetssakId, (status, data) => {
        res.status(status);
        res.json(data);
  });
});

//Legger til en nyhetssak og setter et tidspunkt
app.post("/kommentar", (req: $Request, res: $Response) => { 
    console.log("Fikk POST-request fra klienten");
    kommentarDao.postComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
  });
});

let server = app.listen(8080);
