# Example console application using Flow static type checker

## Fetch, install dependencies, and run:
```sh
npm install -g flow-bin  # Install Flow type checker

git clone https://gitlab.com/tdat2003/flow-example
cd flow-example

npm install  # Install project dependencies

flow                              # Check for Flow type errors
flow coverage --color src/app.js  # Check for missing Flow types

npm start    # Run src/app.js through node with babel support

```

--------

Husk å kjøre npm install inne i flow-example. Dette for å få node_modules, som er nødvendig for å kunne kjøre.

