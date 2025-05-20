// Abrir y cerrar panel de registro
function abrirRegistro() {
    document.getElementById('panelRegistro').style.display = 'flex';
}

function cerrarRegistro() {
    document.getElementById('panelRegistro').style.display = 'none';
}

// Registro de usuario
document.getElementById('formRegistro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensajeRegistro');

    if (!nombre || !email || !password) {
        mensaje.textContent = 'Completa todos los campos.';
        mensaje.style.color = 'red';
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.email === email)) {
        mensaje.textContent = 'Correo ya registrado.';
        mensaje.style.color = 'red';
        return;
    }

    usuarios.push({ nombre, email, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensaje.textContent = 'Registro exitoso 🎉';
    mensaje.style.color = 'green';

    setTimeout(() => {
        cerrarRegistro();
        mensaje.textContent = '';
    }, 2000);
});

// Abrir y cerrar panel de login
function abrirLogin() {
    document.getElementById('panelLogin').style.display = 'flex';
}

function cerrarLogin() {
    document.getElementById('panelLogin').style.display = 'none';
}

// Iniciar sesión
document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const mensaje = document.getElementById('mensajeLogin');

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        mensaje.textContent = 'Correo o contraseña incorrectos.';
        mensaje.style.color = 'red';
        return;
    }

    mensaje.textContent = 'Inicio de sesión exitoso ✅';
    mensaje.style.color = 'green';

    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

    setTimeout(() => {
        cerrarLogin();
        mensaje.textContent = '';
        actualizarEstadoUsuario();
    }, 1000);
});

// Actualizar UI según estado del usuario
function actualizarEstadoUsuario() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const saludoContainer = document.getElementById('saludoContainer');
    const saludoUsuario = document.getElementById('saludoUsuario');

    if (usuarioActivo) {
        saludoUsuario.textContent = `Bienvenido, ${usuarioActivo.nombre}`;
        saludoContainer.style.display = 'flex';
    } else {
        saludoContainer.style.display = 'none';
    }
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    actualizarEstadoUsuario();
}

// Verificar estado del usuario al cargar la página
window.addEventListener('DOMContentLoaded', actualizarEstadoUsuario);
