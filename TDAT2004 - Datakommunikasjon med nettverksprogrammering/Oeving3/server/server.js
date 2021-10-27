const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {cpp, python} = require('compile-run');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/cpp", (req, res) => { 
    console.log("Fikk POST-request fra klienten");
    console.log("Innskrevet kode: \n" + req.body.editorTekst);
    if(req.body.språk === 'cpp'){
        let resultPromise = cpp.runSource(req.body.editorTekst, { stdin:'3\n2 '});
        resultPromise
        .then(result => {
            if(result.stderr != ""){
                let feilmelding = result.stderr;
                split1 = feilmelding.split(".cpp:")
                linjetall = "Line " + split1[1];
                split2 = linjetall.split(" error: ");
                feilmelding = split2[0] + '\n' + split2[1];
                res.send(feilmelding);
            }else{
            res.send(result.stdout); 
            }
            console.log(result.stdout);
        })
        .catch(err => {
            console.log(err);
        });
    } else if(req.body.språk === 'python'){
        let resultPromise = python.runSource(req.body.editorTekst, { stdin:'3\n2 '});
        resultPromise
        .then(result => {
            if(result.stderr != ""){
                let feilmelding = result.stderr;
                split1 = feilmelding.split(".cpp:")
                linjetall = "Line " + split1[1];
                split2 = linjetall.split(" error: ");
                feilmelding = split2[0] + '\n' + split2[1];
                res.send(feilmelding);
            }else{
            res.send(result.stdout); 
            }
            console.log(result.stdout);
        })
        .catch(err => {
            console.log(err);
        });
    }
});

app.get('/test', function (req, res) {
  res.send("Testen fungerer")
});

const PORT = 8080;
app.listen(PORT);