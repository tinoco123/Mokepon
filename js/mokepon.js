let ataqueJugador


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
    alert(ataqueJugador)
}


function ataqueAgua(){
    ataqueJugador = "AGUA"
    alert(ataqueJugador)
}


function ataqueTierra(){
    ataqueJugador = "TIERRA"
    alert(ataqueJugador)
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