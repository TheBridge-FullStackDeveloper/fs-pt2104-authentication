# The Bridge student dashboard 🏫

En este ejercicio tendrás que crear un back-end para la gestión de los alumnos de theBridge 🌉

La escuela de the Bridge necesita crear un dashboard para poder gestionar sus alumnos, los admins podrán ver, añadir, editar y eliminar los alumnos de la plataforma y los alumnos pueden acceder para ver los cursos disponibles.

Como podéis ver en este ejercicio es presente solo el file `README.md`, es un error? NO, tenéis que crear vosotros la estructura del back

1. Initializa el proyecto con `npm init -y`

2. Instala los paquetes necesarios para la aplicacíon, para hacer esto puedes hacer o `npm i nodemon bcrypt express ....` o puedes pegar en el `package.json` en la propriedad `dependiencies` este objecto:

```json
{
  ...,
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "debug": "^2.6.9",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.13.2",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.12",
    "passport": "^0.4.1",
    "passport-github2": "^0.1.12",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0"
  }
}
```

después haberlo pegado puedes correr `npm i`

3. Crea el script para correr la aplicación en la propriedad `scripts` del `package.json`
NOTA: si quieres utilizar el paquete [Debug](https://www.npmjs.com/package/debug) para los logs el script tendra que ser así: `DEBUG=app* nodemon app.js` y para windows `set DEBUG=app* & nodemon app.js`,
🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1QRwRIO6rzcxS5a4UIw95-1HaOMtjyhqw/view?t=57m25s)

4. Crear un fichero `app.js`, puedes encontrar un ejemplo [AQUÍ](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/1b1d0d652d/auth-with-comments/app.js)

5. Crea el Modelo de `User`, puedes encontrar un ejemplo [AQUÍ](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/1b1d0d652d/auth-with-comments/model/User.js), y 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=40m29s) y además de las propriedades de auth tendrás que añadir un propriedad `cursos` en el modelo de usuario,
donde vamos a inserir los ids de los cursos donde el usuario esta inscrito:

```js
{ 
  ...,
  cursos: [{ type: Schema.Types.ObjectId, ref: 'Cursos'}]
}
```

## Auth

6. Crear rutas para poder gestionar las peticiones de auth, puedes encontrar un ejemplo [AQUÍ](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/1b1d0d652d/auth-with-comments/routes/auth-route.js) y 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=53m09s)

7. Crear los controladores para las rutas de auth, puedes encontrar un ejemplo [AQUÍ](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/1b1d0d652d/auth-with-comments/controllers/auth.controller.js), y 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=54m20s)

8. Para poder completar los controladores de auth tendrás que impostar las estrategias con passport, puedes encontrar un ejemplo [AQUÍ](https://github.com/TheBridge-FullStackDeveloper/fs-pt2104-authentication/blob/1b1d0d652d/auth-with-comments/auth/passport.js), y 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1AzeZ8NPCx-qxPJYrFO6DsXtjqxwAd98V/view?t=47m14s)

## Gestión de Usuarios

9. Crear rutas para poder efectuar operaciones de CRUD con los usuarios, IMPORTANTE! estas acciones pueden ser efectuadas solo por parte del ADMIN, 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/11IC-mqLdg2jWaeKu5N3GAdJ_HDXapGfr/view?t=19m37s)

| ROLE    |  Ver Todos los usuarios | Modificar usuarios | Delete usuarios | Añadir usuarios |
| ------- | --------------------- | ---------------------| ----------------| ----------------|
| USER    | ❌                    | ❌                    | ❌              | ❌              |
| ADMIN   |  ✅                   | ✅                    | ✅              | ✅              |

## Gestión de Cursos

10. Crear modelo de `Courses`, los cursos tendrán un modelo como este:

```js
{
  name: String, // eg. Fullstack
  content: [String] // ['React', 'express', 'node', 'javascript']
}
```

11. Crear rutas para poder operaciones de CRUD con los cursos, en este caso los cursos pueden ser visto por parte de los usuarios registrados y que hacen parte de ese curso, pero no podrán modificarlos mientras los ADMINS pueden efectuar un CRUD completo

| ROLE    |  Ver todos los Cursos |  Ver sus cursos | Modificar, añadir o eliminar Cursos |
| ------- | --------------------- | --------------- | ----------------------------------- |
| USER NOT AUTHENTICATED | ❌                    | ❌              | ❌                                  |
| USER    | ❌                   | ✅              | ❌                                  |
| ADMIN   |  ✅                   | ✅              | ✅                                  |

# 🏆 Bonus

12. Implementa un authentication con social login, puedes eligir tu la que prefieres en [passport strategies](http://www.passportjs.org/packages/), 🎥 [AQUÍ VIDEO](https://drive.google.com/file/d/1iwVPeH-VLi_mc6_qIL5M_Pzme6mSasje/view?t=18m58s)
Y aquí una lista para poder crear ID y Token de algunos de ellos:

- [Github](https://github.com/settings/developers)
- [Google](https://developers.google.com/identity/protocols/oauth2)
- [Twitter](https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only)
