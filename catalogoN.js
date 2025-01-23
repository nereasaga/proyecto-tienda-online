//Coger idiomas de LS
let idiomaSeleccionado = localStorage.getItem('idiomaSeleccionado') || 'es'; 
let idiomaSeleccionado2 = localStorage.getItem('idiomaSeleccionado2') || 'es-ES';

 // CARGAR HORA Y FECHA 
 setInterval(function() {
         F5time(idiomaSeleccionado2);
     }, 1000);

function cambiarIdioma(idioma) {
    let archivoIdioma = "json/" + idioma + ".json";
    let archivoCatalogo = "json/catalogo-" + idioma + ".json"; 

    // CAMBIAR IDIOMA DE TEXTOS
    fetch(archivoIdioma)
        .then(function (respuesta) {
            return respuesta.json();
        })

        .then(function (data) {
    for (let key in data) {
        let elemento = document.getElementById(key);
        if (elemento) {
                elemento.textContent = data[key];
            }
        }
    });
};

     // CAMBIAR A INGLÉS
     const btnEn = document.getElementById('english');
     btnEn.addEventListener("click", function() {
         cambiarIdioma("en");
         let idiomaSeleccionado2 = "en-GB";
         localStorage.setItem('idiomaSeleccionado', 'en');
         localStorage.setItem('idiomaSeleccionado2', 'en-GB');
         cargarRelojesDesdeJSON("en");
         let intervaloHora = setInterval(function() {
             F5time("en-GB");
         }, 1000);
         clearInterval(intervaloHora)

     });
 
     // CAMBIAR A ESPAÑOL
     const btnEs = document.getElementById('espanol');
     btnEs.addEventListener("click", function() {
         cambiarIdioma("es");
         let idiomaSeleccionado2 = "es-ES";
         localStorage.setItem('idiomaSeleccionado', 'es');
         localStorage.setItem('idiomaSeleccionado2', 'es-ES');
         idiomaActual = "es-ES";  
         cargarRelojesDesdeJSON("es");
         let intervaloHora = setInterval(function() {
             F5time("es-ES");
         }, 1000);
         clearInterval(intervaloHora);
     });
 
     // CAMBIAR A EUSKERA
     const btnEus = document.getElementById('euskara');
     btnEus.addEventListener("click", function() {
        cambiarIdioma("eus");
         cargarRelojesDesdeJSON("eus");
         let idiomaSeleccionado2 = "eus";
         localStorage.setItem('idiomaSeleccionado', 'eus');
         localStorage.setItem('idiomaSeleccionado2', 'eus');
         idiomaActual = "EUS";  
         cargarRelojesDesdeJSON("eus");
         let intervaloHora = setInterval(function() {
             F5time("eus");
         }, 1000);
         clearInterval(intervaloHora);

     });

     // FUNCIÓN PARA HORA Y FECHA
     function F5time(idioma = 'es-ES') {
        const fechaElemento = document.getElementById("fecha");
        const horaElemento = document.getElementById("hora");
        const ahora = new Date();
        const opcionesFecha = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const fechaFormateada = ahora.toLocaleDateString(idioma, opcionesFecha);
        const horaFormateada = ahora.toLocaleTimeString(idioma, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        fechaElemento.textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
        horaElemento.textContent = horaFormateada;
    }


// Función para cargar los datos desde un archivo JSON
function cargarRelojesDesdeJSON(idioma) {
    let archivoCatalogo = "json/catalogo-" + idioma + ".json";
    fetch(archivoCatalogo) // Asegúrate de que el archivo JSON esté en la misma carpeta
        .then(response => response.json())
        .then(data => {
            relojes = data; // Asignar los datos cargados a la variable relojes
            cargarRelojes(); // Cargar los relojes al iniciar
        })
        .catch(error => console.error('Error al cargar los relojes:', error));
}
// Cargar los relojes al inicio
window.onload = cargarRelojesDesdeJSON(idiomaSeleccionado);
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