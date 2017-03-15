# Manejo de Cookies en Express.js

Para el manejo de cookies a través de Express.js es necesario utilizar el middleware cookie-parser, que puede ser instalado como cualquier otro módulo de node.js con `npm install cookie-parser`.

## Usando Cookie-Parser
Para utilizar cookie-parser es necesario incluirlo en la aplicación como se hace con cualquier middleware de Express.js

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
```

cookie-parser ubica en el objeto req, bajo req.cookies con un objeto que identifica las cookies por un nombre, un string. Para definir una cookie nueva se define una nueva ruta en la aplicación Express.js de la siguiente manera:

```javascript
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});
```

Para revisar si una cookie ha sido asignada correctamente, se puede ir a la consola del navegador que se esté usando e introducir el comando `document.cookie`.

El navegador manda de vuelta esa cookie al servidor cada vez que hace una petición al sitio. Para conseguir una cookie que el navegador está enviando al servidor mediante el objeto request podemos utilizar `req.cookies`. De esta manera el código siguiente registrará en la consola las cookies cuando el cliente envíe una:

```javascript
app.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
});
```

Fijar el tiempo de expiración de una cookie se hace fijando una fecha mediante el campo `expire` de la siguiente manera:

```javascript
res.cookie(name , 'value', {expire : new Date() + 9999});
```

Como con el tiempo de expiración, podemos fijar más opciones para la cookie de igual manera, afectando otros atributos. `expire`, por ejemplo, aguanta el tiempo de expiración en milisegundos. También se puede usar el atributo `maxAge`.

Para eliminar una cookie se utiliza el método `clearCookie`, que eliminará una cookie referenciada por su nombre. Por ejemplo, para eliminar la cookie `pepito` hacemos:

```javascript
clearCookie("pepito");
```
