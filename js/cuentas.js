const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";
let arrayCuentas = [];
const ficheroCuenta = "MesasPagar";
let tabla1 = document.createElement("table");

fetch(apiRest + ficheroCuenta + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((cuentas) => {
		cuentas.forEach((cuenta) => {
			arrayCuentas.push(cuenta);
		});
		console.log("🚀 ~ cuentas.forEach ~ arrayCuentas:", arrayCuentas);

		tabla1.innerHTML = `
     	    <table class="container-table100 ">
				<thead>
        			<tr class="table100-head">
		        		<th>Fecha</th>
		        		<th>Hora</th>
		        		<th>Importe</th>
		        		<th>NumeroMesa</th>
	        		</tr>
				</thead>
				<tbody>`;
		TablaHistorialCuentas.append(tabla1);

		arrayCuentas.forEach((cuenta) => {
			let tr = document.createElement("tr");
			tr.innerHTML = `
                <td>${cuenta.Fecha}</td>
                <td>${cuenta.Hora}</td>
                <td>${cuenta.Importe}</td>
                <td>${cuenta.NumeroMesa}</td>
            `;
			tabla1.append(tr);
		});
		tabla1.innerHTML += `</tbody></table>`;
	});

document.getElementById("filtroFechas").addEventListener("click", () => {
	let fechaInicio = document.getElementById("fechaInicio").value;
	let fechaFin = document.getElementById("fechaFin").value;

	let formatearFecha = (fecha) => {
		let partes = fecha.split("-");
		return `${partes[2]}/${partes[1]}/${partes[0]}`;
	};

	let fechaInicioFormateada = formatearFecha(fechaInicio);
	let fechaFinFormateada = formatearFecha(fechaFin);

	tabla1.innerHTML = `
		<table class="container-table100 ">
			<thead>
				<tr class="table100-head">
					<th>Fecha</th>
					<th>Hora</th>
					<th>Importe</th>
					<th>NumeroMesa</th>
				</tr>
			</thead>
			<tbody>`;
	TablaHistorialCuentas.append(tabla1);

	arrayCuentas.forEach((cuenta) => {
		if (cuenta.Fecha >= fechaInicioFormateada && cuenta.Fecha <= fechaFinFormateada) {
			let tr = document.createElement("tr");
			tr.innerHTML = `
				<td>${cuenta.Fecha}</td>
				<td>${cuenta.Hora}</td>
				<td>${cuenta.Importe}</td>
				<td>${cuenta.NumeroMesa}</td>
			`;
			tabla1.append(tr);
		}
	});

	if (fechaFinFormateada && fechaInicioFormateada === "undefined/undefined/") {
		alertify.error("Error ponga una fecha de inicio y una fecha de fin");

		setTimeout(() => {
			location.reload();
		}, 1000);
	}

	if (fechaFinFormateada < fechaInicioFormateada) {
		alertify.error("Error la fecha de fin no puede ser menor que la fecha de inicio");

		setTimeout(() => {
			location.reload();
		}, 1000);
	}

	tabla1.innerHTML += `</tbody></table>`;
});
