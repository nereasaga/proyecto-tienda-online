// Evento principal cuando el DOM se carga
document.addEventListener("DOMContentLoaded", () => {
  let idiomaActual = localStorage.getItem('idiomaSeleccionado') || 'es';


  // Obtener el 'ref' del producto seleccionado desde localStorage
  const productRef = localStorage.getItem("selectedWatchref");

  // Mostrar error si no se encuentra el ref
  if (!productRef) {
    document.getElementById("main-producto").innerHTML =
      '<h2 class="errorCargaProducto">Error al cargar el producto</h2>';
    return;
  }

  cargaProducto(idiomaActual);

});


// Carga de catalogo según idioma
function cargaProducto(idiomaActual) {
  // Obtener el 'ref' del producto seleccionado desde localStorage
  const productRef = localStorage.getItem("selectedWatchref");

  // Mostrar error si no se encuentra el ref
  if (!productRef) {
    document.getElementById("main-producto").innerHTML =
      '<h2 class="errorCargaProducto">Error al cargar el producto</h2>';
    return;
  }

  let catalogoIdioma = 'json/catalogo-' + idiomaActual + '.json';
  // console.log(catalogoIdioma);
  // Fetch del catálogo JSON
  fetch(catalogoIdioma)
    .then((response) => response.json())
    .then((data) => {
      cargarProducto(data, productRef); // Cargar el producto con el ref
    })
    .catch((error) => {
      console.error("Error al cargar el catálogo:", error);
      document.getElementById("main-producto").innerHTML =
        '<h2 class="errorCargaProducto">Error al cargar el producto</h2>';
    });
}

// cambiar idioma al seleccionar en el nav
const seleccionarIdioma = document.getElementById("idiomanav");
seleccionarIdioma.addEventListener('click', (evento) => {
  if (evento.target.textContent === 'ES') {
    // console.log('Seleccionado español');
    cargaProducto('es');
  } else if (evento.target.textContent === 'EN') {
    // console.log('Seleccionado ingles');
    cargaProducto('en');
  } else {
    // console.log('Selecci onado euskera');
    cargaProducto('eus');
  }
})

// Cargar el producto en la página
function cargarProducto(relojes, productRef) {
  const producto = relojes.find((item) => item.ref === productRef);

  if (!producto) {
    document.getElementById("main-producto").innerHTML =
      '<h2 class="errorCargaProducto">Producto no encontrado</h2>';
    return;
  }

  // Construir el HTML dinámicamente
  document.title = `${producto.marca} ${producto.modelo}`;



  document.getElementById("main-producto").innerHTML = `
    <div class="product-container">
      <div class="product-image">
        <img id="mainImage" src="${producto["img-1"]}" alt="${producto.marca} ${producto.modelo}" />
        <div class="additional-images">
          <img id="imagen1" src="${producto["img-1"]}" alt="${producto.marca} ${producto.modelo}" />
          <img id="imagen2" src="${producto["img-2"] || ""}" alt="${producto.marca} ${producto.modelo}" />
          <img id="imagen3" src="${producto["img-3"] || ""}" alt="${producto.marca} ${producto.modelo}" />
        </div>
      </div>
      <div class="product-details">
        <h1 id="titulo-producto" class="titulo-producto">${producto.marca} ${producto.modelo}</h1>
        <p id="ref" class="ref">Ref: ${producto.ref}</p>
        <p id="precio" class="precio">${producto.precio} €</p>
        <p>Cantidad:</p>
        <div id="contador-cantidad">
          <button class="boton" id="disminuir">-</button>
          <div id="cantidad">1</div>
          <button class="boton" id="aumentar">+</button>
        </div>
        <br />
        <button class="add-to-cart">Añadir a la cesta</button>
        <h2 id="titulo-descripcion">Descripción</h2>
        <p id="descripcion-producto" class="descripcion-producto">${producto.descripcion}</p>
      </div>
    </div>`;

  // Inicializar funcionalidades después de cargar el producto
  funcionesDePagina(producto.ref);
}

