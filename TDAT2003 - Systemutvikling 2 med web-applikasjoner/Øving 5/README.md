# Eksempel med Node/Jest/MySQL og GitLabCI

Dette er et prosjekt som implementerer en REST-service med et DAO-objekt og tester dette med Node/JEST.

Prosjektet bruker GitLab CI med et Docker-image for Node og en service for MySQL. 

Testen bruker MySQL-servicen slik at testen har en annen database enn REST-tjenesten.

-------

For å kjøre programmet må du fylle ut påloggingsinformasjonen i server.js. For å kjøre CI-testene må du først sette opp pilelines i gitlab med en .yml-fil, for så å legge inn påloggingsinformasjon om denne testdatabasen i personDao.test.js.
Om noe ikke funker kan en alltids prøve `npm install`, eller se i package.json om en bruker riktig kommando/script for å kjøre.
