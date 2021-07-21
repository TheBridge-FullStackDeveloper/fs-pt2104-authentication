const { generateToken } = require("../utils/generateToken");

/**
 * Este controlador gestiona el login de usuario en passport
 * y es utilizado dentro el callback de la estrategia de passport login
 */
const loginController = (req, res, next, user, err) => {
  if (err) {
    return next(new Error("An error occurred."));
  }

  if(!user) {
    return next(new Error("User not registered"));
  }

  // req.login () es la magia que genera una sesión para un usuario. 
  // Esta sesión representa la duración de un inicio de sesión sin tener que volver a autenticarse.
  // Nota: Establece { session: false } porque no desea almacenar los detalles del usuario en una sesión. 
  // Queremos que el usuario envíe el token en cada solicitud a las rutas seguras.
  // Puede ser Obviado? Si, pero es buena practica dado que estamos utilizando passport para poder guardar el usuario en el req.user
  req.login(user, { session: false }, async (error) => {
    if (error) return next(error);

    // Generamos el Token
    const token = generateToken(req);

    // Lo enviamos al front
    return res.json({ token });
  });
};

/**
 * Este controlador gestiona el signup de usuario en passport 
*/
const signUpController = async (req, res, next) => {
  try {
    const token = generateToken(req);
  
    return res.json({ token });
  } catch (error) {
    return res.json(error)
  }
};

/**
 * Este controlador gestiona el login con github 
 */
const githubController = (req, res, next) => {
  try {
    return loginController(req, res, next, req.user, null);
  } catch (error) {
    res.json({ err: error });
  }
};

module.exports = { loginController, signUpController, githubController };
