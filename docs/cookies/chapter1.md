# Introducción a las cookies

Una cookie HTTP es una pequeña parte de datos que el servidor envía al navegador web del usuario, que puede guardarlo y 
mandarlo de nuevo junto con la siguiente petición al mismo servidor. Típicamente, se utiliza para saber si dos peticiones
vienen del mismo navegador , permitiendo mantener la sesión del usuario "loggeada", por ejemplo. 

Las cookies se utilizan principalmente para tres propósitos:

* Gestión de sesiones.
* Personalización.
* Seguimiento.

Las cookies también han sido utilizadas para almacenamiento del lado del cliente. Aunque esto podría haber sido considerado
legítimo cuando no había otra manera de almacenar datos en el lado del cliente, hoy en día ya no es el caso, dado que los navegadores
son capaces de utilizas diversas APIs de almacenamiento. Dado que las cookies son envíadas junto con cada petición, puede suponer
una carga adicional.

## Creando cookies

Al recibir una petición HTTP, un servidor puede mandar una cabecera Set-cookie con la respuesta. La cookie es normalmente
almacenada por el navagador y, después, el valor de la cookie es envíado junto con cada petición realizada al mismo servidor 
como el contenido de una cabecera HTTP Cookie. Además, un "delay" puede ser especificado, así como restricciones para un dominio
y ruta concretos, limitando durante cuánto tiempo y a qué sitio es envíada la cookie.

### Set-cookie

A simple cookie can be set like this:
La cabecera de respuesta HTTP Set-cookie es utilizada para envíar cookies desde el servidor al usuario. Una simple cookie puede ser:

```html
Set-Cookie: <cookie-name>=<cookie-value>
```

El servidor le dice al cliente que almacene una cookie (por ejemplo, aplicaciones como PHP, Node.js, Python o Ruby en Rails lo hacen).
La respuesta envíada al navegador contendrá la cabecera Set-Cookie y el navegador almacenerá la cookie. 

```javascript
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```
Cookie header.
Ahora, con cada nueva petición al servidor, el navegador enviará todas las cookies almacenadas previamente al servidor usando
la cabecera Cookie.

```javascript
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### Cookies de sesión

La cookie creada anteriormente es una cookie de sesión: se eliminará cuando el cliente se desconecte, existen solo durante la sesión.
Sin embargo, los navegadores web a menudo tienen activado el restablecimiento de sesión, lo que hará que la mayoría de las cookies
de sesión sean en realidad permanentes, como si el navegador nunca se cerrara.

### Cookies permanentes

En lugar de caducar cuando el cliente se desconecta, las cookies permanentes caducan una fecha específica ("Expires") o después
de una duración determinada de tiempo ("Max-Age").

```javascript
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

### Cookies seguras y HTTPOnly

Una cookie segura solo será envíada al servidor cunado una petición es realizada utilizando SSL y el protocolo HTTPS. Sin embargo,
hay que destacar que la información confidencial o sensible nunca debería ser almacenada o transmitida en Cookies HTTP, dado que 
el mecanismo entero es inherentemente inseguro, y este flag no ofrece ninguna seguridad o encriptación adicional. A partir de 
Chrome 52 y Firefox 52, los sitios no seguros (http:) no pueden crear cookies con la directiva "secure".

Para prevenir ataques XSS, las cookies HTTP-only no son accesibles vía Javascript a través de la propiedad "Document.cookie", la
"XMLHttpRequest" y las "Request APIs". Utiliza este flag cuando no necesites tener tus cookies disponibles en Javascript. En 
particular, si usas cookies solo para definir una sesión, no la necesitas en Javascript y el flag HttpOnly debería estar activo.

```javascript
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

### Alcance de las cookies

Las directivas "Domain" y "Path" definen el alcance de la cookie, es decir, el conjunto de URLs a las que se deberían envíar
las cookies.

"Domain" especifica los hosts a los cuáles será envíada la cookie. Si no se especifica, el valor por defecto es la porción
host de la localización del documento actual (sin incluir los subdominios). Si se especifica el dominio, los subdominios siempre
se incluyen.

Si Domain=mozilla.org, entonces las cookies se incluyen en subdominios como developer.mozilla.org.

"Path" indica una ruta URL que debe existir en la fuente a la que se realiza la petición antes de mandar la cabecera Cookie.
El caracter %x2F ("/") es interpretado como un separador de directorios y los subdirectorios también se incluirán.

Si Path=/docs, entonces se incluirán las rutas:

* "/docs"
* "/docs/Web/"
* "/docs/Web/HTTP"

### Cookies SameSite

Las cookies SameSite permiten a los servidores determinar que una cookie no debería ser envíada en peticiones "cross-site",
lo que provee algo de protección contra ataques (CSRF). Las cookies SameSite aún son experimentales y no las soportan todos los 
navegadores.

### Acceso Javascript utilizando Document.cookies

Nuevas cookies pueden ser creadas también usando la propiedad "Document.cookie", y si el flag "HttpOnly" no está activo,
las cookies existentes pueden ser accedidas por Javascript también.

```javascript
document.cookie = "yummy_cookie=choco"; 
document.cookie = "tasty_cookie=strawberry"; 
console.log(document.cookie); 
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```











 
 
 
 

















