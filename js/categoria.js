let catalogo = new Catalogo();
let arrayCategoria = [];

const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";

const ficheroCategoria = "categorias";
fetch(apiRest + ficheroCategoria + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((categorias) => {
		categorias.forEach((categoria) => {
			arrayCategoria.push(categoria);
		});

		let tabla1 = document.createElement("table");
		tabla1.innerHTML = `
        <tr>
            <th>Categoria</th>
            <th><button id="botonNuevo" onClick = "NuevaCategoria()">Nuevo</button></th>
            <th><button id="RecuperarCategoriaModal" onClick = "RecuperarCategoriaModal()">Recuperar Categoria</button></th>

        </tr>`;

		TablaCategoria.append(tabla1);

		for (let i = 0; i < arrayCategoria.length; i++) {
			let tr = document.createElement("tr");

			if (arrayCategoria[i].activo == true) {
				tr.innerHTML = `
            <td>${arrayCategoria[i].nombre}</td>
            <td><button id="botonModificar${arrayCategoria[i].id}" onClick = "ModificarCategoria(${arrayCategoria[i].id})">Modificar</button></td>
            <td><button id="botonEliminar${arrayCategoria[i].id}" onClick = "EliminarCategoria(${arrayCategoria[i].id})">Eliminar</button></td>`;

				tabla1.append(tr);
			} else {
				select = document.getElementsByName("ProductoEliminado")[0];
				select.innerHTML += `<option value="${arrayCategoria[i].id}">${arrayCategoria[i].nombre}</option>`;
			}
		}
	});

async function NuevaCategoria() {
	let nombre = prompt("Introduce el nombre de la categoria");

	const response = await fetch(apiRest + ficheroCategoria + ".json");
	const data = await response.json();

	const nuevaCategoria = {
		nombre: nombre,
		activo: true,
		id: data.length,
	};

	const putResponse = await fetch(apiRest + ficheroCategoria + "/" + data.length + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(nuevaCategoria),
	});

	await putResponse.json();
}

async function ModificarCategoria(id) {
	let nombre = prompt("Introduce el nuevo nombre de la categoria");

	const modificarCategoria = {
		nombre: nombre,
		activo: true,
		id: id,
	};

	const putResponse = await fetch(apiRest + ficheroCategoria + "/" + id + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(modificarCategoria),
	});

	await putResponse.json();
}

async function EliminarCategoria(id) {
	const response = await fetch(apiRest + ficheroCategoria + "/" + id + ".json");
	const data = await response.json();

	const eliminarCategoria = {
		nombre: data.nombre,
		activo: false,
		id: id,
	};

	const putResponse = await fetch(apiRest + ficheroCategoria + "/" + id + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(eliminarCategoria),
	});

	await putResponse.json();
}

function RecuperarCategoriaModal() {
	var miModal = new bootstrap.Modal(document.getElementById("miModal"));
	miModal.show();
}

async function RecuperarCategoria() {
	let id = document.getElementsByName("ProductoEliminado")[0].value;

	const response = await fetch(apiRest + ficheroCategoria + "/" + id + ".json");
	let categoria = await response.json();
	categoria.activo = true;

	const updateResponse = await fetch(apiRest + ficheroCategoria + "/" + id + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(categoria),
	});

	return updateResponse;
}
