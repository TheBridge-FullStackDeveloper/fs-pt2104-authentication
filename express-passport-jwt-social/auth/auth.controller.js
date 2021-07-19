const UserModel = require("../model/User");

const signupController = async (email, password, done) => {
  try {
    const user = await UserModel.create({ email, password });

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const loginController = async (email, password, done) => {
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
    done(error);
  }
};

const JWTcontroller = async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
};

const githubController = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await UserModel.findOne({ githubID: profile.id });

    if (user) {
      return done(null, user);
    }

    const newUser = UserModel.create({ 
      githubID: profile.id,
      email: profile.emails[0].value
     });

    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

module.exports = {
  signupController,
  loginController,
  githubController,
  JWTcontroller,
};
