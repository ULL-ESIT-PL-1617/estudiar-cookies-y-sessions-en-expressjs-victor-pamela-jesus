# Analizador de Cookies
### Definición e instalación
Cookie es un módulo npm utilizado para analizar y serializar cookies para servidores HTTP.
Para su instalación deberemos ejecutar el comando `npm install cookie` .

### Uso
Si queremos utilizar este modulo en nuestro servidor, deberemos importarlo mediante el uso
de `var nombre_var = require('cookie');`.
Una vez lo tengamos importado, podremos analizar cualquier cookie mediante el uso de la 
función `cookie.parse(str, options)` cuyos atributos no son más que el string que contiene
las cookies y las opciones son para personalizar el análisis.
La opción usada para el método parse es la opción decode, la cual especifica una función que
se utilizará para decodificar el valor de una cookie, así, debido a que una cookie tiene un
tamaño límite, podemos codificar cookies antes de mandarlas y decodificarlas con esta opción.
Otro método que podemos usar de este módulo es `cookie.serialize(name,value,options)`, el cual
se encarga de añadir una cookie de nombre name y valor value, siguiendo la opciones que se le
hayan pasado como atributo.
Las opciones para esta función son las siguientes:
* Domain: especifica el valor de los dominios en los cuales la cookie puede actuar, está desactivado
por defecto, así que la mayoría del tiempo sólo puede usarse una cookie en el dominio en el que
se crea.
* Encode: es parecido a la opción de la función parse, pero en este caso, en vez de decodificar,
codifica.
* Expires: especifica la cantidad de tiempo que la cookie será válida, por defecto, una cookie no 
tendrá fecha de expiración, por lo que la mayoría de clientes las eliminará al cerrar la página web
o el explorador.
* httpOnly: cambia el booleano que indica si la cookie puede ser utilizada sólo por
métodos http.
* maxAge: es parecido al expires, indicando, en segundos, el tiempo máximo que podrá vivir una
cookie.
* sameSite: especifica si una cookie sólo puede ser utilizada en una sóla página. Es un atributo que
aún no se ha estandarizado así que muchos clientes seguramente lo ignoren.
* Secure: es un flag utilizado para indicar si se quiere que una cookie sólo pueda ser utilizada
en conexiones HTTPS.

### Ejemplo
A continuación veremos un código de ejemplo utilizando este módulo:
```javascript
var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');
 
function onRequest(req, res) {
  // Parse the query string 
  var query = url.parse(req.url, true, true).query;
 
  if (query && query.name) {
    // Set a new cookie with the name 
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week 
    }));
 
    // Redirect back after setting cookie 
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }
 
  // Parse the cookies on the request 
  var cookies = cookie.parse(req.headers.cookie || '');
 
  // Get the visitor name set in the cookie 
  var name = cookies.name;
 
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
 
  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }
 
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
}
 
http.createServer(onRequest).listen(3000);
```