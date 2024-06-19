let catalogo = new Catalogo();
let arrayProductos = [];
arrayProductos = catalogo.productos;
let arrayCategoria = [];
let arrayOriginalProductos = [];

const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";

const ficheroCategoria = "categorias";
fetch(apiRest + ficheroCategoria + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((categorias) => {
		categorias.forEach((categoria) => {
			arrayCategoria.push(categoria);
		});
	});

const ficheroProductos = "productos";
fetch(apiRest + ficheroProductos + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((productos) => {
		productos.forEach((producto) => {
			arrayProductos.push(producto);
			arrayOriginalProductos.push(producto);
		});

		let tabla1 = document.createElement("table");
		tabla1.innerHTML = `
		<table class="container-table100 ">
  			<thead>
        		<tr class="table100-head">
            		<th scope="col">Producto</th>
            		<th scope="col">Precio</th>
            		<th scope="col">Categoria</th>
            		<th scope="col"><button id="botonNuevo" onClick = "formulario(-1)" class="btn btn-light">Nuevo</button></th>
					<th scope="col"><button id="RecuperarProductoModal" onClick = "RecuperarProductoModal()" class="btn btn-light">Recuperar Producto</button></th>
        		</tr>
			</thead>
			<tbody>`;

		TablaProductos.append(tabla1);
		select = document.getElementsByName("ProductoEliminado")[0];
		selectCategorias = document.getElementsByName("categoriasSelect")[0];

		for (let i = 0; i < arrayProductos.length; i++) {
			let tr = document.createElement("tr");

			if (arrayProductos[i].activo == "true") {
				for (let j = 0; j < arrayCategoria.length; j++) {
					if (arrayProductos[i].categoria == arrayCategoria[j].id) {
						arrayProductos[i].categoria = arrayCategoria[j].nombre;
						break;
					}
				}

				tr.innerHTML = `
            <td scope="row">${arrayProductos[i].nombre}</td>
            <td>${arrayProductos[i].precio}€</td>
            <td>${arrayProductos[i].categoria}</td>
            <td><button id="botonModificar${arrayProductos[i].id}"  onClick = "formulario(${arrayProductos[i].id})" class="btn btn-warning">Modificar</button></td>
            <td><button id="botonEliminar${arrayProductos[i].id}" onClick = "EliminarProducto(${arrayProductos[i].id})" class="btn btn-danger">Eliminar</button></td>`;

				tabla1.append(tr);
			} else {
				select.innerHTML += `<option value="${arrayProductos[i].id}">${arrayProductos[i].nombre}</option>`;
			}
		}

		tabla1.innerHTML += `</tbody></table>`;

		if (select.value == "default" && select.length <= 1) {
			let option = document.querySelector('option[value="default"]');
			option.innerHTML = "No hay productos eliminados";
			select.disabled = true;

			let botonRecuperar = document.getElementsByName("RecuperarProducto");
			botonRecuperar[0].disabled = true;
		}

		if (selectCategorias.value == "default" && selectCategorias.length <= 1) {
			let option = document.querySelector('option[value="default"]');
			option.innerHTML = "No hay categorias";
			selectCategorias.disabled = true;
		} else {
			for (let i = 0; i < arrayCategoria.length; i++) {
				selectCategorias.innerHTML += `<option value="${arrayCategoria[i].id}">${arrayCategoria[i].nombre}</option>`;
			}
		}
	});

function validarNombrePrecio(nombre, precio) {
	// Validar nombre: debe contener solo letras y espacios
	var regexNombre = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
	if (!regexNombre.test(nombre)) {
		alertify.error("El nombre es inválido. Debe contener solo letras y espacios.");
		return false;
	}

	// Validar precio: debe ser un número positivo
	var regexPrecio = /^\d+(\.\d{1,2})?$/;
	if (!regexPrecio.test(precio)) {
		alertify.error("El precio es inválido. Debe ser un número positivo.");
		return false;
	}

	// Si ambas validaciones pasan, devolver true
	return true;
}

async function NuevoProducto() {
	let nombre = document.getElementById("colFormLabelNombre").value;
	let precio = document.getElementById("colFormLabelPrecio").value;
	let selectElement = document.getElementsByName("categoriasSelect")[0];

	let categoria = selectElement.value;

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
		activo: "true",
		categoria: parseInt(categoria),
		nombre: nombre,
		precio: precio,
	};

	if (validarNombrePrecio(nombre, precio)) {
		const postResponse = await fetch(apiRest + ficheroProductos + "/" + lastId + ".json", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(nuevoProducto),
		});

		await postResponse.json();

		if (postResponse.ok) {
			alertify.success("Producto añadido correctamente");

			setTimeout(() => {
				location.reload();
			}, 1000);
		}
	} else {
		alertify.error("Error al añadir el producto");
	}
}

