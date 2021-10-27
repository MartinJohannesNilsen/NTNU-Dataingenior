var colors = {
    0: "Red",
    1: "Orange",
    2: "Yellow",
    3: "Green",
    4: "Blue"
};

function setBackgroundColor(){
    console.log("Klikk registrert");
    let url = "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment/log?api-key=Happy!!!";
    let data = document.getElementById("input").value;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ sentence: data })
    })
    .then(response => response.json())
    //.then(json => console.log(json.value + " og " + colors[json.value]))
    .then(json => document.body.style.background = colors[json.value])
    .catch(error => console.error("Error: ", error));
};

window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        setBackgroundColor();
    }
}, false);

let myButton = document.getElementById("Button");
myButton.onclick = function(){ 
    setBackgroundColor();
};



 
