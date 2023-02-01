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
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador

const botonMascota = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const seccionAtaques = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")

const mascotaJugadorHTML = document.getElementById("mascota-jugador")

const seccionMascota = document.getElementById("seleccionar-mascota")

const mascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const seccionResultado = document.getElementById("resultado")
const seccionAtaquesJugador = document.getElementById("ataques-jugador")
const seccionAtaquesEnemigo = document.getElementById("ataques-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")

const seccionTarjetasAtaquesJugador = document.getElementById("tarjetas-ataque-jugador")

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
    {nombre: "Agua 💧", id: "boton-agua"},
    {nombre: "Agua 💧", id: "boton-agua"},
    {nombre: "Agua 💧", id: "boton-agua"},
    {nombre: "Fuego 🔥", id: "boton-fuego"},
    {nombre: "Tierra 🌱", id: "boton-tierra"},
)

capipepo.ataques.push(
    {nombre: "Tierra 🌱", id: "boton-tierra"},
    {nombre: "Tierra 🌱", id: "boton-tierra"},
    {nombre: "Tierra 🌱", id: "boton-tierra"},
    {nombre: "Fuego 🔥", id: "boton-fuego"},
    {nombre: "Agua 💧", id: "boton-agua"},
)

ratigueya.ataques.push(
    {nombre: "Fuego 🔥", id: "boton-fuego"},
    {nombre: "Fuego 🔥", id: "boton-fuego"},
    {nombre: "Fuego 🔥", id: "boton-fuego"},
    {nombre: "Agua 💧", id: "boton-agua"},
    {nombre: "Tierra 🌱", id: "boton-tierra"}
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
    botonReiniciar.addEventListener("click", reiniciarJuego)
    // Desactivar contenido para evitar un mal flujo del juego
    seccionAtaques.style.display = "none"
    seccionReiniciar.style.display = "none"
}


function cargarAtaques(){
    let ataquesDisponibles
    for (mascota in mokepones){
        if (mokepones[mascota].nombre.toLowerCase() === mascotaJugador){
            mokepones[mascota].ataques.forEach((ataque) => {
                ataquesDisponibles = `
                <button class="boton-ataque" id="${ataque.id}">${ataque.nombre}</button>
                `
                seccionTarjetasAtaquesJugador.innerHTML += ataquesDisponibles
            })
            break
        }
    }
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
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
        mascotaJugadorHTML.innerHTML = inputHipodoge.id.charAt(0).toUpperCase() + inputHipodoge.id.slice(1);
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        mascotaJugadorHTML.innerHTML = inputCapipepo.id.charAt(0).toUpperCase() + inputCapipepo.id.slice(1);
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        mascotaJugadorHTML.innerHTML = inputRatigueya.id.charAt(0).toUpperCase() + inputRatigueya.id.slice(1);
        mascotaJugador = inputRatigueya.id
    } else{
        alert("No seleccionaste ninguna mascota")
    }
    if (mascotaJugadorHTML.innerHTML != ""){
        seleccionarMascotaEnemigo()
        cargarAtaques()
        seccionAtaques.style.display = "flex"
        seccionMascota.style.display = "none"
    }    
}


function seleccionarMascotaEnemigo(){
    let enemigoAleatorio = numeroAleatorio(0, mokepones.length - 1)
    mascotaEnemigo.innerHTML = mokepones[enemigoAleatorio].nombre
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