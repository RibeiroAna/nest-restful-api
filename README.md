# menu

## Description

An app for Auth0 blog's article.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Testing endpoints

After running the commands above sucessfully, you may go to `localhost:3000/dishes` and get a empty list. To add elements to this list, you may type the following on the terminal:

```bash
curl 'localhost:3000/dishes' -H "Content-Type: application/json" -d '{"name":"Coke", "price":3}'
```
(You may change the name and the price of the element)
