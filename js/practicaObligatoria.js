// Sugerencia de categorias y productos

let catalogo = new Catalogo();
let arrayProductos = [];
let arrayCategorias = [];
let Gestores = new Array(9);
let contador = 0;
const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";
arrayProductos = catalogo.productos;

frmControles.categorias.addEventListener("change", CategoriaSeleccionada);

document.addEventListener("DOMContentLoaded", colorearMesasLibres);

//añadir un evento alhacer clickk en una mesa
let mesas = document.getElementsByClassName("mesa");
for (let i = 0; i < mesas.length; i++) {
	mesas[i].addEventListener("click", seleccionarMesa);
}

//añadir un evento al hacer click en en tecla de un producto
let unidades = document.getElementsByClassName("tecla");
for (let i = 0; i < unidades.length; i++) {
	unidades[i].addEventListener("click", unidadesProducto);
}

function CargarProductos(listaProductos) {
	let idsUnicos = {};
	let productosUnicos = [];

	for (let producto of listaProductos) {
		if (!idsUnicos[producto.id]) {
			productosUnicos.push(producto);
			idsUnicos[producto.id] = true;
		}
	}

	// Limpiar el select antes de agregar nuevas opciones
	let select = frmControles.productos;
	while (select.firstChild) {
		select.removeChild(select.firstChild);
	}

	productosUnicos.forEach((producto) => {
		catalogo.addProducto(producto.id, producto.nombre, producto.precio, producto.categoria);
		let lista = document.createElement("option");
		lista.innerHTML = producto.nombre;
		lista.value = producto.id;
		select.add(lista);
	});
}

//mostrar los productos en el combo de productos en funcion de la categoria seleccionada en el combo de categorias

function MostrarCategorias(listaCategorias) {
	BorrarCombo();

	const frmControles = document.getElementById("frmControles");

	listaCategorias.forEach((categoria) => {
		let lista = document.createElement("option");
		lista.innerHTML = categoria.nombre;
		if (categoria.activo == true) {
			frmControles.categorias.add(lista);
		}
	});
}

function CategoriaSeleccionada() {
	BorrarCombo();
	let categoria = frmControles.categorias.value;

	arrayCategorias.forEach((indiceCategoria, elementoCategoria) => {
		for (let i = 0; i < arrayProductos.length; i++) {
			if (indiceCategoria.nombre == categoria && elementoCategoria == arrayProductos[i].IdCategoria) {
				let oOption = document.createElement("option");
				oOption.setAttribute("id", "ComboProductos");
				oOption.text = arrayProductos[i].NombreProducto;
				frmControles.productos.add(oOption);
			}
		}
	});
}

function recuperarDatosProducto() {
	const ficheroProductos = "productos.json";
	fetch(apiRest + ficheroProductos)
		.then((res) => res.json())
		.then((data) => Object.values(data))
		.then(CargarProductos);
}

function recuperarDatoscCategoria() {
	const ficheroCategoria = "categorias.json";
	fetch(apiRest + ficheroCategoria)
		.then((res) => res.json())
		.then((data) => {
			arrayCategorias = Object.values(data);
			return arrayCategorias;
		})
		.then(MostrarCategorias);
}

//colorear todas las mesas libres
function colorearMesasLibres() {
	let mesas = document.getElementsByClassName("mesa");
	let NumeroMesa = 1;
	for (let i = 0; i < mesas.length; i++) {
		mesas[i].classList.add("libre");
	}

	recuperarDatoscCategoria();

	recuperarDatosProducto();

	let cuenta = document.getElementById("cuenta");
	//poner un texto en el div cuenta

	cuenta.innerHTML = "<h3>Selecciona una mesa para ver la cuenta</h3>";

	setTimeout(CategoriaSeleccionada, 1000);

	//si hay datos en una mesa se pinta de rojo y se muestra la cuenta de la mesa
	for (let i = 0; i < mesas.length; i++) {
		let ficheroMesas = "cuentas/Mesa" + (i + 1) + ".json";
		fetch(apiRest + ficheroMesas)
			.then((res) => res.json())
			.then((data) => {
				if (data != null) {
					mesas[i].classList.remove("libre");
					mesas[i].classList.add("ocupada");
				}
			});
	}

	if (mesas[0].classList.contains("ocupada")) {
		setTimeout(pintarMesaSeleccionada(NumeroMesa), 1000);
	}

	console.log(mesas[0]);

	//si la mesa esta ocupada
}

