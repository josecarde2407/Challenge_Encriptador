//Elementos HTML
const cajaTexto = document.querySelector('.caja-texto');
const textoResultado = document.querySelector('.text-resultado');
const mensajeNoEncontrado = document.querySelector('.msj-no-encontrado');
const botonEncriptar = document.querySelector('.boton-encriptar');
const botonDesencriptar = document.querySelector('.boton-desencriptar');
const botonCopiar = document.querySelector('.boton-copiar');
const contenedorImagenMuñeco = document.querySelector('.container-imagen-muñeco');
const contenedorParrafo = document.querySelector('.container-parrafo');
const contenedorParrafoResultado = document.querySelector('.container-parrafo-resultado');
const contenedorCopiar = document.querySelector('.container-copiar');
const contenedorSection2 = document.querySelector('.container-section2');

//Funcion Encriptar
function encriptar(){
    var texto = cajaTexto.value;
    if(texto.trim() == ''){
        if(contenedorImagenMuñeco.classList.contains('ocultar') && mensajeNoEncontrado.classList.contains('ocultar') && contenedorParrafo.classList.contains('ocultar')){
            ocultarCamposDeResultado();
            mostrarVistasSinResultado();
            agregarAlert();
        }else{
            agregarAlert();
        }
    }else{
        //Ocultando-VistaSinResultado
        ocultarVistasSinResultado();
        //Mostrando-CamposDeResultado
        mostrarCamposDeResultado();
        
        var textoEncriptado = '';
        let obj_letters = {
            a: 'ai',
            e: 'enter',
            i: 'imes',
            o: 'ober',
            u: 'ufat',
        };

        textoEncriptado = texto.replace( /a|e|i|o|u/g, function(matched){return obj_letters[matched]});
        console.log(textoEncriptado);
        textoResultado.textContent = textoEncriptado;
        //viewSection2();
        scrollSuave('.container-section2', 500, 0);
    }
}

//Funcion Desencriptar
function desencriptar(){
    var texto = cajaTexto.value;
    if(texto.trim() == ''){
        if(contenedorImagenMuñeco.classList.contains('ocultar') && mensajeNoEncontrado.classList.contains('ocultar') && contenedorParrafo.classList.contains('ocultar')){
            ocultarCamposDeResultado();
            mostrarVistasSinResultado();
            agregarAlert();
        }else{
            agregarAlert();
        }
    }else{
        //Ocultando-VistaSinResultado
        ocultarVistasSinResultado();
        //Mostrando-CamposDeResultado
        mostrarCamposDeResultado();
        
        var textoDesEncriptado = '';
        let obj_letters = {
            ai: 'a',
            enter: 'e',
            imes: 'i',
            ober: 'o',
            ufat: 'u',
        };

        textoDesEncriptado = texto.replace( /ai|enter|imes|ober|ufat/g, function(matched){return obj_letters[matched]});
        console.log(textoDesEncriptado);
        textoResultado.textContent = textoDesEncriptado;
        //viewSection2();
        scrollSuave('.container-section2', 500, 0);
    }
}
//Funcion CopiarEncriptado
function copiarEncriptado(){
    let textCopy = textoResultado.textContent;
    if(textCopy.trim() == ''){
        alert('Caja vacia');
    }else{
        navigator.clipboard.writeText(textCopy);
        cajaTexto.select();
        cajaTexto.focus();
    }
}
//Detectar solo introduzca minusculas y sin acentos
cajaTexto.addEventListener('input', function(){
    let textInput = cajaTexto.value;
    //Convertir a minuscula y restringir uso de caracteres especiales y tildes(acentos)
    ///[^a-zñ\s]/g expresión regular considerando la 'ñ'
    textInput = textInput.toLowerCase().replace(/[^a-z\s]/g, '');
    cajaTexto.value = textInput;
})

/*Funciones para mostrar u ocultar campos del section2 */
function mostrarCamposDeResultado(){
    contenedorParrafoResultado.classList.remove('ocultar');
    contenedorCopiar.classList.remove('ocultar');
    botonCopiar.classList.remove('ocultar');
}

function ocultarCamposDeResultado(){
    contenedorParrafoResultado.classList.add('ocultar');
    contenedorCopiar.classList.add('ocultar');
    botonCopiar.classList.add('ocultar');
}

function mostrarVistasSinResultado(){
    contenedorImagenMuñeco.classList.remove('ocultar');
    mensajeNoEncontrado.classList.remove('ocultar');
    contenedorParrafo.classList.remove('ocultar');
}

function ocultarVistasSinResultado(){
    contenedorImagenMuñeco.classList.add('ocultar');
    mensajeNoEncontrado.classList.add('ocultar');
    contenedorParrafo.classList.add('ocultar');
}

//Quitar alert luego de la advertencia
function quitarAlert(){
    contenedorSection2.classList.remove('alert');
}

//Animar mensaje de texto no encontrado si la caja esta vacía
function agregarAlert(){
    contenedorSection2.classList.add('alert');
    setTimeout(quitarAlert, 1000);
}

//Aplicar el ocultar al cargar la pagina
//window.addEventListener('load', ocultarIni);
document.addEventListener('DOMContentLoaded', ocultarCamposDeResultado);

//Añadir funciones a los botones
botonEncriptar.addEventListener('click', encriptar);
botonDesencriptar.addEventListener('click', desencriptar);
botonCopiar.addEventListener('click', copiarEncriptado);


//Funciones para desplazar a vista de section2 
/*function viewSection2(){
    let objClienteReact = contenedorSection2.getBoundingClientRect();
    let y = objClienteReact.top;
    let x = objClienteReact.left;
    window.scroll(x, y);
}*/

const scrollSuave = (objetivo, duracion, compensacion) => {
    let elemObj = document.querySelector(objetivo)
    let elemPos = elemObj.getBoundingClientRect().top - compensacion
    let posInicial = window.pageYOffset
    let tiempoInicial = null
    
    const animacion = tiempoAhora => {
        if (tiempoInicial === null) tiempoInicial = tiempoAhora
        tiempoPasado = tiempoAhora - tiempoInicial
        let auxAnimacion = easeInOutQuad(tiempoPasado, posInicial, elemPos, duracion)
        window.scrollTo(0, auxAnimacion)
        if (tiempoPasado < duracion) requestAnimationFrame(animacion)
    }
    requestAnimationFrame(animacion)
}
    
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return - c / 2 * (t * (t - 2) - 1) + b
}

//DarkMode
const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
    
    body.classList.toggle("dark");
    sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";

});