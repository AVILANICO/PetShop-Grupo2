//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $resultado = document.getElementById('resultados')
const $cantProductos = document.getElementById('cantProductos')

let arregloProductos;

//paso el string a un array
let listaCarrito = JSON.parse(localStorage.getItem('proInCart')) || []

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then(data => data.json())
    .then( res => {
      arregloProductos = res;
      template(listaCarrito, $contenedor)
      // precioTotalCarrito(listaCarrito)
      
      // $contenedor.addEventListener("click", funcionCarrito)

      let operadorMas = [...document.querySelectorAll('.suma')]
      let operadorMenos = [...document.querySelectorAll('.resta')]
      let cantidad = [...document.querySelectorAll('.cantidad')]

      for (const menos of operadorMenos) {
        menos.addEventListener("click", ()=>{
          let cuadroEncontrado = cantidad.find(cuadro=> cuadro.id==menos.id)
          console.log(cuadroEncontrado);
          cuadroEncontrado.value--
        })
      }
      for (const mas of operadorMas) {
        mas.addEventListener("click", ()=>{
          let cuadroEncontrado = cantidad.find(cuadro=> cuadro.id==mas.id)
          console.log(cuadroEncontrado);
          cuadroEncontrado.value++
        })
      }

    })
    .catch(err => console.log(err))

//_id, producto, categoria, imagen, precio, disponibles, descripcion


const funcionCarrito = (e) => {
  const id = e.target.dataset.id
  

  if(id){
    const estaEnCarrito = listaCarrito.some(prod => prod._id == id)
    if(estaEnCarrito){
      //esto se hace solo si esta en el carrito
      //quiero que se me traiga solo los productos que tienen el _id != al id.
      listaCarrito = listaCarrito.filter(prod => prod._id != id)
    }else{
      //esto se hace solo si no esta en el carrito
      const evento = arregloProductos.find(e => e._id == id)
      listaCarrito.push(evento)
    }
    //esto se hace si o si
    e.target.classList.toggle('btn-warning')
    //paso el array a un string (JSON)
    // const json = JSON.stringify(listaCarrito)
    localStorage.setItem('proInCart', JSON.stringify(listaCarrito))
  }
}




let precioTotal;
precioTotal = listaCarrito.reduce((acc, act) => act.precio + acc, 0)
$resultado.value = "$" + precioTotal;

if(listaCarrito.length > 1){
  $cantProductos.value = listaCarrito.length + " uds."
}
else{
  $cantProductos.value = listaCarrito.length + " ud."
}

function crearEventos(eventoSolo){
  let listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
  let btnClase = listaCarrito.some(prod => prod._id == eventoSolo._id) ? 'btn-warning' : ''
  return `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${eventoSolo.imagen}" class="img-fluid rounded-start" alt="img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${eventoSolo.producto}</h5>
        <div class = "div-precioBoton">
          <p class="card-text"> Precio: $${eventoSolo.precio} </p>
          <p class="card-text"> Stock: ${eventoSolo.disponibles} </p>
          <div class="cantidades d-flex" >
          <input class="resta operador buytStl border-end-0" type="button" value="-" id="${eventoSolo._id}">
          <input class="cantidad buytStl text-center" type="number" value="1" id="${eventoSolo._id}">
          <input class="suma operador mas buytStl border-start-0" type="button" value="+" id="${eventoSolo._id}">
        </div>
          <button class="quitar btn border-warning ${btnClase}" data-id="${eventoSolo._id}" id="${eventoSolo._id}" onclick= borrarNota("${eventoSolo._id}")>Quitar del <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg></button>
        </div>
        
      </div>
      
    </div>
  </div>
</div>`
}

function borrarNota(id) {
  
    if(id){
      const estaEnCarrito = listaCarrito.some(prod => prod._id == id)
      if(estaEnCarrito){
        //esto se hace solo si esta en el carrito
        //quiero que se me traiga solo los productos que tienen el _id != al id.
        listaCarrito = listaCarrito.filter(prod => prod._id != id)
      }else{
        //esto se hace solo si no esta en el carrito
        const evento = arregloProductos.find(e => e._id == id)
        listaCarrito.push(evento)
      }
      //esto se hace si o si
      //paso el array a un string (JSON)
      // const json = JSON.stringify(listaCarrito)
      localStorage.setItem('proInCart', JSON.stringify(listaCarrito))
    }

    let arraySinNota = listaCarrito.filter(obj => obj._id !== id)
    
    listaCarrito = arraySinNota
    template(listaCarrito, $contenedor)
    let operadorMas = [...document.querySelectorAll('.suma')]
      let operadorMenos = [...document.querySelectorAll('.resta')]
      let cantidad = [...document.querySelectorAll('.cantidad')]

      for (const menos of operadorMenos) {
        menos.addEventListener("click", ()=>{
          let cuadroEncontrado = cantidad.find(cuadro=> cuadro.id==menos.id)
          console.log(cuadroEncontrado);
          cuadroEncontrado.value--
        })
      }
      for (const mas of operadorMas) {
        mas.addEventListener("click", ()=>{
          let cuadroEncontrado = cantidad.find(cuadro=> cuadro.id==mas.id)
          console.log(cuadroEncontrado);
          cuadroEncontrado.value++
        })
      }
}


function template(arreglo, contenedor){
  if(arreglo.length === 0){
    contenedor.innerHTML = `<h2>¡Todavía no has agregado ningún producto al <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
  </svg>!</h2>`
  }
  else{
    let plantilla = ''
    for (const evento of arreglo) {
      plantilla += crearEventos(evento);
    }
    contenedor.innerHTML = plantilla;
  }
}

// function cantidadProductos() {
//     let enStock = document.getElementById('enStock')
//     operadorMas.addEventListener('click',()=>{
//         cantidad.value++
//     })
//     operadorMenos.addEventListener('click',()=>{
//         cantidad.value >= 1 ? cantidad.value--: cantidad.value = 0
//     })
// }