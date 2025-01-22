


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
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const additionalImages = document.querySelectorAll(".additional-images img");

  additionalImages.forEach((image) => {
    image.addEventListener("click", () => {
      const tempSrc = mainImage.src;
      mainImage.src = image.src;
    });
  });
});

//for zooming the image

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const modal = document.getElementById("imageModal");
  const fullScreenImage = document.getElementById("fullScreenImage");
  const closeModal = document.querySelector(".modal .close");

  // Function to show modal and set the full screen image
  function showModal(imageSrc) {
    modal.style.display = "block";
    fullScreenImage.src = imageSrc;
  }

  // When the main product image is clicked, show it in full-screen
  mainImage.addEventListener("click", () => {
    showModal(mainImage.src);
  });

  // Close the modal when the close button is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the image (optional)
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// MOISÉS ***************************

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
  const cantidadAnadida = parseInt(document.getElementById("cantidad").innerText);

  anadido(ref, cantidadAnadida);
});


// crea y guarda el producto seleccionado y su cantidad a localStorage
const anadido = (ref, cantidadAnadida) => {
  let item = {
    ref: ref,
    cantidad: cantidadAnadida,
  };

  // Obtener el array de productos desde localStorage o inicializarlo como un array vacío
  let productoSeleccionado = JSON.parse(localStorage.getItem('producto')) || [];

  // Verifico si ya existe un producto con la misma ref
  let productoExistente = productoSeleccionado.find((producto) => producto.ref === ref);

  if (productoExistente) {
    productoExistente.cantidad += cantidadAnadida;
  } else {
    productoSeleccionado.push(item);
  }

  // Guardar el array actualizado en localStorage
  localStorage.setItem('producto', JSON.stringify(productoSeleccionado));
};



// *************************************
// // CARGA DINAMICA DE ELEMENTOS EN LA PÁGINA

// document.addEventListener('DOMContentLoaded', () => {
//   // Elementos del DOM donde se mostrarán los datos del producto
//   const productImage = document.querySelector('.main-image img');
//   const galleryContainer = document.querySelector('.additional-images');
//   const productName = document.querySelector('.product-title');
//   const productDescription = document.querySelector('.product-description');
//   const productPrice = document.querySelector('.product-price');

//   // Obtener referencia del producto desde localStorage
//   const productRef = localStorage.getItem('selectedWatchref');

//   // Si no hay referencia, mostrar un mensaje de error
//   if (!productRef) {
//       document.body.innerHTML = '<h1 style="text-align:center; margin-top:50px;">Hubo un error al cargar el producto</h1>';
//       return;
//   }

//   // Cargar el catálogo de productos desde el JSON
//   fetch('./json/catalogo-es.json')
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Error al cargar el catálogo de productos');
//           }
//           return response.json();
//       })
//       .then(products => {
//           // Buscar el producto con la referencia seleccionada
//           const product = products.find(item => item.ref === productRef);

//           // Si no se encuentra el producto, mostrar mensaje de error
//           if (!product) {
//               document.body.innerHTML = '<h1 style="text-align:center; margin-top:50px;">Hubo un error al cargar el producto</h1>';
//               return;
//           }

//           // Cargar los datos del producto en la página
//           productImage.src = product.imagenPrincipal;
//           productImage.alt = product.nombre;

//           galleryContainer.innerHTML = '';
//           product.imagenesAdicionales.forEach(imageUrl => {
//               const imgElement = document.createElement('img');
//               imgElement.src = imageUrl;
//               imgElement.alt = product.nombre;
//               imgElement.classList.add('gallery-image');
//               galleryContainer.appendChild(imgElement);
//           });

//           productName.textContent = product.nombre;
//           productDescription.textContent = product.descripcion;
//           productPrice.textContent = `${product.precio} €`;
//       })
//       .catch(error => {
//           console.error('Error:', error);
//           document.body.innerHTML = '<h1 style="text-align:center; margin-top:50px;">Error al cargar el producto</h1>';
//       });
// });



