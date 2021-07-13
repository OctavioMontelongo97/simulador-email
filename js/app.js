// variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const spinner = document.querySelector('#spinner');

/* variables para campos */
const emailField = document.querySelector('#email');
const asuntoField = document.querySelector('#asunto');
const mensajeField = document.querySelector('#mensaje');

// event listeners
eventListeners();
function eventListeners() {
    // cuando la app incia
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    emailField.addEventListener('blur', validarFormulario);
    asuntoField.addEventListener('blur', validarFormulario);
    mensajeField.addEventListener('blur', validarFormulario);

    // enviar email
    btnEnviar.addEventListener('click', enviarEmail);

    // reiniciar formulario 
    btnReset.addEventListener('click', resetearFormulario);
}

// funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); // agregamos la clase para el cursor
}

function validarFormulario(event) {
    // console.log(event.target.value); (vemos los que el usuario esta escribiendo)
    if(event.target.value.length > 0) {
        // console.log('si hay algo');

        // elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        event.target.classList.remove('border', 'border-red-500');
        event.target.classList.add('border', 'border-green-500');
    }
    else {
        // cambiamos el color del campo si no se cumple la validación
        // event.target.style.borderColor = 'red';
        /* utilizando las clases de tailwind */
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(event.target.type === 'email') {
        // console.log('es email');
        // const resultado = event.target.value.indexOf('@');

        /* validación de correo con expresión regular */
        if(er.test(event.target.value)) {
            // elimina los errores
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            event.target.classList.remove('border', 'border-red-500');
            event.target.classList.add('border', 'border-green-500');
        }
        else {
            event.target.classList.remove('border', 'border-green-500');
            event.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if(er.test(emailField.value) && asuntoField.value !== '' && mensajeField.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    // console.log('error...');
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-300', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        // agregar el mensaje de error al html
        formulario.appendChild(mensajeError);
        /* .length solo existe en querySalectorAll */

        // colocar el mensaje antes de los botones
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
}

// enviar email
function enviarEmail(event) {   
    event.preventDefault();
    // console.log('Enviando...');

    spinner.style.display = 'flex';

    // despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        // console.log('esta función se ejecuta después de 3 segundos');
        spinner.style.display = 'none';

        // mensaje que dice que se envió correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('bg-green-500', 'p-2', 'my-8', 'text-center', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // elimina el mensaje de correo enviado
            resetearFormulario();
        }, 5000);
    }, 3000); // 1s = 1000

    // setinterval se ejecuta cada n tiempo
    // setInterval(() => {
    //     console.log('esta función se ejecuta cada 3 segundos');
    // }, 3000);
}

// función que reseta el formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    emailField.classList.remove('border', 'border-green-500');
    asuntoField.classList.remove('border', 'border-green-500');
    mensajeField.classList.remove('border', 'border-green-500');
}
