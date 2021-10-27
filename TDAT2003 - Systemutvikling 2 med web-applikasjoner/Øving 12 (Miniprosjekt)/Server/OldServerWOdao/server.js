// @flow

let express = require("express"); let mysql = require("mysql");
let app = express();
let pool = mysql.createPool({ connectionLimit: 5,
host: "mysql.stud.iie.ntnu.no", user: "martijni",
password: "rtjwkHFp", database: "martijni", debug: false
});
let bodyParser = require("body-parser"); 
app.use(bodyParser.json()); // for å tolke JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Vise alle nyhetssakene
app.get("/sak", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database"); 
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        }else {
            connection.query(
            "select id, overskrift, tidspunkt, dato, bilde, kategori, viktighet from sak ORDER BY id DESC", (err, rows) => {
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

//Viser alle nyhetssakene som har en gitt kategori
app.get("/sak/kat/:katNavn", (req, res) => { 
    console.log("Fikk request fra klient, henter ut kategorier"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, bilde from sak where kategori=? ORDER BY id DESC", req.params.katNavn,
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


//Viser en nyhetssak basert på id
app.get("/sak/:id", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, forfatter, innhold, tidspunkt, dato, bilde, bildetekst, kategori, viktighet, bildetekst from sak where id=?", req.params.id,
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

//Viser alle nyhetssakene som har en gitt prioritet
app.get("/sak/pri/:priId", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, forfatter, innhold, tidspunkt, dato, bilde, kategori, viktighet from sak where viktighet=? ORDER BY id DESC", req.params.priId,
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


//Viser alle nyhetssakene som har en gitt kategori
app.get("/sak/kat/:katNavn", (req, res) => { 
    console.log("Fikk request fra klient, henter ut kategorier"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, overskrift, forfatter, innhold, tidspunkt, dato, bilde, kategori, viktighet from sak where kategori=? ORDER BY id DESC", req.params.katNavn,
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
app.post("/sak", (req, res) => { 
    console.log("Fikk POST-request fra klienten"); 
    console.log("Navn: " + req.body.overskrift); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let val = [req.body.overskrift, req.body.innhold, req.body.forfatter, req.body.bilde, req.body.bildetekst, req.body.kategori, req.body.viktighet];
            //Må legge til tidspunkt og dato
            let now = new Date();
            let tidspunkt = now.getHours()+":"+now.getMinutes();
            console.log(tidspunkt);
            tidspunkt += ":00"; //Sekunder må lagres men skal ikke telles
            val.push(tidspunkt);
            let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
            console.log(dato);
            val.push(dato);

            connection.query(
                "insert into sak (overskrift, innhold, forfatter, bilde, bildetekst, kategori, viktighet, tidspunkt, dato) values (?,?,?,?,?,?,?,?,?)", 
                val,
                err => {
                    connection.release(); 
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

//Sletter en nyhetssak basert på id
app.delete("/sak", (req, res) => { 
    console.log("Fikk Delete-request fra klienten"); 
    console.log("ID: " + req.body.id); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            connection.query(
            "delete from sak where id=?;", 
            req.body.id,
            err => {
                connection.release(); 
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

//Endrer en nyhetssak basert på id
app.put("/sak", (req, res) => { 
    console.log("Fikk Put-request fra klienten"); 
    console.log("ID: " + req.body.id); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let now = new Date();
            let tidspunkt = now.getHours()+":"+now.getMinutes();
            console.log(tidspunkt);
            tidspunkt += ":00";
            let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
            let val = [req.body.overskrift, req.body.forfatter, req.body.innhold, req.body.bilde, req.body.bildetekst, req.body.kategori, req.body.viktighet, dato, tidspunkt, req.body.id];
            connection.query(
            "update sak set overskrift=?, forfatter=?, innhold=?, bilde=?, bildetekst=?, kategori=?, viktighet=?, dato=?, tidspunkt=? WHERE id=?;", 
            val,
            err => {
                connection.release(); 
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

//Viser kommentarer basert på id
app.get("/kommentar/:nyhetssakId", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        } else {
            connection.query(
            "select id, nyhetssakId, datoOgTidspunkt, kommentar, forfatter from kommentarer where nyhetssakId=? ORDER BY id DESC limit 20", req.params.nyhetssakId,
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
app.post("/kommentar", (req, res) => { 
    console.log("Fikk POST-request fra klienten"); 
    console.log("Navn: " + req.body.kommentar); 
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling"); 
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let val = [req.body.nyhetssakId, req.body.forfatter, req.body.kommentar];
            //Må legge til tidspunkt og dato
            let now = new Date();
            let tidspunkt = now.getHours()+":"+now.getMinutes();
            let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
            let datoOgTidspunkt = dato + " - " + tidspunkt;
            val.push(datoOgTidspunkt);

            connection.query(
                "insert into kommentarer (nyhetssakId, forfatter, kommentar, datoOgTidspunkt) values (?,?,?,?)", 
                val,
                err => {
                    connection.release(); 
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


let server = app.listen(8080);


/*

//Hente alle nyhetssakene til livefeed, med spesifikk info
app.get("/sak/livefeed", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database"); 
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        }else {
            connection.query(
            "select id, overskrift, tidspunkt, dato from sak ORDER BY id DESC", (err, rows) => {
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

//Hente alle nyhetssakene til hjemskjermen, med spesifikk info
app.get("/sak/home", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database"); 
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" }); 
        }else {
            connection.query(
                "select id, overskrift, bilde from sak where viktighet=1 ORDER BY id DESC", (err, rows) => {
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



/*
//Viser en nyhetssak basert på id V2
app.get("/nyhetssakV2/:nyhetssakId", (req, res) => { 
    console.log("Fikk request fra klient"); 
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        //Sjekker om id'en er en gyldig id
        if(Number.isInteger(req.params.nyhetssakId)){
            let id = parseInt(req.params.nyhetssakId);
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