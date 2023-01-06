let ataqueJugador
let ataqueEnemigo
let resultado


function iniciarJuego(){
    let botonMascota = document.getElementById("boton-mascota")
    botonMascota.addEventListener("click", seleccionarMascotaJugador)
    let botonFuego = document.getElementById("boton-fuego")
    let botonAgua = document.getElementById("boton-agua")
    let botonTierra = document.getElementById("boton-tierra")
    
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


function crearMensaje(){
    let mensajes = document.getElementById("mensajes")

    let parrafo =  document.createElement("p")
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo} - ${resultado}`

    mensajes.appendChild(parrafo)
}


function combate(){
    if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultado == "GANASTE"
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultado = "GANASTE"
    } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultado == "GANASTE"
    } else if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    } else {
        resultado ="PERDISTE"
    }
}

function seleccionarAtaqueEnemigo(){
    let ataques = new Map();
    ataques.set(1, "FUEGO")
    ataques.set(2, "AGUA")
    ataques.set(3, "TIERRA")
    ataqueEnemigo = ataques.get(numeroAleatorio(1,3))
    combate()
    crearMensaje()
}


function seleccionarMascotaJugador(){
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let mascotaJugador = document.getElementById("mascota-jugador")

    if (inputHipodoge.checked){
        alert("Seleccionaste la mascota Hipodoge")
        mascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked){
        alert("Seleccionaste la mascota Capipepo")
        mascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked){
        alert("Seleccionaste la mascota Ratigueya")
        mascotaJugador.innerHTML = "Ratigueya"
    } else{
        alert("No seleccionaste ninguna mascota")
    }
    if (mascotaJugador.innerHTML != ""){
        seleccionarMascotaEnemigo()
    }    
}


function seleccionarMascotaEnemigo(){
    let mascotaEnemigo = document.getElementById("mascota-enemigo")
    let enemigos = new Map();
    enemigos.set(1, "Hipodoge")
    enemigos.set(2, "Capipepo")
    enemigos.set(3, "Ratigueya")
    let enemigoAleatorio = enemigos.get(numeroAleatorio(1,3))
    mascotaEnemigo.innerHTML = enemigoAleatorio

}


function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego)