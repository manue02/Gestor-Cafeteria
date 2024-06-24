---
title: Documentación Proyecto JavaScript
created: "2023-11-14T09:26:45.100Z"
modified: "2023-11-21T13:20:29.033Z"
---

# Documentación Gestor Cafeteria

[//]: # "version: 1.0"
[//]: # "author: Manuel Ibáñez"
[//]: # "date: 2020-10-10"

# Tabla de contenidos

- [Documentación Gestor Cafeteria](#documentación-gestor-cafeteria)
- [Tabla de contenidos](#tabla-de-contenidos)
- [Introducción](#introducción)
  - [Parte de administración](#parte-de-administración)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)

<div style="page-break-after: always;"></div>

# Introducción

[Tabla de contenidos](#tabla-de-contenidos)

Este proyecto es un gestor de una cafetería, en el que se pueden añadir, modificar y eliminar productos, además de poder realizar pedidos y ver el historial de los mismos.

## Parte de administración

[Tabla de contenidos](#tabla-de-contenidos)

En la parte de administración se pueden añadir, modificar y eliminar productos, además de poder ver los pedidos realizados.

1. Panel de Mesas: donde se podrá ver gráficamente el estado de todas las mesas
   del local. En nuestro caso debemos contemplar que el local tendrá nueve mesas.
   Las mesas de color rojo estarán ocupadas y tendrán una cuenta abierta. Las de
   color verde estarán libres a la espera de ser ocupadas por nuevos clientes.

2. Panel de Controles: donde se podrá visualizar todos los productos disponibles que
   podemos ofrecer a los clientes categorizados por el tipo de alimento. Además
   tendrá una botonera para indicar el número de unidades del producto seleccionado
   que se desea añadir a la cuenta de la mesa seleccionada.

3. Panel de Cuenta: donde se mostrarán las consumiciones de la mesa seleccionada,
   con el importe total de la mesa. Además habrá un botón que permitirá cerrar la
   cuenta, cobrarle al cliente y liberar la mesa para que pueda ser ocupada de nuevo.
   En el caso de que la mesa seleccionada estuviera libre, solo aparecerá un mensaje
   de la mesa actual.

Tambien se a echo filtrado de productos por categorias y busqueda de productos por nombre. Y un filtrado por fecha de los pedidos.

## Tecnologías utilizadas

[Tabla de contenidos](#tabla-de-contenidos)

- HTML
- CSS
- JavaScript
- Bootstrap
- Biblioteca alertify.js

Este proyecto tiene como objetivo practicar el uso de JavaScript y Bootstrap para la creación de una aplicación web. Además, se ha utilizado la biblioteca alertify.js para mostrar mensajes de alerta.

Tambien el objetivo es practicar y demostrar mi uso de JavaScript usando cosas como:

- Clases
- Métodos
- Eventos
- Manejo avanzado del DOOM
- Fetch API
- Funciones asíncronas y sincronas
- Promesas

> [!CAUTION]
> Hay que tener en cuenta que este proyecto es solo una práctica y no se ha tenido en cuenta la seguridad de los datos ni la escalabilidad de la aplicación.
> Además, como se a utilizado Firebase para el almacenamiento de los datos, hay que tener en cuenta que el número de peticiones a la base de datos es limitado. Y hay veces que hay bugs en la aplicación que no se pueden solucionar por este motivo. Por ejemplo en el listado de productos, hay veces que al recatgar la pagina la categoría de los productos no se muestra correctamente. Si esto ocurre, hay que recargar la pagina de nuevo. O en el select de productos, hay veces que no se muestra el nombre del producto, si esto ocurre hay que recargar la pagina de nuevo.
