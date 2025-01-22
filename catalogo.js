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

// Función para manejar los cambios en los filtros
function actualizarFiltros() { 
    seleccionTamano = obtenerValoresSeleccionados('tamano');
    seleccionMarca = obtenerValoresSeleccionados('marca');
    seleccionPrecio = obtenerValoresSeleccionados('precio');
    seleccionMaterial = obtenerValoresSeleccionados('material');
    seleccionGenero = obtenerValoresSeleccionados('genero');
    
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
        const priceMatch = seleccionPrecio.length === 0 || seleccionPrecio.some(range => {
            const [min, max] = range.split('-').map(Number);
            return reloj.precio >= min && (max ? reloj.precio <= max : true);
        });
        const materialMatch = seleccionMaterial.length === 0 || seleccionMaterial.includes(reloj.material.toLowerCase());
        const genderMatch = seleccionGenero.length === 0 || seleccionGenero.includes(reloj.genero.toLowerCase());
        return tamanoMatch && brandMatch && priceMatch && materialMatch && genderMatch;
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

// Evento de actualización de filtros
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', actualizarFiltros);
});

// Función para guardar la referencia del producto seleccionado
function guardarReferenciaProducto(ref) {
    localStorage.setItem('selectedWatchref', ref);
}

// Cargar los relojes al inicio
window.onload = cargarRelojesDesdeJSON;

// Función para actualizar el valor del rango de precio
function actualizarValorPrecio(rangeInput) {
    const precioValue = document.getElementById("precioValue");
    precioValue.textContent = ` ${rangeInput.value},00 €`;
}

// Función para lista desplegable
function actualizarValorPrecio(rangeInput) {
    const precioValue = document.getElementById("precioValue");
    precioValue.textContent = ` ${rangeInput.value},00 €`;
}