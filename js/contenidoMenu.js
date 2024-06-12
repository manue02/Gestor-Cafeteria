const navItems = [
	{
		title: "Inicio",
		label: "Inicio",
		url: "/index.html",
	},
	{
		title: "Productos",
		label: "Productos",
		url: "../html/productos.html",
	},
	{
		title: "Categoria",
		label: "Categoria",
		url: "../html/categoria.html",
	},
	{
		title: "Cuentas",
		label: "Cuentas",
		url: "/Gestor-Cafeteria/html/cuentas.html",
	},
];

const nav = document.getElementById("nav");

navItems.forEach((link) => {
	const a = document.createElement("a");
	a.className = "enlaces";
	a.setAttribute("aria-label", link.label);
	a.href = link.url;
	a.textContent = link.title;

	nav.appendChild(a);
});

document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll("section");
	const navItems = document.querySelectorAll("header nav a");

	const callback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navItems.forEach((item) => {
					if (item.getAttribute("aria-label") == entry.target.id) {
						item.classList.add("text-yellow-500");
					} else {
						item.classList.remove("text-yellow-500");
					}
				});
			}
		});
	};

	const observer = new IntersectionObserver(callback, {
		root: null,
		rootMargin: "0px",
		threshold: 0.3,
	});

	sections.forEach((section) => {
		observer.observe(section);
	});

	document.onvisibilitychange = () => {
		if (document.visibilityState === "hidden") {
			observer.disconnect();
		} else {
			sections.forEach((section) => {
				observer.observe(section);
			});
		}
	};
});
