# Auth 馃攽

- [ Introducci贸n ](#intro)
  1. [ Definiciones ](#def)
  2. [ Funci贸n hash ](#hash)
- [Registro, Login y Session](#reg)
  1. [ bcrypt ](#bcrypt)
  2. [ passport ](#passport)
  3. [ JWT ](#JWT)
- [Extras](#extras)

<a name="intro"></a>

## Introducci贸n

La autenticaci贸n o autentificaci贸n鈥媏s el acto o proceso de confirmar que algo (o alguien) es quien dice ser.

![Auth](https://duo.com/img/asset/aW1nL2Jsb2cvdG91Y2gtSUQtYmlvbWV0cmljcy5qcGc=?w=1440&h=490&fit=crop&s=dc044b58a0eb146e3446baaff60b4783)

<a name="def"></a>

## Definiciones

Autenticaci贸n, autentificaci贸n o acreditaci贸n, en t茅rminos de seguridad de redes de datos, se puede considerar uno de los tres pasos fundamentales (AAA). Cada uno de ellos es, de forma ordenada:

- Autenticaci贸n. En la seguridad de ordenador, la autenticaci贸n es el proceso de intento de verificar la identidad digital del remitente de una comunicaci贸n como una petici贸n para conectarse. El remitente siendo autenticado puede ser una persona que usa un ordenador, un ordenador por s铆 mismo o un programa del ordenador. En un web de confianza, "autenticaci贸n" es un modo de asegurar que los usuarios son quien ellos dicen que ellos son - que el usuario que intenta realizar funciones en un sistema est谩 autorizado para hacerlo.
- Autorizaci贸n. Proceso por el cual la red de datos autoriza al usuario identificado a acceder a determinados recursos de la misma.
- Auditor铆a. Mediante la cual la red o sistemas asociados registran todos y cada uno de los accesos a los recursos que realiza el usuario autorizados o no.

<a name="hash"></a>

## Funci贸n hash

Regla fundamental sobre como guardar las credenciales: _NUNCA TIENEN QUE SER GUARDADAS EN FORMA DE TEXTO PLANO_, por eso tenemos que utilizar las funciones de hash.

Una funci贸n resumen, en ingl茅s hash function, tambi茅n conocida con el h铆brido funci贸n hash, convierte un elemento u elementos de entrada a una funci贸n en otro elemento.鈥嬧?嬧?? Tambi茅n se las conoce como funci贸n extracto, del ingl茅s digest function, funci贸n de extractado y por el h铆brido funci贸n digest.

La funci贸n hash tiene como entrada un conjunto de elementos, que suelen ser cadenas, y los convierte en un rango de salida finito, normalmente cadenas de longitud fija. Es decir, la funci贸n act煤a como una proyecci贸n del conjunto U sobre el conjunto M.

![hash](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hash_function2-es.svg/330px-Hash_function2-es.svg.png)

- [Lista de hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions)

- [MD5 Encryption](https://www.md5online.org/md5-encrypt.html)
- [MD5 Decryption](https://www.md5online.org/md5-decrypt.html)

<a name="reg"></a>

# Registro, Login y Session

Estas son las herramientas que vamos a utilizar en la nuestra aplicaci贸n de express

<a name="bcrypt"></a>

## bcrypt

Bcrypt es una funci贸n de hashing de passwords dise帽ado por Niels Provos y David Maxieres, basado en el cifrado de Blowfish. Se usa por defecto en sistemas OpenBSD y algunas distribuciones Linux y SUSE. Lleva incorporado un valor llamado [salt](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/), que es un fragmento aleatorio que se usar谩 para generar el hash asociado a la password, y se guardar谩 junto con ella en la base de datos. As铆 se evita que dos passwords iguales generen el mismo hash y los problemas que ello conlleva, por ejemplo, ataque por fuerza bruta a todas las passwords del sistema a la vez.

- [NPM - bcrypt](https://www.npmjs.com/package/bcryptjs)
- [example repl.it](https://replit.com/@Girgetto_/bcrypt-demo#index.js)
- [bcrypt-generator](https://bcrypt-generator.com/)

<a name="passport"></a>

## passport

![passport](https://www.passportjs.org/images/PassportJS.svg)

Passport es un middleware de autenticaci贸n compatible con Express para Node.js.

El 煤nico prop贸sito de Passport es autenticar solicitudes, lo que hace a trav茅s de un conjunto extensible de complementos conocidos como estrategias. Passport no monta rutas ni asume ning煤n esquema de base de datos en particular, lo que maximiza la flexibilidad y permite que el desarrollador tome decisiones a nivel de aplicaci贸n. La API es simple: le proporciona a Passport una solicitud para autenticarse y Passport proporciona enlaces para controlar lo que ocurre cuando la autenticaci贸n tiene 茅xito o falla.

- [NPM - passport](https://www.npmjs.com/package/passport)

- [passport](https://www.passportjs.org/)

<a name="JWT"></a>

## JSON Web Tokens (JWT) [jwt.io](https://jwt.io/)

![JWT](https://rosolutions.com.mx/blog/wp-content/uploads/2018/11/1_g15QJL_ONdBGAdjgnld3pg.png)

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.

En el mismo se define un mecanismo para poder propagar entre dos partes, y de forma segura, la identidad de un determinado usuario.

![JWT](https://enmilocalfunciona.io/content/images/2018/01/jwt-workflow.png)

En la pr谩ctica, se trata de una cadena de texto que tiene tres partes codificadas en Base64, cada una de ellas separadas por un punto.

- [jwt.io/introduction](https://jwt.io/introduction)

- [NPM - jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

<a name="extras"></a>

## Referencias

- [Autenticaci贸n](https://es.wikipedia.org/wiki/Autenticaci%C3%B3n)
- [Funci贸n hash](https://es.wikipedia.org/wiki/Funci%C3%B3n_hash)
- [Why are hash functions one way?](https://security.stackexchange.com/questions/11717/why-are-hash-functions-one-way-if-i-know-the-algorithm-why-cant-i-calculate-t)
- [Hashing Algorithms and Security - Computerphile](https://www.youtube.com/watch?v=b4b8ktEV4Bg)
- [How NOT to Store Passwords! - Computerphile](https://www.youtube.com/watch?v=8ZtInClXe1Q)
- [158,962,555,217,826,360,000 (Enigma Machine) - Numberphile](https://www.youtube.com/watch?v=G2_Q9FoD-oQ)
- [Session vs Token Authentication in 100 Seconds](https://www.youtube.com/watch?v=UBUNrFtufWo)
