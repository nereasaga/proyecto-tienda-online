// Función para cargar los datos desde un archivo JSON
function cargarRelojesDesdeJSON() {
    fetch('json/catalogo-es.json') // Asegúrate de que el archivo JSON esté en la misma carpeta
        .then(response => response.json())
        .then(data => {
            relojes = data; // Asignar los datos cargados a la variable relojes
            cargarRelojes(); // Cargar los relojes al iniciar
        })
        .catch(error => console.error('Error al cargar los relojes:', error));
}
// Cargar los relojes al inicio
window.onload = cargarRelojesDesdeJSON;
// Función para guardar la referencia del producto seleccionado
function guardarReferenciaProducto(ref) {
    localStorage.setItem('selectedWatchref', ref);
}
// Datos de los relojes (inicialmente vacío, se llenará desde JSON)
let relojes = [];
// Estado de los filtros
let seleccionTamano = [];
let seleccionMarca = [];
let seleccionPrecio = [];
let seleccionMaterial = [];
let seleccionGenero = [];
// Función para cargar los relojes en la página
function cargarRelojes() {
    const listareloj = document.getElementById('reloj-l');
    listareloj.innerHTML = '';

    relojes.forEach(reloj => {
        const elementosR = document.createElement('div');
        elementosR.classList.add('watch-item');
        elementosR.innerHTML = `
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
        listareloj.appendChild(elementosR);
    });
}
// Evento de actualización de filtros
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', actualizarFiltros);
});
// Función para manejar los cambios en los filtros
function actualizarFiltros() { 
    seleccionTamano = obtenerValoresSeleccionados('tamano');
    seleccionMarca = obtenerValoresSeleccionados('marca');
    seleccionPrecio = document.getElementById('precioRange').value; // Captura el valor del rango
    seleccionMaterial = obtenerValoresSeleccionados('material');
    seleccionGenero = obtenerValoresSeleccionados('genero');
    seleccionTipo = obtenerValoresSeleccionados('tipo');    
    filtrarRelojes();
}
// Función para obtener los valores seleccionados
function obtenerValoresSeleccionados(filterType) {
    return Array.from(document.querySelectorAll(`input[name="${filterType}"]:checked`))
                .map(input => input.value.toLowerCase());
}
// Función para filtrar los relojes según los filtros seleccionados
function filtrarRelojes() {
    const filtroRelojes = relojes.filter(reloj => {
        const tamanoMatch = seleccionTamano.length === 0 || seleccionTamano.includes(String(reloj.tamano).toLowerCase());
        const brandMatch = seleccionMarca.length === 0 || seleccionMarca.includes(reloj.marca.toLowerCase());
        const priceMatch = !seleccionPrecio || reloj.precio <= parseFloat(seleccionPrecio);
        const materialMatch = seleccionMaterial.length === 0 || seleccionMaterial.includes(reloj.material.toLowerCase());
        const genderMatch = seleccionGenero.length === 0 || seleccionGenero.includes(reloj.genero.toLowerCase());
        const tipoMatch = seleccionTipo.length === 0 || seleccionTipo.includes(reloj.tipo.toLowerCase());
        return tamanoMatch && brandMatch && priceMatch && materialMatch && genderMatch && tipoMatch;
    });    
    const watchList = document.getElementById('reloj-l');
    watchList.innerHTML = '';
    filtroRelojes.forEach(reloj => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
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
        watchList.appendChild(watchItem);
    });
}
// Función para lista desplegable
function actualizarValorPrecio(rangeInput) {
    const precioValue = document.getElementById("precioValue");
    precioValue.textContent = ` ${rangeInput.value},00 €`;
}
// Evento de actualización de filtros
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', actualizarFiltros);
});