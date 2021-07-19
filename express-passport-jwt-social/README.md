# Social Login with passport

1. [ Init passport-github2 ](#install-github-strategy)
1. [ User Model ](#user-model)
1. [ Get credential from Github application ](#github-application)

<a name="init-github-strategy"></a>

## Init passport-github2

First we need to install [passport-github2](http://www.passportjs.org/packages/passport-github2/)

```sh
npm install passport-github2
```

Require the in `auth.js` the github strategy, add [passport serialize, deserialize](https://stackoverflow.com/a/27637668/9095807) and pass the github strategy to `passport.use()`

```js
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
```

In your routes.js add

```js
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res, next) {
    try {
      return loginController(req, res, next, req.user, null);
    } catch (error) {
      res.json({ err: error });
    }
  }

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
```

Create a loginController function:

```js
const jwt = require("jsonwebtoken");

const loginController = (req, res, next, user, err) => {
  if (err || !user) {
    const error = new Error("An error occurred.");

    return next(error);
  }

  req.login(user, { session: false }, async (error) => {
    if (error) return next(error);

    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN, {
      expiresIn: "1800s",
    });

    return res.json({ token });
  });
};

module.exports = { loginController };
```

<a name="user-model"></a>

## User Model

Password will not be required and we'll add a new property called `githubID`

```js
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // <-- Password now is not required
  },
  githubID: {
    type: String, // <-- Now we need a githubID
    unique: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.githubID) {
    next();
  }

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});
```

<a name="github-application"></a>

## Get credential from Github application

To be able to use github as OAuth we need to create an application in [Github developers](https://github.com/settings/developers), once you have configure it you will need to add the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `.env` file

```js
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
