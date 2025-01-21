// Función para cargar los datos desde un archivo JSON
function loadWatchesFromJSON() {
    fetch('json/catalogo-es.json')  // Asegúrate de que el archivo esté en la misma carpeta que el HTML o actualiza la ruta
        .then(response => response.json())
        .then(data => {
            watches = data; // Asignar los datos cargados a la variable watches
            console.log(watches);  // Agregamos un log para verificar los datos
            loadWatches();  // Cargar los relojes al iniciar
        })
        .catch(error => console.error('Error al cargar los relojes:', error));
}

// Datos de los relojes (inicialmente vacío, se llenará desde JSON)
let watches = [];
// Estado de los filtros
let seleccionCategoria = [];
let seleccionMarca = [];
let seleccionPrecio = [];
let seleccionMaterial = [];
let seleccionGenero = [];   

// Función para cargar los relojes en la página
function loadWatches() {
    const watchList = document.getElementById('watchList');
    watchList.innerHTML = '';   

    watches.forEach(watch => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
             <a href="producto.html" onclick="saveProductRef('${watch.ref}')" class="watch-link">
            <div class="watch-item-header">
                <p class="marca">${watch.marca}</p>
            </div>
            <img src="${watch['img-1']}" alt="${watch.modelo}" class="watch-image">
            <div class="watch-item-footer">
                <h3 class="name">${watch.modelo}</h3>
                <p class="tamano">${watch.tamano} mm</p>
                <p class="material">${watch.material}</p>
                <p class="price">${watch.precio} €</p>
            </div>
        </a>
    `;
        watchList.appendChild(watchItem);
    });
}

// Función para manejar los cambios en los filtros
function updateFilters() {
    seleccionPrecio = getSelectedValues('precio');
    seleccionGenero = getSelectedValues('genero'); 
    seleccionTamano = getSelectedValues('tamano'); 
    seleccionMarca = getSelectedValues('marca');
    seleccionMaterial = getSelectedValues('material');
    seleccionTipo = getSelectedValues('tipo');    
    filterWatches();
}

// Función para obtener los valores seleccionados
function getSelectedValues(filterType) {
    return Array.from(document.querySelectorAll(`input[name="${filterType}"]:checked`))
                .map(input => input.value.toLowerCase());
}

/// Función para filtrar los relojes según los filtros seleccionados
function filterWatches() {
    console.log("Filtrando relojes...");  // Log de inicio de filtrado
    const filtrado = watches.filter(watch => {
        const categoryMatch = seleccionTipo.length === 0 || seleccionTipo.includes(watch.categoria.toLowerCase());
        const brandMatch = seleccionMarca.length === 0 || seleccionMarca.includes(watch.marca.toLowerCase());
        const priceMatch = seleccionPrecio.length === 0 || seleccionPrecio.some(range => {
            const [min, max] = range.split('-').map(Number);
            return watch.precio >= min && (max ? watch.precio <= max : true);
        });
        const materialMatch = seleccionMaterial.length === 0 || seleccionMaterial.includes(watch.material.toLowerCase());
        const genderMatch = seleccionGenero.length === 0 || seleccionGenero.includes(watch.genero.toLowerCase()); // Agregamos el filtro por género
        return categoryMatch && brandMatch && priceMatch && materialMatch && genderMatch;
    });

    console.log(filtrado);  // Agregamos un log para ver los relojes filtrados
    // Mostrar los relojes filtrados
    const watchList = document.getElementById('watchList');
    watchList.innerHTML = '';
    filtrado.forEach(watch => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
               <a href="producto.html" onclick="saveProductRef('${watch.ref}')" class="watch-link">
            <div class="watch-item-header">
                <p class="marca">${watch.marca}</p>
            </div>
            <img src="${watch['img-1']}" alt="${watch.modelo}" class="watch-image">
            <div class="watch-item-footer">
                <h3 class="name">${watch.modelo}</h3>
                <p class="tamano">${watch.tamano} mm</p>
                <p class="material">${watch.material}</p>
                <p class="price">${watch.precio} €</p>
            </div>
        </a>
    `;
        watchList.appendChild(watchItem);
    });
}

// Evento de actualización de filtros
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', updateFilters);
});

// Función para guardar la referencia del producto seleccionado Conexion con Producto html
function saveProductRef(ref) {
    localStorage.setItem('selectedWatchref', ref); // Guardar la referencia en localStorage
}

// Cargar los relojes al inicio
window.onload = loadWatchesFromJSON;
// Función para actualizar el valor del rango de precio
function updatePrecioValue(range) {
    document.getElementById('precioValue').textContent = ' €' + range.value;
}


// Función para actualizar el valor del rango de precio
function updatePrecioValue(range) {
    document.getElementById('precioValue').textContent = ' €' + range.value;
}