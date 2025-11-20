    document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const mensajeDiv = document.getElementById('formMensaje');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if(nombre && email && mensaje) {
      console.log('Datos enviados:', {nombre, email, mensaje});

      mensajeDiv.style.display = 'block';

      form.reset();

      setTimeout(() => {
        mensajeDiv.style.display = 'none';
      }, 4000);
    }
  });
});