let catalogo = new Catalogo();
let arrayProductos = [];
arrayProductos = catalogo.productos;

const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";

const ficheroProductos = "productos";
fetch(apiRest + ficheroProductos + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((productos) => {
		productos.forEach((producto) => {
			arrayProductos.push(producto);
		});

		let tabla1 = document.createElement("table");
		tabla1.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th><button id="botonNuevo" onClick = "NuevoProducto()">Nuevo</button></th>
        </tr>`;

		TablaProductos.append(tabla1);

		for (let i = 0; i < arrayProductos.length; i++) {
			switch (arrayProductos[i].categoria) {
				case 0:
					arrayProductos[i].categoria = "Bebidas";
					break;
				case 1:
					arrayProductos[i].categoria = "Tostadas";
					break;
				case 2:
					arrayProductos[i].categoria = "Bollería";
					break;
			}

			let tr = document.createElement("tr");

			if (arrayProductos[i].activo == "true") {
				tr.innerHTML = `
            <td>${arrayProductos[i].nombre}</td>
            <td>${arrayProductos[i].precio}€</td>
            <td>${arrayProductos[i].categoria}</td>
            <td><button id="botonAñadir${arrayProductos[i].id}" onClick = "ModificarProducto(${arrayProductos[i].id})">Modificar</button></td>
            <td><button id="botonEliminar${arrayProductos[i].id}" onClick = "EliminarProducto(${arrayProductos[i].id})">Eliminar</button></td>`;

				tabla1.append(tr);
			}
		}
	});

async function NuevoProducto() {
	let nombre = prompt("Introduce el nombre del producto");
	let precio = prompt("Introduce el precio del producto");
	let categoria = prompt("Introduce la categoria del producto");

	const response = await fetch(apiRest + ficheroProductos + ".json");
	//los datos JSON devueltos por el servidor.
	const data = await response.json();
	const lastProduct = data[data.length - 1];
	const lastId = lastProduct.id;

	// incrementar el ID en 1
	const nextId = lastId + 1;

	// crear el nuevo producto
	const nuevoProducto = {
		id: nextId,
		categoria: parseInt(categoria),
		nombre: nombre,
		precio: precio,
	};

	const postResponse = await fetch(apiRest + ficheroProductos + "/" + lastId + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(nuevoProducto),
	});

	await postResponse.json();
}

async function ModificarProducto(id) {
	let nombre = prompt("Introduce el nombre del producto");
	let precio = prompt("Introduce el precio del producto");
	let categoria = prompt("Introduce la categoria del producto");

	const producto = {
		id: id,
		categoria: parseInt(categoria),
		nombre: nombre,
		precio: precio,
	};

	const putResponse = await fetch(apiRest + ficheroProductos + "/" + id + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(producto),
	});

	console.log(apiRest + ficheroProductos + "/" + id + ".json");

	await putResponse.json();
}

async function EliminarProducto(id) {
	// Primero, obtén el producto
	const getResponse = await fetch(apiRest + ficheroProductos + "/" + (id - 1) + ".json");
	const producto = await getResponse.json();

	// Luego, cambia el valor de 'activo' a 'false'
	producto.activo = "false";

	// Finalmente, actualiza el producto
	const updateResponse = await fetch(apiRest + ficheroProductos + "/" + (id - 1) + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(producto),
	});

	await updateResponse.json();
}
