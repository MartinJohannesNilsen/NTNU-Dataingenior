var express = require("express"); var mysql = require("mysql");
var app = express();
var pool = mysql.createPool({ 
connectionLimit: 2,
host: "", 
user: "",
password: "", 
database: "", 
debug: false
});
var bodyParser = require("body-parser"); 
app.use(bodyParser.json()); // for å tolke JSON

//Vise alle nyhetssakene
app.get("/nyhetssak", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database"); 
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        }else {
            connection.query(
            "select id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet from nyhetssaker", (err, rows) => {
                connection.release(); 
                if (err) {
                    console.log(err);
                    res.json({ error: "error querying" }); 
                } else {
                    console.log(rows);
                    res.json(rows); 
                }
            } );
        } 
    });
});

//Viser en nyhetssak basert på id
app.get("/nyhetssak/:nyhetssakId", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet from nyhetssaker where id=?", req.params.nyhetssakId,
            (err, rows) => { 
                connection.release(); 
                if (err) {
                    console.log(err);
                    res.json({ error: "error querying" }); 
                } else {
                    console.log(rows);
                    res.json(rows); 
                }
            } );
         } 
    });
});

//Legger til en nyhetssak og setter et tidspunkt
app.post("/nyhetssak", (req, res) => { 
    console.log("Fikk POST-request fra klienten"); 
    console.log("Navn: " + req.body.overskrift); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.overskrift, req.body.innhold, req.body.bilde, req.body.kategori, req.body.viktighet];
            var now = new Date();
            let tidspunkt = now.getHours()+":"+now.getMinutes();
            console.log(tidspunkt);
            tidspunkt += ":00"; //Sekunder må lagres men skal ikke telles
            val.push(tidspunkt);
            connection.query(
                "insert into nyhetssaker (overskrift, innhold, bilde, kategori, viktighet, tidspunkt) values (?,?,?,?,?,?)", 
                val,
                err => {
                    if (err) { console.log(err);
                    res.status(500);
                    res.json({ error: "Feil ved insert" }); 
                } else {
                    console.log("insert ok");
                    res.send(""); 
                }
            });
        }  
    });
});

//Sletter en nyhetssak basert på nøkkelen overskrift og tidspunkt
app.delete("/nyhetssak", (req, res) => { 
    console.log("Fikk POST-request fra klienten"); 
    console.log("Navn: " + req.body.overskrift); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let tidspunkt = req.body.tidspunkt+":00";
            var val = [req.body.overskrift, tidspunkt];
            connection.query(
            "delete from nyhetssaker where (overskrift = ? AND tidspunkt = ?);", 
            val,
            err => {
                if (err) { 
                    console.log(err);
                    res.status(500);
                    res.json({ error: "Feil ved delete" }); 
                } else {
                    console.log("delete ok");
                    res.send(""); 
                }
            });
        }  
    });
});

//Endrer en nyhetssak basert på overskrift og tidspunkt
app.put("/nyhetssak", (req, res) => { 
    console.log("Fikk POST-request fra klienten"); 
    console.log("Navn: " + req.body.eksisterendeOverskrift); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let eksisterendeTidspunkt = req.body.eksisterendeTidspunkt+":00";
            var tid = new Date();
            let tidspunkt = tid.getHours()+":"+tid.getMinutes();
            console.log(tidspunkt);
            tidspunkt += ":00";
            var val = [req.body.overskrift, req.body.innhold, req.body.bilde, req.body.kategori, req.body.viktighet, req.body.eksisterendeOverskrift, eksisterendeTidspunkt];
            connection.query(
            "update nyhetssaker set overskrift=?, innhold=?, bilde=?, kategori=?, viktighet=?, tidspunkt='" + tidspunkt + "' WHERE (overskrift = ? AND tidspunkt = ?);", 
            val,
            err => {
                if (err) { 
                    console.log(err);
                    res.status(500);
                    res.json({ error: "Feil ved update" }); 
                } else {
                    console.log("update ok");
                    res.send(""); 
                }
            });
        }  
    });
});


var server = app.listen(8080);



/*
//Viser en nyhetssak basert på id V2
app.get("/nyhetssakV2/:nyhetssakId", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        //Sjekker om id'en er en gyldig id
        if(Number.isInteger(req.params.nyhetssakId)){
            var id = parseInt(req.params.nyhetssakId);
        } else {
            console.log("Ugyldig id");
            res.json({ error: "feil ved parsing av int" });
        }
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet from nyhetssaker where id=" + id,
            (err, rows) => { 
                connection.release(); 
                if (err) {
                    console.log(err);
                    res.json({ error: "error querying" }); 
                } else {
                    console.log(rows);
                    res.json(rows); 
                }
            } );
         } 
    });
});
*/
