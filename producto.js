// MOISÉS ********************************************************

const cantidadElemento = document.getElementById("cantidad");
const botonAumentar = document.getElementById("aumentar");
const botonDisminuir = document.getElementById("disminuir");

let cantidad = 1;
botonAumentar.addEventListener("click", () => {
  cantidad++;
  actualizarcantidad();
});

botonDisminuir.addEventListener("click", () => {
  if (cantidad > 1) {
    cantidad--;
    actualizarcantidad();
  }
});

function actualizarcantidad() {
  cantidadElemento.textContent = cantidad;
}

// *********************************

//for add to cart
// document.addEventListener("DOMContentLoaded", () => {
//   const addToCartButton = document.querySelector(".add-to-cart");
//   addToCartButton.addEventListener("click", () => {
//     alert("Lo sentimos, este producto está fuera de stock.");
//   });
// });

// for change the images
// document.addEventListener("DOMContentLoaded", () => {
//   const mainImage = document.getElementById("mainImage");
//   const additionalImages = document.querySelectorAll(".additional-images img");

//   additionalImages.forEach((image) => {
//     image.addEventListener("click", () => {
//       const tempSrc = mainImage.src;
//       mainImage.src = image.src;
//     });
//   });
// });

//for zooming the image

// document.addEventListener("DOMContentLoaded", () => {
//   const mainImage = document.getElementById("mainImage");
//   const modal = document.getElementById("imageModal");
//   const fullScreenImage = document.getElementById("fullScreenImage");
//   const closeModal = document.querySelector(".modal .close");

//   // Function to show modal and set the full screen image
//   function showModal(imageSrc) {
//     modal.style.display = "block";
//     fullScreenImage.src = imageSrc;
//   }

//   // When the main product image is clicked, show it in full-screen
//   mainImage.addEventListener("click", () => {
//     showModal(mainImage.src);
//   });

//   // Close the modal when the close button is clicked
//   closeModal.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // Close the modal when clicking outside the image (optional)
//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// });

// MOISÉS ***************************



// *************************************
// CARGA DINAMICA DE ELEMENTOS EN LA PÁGINA

document.addEventListener("DOMContentLoaded", () => {
  // guarda refdel producto desde localStorage
  const productRef = localStorage.getItem("selectedWatchref");

  // console.log(typeof productRef);

  // Si no hay ref mostrar un mensaje de error
  if (!productRef) {
    productoCargado.innerHTML =
      '<h2 class="errorCargaProducto">Error al cargar el producto111</h2>';
    return;
  }

  // Fetch de catálogo de productos desde el JSON
  fetch("json/catalogo-es.json")
    .then((response) => response.json())
    .then((data) => {
      relojes = data; // Asignar los datos cargados a la variable relojes
      
      cargarReloj(relojes, productRef); // Carga producto al iniciar
      // console.log(relojes);
    })

    .catch((error) => {
      console.error("Error:", error);
      productoCargado.innerHTML =
        '<h2 class="errorCargaProducto">Error al cargar el producto111</h2>';
    });
});
// Seleccionando el contenedor donde se van a cargar los productos
const productoCargado = document.getElementById("main-producto");
// elementos a reemplazar


function cargarReloj(relojes, productRef) {
  relojes.forEach((elemento) => {
    if (elemento.ref.trim().toLowerCase() === productRef.trim().toLowerCase()) {
      const refLoad = elemento.ref;
      const mainImageLoad = elemento["img-1"];
      const image1Load = elemento["img-1"];
      const image2Load = elemento["img-2"];
      const image3Load = elemento["img-3"];
      const marcaProductoLoad = elemento.marca;
      const modeloProductoLoad = elemento.modelo;
      const precioLoad = elemento.precio;
      const descripcionLoad = elemento.descripcion;

      const productoCargado = document.getElementById('productoCargado');
      if (productoCargado) {
        // Inserción del HTML dinámico
        productoCargado.innerHTML = `
          <div class="product-container">
            <div class="product-image">
              <img id="mainImage" src="${mainImageLoad}" alt="Imagen principal" />
              <div class="additional-images">
                <img id="imagen1" src="${image1Load}" alt="Imagen adicional 1" />
                <img id="imagen2" src="${image2Load}" alt="Imagen adicional 2" />
                <img id="imagen3" src="${image3Load}" alt="Imagen adicional 3" />
              </div>
            </div>
            <div class="product-details">
              <h1 id="titulo-producto">${marcaProductoLoad} ${modeloProductoLoad}</h1>
              <p id="ref" class="ref">Ref: ${refLoad}</p>
              <p id="precio" class="precio">${precioLoad}$</p>
              <p>Cantidad:</p>
              <div id="contador-cantidad">
                <button class="boton" id="disminuir">-</button>
                <div id="cantidad">1</div>
                <button class="boton" id="aumentar">+</button>
              </div>
              <br />
              <button class="add-to-cart">Añadir a la cesta</button>
              <h2>Descripción</h2>
              <p id="descripcion-producto" class="descripcion-producto">${descripcionLoad}</p>
            </div>
          </div>`;

        // *** Funcionalidad para cambiar imágenes ***
        const mainImage = document.getElementById('mainImage'); // Imagen principal
        const imagen1 = document.getElementById('imagen1');
        const imagen2 = document.getElementById('imagen2');
        const imagen3 = document.getElementById('imagen3');

        // Cambiar la imagen principal al hacer clic en las adicionales
        imagen1.addEventListener('click', () => {
          mainImage.src = image1Load;
        });

        imagen2.addEventListener('click', () => {
          mainImage.src = image2Load;
        });

        imagen3.addEventListener('click', () => {
          mainImage.src = image3Load;
        });
      } else {
        console.error('El elemento productoCargado no existe en el DOM.');
      }
    }
  });
}



let cesta = [];

// selecciono el contenedor del producto
const contenedorProducto = document.querySelector(".product-container");

const anadirCarrito = contenedorProducto.querySelector(".add-to-cart");
const refProducto = document.getElementById("ref").innerHTML;

// console.log(refProducto)

// console.log(refProducto.lastIndexOf('R'))

anadirCarrito.addEventListener("click", () => {
  // corto desde la ultima R hasta el final de la cadena
  const ref = refProducto.slice(
    refProducto.lastIndexOf("R"),
    refProducto.length
  );
  const cantidadAnadida = parseInt(
    document.getElementById("cantidad").innerText
  );

  anadido(ref, cantidadAnadida);
});

// crea y guarda el producto seleccionado y su cantidad a localStorage
const anadido = (ref, cantidadAnadida) => {
  let item = {
    ref: ref,
    cantidad: cantidadAnadida,
  };

  // Obtener el array de productos desde localStorage o inicializarlo como un array vacío
  let productoSeleccionado = JSON.parse(localStorage.getItem("producto")) || [];

  // Verifico si ya existe un producto con la misma ref
  let productoExistente = productoSeleccionado.find(
    (producto) => producto.ref === ref
  );

  if (productoExistente) {
    productoExistente.cantidad += cantidadAnadida;
  } else {
    productoSeleccionado.push(item);
  }

  // Guardar el array actualizado en localStorage
  localStorage.setItem("producto", JSON.stringify(productoSeleccionado));
};