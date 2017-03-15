# Autenticación y autorización en node.js mediante Express.js

Para los procesos de autenticación (el proceso de verificar si el usuario es quien dice que es) y autorización (ver si el usuario tiene los permisos necesarios para acceder a un recurso) usamos el middleware `express-session`. Siempre hay un inicio de sesión (un login), un fin de sesión (logout) y una página que utiliza GET/POST. En el login asignará una identidad que te dará el acceso que tiene tu usuario y en el logout se revocará al usuario esa identidad.

Para empeezar necesitamos instalar el middleware `express-session` con el comando `npm install express-session`.

Adelante se explica un código donde se hace un proceso de autenticación y autorización.

Primero empezamos importando express y los modulos necesarios:

```javascript
var express = require('express');
var app = express();
var session = require('express-session');
```

Después añadimos express-session a nuestra aplicación express:

```javascript
app.use( session( {
  /* Aquí irían los atributos de nuestra sesión, como claves,
   * cómo se guarda, tiempo de expiración, etc...
   */
}));
```

Un middleware de autenticación y autorización que sólo permite ejecutar el paso siguiente si el usuario es José y tiene permisos de administrador se puede hacer de la siguiente manera:

```javascript
var auth = function(req, res, next) {
  if (req.session && req.session.user === "jose" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
```

Aquí un ejemplo de una petición GET, donde se va a crear una sesión si el usuario suministrado es `jose` y la contraseña es la correcta. Para este usuario se le va a fijar permisos de admin.
```javascript
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "jose" || req.query.password === "hunter2") {
    req.session.user = "jose";
    req.session.admin = true;
  }
});
```

Al llegar el final de la sesión, se destruye la sesión.
```javascript
app.get('/logout', function (req, res) {
  req.session.destroy();
});
```

Para llegar a la ruta `content` necesitamos tener permisos de administrador:
```javascript
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
```
