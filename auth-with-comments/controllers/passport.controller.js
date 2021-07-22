const UserModel = require("../model/User");

/**
 * Este controlador sirve para gestionar la registracion
 * de Usuario en la BBDD
 */
const passportSignupController = async (email, password, done) => {
  try {
    // Con esta query vamos a insertar email y password in users collections
    const user = await UserModel.create({ email, password });

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

/**
 * Este controlador sirve para gestionar el login de Usuario
 * que ya esta registrado en la BBDD
 */
const passportLoginController = async (email, password, done) => {
  try {
    // Vamos a buscar en la BBDD si la email que el uasuario nos ha enviado desde el front
    const user = await UserModel.findOne({ email });

    // Si no encontramos nada enviamos un error
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    // Aqui validiamo la password con la funcion isValidPassword declarada en el modelo de User
    const validate = await user.isValidPassword(password);

    // Is la password no coincide enviamos error
    if (!validate) {
      return done(null, false, { message: "Wrong Password" });
    }

    // Si todo lo de antes es correcto seguimos adelante sin errores
    // pasamos user y un mensage
    return done(null, user, { message: "Logged in Successfully" });
  } catch (error) {
    done(error);
  }
};

/**
 * Este Controlador gestiona las informaciones que vamos a mandar adelante en el middleware de passport
 */
const passportJWTcontroller = async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
};

/**
 * Este controlador sirve para gestionar la registracion
 * de Usuario en la BBDD con social login
 */
const passportGithubController = async (accessToken, refreshToken, profile, done) => {
  try {
    // Vamos a buscar en la BBDD si el id que github nos ha enviado desde el front
    const user = await UserModel.findOne({ githubID: profile.id });

    // Si ya esta registrado le mandamoos adelante con el middleware de passport
    if (user) {
      return done(null, user);
    }

    // Si no esta en la BBDD lo creamos con las info enviado por parte de github
    const newUser = UserModel.create({ 
      githubID: profile.id,
      email: profile.emails[0].value
     });

    // Una vez registrado seguimos con el nuevo usuario creado con el middleware
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

module.exports = {
  passportSignupController,
  passportLoginController,
  passportGithubController,
  passportJWTcontroller,
};
