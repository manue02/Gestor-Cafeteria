class Producto {
	_idProducto;
	_nombreProducto;
	_precioUnidad;
	_idCategoria;

	constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
		this._idProducto = idProducto;
		this._nombreProducto = nombreProducto;
		this._precioUnidad = precioUnidad;
		this._idCategoria = idCategoria;
	}

	get IdProducto() {
		return this._idProducto;
	}

	set IdProducto(idProducto) {
		this._idProducto = idProducto;
	}

	get NombreProducto() {
		return this._nombreProducto;
	}

	set NombreProducto(nombreProducto) {
		this._nombreProducto = nombreProducto;
	}

	get PrecioUnidad() {
		return this._precioUnidad;
	}

	set PrecioUnidad(precioUnidad) {
		this._precioUnidad = precioUnidad;
	}

	get IdCategoria() {
		return this._idCategoria;
	}

	set IdCategoria(idCategoria) {
		this._idCategoria = idCategoria;
	}
}

class Catalogo {
	_productos;

	constructor() {
		this._productos = [];
	}

	get productos() {
		return this._productos;
	}

	set productos(productos) {
		this._productos = productos;
	}

	addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
		this._productos.push(new Producto(idProducto, nombreProducto, precioUnidad, idCategoria));
	}
}

class LineaCuenta {
	_unidades;
	_idProducto;

	constructor(unidades, idProducto) {
		this._unidades = unidades;
		this._idProducto = idProducto;
	}

	get Unidades() {
		return this._unidades;
	}

	set Unidades(unidades) {
		this._unidades = unidades;
	}

	get IdProducto() {
		return this._idProducto;
	}

	set IdProducto(idProducto) {
		this._idProducto = idProducto;
	}
}

class Cuenta {
	_mesa;
	_lineasDeCuenta;
	_pagada;

	constructor(mesa, lineasDeCuenta, pagada) {
		this._mesa = mesa;
		this._lineasDeCuenta = lineasDeCuenta;
		this._pagada = false;
	}

	get Mesa() {
		return this._mesa;
	}

	set Mesa(mesa) {
		this._mesa = mesa;
	}

	get lineasDeCuenta() {
		return this._lineasDeCuenta;
	}

	set lineasDeCuenta(lineasDeCuenta) {
		this._lineasDeCuenta = lineasDeCuenta;
	}

	get Pagada() {
		return this._pagada;
	}

	set Pagada(pagada) {
		this._pagada = pagada;
	}
}

class Gestor {
	_cuentas;
	_mesaActual;

	constructor(mesaActual) {
		this._mesaActual = mesaActual;
		this._cuentas = [];
	}

	get cuentas() {
		return this._cuentas;
	}

	set cuentas(cuentas) {
		this._cuentas = cuentas;
	}

	get mesaActual() {
		return this._mesaActual;
	}

	set mesaActual(mesaActual) {
		this._mesaActual = mesaActual;
	}
}
