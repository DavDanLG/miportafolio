// Validación simple de formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form") || document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const nombre = form.querySelector("#nombre").value.trim();
    const correo = form.querySelector("#correo").value.trim();
    const mensaje = form.querySelector("#mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      e.preventDefault();
      alert("Por favor completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      e.preventDefault();
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }
  });
});
