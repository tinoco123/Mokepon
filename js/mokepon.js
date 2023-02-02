let ataqueJugador
let ataqueEnemigo
let resultado
let victoriasJugador = 0
let victoriasEnemigo = 0
let mokepones = []
let mokeponesDisponibles
let inputHipodoge 
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let botonesAtaque = []
let secuenciaAtaqueJugador = []
let secuenciaAtaqueEnemigo = []
let ataquesMokeponEnemigo = []

const botonMascota = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const seccionAtaques = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")

const mascotaJugadorHTML = document.getElementById("mascota-jugador")

const seccionMascota = document.getElementById("seleccionar-mascota")

const mascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

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


function seleccionarMascotaJugador(){
    if (inputHipodoge.checked){
        mascotaJugadorHTML.innerHTML = inputHipodoge.id.charAt(0).toUpperCase() + inputHipodoge.id.slice(1)
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        mascotaJugadorHTML.innerHTML = inputCapipepo.id.charAt(0).toUpperCase() + inputCapipepo.id.slice(1)
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        mascotaJugadorHTML.innerHTML = inputRatigueya.id.charAt(0).toUpperCase() + inputRatigueya.id.slice(1)
        mascotaJugador = inputRatigueya.id
    } else{
        alert("No seleccionaste ninguna mascota")
    }
    if (mascotaJugadorHTML.innerHTML != ""){
        cargarAtaques()
        seleccionarMascotaEnemigo()
        seccionAtaques.style.display = "flex"
        seccionMascota.style.display = "none"
    }    
}


function cargarAtaques(){
    let ataquesDisponibles
    for (mascota in mokepones){
        if (mokepones[mascota].nombre.toLowerCase() === mascotaJugador){
            mokepones[mascota].ataques.forEach((ataque) => {
                ataquesDisponibles = `
                <button class="boton-ataque boton-ataque-listener" id="${ataque.id}">${ataque.nombre}</button>
                `
                seccionTarjetasAtaquesJugador.innerHTML += ataquesDisponibles
            })
            break
        }
    }

    botonesAtaque = document.querySelectorAll(".boton-ataque-listener")
}


function seleccionarMascotaEnemigo(){
    let enemigoAleatorio = numeroAleatorio(0, mokepones.length - 1)
    mascotaEnemigo.innerHTML = mokepones[enemigoAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[enemigoAleatorio].ataques
    secuenciaAtaque()
}


function secuenciaAtaque(){
    botonesAtaque.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego 🔥"){
                secuenciaAtaqueJugador.push("FUEGO")
                ataqueJugador = "FUEGO"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
            } else if (e.target.textContent === "Agua 💧"){
                secuenciaAtaqueJugador.push("AGUA")
                ataqueJugador = "AGUA"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
            } else {
                secuenciaAtaqueJugador.push("TIERRA")
                ataqueJugador = "TIERRA"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
            }
            seleccionarAtaqueEnemigo()
        })
    })
}


function seleccionarAtaqueEnemigo(){
    let ataques
    ataques = new Map()
    ataques.set(0, "FUEGO")
    ataques.set(1, "FUEGO")
    ataques.set(2, "AGUA")
    ataques.set(3, "AGUA")
    ataques.set(4, "TIERRA")
    ataques.set(5, "TIERRA")
    
    let ataqueAleatorio = numeroAleatorio(0, ataquesMokeponEnemigo.length - 1)
        
    secuenciaAtaqueEnemigo.push(ataques.get(ataqueAleatorio)) 
    ataqueEnemigo = ataques.get(ataqueAleatorio)
    console.log(secuenciaAtaqueEnemigo)
    iniciarPelea()
}


function iniciarPelea(){
    if (secuenciaAtaqueJugador.length >= 5){
        combate()
    }
}


function combate(){

    for (let i = 0; i < secuenciaAtaqueJugador.length; i++) {
        if (secuenciaAtaqueJugador[i] === secuenciaAtaqueEnemigo[i]){
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "AGUA" & secuenciaAtaqueEnemigo[i] === "FUEGO"){
            victoriasJugador++
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "TIERRA" & secuenciaAtaqueEnemigo[i] === "AGUA"){
            victoriasJugador++
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "FUEGO" & secuenciaAtaqueEnemigo[i] === "TIERRA"){
            victoriasJugador++
            asignarAtaques(i, i)
        } else {
            victoriasEnemigo ++
            asignarAtaques(i, i)
        }
        
    }

    spanVictoriasJugador.innerHTML = victoriasJugador
    spanVictoriasEnemigo.innerHTML = victoriasEnemigo
    crearMensajeFinal()
    deshabilitarAtaques()
    seccionReiniciar.style.display = "block"    
}


function asignarAtaques(jugador, enemigo){
    ataqueJugador = secuenciaAtaqueJugador[jugador]
    ataqueEnemigo = secuenciaAtaqueEnemigo[enemigo]
    crearMensajeCombate()
}


function crearMensajeCombate(){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    seccionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    seccionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}


function crearMensajeFinal(){
    let parrafo = ""
    if (victoriasJugador > victoriasEnemigo){
        parrafo = "FELICIDADES! Eres el ganador"
    } else if (victoriasJugador < victoriasEnemigo) {
        parrafo = "LOSIENTO:( Has perdido"
    } else {
        parrafo = "Existe un EMPATE"
    }
    seccionResultado.innerHTML = parrafo
}


function deshabilitarAtaques(){
    botonesAtaque.forEach((boton) => {
        boton.disabled = true
    })
}


function reiniciarJuego(){
    location.reload()
}


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener("load", iniciarJuego)