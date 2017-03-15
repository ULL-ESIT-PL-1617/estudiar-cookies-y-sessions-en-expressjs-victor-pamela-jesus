# Query String
### Definición de Query String
Una cadena de consulta se puede definir como aquellos datos que se envían a través de la URL en el
momento de hacer un request a una página web, por ejemplo, los datos de un formulario. Un servidor
web puede manejar y acceder a esta información y utilizarla de la forma que sea necesaria.
Un ejemplo de query string sería:
```
http://example.com/over/there?name=ferret
```

### Estructura
Como podemos ver del ejemplo anterior, la structura de una query string no es más que añadir los atributos
que se desea enviar después de un signo de interrogación, siguiendo la plantilla de 'nombre de atributo' es
igual a 'valor', siendo el '?' un separador para que el programa que se ejecuta en el servidor sepa dónde
empieza la cadena de consulta.
Existen varias formas para definir una query string, aunque la más famosa es mediante la utilización de los
formularios HTML.
Además, hay que decir que es posible enviar varios atributos mediante el uso de '&' el cual hará que el
programa separe cada atributo y los pueda analizar individualmente.
Por último, añadir que se pueden enviar varios valores para un mismo atributo pasando varios atributos con
el mismo nombre y que sólo se generará una query string si se utiliza el método GET a la hora de enviar los
datos.

### Codificación de la URL
Algunos caracteres no pueden estar en una URL, como por ejemplo, el espacio, mientras que otros tienen un
significado especial dentro de dicha URL, como por ejemplo, '#' el cual se usa para especificar un fragmento
de algún documento. O el '=', utilizado para separar nombre de valor como vimos en la sección anterior.
Para lidiar con este problema y poder utilizar estos caracteres especiales, se creó una codificación basada
en '%' seguido de dos cifras hexadecimales para representar los caracteres especiales. Entonces, el espacio 
quedaría en '%20', la '~' quedaría en '%7E' y así con todos los caracteres que no puedan ser representados
en las URL.

### Rastreamiento
Todas las cadenas de consulta son guardadas en el historial del servidor, sean usadas, o no, permitiendo 
así rastrear a los usuarios de forma parecida a como lo hacen las cookies. Para que esto funcione, cada vez
que un usuario descarga la página, un identificador único deberá ser generado y añadido como cadena de consulta
a todos los links que contenga la página, así, cuando cargue la siguiente página, tendremos el identificador
y podrémos acceder a él para identificar al usuario.
Entonces esto:
```
<a href="foo.html">see my page!</a>
<a href="bar.html">mine is better</a>
```
Pasaría a esto:
```
<a href="foo.html?e0a72cb2a2c7">see my page!</a>
<a href="bar.html?e0a72cb2a2c7">mine is better</a>
```
El programa en el servidor ignorará el identificador y cargará las páginas normalmente, con el añadido
del identificador al final de la URL, haciendo posible la detección del usuario en el historial.