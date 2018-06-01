# menu

## Description

An app for Auth0 blog's article.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing endpoints

After starting your application, you can use the following commands to interact with the API:

```bash
# insert new item
curl -H 'Content-Type: application/json' -d '{
  "name": "Coke",
  "price": 3
}' http://localhost:3000/items

# fetch existing items
curl http://localhost:3000/items
```

If you try to insert items in your cart without authenticating, you will get a 401:

```bash
curl -X POST http://localhost:3000/shopcart
```
