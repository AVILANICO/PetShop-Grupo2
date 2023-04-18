// Referencias
const $cardsContainer = document.getElementById('cardsContainer')
let inCart = []

// Peticion de data a la API
fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
    .then(response => response.json().then(data => {
        // Asiganacions
        let products = data
        let filteredPrts = filter(products)
        const modal = document.getElementById('modalbg')
        printCards(filteredPrts, $cardsContainer)
        
        const openModal = document.querySelectorAll('.openModal')
        const arrayHearts = document.querySelectorAll('.heart')
        const arrayCarts = document.querySelectorAll('.cart')

        modalEvent(openModal, modal, products, modal)
        const modalContainer = document.querySelector('.modal_container') 


        changeColorIcon(arrayHearts, 'redHeart')
        changeColorIcon(arrayCarts, filteredPrts, 'enCarrito')



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
    return `    <div class="cards d-flex align-items-center"  style="background-image: url(${obj.imagen});">
                    <p class="titleProduct">${obj.producto}</p>
                    <div class="none">
                    <div class="menu">
                        <i class='bx bx-cart-add cart' id="${obj._id}"></i>
                        <i class='bx bx-info-circle openModal' id="${obj.producto}"></i>
                        <i class='bx bxs-heart back heart'></i>
                    </div>
                    </div>
                </div>`
}

function modalTemplate(obj) {
    return `<div class="modal_container">
    <div class="imagen">
      <i class='bx bx-x d-block text-end xToClose fs-1'></i>
      <img class=" imgProd" src="${obj.imagen}" alt="">
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
          <input class="operador buytStl border-end-0" type="button" value="-" id="resta">
          <input class="cantidad buytStl text-center" type="number" value="1" id="cantidad">
          <input class="operador mas buytStl border-start-0" type="button" value="+" id="suma">
        </div>
          <button type="button" class="btn w-50" id="buyBtn">Añadir al carrito</button>
      </div>
      <p id="enStock">En stock: <span data-value="${obj.disponibles}" id="enStock">${obj.disponibles}</span></p>
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
            document.body.classList.toggle('removeOverflow')

            const xToCloseModal = document.querySelector('.xToClose')
            xToCloseModal.addEventListener('click', ()=>{
                container.classList.toggle('mostrarModal')
                document.body.classList.toggle('removeOverflow')
            })
            // const  enSotck = document.getElementById('enStock')
            let cantidad = document.getElementById('cantidad')
            const buyBtn = document.getElementById('buyBtn')
            buyBtn.addEventListener('click', ()=> {
                aux.disponibles <= cantidad.value ? alert('No hay productos suficientes') : console.log(aux)
            })

            cantidadProductos()
        })
    })
}


function changeColorIcon(NodeList, arrayData, addClase) {
    NodeList.forEach(ele => {
        ele.addEventListener('click', ()=>{
            ele.classList.toggle(addClase)
            let aux = arrayData.find(pro => pro._id === ele.id)
            let estaEnCarrito = inCart.some(i => i._id === aux._id)
            if(estaEnCarrito){
               inCart = inCart.filter(i => i._id != aux._id)
               console.log(inCart)
            }else {
                inCart.push(aux)
                console.log(inCart)
            }
        })
    })
}

function cantidadProductos() {
    let operadorMas = document.getElementById('suma')
    let operadorMenos = document.getElementById('resta')
    let cantidad = document.getElementById('cantidad')
    let enStock = document.getElementById('enStock')
    operadorMas.addEventListener('click',()=>{
        cantidad.value++
    })
    operadorMenos.addEventListener('click',()=>{
        cantidad.value >= 1 ? cantidad.value--: cantidad.value = 0
    })
}