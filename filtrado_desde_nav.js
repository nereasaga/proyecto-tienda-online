// FUNCION DEL NAV
function filtrar_genero(genero) {
    const relojesFiltrados = relojes.filter(reloj => genero === "todos" || reloj.genero === genero);
    mostrarRelojes(relojesFiltrados);
}

// Función para mostrar relojes en la página
function mostrarRelojes(listaRelojes) {
    const listareloj = document.getElementById("reloj-l");
    listareloj.innerHTML = ""; // Limpiar contenido previo
    listaRelojes.forEach(reloj => {
        const relojItem = document.createElement("div");
        relojItem.classList.add("watch-item");
        relojItem.innerHTML = `
            <a href="producto.html" onclick="guardarReferenciaProducto('${reloj.ref}')" class="link">
                <div class="reloj-titulo">
                    <p class="marca">${reloj.marca}</p>
                </div>
                <img src="${reloj['img-1']}" alt="${reloj.modelo}" class="imagen-R">
                <div class="reloj-pie">
                    <h3 class="nombre">${reloj.modelo}</h3>
                    <p class="tamano">${reloj.tamano} mm</p>
                    <p class="material">${reloj.material}</p>
                    <p class="precio">${reloj.precio} €</p>
                </div>
            </a>
        `;
        listareloj.appendChild(relojItem);
    });
}

/// Asignar eventos de click a los elementos del menú desktop
document.getElementById("menu-mujer").addEventListener("click", function(event) {
    event.preventDefault(); // Evita la recarga de la página
    filtrar_genero("Mujer");
});
document.getElementById("menu-hombre").addEventListener("click", function(event) {
    event.preventDefault();
    filtrar_genero("Hombre");
});
document.getElementById("menu-unisex").addEventListener("click", function(event) {
    event.preventDefault();
    filtrar_genero("unisex");
});

//asignar eventos de click a los elementos del menú mobile
document.getElementById("menu-mujer-2").addEventListener("click", function(event) {
    event.preventDefault();
    filtrar_genero("Mujer");
});
document.getElementById("menu-hombre-2").addEventListener("click", function(event) {
    event.preventDefault();
    filtrar_genero("Hombre");
});
document.getElementById("menu-unisex-2").addEventListener("click", function(event) {
    event.preventDefault();
    filtrar_genero("unisex");
});