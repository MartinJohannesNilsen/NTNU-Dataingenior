let logInButton = document.querySelector("#runLogin");

logInButton.addEventListener("click", e => {
  console.log("Fikk klikk-event");
  let url = "/login";
  let brukernavn = document.querySelector("#brukernavn").value;
  let passord = document.querySelector("#passord").value;
  fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/json; charset=utf-8"},
    body: JSON.stringify({"brukernavn": brukernavn, "passord":passord})
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);
    localStorage.setItem("key", JSON.stringify(json.jwt));
  })
  .catch(error => console.error("Error: ", error));
});
  
let hentPersonButton = document.querySelector("#hentPerson");
hentPersonButton.addEventListener("click", e => {
  fetch("/token", {
    method: "POST",
    headers: {"x-access-token": JSON.parse(localStorage.getItem("key"))},
    body: JSON.stringify({"brukernavn": document.querySelector("#brukernavn").value})
  })
  .then(response => response.json())
  .then(json => {
    localStorage.setItem("key", JSON.stringify(json.jwt));
    console.log(json);
  })
  .catch(error => console.error("Error: ", error))

  fetch("/api/person", {
    method: "GET",
    headers: {"x-access-token": JSON.parse(localStorage.getItem("key"))}
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error("Error: ", error))
})
