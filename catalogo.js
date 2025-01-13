// Datos de los relojes
const watches = [
    { id: 1, name: 'Modelo 1', image: 'nuestra_liga.jpg', material: 'Acero', price: 119.00, categoria: 'mujer', marca: 'Rolex', descripcion: 'Reloj de acero inoxidable con correa de cuero' },
    { id: 2, name: 'Modelo 2', image: 'nuestra_liga.jpg', material: 'Cuero', price: 500.00, categoria: 'hombre', marca: 'Casio', descripcion: 'Reloj de cuero con diseño elegante' },
    { id: 3, name: 'Modelo 3', image: 'nuestra_liga.jpg', material: 'Sintético', price: 89.00, categoria: 'mujer', marca: 'Seiko', descripcion: 'Reloj sintético con estilo moderno' },
    { id: 4, name: 'Modelo 4', image: 'nuestra_liga.jpg', material: 'Acero', price: 119.00, categoria: 'hombre', marca: 'Rolex', descripcion: 'Reloj de acero inoxidable con diseño clásico' },
    { id: 5, name: 'Modelo 5', image: 'nuestra_liga.jpg', material: 'Oro', price: 1500.00, categoria: 'mujer', marca: 'Omega', descripcion: 'Reloj de oro con diseño lujoso' },
    { id: 6, name: 'Modelo 6', image: 'nuestra_liga.jpg', material: 'Titanio', price: 2000.00, categoria: 'hombre', marca: 'Tag Heuer', descripcion: 'Reloj de titanio con diseño deportivo' }
    
];
// Estado de los filtros
let seleccionCategoria = [];
let selectedPriceRanges = [];
let selectedMaterials = [];
// Función para cargar los relojes inicialmente
function loadWatches() {
    const watchList = document.getElementById('watchList');
    watchList.innerHTML = '';

    watches.forEach(watch => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
            <div class="watch-item-header">
             <p class="marca">${watch.marca}</p>
            </div>
             <img src="${watch.image}" alt="${watch.name}" class="watch-image">
            <div class="watch-item-footer">
             <h3 class="name">${watch.name}</h3>
             <p class="description"> ${watch.descripcion}</p>
             <p class="price">${watch.price} €</p>
            </div>
        `;
        watchList.appendChild(watchItem);
    });
}
// Función para manejar los cambios en los filtros
function updateFilters() {
    seleccionCategoria = getSelectedValues('categoria');
    seleccionMarca = getSelectedValues('marca');
    seleccionPrecio= getSelectedValues('precio');
    seleccionMaterial = getSelectedValues('material');    
    filterWatches();
}
// Función para obtener los valores seleccionados
function getSelectedValues(filterType) {
    return Array.from(document.querySelectorAll(`input[name="${filterType}"]:checked`))
                .map(input => input.value.toLowerCase());
}
// Función para filtrar los relojes según los filtros seleccionados
function filterWatches() {
    const filteredWatches = watches.filter(watch => {
        // Filtrar por categoría
        const categoryMatch = seleccionCategoria.length === 0 || seleccionCategoria.includes(watch.categoria.toLowerCase());
        // Filtrar por marca
        const brandMatch = seleccionMarca.length === 0 || seleccionMarca.includes(watch.marca.toLowerCase());
        // Filtrar por precio
        const priceMatch = seleccionPrecio.length === 0 || seleccionPrecio.some(range => {
            const [min, max] = range.split('-').map(Number);
            return watch.price >= min && watch.price <= max;
        });
        // Filtrar por material
        const materialMatch = seleccionMaterial.length === 0 || seleccionMaterial.includes(watch.material.toLowerCase());
        return categoryMatch && brandMatch && priceMatch && materialMatch;
    });
    // Mostrar los relojes filtrados
    const watchList = document.getElementById('watchList');
    watchList.innerHTML = '';
    filteredWatches.forEach(watch => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
             <div class="watch-item-header">
                <p class="marca">${watch.marca}</p>
            </div>
             <img src="${watch.image}" alt="${watch.name}" class="watch-image">
            <div class="watch-item-footer">
             <h3 class="name">${watch.name}</h3>
             <p class="description">Material: ${watch.material}</p>
             <p class="price">${watch.price} €</p>
            </div>
        `;
        watchList.appendChild(watchItem);
    });
}
// Evento de actualización de filtros (lo llamamos cada vez que un checkbox cambie)
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', updateFilters);
});
// Cargar los relojes al inicio
window.onload = loadWatches;