async function ModificarProducto(id) {
	let nombre = document.getElementById("colFormLabelNombre").value;
	let precio = document.getElementById("colFormLabelPrecio").value;
	let selectElement = document.getElementsByName("categoriasSelect")[0];

	let categoria = selectElement.value;

	const producto = {
		id: id,
		categoria: parseInt(categoria),
		nombre: nombre,
		precio: precio,
		activo: "true",
	};

	if (validarNombrePrecio(nombre, precio)) {
		const putResponse = await fetch(apiRest + ficheroProductos + "/" + (id - 1) + ".json", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(producto),
		});

		await putResponse.json();

		if (putResponse.ok) {
			alertify.success("Producto modificado correctamente");

			setTimeout(() => {
				location.reload();
			}, 1000);
		}
	} else {
		alertify.error("Error al modificar el producto");
	}
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

	if (updateResponse.ok) {
		alertify.success("Producto eliminado correctamente");

		setTimeout(() => {
			location.reload();
		}, 1000);
	} else {
		alertify.error("Error al eliminar el producto");
	}
}

function RecuperarProductoModal() {
	var miModal = new bootstrap.Modal(document.getElementById("miModal"));
	miModal.show();

	let select = document.getElementsByName("ProductoEliminado")[0];
	let boton = document.querySelector('button[name="RecuperarProducto"]');
	boton.disabled = true;
	select.value = "default";

	select.addEventListener("change", function () {
		if (select.value == "default") {
			boton.disabled = true;
		} else {
			boton.disabled = false;
		}
	});
}

function formulario(value) {
	var formulario = new bootstrap.Modal(document.getElementById("formulario"));
	formulario.show();
	let boton = document.querySelector('button[name="ModificarProducto"]');
	let boton2 = document.querySelector('button[name="NuevoProducto"]');
	let select = document.getElementsByName("categoriasSelect")[0];

	boton.disabled = true;
	boton2.disabled = true;

	arrayOriginalProductos.forEach((producto) => {
		let defaultCategoria = "defaultCategoria";
		if (producto.id == value && producto.nombre != undefined) {
			document.getElementById("colFormLabelNombre").value = producto.nombre;
			document.getElementById("colFormLabelPrecio").value = producto.precio;
			document.getElementsByName("categoriasSelect")[0].value = defaultCategoria;
		}
	});

	select.addEventListener("change", function () {
		if (select.value == "defaultCategoria") {
			boton.disabled = true;
			boton2.disabled = true;
		} else {
			boton.disabled = false;
			boton2.disabled = false;
		}
	});

	if (value == -1) {
		let boton = document.querySelector('button[name="ModificarProducto"]');
		boton.style.display = "none";

		let boton2 = document.querySelector('button[name="NuevoProducto"]');
		boton2.style.display = "block";

		document.getElementById("colFormLabelNombre").value = "";
		document.getElementById("colFormLabelPrecio").value = "";
	} else {
		let boton = document.querySelector('button[name="NuevoProducto"]');
		boton.style.display = "none";

		let boton2 = document.querySelector('button[name="ModificarProducto"]');
		boton2.style.display = "block";

		boton2.addEventListener("click", function () {
			ModificarProducto(value);
		});
	}
}

async function RecuperarProducto() {
	let id = document.getElementsByName("ProductoEliminado")[0].value;

	const getResponse = await fetch(apiRest + ficheroProductos + "/" + (id - 1) + ".json");
	const producto = await getResponse.json();

	producto.activo = "true";

	// Finalmente, actualiza el producto
	const updateResponse = await fetch(apiRest + ficheroProductos + "/" + (id - 1) + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(producto),
	});

	await updateResponse.json();

	if (updateResponse.ok) {
		alertify.success("Producto recuperado correctamente");

		setTimeout(() => {
			location.reload();
		}, 1000);
	} else {
		alertify.error("Error al recuperar el producto");
	}
}
