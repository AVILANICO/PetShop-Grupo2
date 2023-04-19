const $cardsContainer = document.getElementById("cardsContainer");
let listaCarrito = JSON.parse(localStorage.getItem("proInCart")) || [];

// Peticion de data a la API
fetch("https://mindhub-xj03.onrender.com/api/petshop").then((response) =>
  response.json().then((data) => {
    // Asiganacions
    let products = data;
    let filteredPrts = filter(products);
    const modal = document.getElementById("modalbg");
    let searchBar = document.getElementById("search");

    printCards(filteredPrts, $cardsContainer);

    const openModal = document.querySelectorAll(".openModal");
    const arrayHearts = document.querySelectorAll(".heart");
    const arrayCarts = document.querySelectorAll(".cart");

    modalEvent(openModal, modal, products, modal);
    const modalContainer = document.querySelector(".modal_container");

    changeColorIcon(arrayHearts, filteredPrts, "redHeart");
    changeColorIcon(arrayCarts, filteredPrts, "enCarrito");

    searchBar.addEventListener("keyup", () => {
      let filteredText = filterByText(filteredPrts, searchBar.value);

      if (searchBar.value == "") {
        printCards(filteredPrts, $cardsContainer);
        let openModal = document.querySelectorAll(".openModal");
        let arrayHearts = document.querySelectorAll(".heart");
        const arrayCarts = document.querySelectorAll(".cart");
        modalEvent(openModal, modal, products, modal);

        changeColorIcon(arrayHearts, filteredPrts, "redHeart");
        changeColorIcon(arrayCarts, filteredPrts, "enCarrito");
      } else {
        printCards(filteredText, $cardsContainer);
        let openModal = document.querySelectorAll(".openModal");
        let arrayHearts = document.querySelectorAll(".heart");
        const arrayCarts = document.querySelectorAll(".cart");
        modalEvent(openModal, modal, products, modal);

        changeColorIcon(arrayHearts, filteredPrts, "redHeart");
        changeColorIcon(arrayCarts, filteredPrts, "enCarrito");
      }
    });
  })
).catch;

// FUNCTIONS

function filterByText(eventArray, text) {
  return eventArray.filter(
    (event) =>
      event.producto.toLowerCase().includes(text.toLowerCase()) ||
      event.descripcion.toLowerCase().includes(text.toLowerCase())
  );
}

function filter(array) {
  return array.filter((i) => i.categoria === "farmacia");
}

function printCards(productArray, container) {
  container.innerHTML = productArray.reduce(
    (acu, act) => acu + createCards(act),
    ""
  );
}

function createCards(obj) {
  let listaCarrito = JSON.parse(localStorage.getItem("proInCart")) || [];
  let btnClass = listaCarrito.some((i) => i._id === obj._id) ? "enCarrito" : "";

  return `    <div class="cards d-flex align-items-center"  style="background-image: url(${obj.imagen});">
                    <p class="titleProduct">${obj.producto}</p>
                    <div class="none">
                    <div class="menu">
                        <i class='bx bx-cart-add cart ${btnClass}' id="${obj._id}"></i>
                        <i class='bx bx-info-circle openModal' id="${obj.producto}"></i>
                        </div>
                        </div>
                        </div>`;
}
// <i class='bx bxs-heart back heart'></i>

function modalTemplate(obj) {
  let menosde5 = "";
  // obj.disponibles <= 5 && obj.disponibles > 0 ?  menosde5 = '¡Ultimos Productos!' : obj.disponibles == 0 ? menosde5 = '¡No hay productos disponibles!'
  if (obj.disponibles <= 5 && obj.disponibles > 0) {
    menosde5 = "¡Ultimos Productos!";
  } else if (obj.disponibles == 0) {
    menosde5 = "¡No hay productos disponibles!";
  }
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
      <div class="compraSection gap-4">
      <p id="enStock" class="m-0 text-center ">Unidades disponibles: <span class="text-primary" data-value="${obj.disponibles}"> ${obj.disponibles} </span></p>
      <h5 class="m-0 text-danger text-center">${menosde5}</h5>
    </div>
  </div>`;
}

function modalEvent(arrayEle, element, arrayData, container) {
  arrayEle.forEach((ele) => {
    ele.addEventListener("click", () => {
      element.classList.toggle("mostrarModal");
      let aux = arrayData.find((prod) => prod.producto === ele.id);
      let toPrint = modalTemplate(aux);
      container.innerHTML = toPrint;
      document.body.classList.toggle("removeOverflow");

      const xToCloseModal = document.querySelector(".xToClose");
      xToCloseModal.addEventListener("click", () => {
        container.classList.toggle("mostrarModal");
        document.body.classList.toggle("removeOverflow");
      });
      // const  enSotck = document.getElementById('enStock')
    });
  });
}

function changeColorIcon(NodeList, arrayData, addClase) {
  NodeList.forEach((ele) => {
    ele.addEventListener("click", () => {
      ele.classList.toggle(addClase);
      let aux = arrayData.find((pro) => pro._id === ele.id);
      let estaEnCarrito = listaCarrito.some((i) => i._id === aux._id);
      if (estaEnCarrito) {
        listaCarrito = listaCarrito.filter((i) => i._id != aux._id);
      } else {
        listaCarrito.push(aux);
      }
      localStorage.setItem("proInCart", JSON.stringify(listaCarrito));
    });
  });
}
