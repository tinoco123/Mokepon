let ataqueJugador
let ataqueEnemigo
let resultado
let vidasJugador = 3
let vidasEnemigo = 3
let mokepones = []

let botonMascota = document.getElementById("boton-mascota")
let botonFuego = document.getElementById("boton-fuego")
let botonAgua = document.getElementById("boton-agua")
let botonTierra = document.getElementById("boton-tierra")
let botonReiniciar = document.getElementById("boton-reiniciar")
let seccionAtaques = document.getElementById("seleccionar-ataque")
let seccionReiniciar = document.getElementById("reiniciar")

let inputHipodoge = document.getElementById("hipodoge")
let inputCapipepo = document.getElementById("capipepo")
let inputRatigueya = document.getElementById("ratigueya")
let mascotaJugador = document.getElementById("mascota-jugador")

let seccionMascota = document.getElementById("seleccionar-mascota")

let mascotaEnemigo = document.getElementById("mascota-enemigo")

let spanVidasJugador = document.getElementById("vidas-jugador")
let spanVidasEnemigo = document.getElementById("vidas-enemigo")

let seccionResultado = document.getElementById("resultado")
let seccionAtaquesJugador = document.getElementById("ataques-jugador")
let seccionAtaquesEnemigo = document.getElementById("ataques-enemigo")


class Mokepon{
    constructor (nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/img/hipodoge.webp", 3)
let capipepo = new Mokepon("Capipepo", "./assets/img/capipepo.webp", 3)
let ratigueya = new Mokepon("Ratigueya", "./assets/img/ratigueya.webp", 3)

mokepones.push(hipodoge, capipepo, ratigueya)
console.log(mokepones)


function iniciarJuego(){
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
        mascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked){
        mascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked){
        mascotaJugador.innerHTML = "Ratigueya"
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