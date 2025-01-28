// Cargar los relojes y la fecha al inicio
window.onload = function() {
    cargarRelojesDesdeJSON(idiomaSeleccionado);
    iniciarIH();
    cambiarIdioma(idiomaSeleccionado);
};

function cambiarIdioma(idioma) {
    let archivoIdioma = "json/" + idioma + ".json";
    let archivoCatalogo = "json/catalogo-" + idioma + ".json"; 

    // CAMBIAR IDIOMA DE TEXTOS
    fetch(archivoIdioma)
        .then(function (respuesta) {
            return respuesta.json();
        })

        .then(function(data) {
            for (let key in data) {
                let elemento = document.getElementById(key);
                if (elemento) {
                    if (key.startsWith('ph-')) {
                        elemento.setAttribute('placeholder', data[key]);
                    } else {
                        elemento.textContent = data[key];
                    }
                }
            }
    });
};

     // CAMBIAR A INGLÉS
     const btnEn = document.getElementById('english');
     btnEn.addEventListener("click", function() {
         cambiarIdioma("en");
         idiomaSeleccionado2 = "en-GB";
         localStorage.setItem('idiomaSeleccionado', 'en');
         localStorage.setItem('idiomaSeleccionado2', 'en-GB');
         cargarRelojesDesdeJSON("en");
         iniciarIH();
     });
 
     // CAMBIAR A ESPAÑOL
     const btnEs = document.getElementById('espanol');
     btnEs.addEventListener("click", function() {
         cambiarIdioma("es");
         idiomaSeleccionado2 = "es-ES";
         localStorage.setItem('idiomaSeleccionado', 'es');
         localStorage.setItem('idiomaSeleccionado2', 'es-ES');
         cargarRelojesDesdeJSON("es");
         iniciarIH();
     });
 
     // CAMBIAR A EUSKERA
     const btnEus = document.getElementById('euskara');
     btnEus.addEventListener("click", function() {
        cambiarIdioma("eus");
         cargarRelojesDesdeJSON("eus");
         idiomaSeleccionado2 = "eus";
         localStorage.setItem('idiomaSeleccionado', 'eus');
         localStorage.setItem('idiomaSeleccionado2', 'eus');
         cargarRelojesDesdeJSON("eus");
         iniciarIH();
     });

     //Coger idiomas de LS
let idiomaSeleccionado = localStorage.getItem('idiomaSeleccionado') || 'es'; 
let idiomaSeleccionado2 = localStorage.getItem('idiomaSeleccionado2') || 'es-ES';

 // CARGAR HORA Y FECHA 
 function iniciarIH() {let intervaloHora;
 if (intervaloHora) {
   clearInterval(intervaloHora);
 }
 intervaloHora = setInterval(function() {
   F5time(idiomaSeleccionado2);
 }, 1000);
}
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
//********************************************************************************************************************************************************************* 
//********************************************************************************************************************************************************************* */
// Datos de los relojes (inicialmente vacío, se llenará desde JSON)
let relojes = [];
// Estado de los filtros
let seleccionTamano = [];
let seleccionMarca = [];
let seleccionPrecio = [];
let seleccionMaterial = [];
let seleccionGenero = [];
let seleccionTipo = [];

// Función para cargar los relojes desde un archivo JSON
// function cargarRelojesDesdeJSON(idioma) {
//     let archivoCatalogo = "json/catalogo-" + idioma + ".json";
//     fetch(archivoCatalogo)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al cargar el archivo: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             relojes = data;
//             cargarRelojes();
//         })
//         .catch(error => console.error('Error al cargar los relojes:', error));
// }
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
// Evento de actualización de filtros (se agrega una sola vez)
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', actualizarFiltros);
});
// Función para manejar los cambios en los filtros
function actualizarFiltros() { 
    seleccionTamano = obtenerValoresSeleccionados('tamano');
    seleccionMarca = obtenerValoresSeleccionados('marca');
    seleccionPrecio = document.getElementById('precioRange').value; 
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
// Función para actualizar el valor del precio en el rango
function actualizarValorPrecio(rangeInput) {
    const precioValue = document.getElementById("precioValue");
    precioValue.textContent = ` ${rangeInput.value},00 €`;
}
// Función para guardar la referencia del producto seleccionado
// Función para guardar la referencia del producto seleccionado
function guardarReferenciaProducto(ref) {
    localStorage.setItem('selectedWatchref', ref);
}
// Función para mostrar un modal (generalizada para todos los modales)
function toggleModal(modalId, mostrar) {
    const modal = document.getElementById(modalId);
    modal.style.display = mostrar ? 'flex' : 'none';
}
// Función para mostrar el primer modal
function mostrarModal() {
    toggleModal('modal-oferta', true);
}
// Función para cerrar todos los modales
function cerrarModal() {
    toggleModal('modal-oferta', false);
    toggleModal('verificado', false);
}
// Función para mostrar el modal de verificación
function mostrarModalVerificado() {
    toggleModal('verificado', true);
    setTimeout(cerrarModal, 3000); // Cierra el modal después de 3 segundos
}
// Evento para cerrar el modal de la oferta
document.getElementById("btn-cierre").addEventListener('click', cerrarModal);
document.getElementById("no-gracias").addEventListener('click', cerrarModal);
// Evento para cerrar el modal de verificación
document.getElementById("btn-cierre-verificado").addEventListener('click', cerrarModal);
// Mostrar el modal después de 7 segundos
setTimeout(mostrarModal, 7000);
// Evento para suscribirse
document.getElementById("suscribirse").addEventListener('click', function() {
    const email = document.getElementById("ph-email-input").value;    
    if (email) {    
        cerrarModal();  // Cierra el modal de la oferta
        mostrarModalVerificado();  // Muestra el modal de verificación      
    } else {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
});