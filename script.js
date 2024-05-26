const botonGenerar = document.getElementById('boton-generar')
document.addEventListener('click', generarAvatar)
let generoSeleccionado
const contenedorDeCuerpos = document.getElementById('cuerpos')
const contenedorDeCaras = document.getElementById('cabezas')
const contenedorDeCamisas = document.getElementById('camisas')
const colors = ["#FFB300", "#4DD0E1", "#EBB76A", "#3DCC5D", "#BB382E", "#EBB76A", "#3A89C2", "#F5F7FA"]
let cuerpo
let cara
let camisa
let background
const genderButtons = document.querySelectorAll('.gender-button')
const collapsibleButtons = document.querySelectorAll('.collapsible-button')

genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        if(button.id == 'masculino') {
            generoSeleccionado = 'CHICO'
        } else {
            generoSeleccionado = 'CHICA'
        }
        contenedorDeCuerpos.innerHTML = ''
        contenedorDeCaras.innerHTML = ''
        contenedorDeCamisas.innerHTML = ''
        mostrarPartes(generoSeleccionado)
        generarAvatarRandom()
        const imageOptions1 = document.querySelectorAll('#cuerpos .image-option')
        const imageOptions2 = document.querySelectorAll('#cabezas .image-option') 
        const imageOptions3 = document.querySelectorAll('#camisas .image-option') 
        imageOptions1.forEach(cuerpoSeleccionado => {
            cuerpoSeleccionado.addEventListener('click', () => {
                imageOptions1.forEach(option => option.classList.remove('selected'))
                cuerpoSeleccionado.classList.add('selected')
                cuerpo = cuerpoSeleccionado.src
                generarAvatar()
                })

            })
           
        imageOptions2.forEach(caraSeleccionada => {
            caraSeleccionada.addEventListener('click', () => {
                imageOptions2.forEach(option => option.classList.remove('selected'))
                caraSeleccionada.classList.add('selected')
                cara = caraSeleccionada.src
                generarAvatar()
                })

            })
        imageOptions3.forEach(camisaSeleccionada => {
            camisaSeleccionada.addEventListener('click', () => {
                imageOptions3.forEach(option => option.classList.remove('selected'))
                camisaSeleccionada.classList.add('selected')
                camisa = camisaSeleccionada.src
                generarAvatar()
                })

            })          
    })
})

collapsibleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling
        button.classList.toggle("opened")
        if (button.classList.contains('opened')) {
            content.style.display = 'flex'
        } else {
            content.style.display = 'none'
        }
    })
})


function mostrarPartes (generoSeleccionado) {
    for (let i=1; i<=3; i++) {
        const cuerpo = document.createElement('img')
        cuerpo.src = 'Elementos/' + generoSeleccionado +'/Cuerpo/Cuerpo (' + i + ')-small.png'
        cuerpo.className = "image-option"
        cuerpo.id = `cuerpo-${i}`
        contenedorDeCuerpos.appendChild(cuerpo)
    }
    let cantidad
    if(generoSeleccionado == 'CHICO'){
        cantidad = 75
    } else {
        cantidad = 74
    }
    for (let i=1; i<=cantidad; i++) {
        const cara = document.createElement('img')
        cara.src = 'Elementos/' + generoSeleccionado +'/Cara/Cara (' + i + ')-small.png'
        cara.className = "image-option"
        cara.id = `cara-${i}`
        contenedorDeCaras.appendChild(cara)
    }
    for (let i=1; i<=6; i++) {
        const camisa = document.createElement('img')
        camisa.src = 'Elementos/' + generoSeleccionado +'/Camisas/Camisa (' + i + ')-small.png'
        camisa.className = "image-option"
        camisa.id = `camisa-${i}`
        contenedorDeCamisas.appendChild(camisa)
    }
}

const $containerColores = document.querySelector('.collapsible-content#color')
colors.forEach((rgb, i) => {
    const $color = document.createElement('div')
    $color.classList.add('bg-avatar')
    $color.classList.add(`bg-avatar-${i + 1}`)
    $color.dataset.color = rgb
    $color.style.background = rgb
    $containerColores.appendChild($color)

    $color.addEventListener('click', () => {
        $containerColores.querySelectorAll('.bg-avatar').forEach($c => $c.classList.remove('selected'))
        $color.classList.add('selected')
        background = rgb
    })
})

