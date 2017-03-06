# dev-shop-api

This is the API for the dev shop

Demo: [https://dev-shop-api.herokuapp.com/](https://dev-shop-api.herokuapp.com/)

# Requirements

*Node
*MongoDB

# Run local

Update the Mongodb connection string in the file `config/development.js`

```javascript
module.exports = {
    DATABASE_URL: 'mongodb://localhost:27017/dev-shop'
}
```

Install dependencies:

```npm install```

Run:

```npm run dev```

Server will start at [http://localhost:5000](http://localhost:5000)

# Run tests

Update the Mongodb connection string in the file `config/test.js`

```javascript
module.exports = {
    DATABASE_URL: 'mongodb://localhost:27017/dev-shop'
}
```

Install dependencies:

```npm install```

Run:

```npm run test```
