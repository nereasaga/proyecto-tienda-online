let cantidad = 1;

const cantidadElemento = document.getElementById("cantidad");
const botonAumentar = document.getElementById("aumentar");
const botonDisminuir = document.getElementById("disminuir");

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
  // console.log(ref);
  const cantidadAnadida = document.getElementById("cantidad").innerText;

  // console.log(cantidadAnadida);
  anadido(ref, cantidadAnadida);
});

const anadido = (ref, cantidadAnadida) => {
  let item = {
    ref: ref,
    cantidad: cantidadAnadida,
  }
  console.log(item);
  // anadirCesta(item);
}


function volverAlCatalogo (){
    window.Location.href = 'catalogo.html';
}