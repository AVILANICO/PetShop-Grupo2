//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $resultado = document.getElementById('resultados')
let arregloProductos;

//paso el string a un array
let listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
console.log(listaCarrito);

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then(data => data.json())
    .then( res => {
      arregloProductos = res;
      template(listaCarrito, $contenedor)
      // precioTotalCarrito(listaCarrito)
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
    localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))
  }
}

$contenedor.addEventListener("click", funcionCarrito)


  let precioTotal;
  precioTotal = listaCarrito.reduce((acc, act) => act.precio + acc, 0)
  $resultado.value = precioTotal;

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
                <button class="btn border-warning ${btnClase}" data-id="${eventoSolo._id}" >Quitar del Carrito</button>
        </div>
      </div>
    </div>
  </div>`
}




function template(arreglo, contenedor){
  if(arreglo.length === 0){
    contenedor.innerHTML = `<h2>¡Todavía no has agregado ningun producto al carrito!</h2>`
  }
  else{
    let plantilla = ''
    for (const evento of arreglo) {
      plantilla += crearEventos(evento);
    }
    contenedor.innerHTML = plantilla;
  }
}