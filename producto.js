 //for add to cart
 document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        alert('Lo sentimos, este producto está fuera de stock.');
    });
});




// for change the images
       document.addEventListener('DOMContentLoaded', () => {
       const mainImage = document.getElementById('mainImage');
       const additionalImages = document.querySelectorAll('.additional-images img');

       additionalImages.forEach(image => {
       image.addEventListener('click', () => {
       const tempSrc = mainImage.src;
       mainImage.src = image.src;
                
            });
        });
    });


//for zooming the image 

    document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const modal = document.getElementById('imageModal');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const closeModal = document.querySelector('.modal .close');

    // Function to show modal and set the full screen image
    function showModal(imageSrc) {
    modal.style.display = "block";
    fullScreenImage.src = imageSrc;
    }

    // When the main product image is clicked, show it in full-screen
    mainImage.addEventListener('click', () => {
    showModal(mainImage.src);
    });

    

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    });

    // Close the modal when clicking outside the image (optional)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
//for counter button
    let counter = 0;

    const counterDisplay = document.getElementById('counterValue');

    document.getElementById('incrementBtn').addEventListener('click', () => {
    counter++;
    counterDisplay.textContent = counter;
});

    document.getElementById('decrementBtn').addEventListener('click', () => {
    counter--;
    counterDisplay.textContent = counter;
});
     
const buscaref = localStorage.getItem('selectedWatchref');
const selectedWatch = data.find(watch =>watch.ref ===buscaref);

function volverAlCatalogo (){
    window.Location.href = 'catalogo.html?id=${productId}`';
}


