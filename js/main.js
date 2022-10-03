import { BBDD } from "./Stock.js";

let carrito = [];

function carritoVacio() {
    carrito.length === 0 && alert('El carrito esta vacio compra algo');   
}

function renderizarProductos(){


    const tienda = document.getElementById('tienda'); 

    BBDD.forEach((p)=> {

        const agregandoMail = {
            ...p,
            mail:'Zapas@nike.com'
        };
        console.log(agregandoMail);

        const{id, nombre, precio, img,} = p;
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>$${precio}</p>
                <button class="btn btn-primary" id="${id}">Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
            
            agregarProductosAlCarrito(p.id);
            
        })

    })

}

renderizarProductos();

function agregarProductosAlCarrito(id){
    
    let producto = BBDD.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    (productoEnCarrito = carrito.find(producto => producto.id === id))? producto.cantidad++ : ((producto.cantidad = 1), (carrito.push(producto)));

    renderizarCarrito();
    calcularTotal();
    cantidadTotal();
}

function cantidadTotal() {
    
    const total = carrito.reduce((acc,p) => acc+p.cantidad,0)

    const c = document.getElementById('resultado');
    c.innerText =total;

}


function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {
    
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>$${p.precio}</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProductoDelCarrito(index)
        })

        carritoHTML.appendChild(producto);
    })

    guardandoCarrito(carrito);

    /*------aca va el guardado de storage--------****/
}

function eliminarProductoDelCarrito(indice){

    (carrito[indice].cantidad <= 1)? ((carrito.splice(indice,1)) , (alert('El producto fue eliminado del carrito'))) : carrito[indice].cantidad--

    renderizarCarrito();
    calcularTotal();
    cantidadTotal();
    carritoVacio();
}

function calcularTotal(){

    // Concepto de acumulador
    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    const t = document.getElementById('total');

    t.innerHTML = `<h5>$${total}</h5>`

}

function clickCarrito() {

    let carritoClick = document.getElementById('carrito-btn');
    carritoClick.addEventListener('click',respuesta);

    function respuesta(){
        console.log('DISTE CLICK');
    }

    }
    clickCarrito();

    const guardandoCarrito = (carrito)  => {
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }

    const mantenerCarrito = () => {
        const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
        return carritoStorage;
    }

    document.addEventListener('DOMContentLoaded',() => {

        if(localStorage.getItem('carrito')){
            carrito= mantenerCarrito();
            cantidadTotal();
            renderizarCarrito();
        }

})
