# menu

## Description

An app written in Nest.js for Auth0 blog's article. It is a simple app of a restaurant`s menu, in this app any user can see the items of this menu, only identified users may add items to a shopcart and only an Admin user may add new items to the menu.

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
# fetch existing items
curl http://localhost:3000/items

# post items to a shopcart (functionality not implemented)
# only to identified users
curl 
-H 'authorization: Bearer ${TOKEN}'
-X POST 
http://localhost:3000/shopcart


# insert new item, only for authorized admin users
curl
-H 'Content-Type: application/json'
-H 'authorization: Bearer ${TOKEN} '
-d '{
  "name": "Coke",
  "price": 3
}' http://localhost:3000/items
```
If you don't provide a valid token, you will get a 401 response code. Below there are steps on how to generate your token.

## Generating Auth0 tokens

In order to test some endpoints, you must have an Auth0 token. To generate them follow the steps below:

### Creating an identification token

* Create a free [Auth0](auth0.com) account, then visit the file [/common/authentication.middlware.ts](../blob/master/src/common/authentication.middleware.ts) and put your account's information there;
* On your Auht0 dashboard:
  *  create a new [API](https://manage.auth0.com/#/apis) which audience is `http://localhost:3000` and Signing Algorithm is `RS256` (the name can be any);
  * go to [Application](https://manage.auth0.com/#/applications) submenu, choose the application with a matching name with your API, then change its type to `single page web application` and set  `Allowed Callback URLs` to `http://localhost:8080/login` (this address is going to be used by our future front end application).
  * Enable [Universal login page](https://auth0.com/docs/hosted-pages/login) on your account and then visit with your browser the following address:

  ```bash
  # you must change ${YOUR_CLIENT_DOMAIN} and ${YOUR_CLIENT_ID} to the information available on your auth0 dashboard

  https://${YOUR_CLIENT_DOMAIN}/authorize?audience=http://localhost:3000&scope=SCOPE&response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=http://localhost:8080/login&state=STATE?prompt=none

  ```
* Peform login on the page above, and then it will return to: `http://localhost:8080/login?code=${CODE}&state=STATE%3Fprompt%3Dnone` (for now, a page not found)
* Copy the code returned on the URL, open a terminal and do the following command:

```bash
  # you must change ${YOUR_CLIENT_DOMAIN}, ${YOUR_CLIENT_ID} and ${YOUR_CLIENT_SECRET} to the information available on your auth0 dashboard, and ${CODE} to the code found in the last step.

curl --request POST \
  --url 'https://${YOUR_CLIENT_DOMAIN}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "${YOUR_CLIENT_ID}","client_secret": "${YOUR_CLIENT_SECRET}","code": "${CODE}","redirect_uri": "http://localhost:8080"}'

```

* Then it will return a code that may be used together with some of the requests. BUT if you want to use it with a admin funcionality, you must follow the steps bellow:

### Creating an admin token

First, make sure that the tutorial for creating a identification token worked. Then do the following:

* On your Auht0 dashboard:
  * Go to [rules menu](https://manage.auth0.com/#/rules) and create a new rule (select `Set roles to an user`), it will open a JavaScript code, this code does a few things: first it verifies if an user email belongs to a domain, then if it does, the code adds an element "admin" to Identification Token (used to get information about a user). We will want to change a few things on that, first, for test purposes it would be better to have one email to test, so I will change the domain name for my email address and because we use an access token to access features of our API, then I will change the Identification token there. By the end the code there will be the following one:

  ```javascript
    function (user, context, callback) {
      user.app_metadata = user.app_metadata || {};
      // You can add a Role based on what you want
      // In this case I check an e-mail
      var addRolesToUser = function(user, cb) {
        if (user.email && user.email === ${YOUR_EMAIL}) {
          cb(null, ['admin']);
        } else {
          cb(null, ['user']);
        }
      };

      addRolesToUser(user, function(err, roles) {
        if (err) {
          callback(err);
        } else {
          user.app_metadata.roles = roles;
          auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
            .then(function(){
              context.accessToken['http://localhost:3000/roles'] = user.app_metadata.roles;
              callback(null, user, context);
            })
            .catch(function(err){
              callback(err);
            });
        }
      });
    }
  ```
Then you may redo the process of creating an identification token, but login in with the email you put on ${YOUR_EMAIL}, and you will get a token with access to admin functions.