function generarAvatar() {
    const Genero = new Image()
    Genero.src = cuerpo.replace("-small", "")
    const Cara = new Image()
    Cara.src = cara.replace("-small", "")
    const Camisa = new Image()
    Camisa.src = camisa.replace("-small", "")
    const canvas = document.getElementById('avatar') 
    const ctx = canvas.getContext('2d')

    Promise.all([Genero.decode(), Cara.decode(), Camisa.decode()])
    .then(() => {
        canvas.width = Genero.width
        canvas.height = Genero.height

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height, );
        ctx.drawImage(Genero, 0, 0)
        ctx.drawImage(Cara, 0, 0)
        ctx.drawImage(Camisa, 0, 0)
    });
}

const botonDescargar = document.getElementById('boton-descargar')
botonDescargar.addEventListener('click', descargarAvatar)

function descargarAvatar() {
    const canvas = document.getElementById('avatar')
    const dataURL = canvas.toDataURL('image/png')

    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'Mi avatar.png'
    link.textContent = 'Descargar mi avatar siu'
    // document.body.appendChild(link)

   /*  link.dispatchEvent(new MouseEvent('click', {
        bubles: true,
        cancelable: true,
        view: window
    })); */
    link.click()
}

// function generarAvatarRandom() {
    
//     const cuerpoRamdon = "/Elementos/" + generoSeleccionado + "/Cuerpo/Cuerpo (" + Math.floor(Math.random()*2+1) +").png"
//     cuerpo = cuerpoRamdon

//     const caraRamdon = "/Elementos/" + generoSeleccionado + "/Cara/Cara (" + Math.floor(Math.random()*71+1) +").png"
//     cara = caraRamdon

//     const camisaRamdon = "/Elementos/" + generoSeleccionado + "/Camisas/Camisa (" + Math.floor(Math.random()*5+1) +").png"
//     camisa = camisaRamdon

//     const colorRamdon = Math.floor(Math.random()*7)+1
//     switch (colorRamdon){
//         case 1:{
//             background = "#FFB300"
//             break
//         }
//         case 2:{
//             background = "#4DD0E1"
//             break
//         }
//         case 3:{
//             background = "#EBB76A"
//             break
//         }
//         case 4:{
//             background = "#3DCC5D"
//             break
//         }
//         case 5:{
//             background = "#BB382E"
//             break
//         }        
//         case 6:{
//             background = "#EBB76A"
//             break
//         }        
//         case 7:{
//             background = "#3A89C2"
//             break
//         }       
//         case 8:{
//             background = "#F5F7FA"
//             break
//         }
//         default: {
//             background = "#FFB300"
//             break
//         }
//     }

//     generarAvatar()

// }

const getRandomNumber = (max = 1) => {
    return Math.floor(Math.random() * max) || 1
}

function generarAvatarRandom() {
    const partesID = {
        cuerpo: getRandomNumber(3),
        cabeza: getRandomNumber(72),
        torso: getRandomNumber(6)
    }
    
    cuerpo = "Elementos/" + generoSeleccionado + "/Cuerpo/Cuerpo (" + partesID.cuerpo +").png"
    cara = "Elementos/" + generoSeleccionado + "/Cara/Cara (" + partesID.cabeza +").png"
    camisa = "Elementos/" + generoSeleccionado + "/Camisas/Camisa (" + partesID.torso +").png"

    document.getElementById(`cuerpo-${partesID.cuerpo}`).classList.add('selected')
    document.getElementById(`cara-${partesID.cabeza}`).classList.add('selected')
    document.getElementById(`camisa-${partesID.torso}`).classList.add('selected')

    const colorRamdon = Math.floor(Math.random()*7)+1
    $containerColores.querySelectorAll('.bg-avatar').forEach($c => $c.classList.remove('selected'))
    const $color = document.querySelector(`.bg-avatar-${colorRamdon}`)
    $color.classList.add('selected')
    background = $color.dataset.color
    
    generarAvatar()
}

const generoRamdon = Math.floor(Math.random()*10)
const isBoy = generoRamdon >= 5
const genderButtonID = isBoy ? 'masculino' : 'femenino'
if(isBoy) {
    generoSeleccionado = "CHICO"
} else {
    generoSeleccionado = "CHICA"
}
document.getElementById(genderButtonID).click()
// mostrarPartes(generoSeleccionado)
// generarAvatarRandom()