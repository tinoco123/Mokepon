let ataqueJugador
let ataqueEnemigo
let resultado
let vidasJugador = 3
let vidasEnemigo = 3
let mokepones = []
let mokeponesDisponibles
let inputHipodoge 
let inputCapipepo
let inputRatigueya

const botonMascota = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")
const seccionAtaques = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")

const mascotaJugador = document.getElementById("mascota-jugador")

const seccionMascota = document.getElementById("seleccionar-mascota")

const mascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const seccionResultado = document.getElementById("resultado")
const seccionAtaquesJugador = document.getElementById("ataques-jugador")
const seccionAtaquesEnemigo = document.getElementById("ataques-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")


class Mokepon{
    constructor (nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/img/hipodoge.webp", 3)
let capipepo = new Mokepon("Capipepo", "./assets/img/capipepo.webp", 3)
let ratigueya = new Mokepon("Ratigueya", "./assets/img/ratigueya.webp", 3)

mokepones.push(hipodoge, capipepo, ratigueya)

hipodoge.ataques.push(
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "tierra", id: "boton-tierra"},
)

capipepo.ataques.push(
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "agua", id: "boton-agua"},
)

ratigueya.ataques.push(
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "tierra", id: "boton-tierra"}
)


function iniciarJuego(){
    mokepones.forEach((mokepon) => {
        mokeponesDisponibles = `
        <input type="radio" name="mascota" id="${mokepon.nombre.toLowerCase()}"/>
        <label class="tarjeta-mokepon" for="${mokepon.nombre.toLowerCase()}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="">
        </label>
        `
        contenedorTarjetas.innerHTML += mokeponesDisponibles
    })

    inputHipodoge = document.getElementById("hipodoge")
    inputCapipepo = document.getElementById("capipepo")
    inputRatigueya = document.getElementById("ratigueya")
    botonMascota.addEventListener("click", seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    // Desactivar contenido para evitar un mal flujo del juego
    seccionAtaques.style.display = "none"
    seccionReiniciar.style.display = "none"
}


function ataqueFuego(){
    ataqueJugador = "FUEGO"
    seleccionarAtaqueEnemigo()
}


function ataqueAgua(){
    ataqueJugador = "AGUA"
    seleccionarAtaqueEnemigo()
}


function ataqueTierra(){
    ataqueJugador = "TIERRA"
    seleccionarAtaqueEnemigo()
}


function seleccionarAtaqueEnemigo(){
    let ataques = new Map();
    ataques.set(1, "FUEGO")
    ataques.set(2, "AGUA")
    ataques.set(3, "TIERRA")
    ataqueEnemigo = ataques.get(numeroAleatorio(1,3))
    combate()
    crearMensajeCombate()
    if (vidasJugador == 0 || vidasEnemigo == 0) {
        deshabilitarAtaques()
        crearMensajeFinal()
        seccionReiniciar.style.display = "block"
    }
}


function seleccionarMascotaJugador(){
    if (inputHipodoge.checked){
        mascotaJugador.innerHTML = inputHipodoge.id.charAt(0).toUpperCase() + inputHipodoge.id.slice(1);
    } else if (inputCapipepo.checked){
        mascotaJugador.innerHTML = inputCapipepo.id.charAt(0).toUpperCase() + inputCapipepo.id.slice(1);
    } else if (inputRatigueya.checked){
        mascotaJugador.innerHTML = inputRatigueya.id.charAt(0).toUpperCase() + inputRatigueya.id.slice(1);
    } else{
        alert("No seleccionaste ninguna mascota")
    }
    if (mascotaJugador.innerHTML != ""){
        seleccionarMascotaEnemigo()
        seccionAtaques.style.display = "flex"
        seccionMascota.style.display = "none"
    }    
}


function seleccionarMascotaEnemigo(){
    let enemigos = new Map();
    enemigos.set(1, "Hipodoge")
    enemigos.set(2, "Capipepo")
    enemigos.set(3, "Ratigueya")
    let enemigoAleatorio = enemigos.get(numeroAleatorio(1,3))
    mascotaEnemigo.innerHTML = enemigoAleatorio
}

function combate(){
    if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultado = "GANASTE"
        vidasEnemigo--
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultado = "GANASTE"
        vidasEnemigo--
    } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultado = "GANASTE"
        vidasEnemigo--
    } else if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    } else {
        resultado = "PERDISTE"
        vidasJugador--
    }
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo
    
}


function crearMensajeCombate(){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    seccionResultado.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    seccionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    seccionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}


function crearMensajeFinal(){
    let parrafo = `${vidasJugador == 0 ? "Losiento, has perdido:(" : "Felicidades has ganado"}`
    seccionResultado.innerHTML = parrafo
}


function deshabilitarAtaques(){
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}


function reiniciarJuego(){
    location.reload()
}


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego)