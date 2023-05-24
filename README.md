# Project title
Proyecto Fast and Food-Entrega final.

## Table of Content
1. [Authors](#Authors)
2. [Project Documentation](#Project-Documentation)
3. [Repository Contents](#Repository-Contents)
4. [Main Functionalities](#Main-Functionalities)
5. [Execution](#Execution)
6. [Used By](#Used-By)
7. [License](#License)

## Authors

- [Genrry De Cuadra](https://github.com/Gegabbb)


## Projet Documentation
Este proyecto consiste en un sitio web de compras llamada "Fast and Food". A través del sitio web, los usuarios pueden seleccionar productos de diferentes categorías, agregarlos al carrito de compras y realizar el pago. Los códigos proporcionados corresponden a diferentes componentes y funcionalidades de la aplicación.

### Repository Contents
- 1 "index.html": Archivo HTML principal que muestra la página de inicio y donde se pide la comida.
- 2 "./script": Esta carpeta contiene los archivos JavaScript del sitio web.
- 3 "./css": Esta carpeta contiene el archivo CSS del sitio web.
- 4 "./pages": Esta carpeta contiene las demás páginas del sitio web.
- 5 "./img": Esta carpeta contiene las imágenes de los productos.


## Main Functionalities
### 1. Selección de Productos
El código proporcionado en los archivos index.html y script permite a los usuarios seleccionar productos de diferentes categorías, como comida, bebidas y postres. Los productos se muestran en tarjetas y los usuarios pueden agregarlos al carrito de compras haciendo clic en el botón "Comprar".
### 2. Carrito de Compras
El código en los archivos carritoController.js y buttonController implementa la funcionalidad del carrito de compras. Los productos seleccionados por el usuario se agregan al carrito, se muestra una tabla con los productos en el carrito y se calcula el total de cantidad y precio de los productos seleccionados.
El carrito de compras también permite vaciar el carrito, actualizar la página para restaurar los productos eliminados y habilitar el botón de pago cuando hay productos seleccionados.
### 3. Pago
El código en el archivo ticketController.js maneja la funcionalidad de pago. Cuando el usuario hace clic en el botón de pago, se verifican ciertas condiciones, como la longitud de la tarjeta, el CVV, el nombre y el DNI. Si se cumplen las condiciones, se muestra un mensaje de éxito; de lo contrario, se muestra un mensaje de error.
### 4. Integración de API
El código en el archivo imgController.js utiliza una API (jsonplaceholder.typicode.com) para cargar imágenes de productos. Las imágenes se asignan a las etiquetas img correspondientes en función de los IDs de los productos.
## Execution
Para ejecutar el sitio web, simplemente abre el archivo "index.html" en un navegador web compatible. Asegúrate de tener una conexión a Internet activa para cargar las imágenes de los productos desde la API.

## Used By

Este proyecto ha sido utilizado para la entrega final en CoderHouse.


## License

Este proyecto está bajo la licencia [MIT](https://choosealicense.com/licenses/mit/)

