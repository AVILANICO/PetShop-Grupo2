// Referencias
const $cardsContainer = document.getElementById('cardsContainer')
let products;

// Peticion de data a la API
fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
    .then(response => response.json().then(data => {
        products = data
        let filteredPrts = filter(products)
        printCards(filteredPrts, $cardsContainer)
        console.log(products)
        
    }))
    .catch

// FUNCTIONS

function filter(array){
    return array.filter(i => i.categoria === 'jugueteria')
}

function printCards(productArray, container) {
    container.innerHTML = productArray.reduce((acu, act) =>  acu + createCards(act),'')
}

function createCards(obj) {
    return `        <div class="card margin mx-5 p-3" style="width: 22rem;">
    <img src="${obj.imagen}" class="card-img-top" alt="...">
    <h5 class="card-title text-center my-4">${obj.producto}</h5>
    <div class="card-body text-center d-flex justify-content-center gap-2" style="position: relative; bottom: 0;">
    <p style="background-color: rgb(199, 47, 47); height: 100%; padding: 10px; border-radius: 5px; color: #fff;">Productos en Stock<span class="ms-2">${obj.disponibles}</span></p>
    <a href="#" class="btn btn-primary">Mas información</a>
    </div>
  </div>`
}