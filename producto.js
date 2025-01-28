let idiomaSeleccionado2 = localStorage.getItem('idiomaSeleccionado2') || 'es-ES';

// carga de página
document.addEventListener("DOMContentLoaded", () => {
  let idiomaActual = localStorage.getItem('idiomaSeleccionado') || 'es';
  let idiomaSeleccionado2 = localStorage.getItem('idiomaSeleccionado2') || 'es-ES';


  // obener ref del producto seleccionado desde localstorage
  const productRef = localStorage.getItem("selectedWatchref");

  // muestra error si no se encuentra el ref
  if (!productRef) {
    document.getElementById("main-producto").innerHTML =
      '<h2 class="errorCargaProducto">Error al cargar el producto</h2>';
    return;
  }

  cargaProducto(idiomaActual);
  cambiarIdioma(idiomaActual);
  iniciarIH();
  console.log(idiomaSeleccionado2);

});


// carga de catalogo según idioma
function cargaProducto(idiomaActual) {
  // sacar el ref del producto seleccionado desde localstorage
  const productRef = localStorage.getItem("selectedWatchref");

  // muestra error si no se encuentra el ref
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
    cambiarIdioma('es');
  } else if (evento.target.textContent === 'EN') {
    // console.log('Seleccionado ingles');
    cargaProducto('en');
    cambiarIdioma('en');
  } else {
    // console.log('Selecci onado euskera');
    cargaProducto('eus');
    cambiarIdioma('eus');
  }
})


function cambiarIdioma(idioma) {
  let archivoIdioma = "json/" + idioma + ".json";
  

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

// Cargar el producto 
function cargarProducto(relojes, productRef) {
  const producto = relojes.find((item) => item.ref === productRef);

  if (!producto) {
    document.getElementById("main-producto").innerHTML =
      '<h2 class="errorCargaProducto">Producto no encontrado</h2>';
    return;
  }

  //rellenar html dinámicamente
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
        <p id="texto-cantidad">Cantidad:</p>
        <div id="contador-cantidad">
          <button class="boton" id="disminuir">-</button>
          <div id="cantidad">1</div>
          <button class="boton" id="aumentar">+</button>
        </div>
        <br />
        <button id="anadircesta" class="add-to-cart">Añadir a la cesta</button>
        <h2 id="titulo-descripcion">Descripción</h2>
        <p id="descripcion-producto" class="descripcion-producto">${producto.descripcion}</p>
      </div>
    </div>`;

  // Iniciar funciones luego de cargar 
  funcionesDePagina(producto.ref);
}

//  Funcionalidades de cantidad y carrito
function funcionesDePagina(productRef) {
  let cantidad = 1;

  document.getElementById("aumentar").addEventListener("click", () => {
    cantidad++;
    document.getElementById("cantidad").textContent = cantidad;
  });


  document.getElementById("disminuir").addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      document.getElementById("cantidad").textContent = cantidad;
    }
  });

  // clase ProductoCarrito para añadir al pedido
  class ProductoCarrito {
    constructor(ref, cantidad) {
      this.ref = ref;
      this.cantidad = cantidad;
    }
  }


  // Añadir al carrito con modal
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    // Creo objeto   con el producto y la cantidad
    const cantidadActual = parseInt(document.getElementById("cantidad").textContent, 10);
    const productoNuevo = new ProductoCarrito(productRef, cantidadActual);

    // Obtener los productos existentes en el carrito desde localStorage
    let productosEnCesta = JSON.parse(localStorage.getItem("producto")) || [];


    // Verifico si el producto ya existe la csta
    const productoExistente = productosEnCesta.find((p) => p.ref === productoNuevo.ref);

    if (productoExistente) {
      productoExistente.cantidad += productoNuevo.cantidad;
    } else {
      productosEnCesta.push(productoNuevo);
    }

    //guardar pedido a llocalstorage
    localStorage.setItem("producto", JSON.stringify(productosEnCesta));

    let cantRelojes = 0;
    // console.log(productosEnCesta);
    productosEnCesta.forEach((cantidades) => {
      // console.log(cantidades.cantidad);
      cantRelojes += cantidades.cantidad;
    });
    // console.log(cantRelojes);
    // localStorage.setItem('cantidadEnCesta', cantRelojes);
    // const numeroCesta = document.getElementById('numero-cesta');
    // numeroCesta.innerText = localStorage.getItem("cantidadEnCesta");


    // Mostrar el modal
    mostrarModal();
  });

  // Mostrar el modal
  function mostrarModal() {
    const modal = document.getElementById("modal-carrito");
    modal.style.display = "flex";
    
    // cierra modal
    document.getElementById("btn-cierre").addEventListener('click', () => {
      modal.style.display = "none";; // Redirige a catalogo.html
    });

    // seguir
    document.getElementById("seguir-comprando").addEventListener("click", () => {
      window.location.href = "catalogo.html"; // Redirige a catalogo.html
    });

    // ir a a cesta
    document.getElementById("ir-cesta").addEventListener("click", () => {
      window.location.href = "carrito.html"; // Redirige a carrito.html
    });
  }



  // Cambiar imagen principal al hacer clic en thumbs
  const mainImage = document.getElementById("mainImage");
  const additionalImages = document.querySelectorAll(".additional-images img");

  additionalImages.forEach((image) => {
    image.addEventListener("click", () => {
      mainImage.src = image.src;
    });
  });
}

// CARGAR HORA Y FECHA 
function iniciarIH() {let intervaloHora;
  if (intervaloHora) {
    clearInterval(intervaloHora);
  }
  intervaloHora = setInterval(function() {
    F5time(idiomaSeleccionado2);
  }, 1000);
 }
 
     // FUNCIÍN PARA HORA Y FECHA
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
 



// CAMBIAR A INGLÉS
const btnEn = document.getElementById('english');
btnEn.addEventListener("click", function () {
  // cambiarIdioma("en");
  localStorage.setItem('idiomaSeleccionado', 'en');
  localStorage.setItem('idiomaSeleccionado2', 'en-GB');
  idiomaSeleccionado2 = "en-GB";
  iniciarIH();
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
  idiomaSeleccionado2 = "es-ES";
  iniciarIH();
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
  idiomaSeleccionado2 = "eus";
  iniciarIH();
  // idiomaActual = "eus";  
  // let intervaloHora = setInterval(function() {
  //     F5time("eus");
  // }, 1000);
  // clearInterval(intervaloHora);
  // intervaloHora();
});

