// Referencias
const $cardsContainer = document.getElementById('cardsContainer')


// Peticion de data a la API
fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
    .then(response => response.json().then(data => {
        // Asiganacions
        let products = data
        let filteredPrts = filter(products)
        const modal = document.getElementById('modalbg')
        printCards(filteredPrts, $cardsContainer)
        
        let openModal = document.querySelectorAll('.openModal')
        let arrayHearts = document.querySelectorAll('.heart')
        let searchBar = document.getElementById("search")

        // Ejecuciones
        modalEvent(openModal, modal, products, modal)
        changeHearts(arrayHearts)


        console.log(products)

        searchBar.addEventListener("keyup", ()=>{

            let filteredText= filterByText(filteredPrts,searchBar.value)

            if (searchBar.value == "") {
                printCards(filteredPrts, $cardsContainer)
                let openModal = document.querySelectorAll('.openModal')
                let arrayHearts = document.querySelectorAll('.heart')
                modalEvent(openModal, modal, products, modal)
                changeHearts(arrayHearts)
            }else{
                printCards(filteredText, $cardsContainer)
                let openModal = document.querySelectorAll('.openModal')
                let arrayHearts = document.querySelectorAll('.heart')
                modalEvent(openModal, modal, products, modal)
                changeHearts(arrayHearts)
            }
            
        })
        

    }))
    .catch

// FUNCTIONS



function filterByText(eventArray, text) {
    return eventArray.filter( event => event.producto.toLowerCase().includes(text.toLowerCase()) || event.descripcion.toLowerCase().includes(text.toLowerCase()) )
}

function filter(array){
    return array.filter(i => i.categoria === 'farmacia')
}

function printCards(productArray, container) {
    container.innerHTML = productArray.reduce((acu, act) =>  acu + createCards(act),'')
}

function createCards(obj) {
    return `    <div class="cards d-flex align-items-center"  style="background-image: url(${obj.imagen});">
                    <p class="titleProduct">${obj.producto}</p>
                    <div class="none">
                    <div class="menu">
                        <i class='bx bx-cart-add cart'></i>
                        <i class='bx bx-info-circle openModal' id="${obj.producto}"></i>
                        <i class='bx bxs-heart back heart'></i>
                    </div>
                    </div>
                </div>`
}

function modalTemplate(obj) {
    return `<div class="modal_contaniner">
    <div class="imagen">
      <i class='bx bx-x d-block text-end xToClose fs-1'></i>
      <img class="w-100 imgProd" src="${obj.imagen}" alt="">
    </div>
    <div class="detail">
      <h2 class="titleModal">${obj.producto}</h2>
      <h4 class="text-primary my-4">$${obj.precio}</h4>
      <h5 class="descriptionTitle mb-4">Descripción</h5>
      <p class="description">
      ${obj.descripcion}
      </p>
      <div class="compraSection gap-4 my-5">
        <div class="cantidades d-flex" >
          <input class="operador buytStl border-end-0" type="button" value="-">
          <input class="cantidad buytStl text-center" type="number" value="1">
          <input class="operador buytStl border-start-0" type="button" value="+">
        </div>
          <button type="button" class="btn btn-secondary buyBtn w-50">Añadir al carrito</button>
      </div>
      <p>En stock: <span>${obj.disponibles}</span></p>
    </div>
  </div>`
}

function modalEvent(arrayEle, element, arrayData, container){
    arrayEle.forEach(ele => {
        ele.addEventListener('click',()=>{
            element.classList.toggle('mostrarModal')
            let aux = arrayData.find(prod => prod.producto === ele.id)
            let toPrint = modalTemplate(aux)
            container.innerHTML = toPrint
            let xToCloseModal = document.querySelector('.xToClose')
            xToCloseModal.addEventListener('click', ()=>{
                container.classList.toggle('mostrarModal')
            })
        })
    });
}

function changeHearts(NodeList) {
    NodeList.forEach(ele => {
        ele.addEventListener('click', ()=>{
            ele.classList.toggle('redHeart')
        })
    })
}