// Función para inicializar las funcionalidades de cantidad y carrito
function funcionesDePagina(productRef) {
  let cantidad = 1;

  // Incrementar cantidad
  document.getElementById("aumentar").addEventListener("click", () => {
    cantidad++;
    document.getElementById("cantidad").textContent = cantidad;
  });

  // Decrementar cantidad
  document.getElementById("disminuir").addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      document.getElementById("cantidad").textContent = cantidad;
    }
  });

  // Definición de la clase ProductoCarrito
  class ProductoCarrito {
    constructor(ref, cantidad) {
      this.ref = ref;
      this.cantidad = cantidad;
    }
  }


  // Añadir al carrito con modal
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    // Crear un objeto con el producto y la cantidad
    const cantidadActual = parseInt(document.getElementById("cantidad").textContent, 10);
    const productoNuevo = new ProductoCarrito(productRef, cantidadActual);

    // Obtener los productos existentes en el carrito desde localStorage
    let productosEnCesta = JSON.parse(localStorage.getItem("producto")) || [];


    // Verificar si el producto ya existe en el carrito
    const productoExistente = productosEnCesta.find((p) => p.ref === productoNuevo.ref);

    if (productoExistente) {
      productoExistente.cantidad += productoNuevo.cantidad;
    } else {
      productosEnCesta.push(productoNuevo);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("producto", JSON.stringify(productosEnCesta));

    let cantRelojes = 0;
    // console.log(productosEnCesta);
    productosEnCesta.forEach((cantidades) => {
      // console.log(cantidades.cantidad);
      cantRelojes += cantidades.cantidad;
    });
    // console.log(cantRelojes);
    localStorage.setItem('cantidadEnCesta', cantRelojes);
    const numeroCesta = document.getElementById('numero-cesta');
    numeroCesta.innerText = localStorage.getItem("cantidadEnCesta");


    // Mostrar el modal
    mostrarModal();
  });

  // Mostrar el modal
  function mostrarModal() {
    const modal = document.getElementById("modal-carrito");
    modal.style.display = "flex";
    // cerrar modal

    document.getElementById("btn-cierre").addEventListener('click', () => {
      modal.style.display = "none";; // Redirige a catalogo.html
    });

    // Seguir comprando
    document.getElementById("seguir-comprando").addEventListener("click", () => {
      window.location.href = "catalogo.html"; // Redirige a catalogo.html
    });

    // Ir a la cesta
    document.getElementById("ir-cesta").addEventListener("click", () => {
      window.location.href = "carrito.html"; // Redirige a carrito.html
    });
  }



  // Cambiar imagen principal al hacer clic en miniaturas
  const mainImage = document.getElementById("mainImage");
  const additionalImages = document.querySelectorAll(".additional-images img");

  additionalImages.forEach((image) => {
    image.addEventListener("click", () => {
      mainImage.src = image.src;
    });
  });
}



// CAMBIAR A INGLÉS
const btnEn = document.getElementById('english');
btnEn.addEventListener("click", function () {
  // cambiarIdioma("en");
  localStorage.setItem('idiomaSeleccionado', 'en');
  localStorage.setItem('idiomaSeleccionado2', 'en-GB');
  // idiomaActual = "en";
  // let intervaloHora = setInterval(function() {
  //     F5time("en-GB");
  // }, 1000);
  // clearInterval(intervaloHora);
  // intervaloHora();
});

// CAMBIAR A ESPAÑOL
const btnEs = document.getElementById('espanol');
btnEs.addEventListener("click", function () {
  // cambiarIdioma("es");
  localStorage.setItem('idiomaSeleccionado', 'es');
  localStorage.setItem('idiomaSeleccionado2', 'es-ES');
  // idiomaActual = "es";  
  // let intervaloHora = setInterval(function() {
  //     F5time("es-ES");
  // }, 1000);
  // clearInterval(intervaloHora);
  // intervaloHora();
});

// CAMBIAR A EUSKERA
const btnEus = document.getElementById('euskara');
btnEus.addEventListener("click", function () {
  // cambiarIdioma("eus");
  localStorage.setItem('idiomaSeleccionado', 'eus');
  localStorage.setItem('idiomaSeleccionado2', 'eus');
  // idiomaActual = "eus";  
  // let intervaloHora = setInterval(function() {
  //     F5time("eus");
  // }, 1000);
  // clearInterval(intervaloHora);
  // intervaloHora();
});

