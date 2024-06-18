const apiRest = "https://primerproyecto-34e1f-default-rtdb.asia-southeast1.firebasedatabase.app/";
let arrayCuentas = [];
const ficheroCuenta = "MesasPagar";

fetch(apiRest + ficheroCuenta + ".json")
	.then((res) => res.json())
	.then((data) => Object.values(data))
	.then((cuentas) => {
		cuentas.forEach((cuenta) => {
			arrayCuentas.push(cuenta);
		});
		console.log("🚀 ~ cuentas.forEach ~ arrayCuentas:", arrayCuentas);

		let tabla1 = document.createElement("table");
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
