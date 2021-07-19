# Express passport JWT Auth

1. [ Init ](#init)
2. [ Setting up the database ](#database)
3. [ Setting up Registration and Login Middleware ](#registration)
4. [ Creating the Signup Endpoint ](#signup)
5. [ Creating the Login Endpoint and Signing the JWT ](#login)
6. [ Verifying the JWT ](#jwt)
7. [ Creating Secure Routes ](#routes)
8. [ Putting it all Together ](#all)
9. [ Testing with Postman ](#postman)
10. [ .env ](#env)
11. [ Get Token from Header ](#header)

<a name="init"></a>

## Init

Initialize a new package.json:

```sh
npm init -y
```

Install the project dependencies:

```sh
npm install --save bcrypt body-parser express jsonwebtoken mongoose passport passport-jwt passport-local morgan debug
```

<a name="database"></a>

## Setting up the database

Create a model directory:

```sh
mkdir model
```

Create a `User.js` file in this new directory:

```
touch ./model/User.js
```

```js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
```

<a name="registration"></a>

## Setting up Registration and Login Middleware

Create an auth directory:

```
mkdir auth
```

Create an `auth.js` file in this new directory:

```
touch ./auth/auth.js
```

```js
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/User");
```

First, add a Passport middleware to handle user registration:

```js
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
```

NOTE: You need to add { ..., passReqToCallback : true } in passport's localStrategy to pass the entire req in case more fields are needed when registering user

Next, add a Passport middleware to handle user login:

```js
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
```

<a name="signup"></a>

## Creating the Signup Endpoint

Create a routes directory:

```sh
mkdir routes
```

Create a `routes.js` file in this new directory

```
touch ./routes/routes.js
```

Start by requiring express and passport and add handling of a POST request for signup:

```js
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

module.exports = router;
```

<a name="login"></a>

## Creating the Login Endpoint and Signing the JWT

In `routes.js` require jsonwebtoken

```js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
```

Next, add handling of a POST request for login:

```js
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
```

Note: You set { session: false } because you do not want to store the user details in a session. You expect the user to send the token on each request to the secure routes.

This is especially useful for APIs, but it is not a recommended approach for web applications for performance reasons.

<a name="jwt"></a>

## Verifying the JWT

Add the following lines of code in auth.js:

```js
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
```

<a name="routes"></a>

## Creating Secure Routes
Create a new `secure-routes.js` file in `routes`:

```
touch ./routes/secure-routes.js
```

```js
const express = require("express");
const router = express.Router();

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

module.exports = router;
```

<a name="all"></a>

## Putting it all Together

Create a new `app.js` file:

```js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const debug = require('debug')('app')

mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");


const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  debug("Server started. 🚀");
});
```

<a name="postman"></a>

## Testing with Postman
In Postman, set up the request to the `signup` endpoint you created in `routes.js`:

```
POST localhost:3000/signup
Body
x-www-form-urlencoded
```

And send over these details through the `Body` of your request:
|Key|Value|
| ------------- | ------------- |
|email|example@example.com|
|password|password|

When that’s done, click the Send button to initiate the POST request:

```
Output
{
    "message": "Signup successful",
    "user": {
        "_id": "[a long string of characters representing a unique id]",
        "email": "example@example.com",
        "password": "[a long string of characters representing an encrypted password]",
        "__v": 0
    }
}
```

In Postman, set up the request to the login endpoint you created in routes.js:

```
POST localhost:3000/login
Body
x-www-form-urlencoded
```

And send over these details through the `Body` of your request:
|Key|Value|
| ------------- | ------------- |
|email|example@example.com|
|password|password|

```
Output
{
    "token": "[a long string of characters representing a token]"
}
```

In Postman, set up the request to the profile endpoint you created in `secure-routes.js`:

```
GET localhost:3000/user/profile
Params
```

| Key          | Value                                              |
| ------------ | -------------------------------------------------- |
| secret_token | [a long string of characters representing a token] |

<a name=".env"></a>
## .env

Install dotenv to bring environment variables into your node application

```sh
npm install dotenv
```

Use Node.js’s built-in crypto library to create a TOKEN
```sh
require('crypto').randomBytes(64).toString('hex')
// 'long string of numbers'
```

Then paste it in your `.env` file
```sh
TOKEN_SECRET=longStringOfNumbers
```

Add this in your file to use the env variables

```js
const dotenv = require('dotenv').config();

process.env.TOKEN_SECRET;
```
<a name="header"></a>

## Header

To extract your token from Header use 

```js
ExtractJWT.fromAuthHeaderAsBearerToken("secret_token")
```

in JWTconfig of JWTstrategy

To send it from postman got to Authorization tab then select Bearer Token and paste it
