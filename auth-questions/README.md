¿Cuál es la diferencia entre autenticación y autorización?

<details>
  <summary>Spoiler</summary>

- La autenticación es el proceso para verificar la identidad y las credenciales del usuario para autenticarlo en el sistema.
La autorización es el proceso mediante el cual se determina el acceso a un segmento, método o recurso.
La autorización suele ser un paso posterior a la autenticación.

</details>


¿Cual tipos de autenticación hemos visto esta semana?

<details>
  <summary>Spoiler</summary>

- Esta semana hemos visto autenticación mediante mail / password y OAuth con Github
- ¿Existen otras formas?
- Si, por ejemplo: IP Authentication, IP Range Authentication, Certificates.
</details>

¿Que es OAuth?

<details>
  <summary>Spoiler</summary>

- OAuth es un protocolo o marco de autorización de estándar abierto que describe cómo los servidores y servicios no relacionados pueden permitir de forma segura el acceso autenticado a sus activos sin compartir realmente la credencial de inicio de sesión única inicial y relacionada. Como usar Google o Facebook para iniciar sesión en algo.

</details>

¿Que es passport.js?

<details>
  <summary>Spoiler</summary>

- Passport es un middleware de autenticación para Node.js. Extremadamente flexible y modular, Passport puede incorporarse discretamente a cualquier aplicación web basada en Express. Un conjunto completo de estrategias admite la autenticación mediante un nombre de usuario y una contraseña, Facebook, Twitter y más.
</details>

¿Se puede crear un servidor con autenticación sin passport.js?

<details>
  <summary>Spoiler</summary>
- Si
</details>

¿Cual es el punto fuerte de passport?

<details>
  <summary>Spoiler</summary>
  
- Permite a los usuarios autenticarse iniciando sesión con Google, FB o cualquier servicio con una cantidad mínima de código.
</details>

¿Esta semana cual sistema de para enviar informaciones de Auth entre front y back hemos utilizado?

<details>
  <summary>Spoiler</summary>

- Jason Web Token
- ¿Cual es la diferencia entre JWT y session?
- Session guarda en la BBDD la cookie de session del usuario mientras JWT no
</details>

¿Cuales son las tres partes que componen un JWT?

<details>
  <summary>Spoiler</summary>

- HEADER:ALGORITHM & TOKEN TYPE, PAYLOAD:DATA y VERIFY SIGNATURE
- ¿Cual son las informaciones que puedo meter en el payload del JWT?
- El JWT [RFC](https://datatracker.ietf.org/doc/html/rfc7519) establece tres clases de afirmaciones:

1. Afirmaciones registradas (Registered claims ) - establecidas en [Section 10.1.](https://datatracker.ietf.org/doc/html/rfc7519#section-10.1)
2. Afirmaciones publicas (Public claims) - contienen valores que deben ser únicos como correo electrónico, dirección o número de teléfono. [Ver lista completa](https://www.iana.org/assignments/jwt/jwt.xhtml)
3. Afirmaciones Privadas (Private claims) - Nombre que no están registrados en las afirmaciones publicas, tienen que ser utilizadas con cuidado

- Ninguna de estas afirmaciones es obligatoria
Un JWT es autónomo y debe evitar el uso de la sesión del servidor proporcionando los datos necesarios para realizar la autenticación (sin necesidad de almacenamiento en el servidor ni acceso a la base de datos). Por lo tanto, la información del rol se puede incluir en JWT.

</details>

¿Que hace esta función y cuando hay que ejecutarla?

```js
UserSchema.pre("save", async function (next) {
  const user = this;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
```

<details>
  <summary>Spoiler</summary>

- En esta parte de código estamos encriptando la password a traves del paquete bcrypt (llamada así por el algoritmo de hash), justo antes de guardar el usuario en la
</details>

¿Esta semana hemos creado una carpeta `auth` para que [ejemplo qui](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/main/auth-with-comments/auth/passport.js)?

<details>
  <summary>Spoiler</summary>

- Dentro de la carpeta auth hemos creado un fichero para inizializar las estrategias de passport
</details>

¿Que hace el `req.login` de passport.js?

```js
req.login(user, function (err) {
  if (err) {
    return next(err);
  }
  return res.redirect("/users/" + req.user.username);
});
```

<details>
  <summary>Spoiler</summary>

- Cuando se complete la operación de inicio de sesión, el usuario será asignado a req.user.

- Nota: el middleware `passport.authenticate()` invoca `req.login()` automáticamente. Esta función se usa principalmente cuando los usuarios se registran, durante el cual se puede invocar `req.login()` para iniciar sesión automáticamente en el usuario recién registrado.

</details>

¿Que devuelve este código?

```js
const fn = () => {
  const body = { _id: req.user._id, email: req.user.email };
  return jwt.sign({ user: body }, secretToken, {
    expiresIn: EXPIRE_TIME,
  });
};
```

<details>
  <summary>Spoiler</summary>

- Este código devuelve un JWT token con el id y email del usuario que se ha registrado

</details>

¿Que middleware o condición tengo que meter para proteger mis rutas por parte de usuarios sin token?

<details>
  <summary>Spoiler</summary>

- `passport.authenticate("jwt", { session: false })`

</details>

¿Que middleware o condición tengo que meter para proteger mis rutas por parte de usuarios sin la autorización adecuada?

<details>
  <summary>Spoiler</summary>

- ```js
  const user = await UserModel.findById(req.user._id);

  if (user.role === role) {
    return next();
  }

  res.status(403).json({ message: "Not authorized" });
  ```
</details>

¿Sabrías dibujar el flujo de auth con los controladores y rutas?

<details>
  <summary>Spoiler</summary>
  
![auth_flow](https://user-images.githubusercontent.com/33903092/126631216-6f1e25c2-29ab-4e83-b98d-81cdb6f3573d.png)
</details>
