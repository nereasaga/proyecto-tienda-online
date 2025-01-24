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
// Función para lista desplegable
function actualizarValorPrecio(rangeInput) {
    const precioValue = document.getElementById("precioValue");
    precioValue.textContent = ` ${rangeInput.value},00 €`;
}
// Evento de actualización de filtros
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', actualizarFiltros);
});
//******************************************************************************************************** */
// Función para mostrar el primer modal
function mostrarModal() {
    const modal = document.getElementById("modal-oferta");
    modal.style.display = "flex";
  }
  
  // Función para cerrar cualquier modal
  function cerrarModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = "none");
  }
  
  // Función para mostrar el modal de verificación
  function mostrarModalVerificado() {
    const modalVerificado = document.getElementById("verificado");
    modalVerificado.style.display = "flex";

    //setTimeout(cerrarModal, 3000); // Cierra el modal después de 3 segundos
  }
  
  // Evento para cerrar el modal de la oferta (cuando el usuario hace clic en "x" o "No, gracias")
  document.getElementById("btn-cierre").addEventListener('click', cerrarModal);
  document.getElementById("no-gracias").addEventListener('click', cerrarModal);

  // Evento para cerrar el modal de verificación (cuando el usuario hace clic en "x")
document.getElementById("btn-cierre-verificado").addEventListener('click', cerrarModal);
  
  // Evento para cerrar el modal de verificación (cuando el usuario hace clic en "x")
  document.getElementById("btn-cierre").addEventListener('click', cerrarModal);
  
  // Mostrar el modal después de 7 segundos
  setTimeout(mostrarModal, 7000);
  
  // Detectar intento de abandonar la página
  document.addEventListener("mouseleave", function(event) {
    if (event.clientY <= 0 || event.clientY >= window.innerHeight) {
      mostrarModal();
    }
  });
  
  // Evento para suscribirse (cuando el usuario hace clic en "Suscribirse")
  document.getElementById("suscribirse").addEventListener('click', function() {
    const email = document.getElementById("email-input").value;
    
    if (email) {
    
      cerrarModal();  // Cierra el modal de la oferta
      mostrarModalVerificado();  // Muestra el modal de verificación
      
    } else {
      alert("Por favor, ingresa un correo electrónico válido.");
    }
  });