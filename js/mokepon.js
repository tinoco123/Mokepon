let ataqueJugador
let ataqueEnemigo
let resultado
let victoriasJugador = 0
let victoriasEnemigo = 0
let mokepones = []
let mokeponesEnemigos = []
let mokeponesDisponibles
let inputHipodoge 
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let mascotaEnemigoEscogida
let objetoMascotaJugador
let botonesAtaque = []
let secuenciaAtaqueJugador = []
let secuenciaAtaqueEnemigo = []
let ataquesMokeponEnemigo = []
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "../assets/img/mokemap.png"


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
const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let alturaBuscar
const anchoMaximoMapa = 350
let anchoMapa = window.innerWidth - 40

if(anchoMapa > anchoMaximoMapa){
    anchoMapa = anchoMaximoMapa - 40
}
alturaBuscar = anchoMapa * 600 / 800

mapa.width = anchoMapa 
mapa.height = alturaBuscar


class Mokepon{
    constructor (nombre, foto, vida, avatar){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = numeroAleatorio(0, mapa.width - this.ancho)
        this.y = numeroAleatorio(0, mapa.height - this.alto)
        this.avatar = new Image()
        this.avatar.src = avatar
        this.velocidadX = 0
        this.velocidadY = 0
    }


    pintarMokepon() {
        lienzo.drawImage(
            this.avatar,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "../assets/img/hipodoge-attack.png", 3, "../assets/img/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "../assets/img/capipepo-attack.png", 3, "../assets/img/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "../assets/img/ratigueya-attack.png", 3, "../assets/img/ratigueya.png")

let hipodogeEnemigo = new Mokepon("Hipodoge", "../assets/img/hipodoge-attack.png", 3, "../assets/img/hipodoge.png")
let capipepoEnemigo = new Mokepon("Capipepo", "../assets/img/capipepo-attack.png", 3, "../assets/img/capipepo.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya", "../assets/img/ratigueya-attack.png", 3, "../assets/img/ratigueya.png")

mokepones.push(hipodoge, capipepo, ratigueya)
mokeponesEnemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo)

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

hipodogeEnemigo.ataques = hipodoge.ataques
capipepoEnemigo.ataques = capipepo.ataques
ratigueyaEnemigo.ataques = ratigueya.ataques

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
    seccionVerMapa.style.display = "none"
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
        seccionVerMapa.style.display = "flex"
        iniciarMapa()
        
        // seccionAtaques.style.display = "flex"
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


function seleccionarMascotaEnemigo(enemigo){
    mascotaEnemigoEscogida = enemigo.nombre   
    mascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function secuenciaAtaque(){
    botonesAtaque.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego 🔥"){
                secuenciaAtaqueJugador.push("Fuego 🔥")
                ataqueJugador = "FUEGO"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "Agua 💧"){
                secuenciaAtaqueJugador.push("Agua 💧")
                ataqueJugador = "AGUA"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                secuenciaAtaqueJugador.push("Tierra 🌱")
                ataqueJugador = "TIERRA"
                console.log(secuenciaAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            seleccionarAtaqueEnemigo()
        })
    })
}


function seleccionarAtaqueEnemigo(){
    let ataqueAleatorio = numeroAleatorio(0, ataquesMokeponEnemigo.length - 1)
    secuenciaAtaqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre) 
    ataqueEnemigo = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    console.log(secuenciaAtaqueEnemigo)
    iniciarPelea()
}


function iniciarPelea(){
    if (secuenciaAtaqueJugador.length == 5){
        combate()
    }
}


function combate(){

    for (let i = 0; i < secuenciaAtaqueJugador.length; i++) {
        if (secuenciaAtaqueJugador[i] === secuenciaAtaqueEnemigo[i]){
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "Agua 💧" & secuenciaAtaqueEnemigo[i] === "Fuego 🔥"){
            victoriasJugador++
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "Tierra 🌱" & secuenciaAtaqueEnemigo[i] === "Agua 💧"){
            victoriasJugador++
            asignarAtaques(i, i)
        } else if (secuenciaAtaqueJugador[i] === "Fuego 🔥" & secuenciaAtaqueEnemigo[i] === "Tierra 🌱"){
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

function pintarCanvas() {
    objetoMascotaJugador.x += objetoMascotaJugador.velocidadX
    objetoMascotaJugador.y += objetoMascotaJugador.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objetoMascotaJugador.pintarMokepon()
    mokeponesEnemigos.forEach((mokeponEnemigo) => {
        mokeponEnemigo.pintarMokepon()

    })

    mokeponesEnemigos.forEach((mokeponEnemigo) => {
        if (objetoMascotaJugador.velocidadX !== 0 || objetoMascotaJugador.velocidadY !== 0){
            revisarColision(mokeponEnemigo)
            return
        }
    })    
}

function moverDerecha() {
    objetoMascotaJugador.velocidadX = 5
}


function moverIzquierda() {
    objetoMascotaJugador.velocidadX = -5
}


function moverArriba() {
    objetoMascotaJugador.velocidadY= -5
}


function moverAbajo() {
    objetoMascotaJugador.velocidadY = 5
}

function detenerMovimiento() {
    objetoMascotaJugador.velocidadX = 0
    objetoMascotaJugador.velocidadY = 0
}


function sePresionaTecla(evento){
    switch (evento.key) {
        case "ArrowUp":
            moverArriba()            
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    objetoMascotaJugador = obtenerObjetoMascotaJugador()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascotaJugador() {
    for (mascota in mokepones){
        if (mokepones[mascota].nombre.toLowerCase() === mascotaJugador){
            return mokepones[mascota]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    let arribaMascota = objetoMascotaJugador.y
    let abajoMascota = objetoMascotaJugador.y + objetoMascotaJugador.alto
    let izquierdaMascota = objetoMascotaJugador.x
    let derechaMascota = objetoMascotaJugador.x + objetoMascotaJugador.ancho


    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    )
    {
        return
    }
    
    detenerMovimiento()    
    clearInterval(intervalo)
    seccionAtaques.style.display = "flex"
    seccionVerMapa.style.display = "none"
    cargarAtaques()
    seleccionarMascotaEnemigo(enemigo)
    
    
}


window.addEventListener("load", iniciarJuego)