//al hacer click en el boton de liberar mesa  se vuelve a colorear la mesa de verde
function liberarMesa() {
	let mesa = document.getElementById("cuenta").getElementsByTagName("h2")[0].innerHTML;
	let precioTotal = document.getElementById("cuenta").getElementsByTagName("h2")[1].innerHTML;
	let PrecioNumero = precioTotal.split(" ")[1];

	console.log(precioTotal);

	let fechaActual = new Date();

	//mostrar en formato dd/mm/yyyy
	let fecha = fechaActual.getDate() + "/" + fechaActual.getMonth() + "/" + fechaActual.getFullYear();
	let horaActual = fechaActual.getHours() + ":" + fechaActual.getMinutes();
	let cuenta = document.getElementById("cuenta");
	let NumeroMesa = mesa.substring(5, 6);
	cuenta.innerHTML = "<h1>Cuenta</h1> <h2>Mesa " + NumeroMesa + "</h2>";
	let rojo = document.getElementsByClassName("mesa");
	rojo[NumeroMesa - 1].classList.remove("ocupada");
	rojo[NumeroMesa - 1].classList.add("libre");

	let ficheroMesas = "cuentas/Mesa" + NumeroMesa + ".json";
	fetch(apiRest + ficheroMesas, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => console.log(data));

	console.log(apiRest + ficheroMesas);

	let ficheroCuentaPagar = "MesasPagar/" + contador + ".json";
	fetch(apiRest + ficheroCuentaPagar, {
		method: "PUT",
		body: JSON.stringify({
			NumeroMesa: NumeroMesa,
			Importe: PrecioNumero,
			Fecha: fecha,
			Hora: horaActual,
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
	contador++;
}

//hacer que al hacer click en una mesa se muestre la mesa seleccionada en el div cuenta

function seleccionarMesa() {
	let mesa = this;
	let cuenta = document.getElementById("cuenta");
	//poner un texto en el div cuenta
	if (mesa.classList.contains("ocupada")) {
		pintarMesaSeleccionada(mesa.innerHTML);
	} else {
		cuenta.innerHTML = "<h1>Cuenta</h1> <h2>Mesa " + mesa.innerHTML + " ¡Esta libre!</h2>";
	}
}
//borrar el combo de productos
function BorrarCombo() {
	let productos = frmControles.productos;
	for (let i = productos.length; i >= 0; i--) {
		productos.remove(i);
	}
}

function BuscarUnIdProducto(value) {
	for (lista of arrayProductos) {
		if (lista.NombreProducto == value) {
			return lista;
		}
	}
}

function unidadesProducto() {
	let Teclado = this.value;
	let cuenta = document.getElementById("cuenta");
	let mesa = document.getElementById("cuenta").getElementsByTagName("h2")[0].innerHTML;
	let NumeroMesa = mesa.substring(5, 6);

	let nombreProducto = frmControles.productos.value;

	let ArrayDeidProducto = [];
	ArrayDeidProducto = BuscarUnIdProducto(nombreProducto);

	let resultadoID = ArrayDeidProducto.IdProducto;
	let resultadoPrecio = ArrayDeidProducto.PrecioUnidad;

	resultadoPrecio = parseFloat(resultadoPrecio).toFixed(2);

	precioTotalUnidad = resultadoPrecio * Teclado;

	precioTotalUnidad = precioTotalUnidad.toFixed(2);

	let salto = document.createElement("br");
	cuenta.append(salto);

	let rojo = document.getElementsByClassName("mesa");
	rojo[NumeroMesa - 1].classList.add("ocupada");

	let insertarUnidades = {
		unidades: parseInt(Teclado),
		IdProducto: resultadoID,
		nombre: nombreProducto,
		precioTotal: precioTotalUnidad,
		precioUnidad: resultadoPrecio,
	};

	(async () => {
		try {
			const response = await fetch(apiRest + "cuentas/" + "Mesa" + NumeroMesa + "/" + resultadoID + ".json", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(insertarUnidades),
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	})();

	pintarMesaSeleccionada(NumeroMesa);

	if (Gestores[NumeroMesa - 1] != undefined) {
		for (let i = 0; i < Gestores[NumeroMesa - 1].cuentas.length; i++) {
			for (let j = 0; j < Gestores[NumeroMesa - 1].cuentas[i].lineasDeCuenta.length; j++) {
				if (Gestores[NumeroMesa - 1].cuentas[i].lineasDeCuenta[j].IdProducto == resultadoID) {
					return true;
				}
			}
		}
		return false;
	}

	let lineaCuenta = new LineaCuenta(Teclado, resultadoID);

	let arrayLineasCuenta = [];
	arrayLineasCuenta.push(lineaCuenta);

	//crear una cuenta nueva por cada mesa
	let cuentaNueva = new Cuenta(NumeroMesa, [arrayLineasCuenta], false);

	let gestor = Gestores[NumeroMesa - 1];
	if (gestor === undefined) {
		gestor = new Gestor(NumeroMesa);
		Gestores[NumeroMesa - 1] = gestor;
	}

	gestor.cuentas.push(cuentaNueva);

	setTimeout(function () {
		location.reload();
	}, 500);
}

function ModificarUnidadesBD(sumaUnidades, IdTabla, nombreProducto, precioTotal, NumeroMesa, precioUnidad) {
	fetch(apiRest + "cuentas/" + "Mesa" + NumeroMesa + "/" + IdTabla + ".json", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			unidades: sumaUnidades,
			IdProducto: IdTabla,
			nombre: nombreProducto,
			precioTotal: precioTotal,
			precioUnidad: precioUnidad,
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
}

//funcion para añadir unidades a un producto de la cuenta de una mesa seleccionada y modificar el precio total
function AñadirUnidad(value) {
	let nombreProducto = document.getElementById(value).getElementsByTagName("td")[0].innerHTML;

	let mesa = document.getElementById("cuenta").getElementsByTagName("h2")[0].innerHTML;
	let NumeroMesa = mesa.substring(5, 6);

	let unidades = document.getElementById(value).getElementsByTagName("td")[1].innerHTML;
	let sumaUnidades = parseInt(unidades) + 1;

	let precioUnidad = document.getElementById(value).getElementsByTagName("td")[2].innerHTML.substring(0, 4);
	let unidadPorPrecio = parseFloat((parseFloat(precioUnidad) * sumaUnidades).toFixed(2));

	let cuentaTotal = cuenta.getElementsByTagName("h2")[1].innerHTML.substring(7, 12);
	let precioTotal = parseFloat(cuentaTotal) + parseFloat(precioUnidad);

	cuenta.getElementsByTagName("h2")[1].innerHTML = "Total: " + precioTotal.toFixed(2) + "€";
	document.getElementById(value).getElementsByTagName("td")[3].innerHTML = unidadPorPrecio + "€";
	document.getElementById(value).getElementsByTagName("td")[1].innerHTML = sumaUnidades;

	ModificarUnidadesBD(sumaUnidades, value, nombreProducto, unidadPorPrecio, NumeroMesa, precioUnidad);
}

//funcion para quitar unidades a un producto de la cuenta de una mesa seleccionada y modificar el precio total
function QuitarUnidad(value) {
	let nombreProducto = document.getElementById(value).getElementsByTagName("td")[0].innerHTML;
	console.log(value);

	let mesa = document.getElementById("cuenta").getElementsByTagName("h2")[0].innerHTML;
	let NumeroMesa = mesa.substring(5, 6);

	let unidades = document.getElementById(value).getElementsByTagName("td")[1].innerHTML;
	let restaUnidades = parseInt(unidades) - 1;

	let precioUnidad = document.getElementById(value).getElementsByTagName("td")[2].innerHTML.substring(0, 4);
	let unidadPorPrecio = parseFloat((parseFloat(precioUnidad) * restaUnidades).toFixed(2));

	let cuentaTotal = cuenta.getElementsByTagName("h2")[1].innerHTML.substring(7, 12);
	let precioTotal = parseFloat(cuentaTotal) - parseFloat(precioUnidad);

	cuenta.getElementsByTagName("h2")[1].innerHTML = "Total: " + precioTotal.toFixed(2) + "€";
	document.getElementById(value).getElementsByTagName("td")[3].innerHTML = unidadPorPrecio + "€";
	document.getElementById(value).getElementsByTagName("td")[1].innerHTML = restaUnidades;

	if (restaUnidades == 0) {
		let confirmar = confirm("¿Estas seguro de querer borrar el producto?");
		if (confirmar) {
			(async () => {
				await fetch(apiRest + "cuentas/" + "Mesa" + NumeroMesa + "/" + value + ".json", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((data) => console.log(data));
			})();

			fetch(apiRest + "cuentas/" + "Mesa" + NumeroMesa + ".json")
				.then((response) => response.json())
				.then((data) => {
					let cantidad = Object.keys(data).length;
					if (cantidad === 1) {
						liberarMesa();
					} else {
						pintarMesaSeleccionada(NumeroMesa);
					}
				});
		}
	} else {
		ModificarUnidadesBD(restaUnidades, value, nombreProducto, unidadPorPrecio, NumeroMesa, precioUnidad);
	}
}

async function pintarMesaSeleccionada(mesa) {
	cuenta.innerHTML =
		"<h1>Cuenta</h1> <h2>Mesa " +
		mesa +
		"<h2>Total:  €</h2>" +
		"<button class = 'boton' onClick = 'liberarMesa()'>Pagar y liberar la mesa</button>";

	let response = await fetch(apiRest + "cuentas/" + "Mesa" + mesa + ".json");
	let data = await response.json();

	let tabla1 = document.createElement("table");
	tabla1.innerHTML = `
    <tr>
        <th>Producto</th>
        <th>Unidades</th>
        <th>Precio</th>
        <th>Total Producto</th>
        <th>Añadir</th>
    </tr>
    `;
	cuenta.append(tabla1);

	let precioTotal = 0;
	let precioUnidad = 0;

	for (lista in data) {
		let producto = data[lista];

		if (producto === null) {
			continue; // Salta a la siguiente iteración del bucle
		}

		precioTotal += parseFloat(producto.precioTotal);
		precioUnidad += parseFloat(producto.precioUnidad);

		cuenta.getElementsByTagName("h2")[1].innerHTML = "Total: " + precioTotal.toFixed(2) + "€";

		let tabla = document.createElement("table");
		tabla.innerHTML = `
        <tr id = ${lista}>
            <td>${producto.nombre}</td>
            <td>${producto.unidades}</td>
            <td>${producto.precioUnidad}€</td>
            <td>${producto.precioTotal}€</td>
            <td><button class = "boton" onClick = "AñadirUnidad(${lista})">+</button> <button class = "boton" onClick = "QuitarUnidad(${lista})">-</button></td>
        </tr>
        `;

		setTimeout(function () {
			cuenta.append(tabla);
		}, 100);
	}
}
