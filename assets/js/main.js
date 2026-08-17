async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Error al cargar ${file}`);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
  } catch (error) {
    console.error(error);
  }
}

// Detecta si estás dentro de /pages/
const isInPages = window.location.pathname.includes("/pages/");
const prefix = isInPages ? "../" : "";

// Carga los componentes con la ruta correcta
Promise.all([
  loadComponent("header", `${prefix}components/header.html`),
  loadComponent("footer", `${prefix}components/footer.html`)
]).then(() => {
  const cvBtn = document.querySelector(".cv-btn");
  if (cvBtn) {
    cvBtn.href = isInPages ? "../CV_David.pdf" : "CV_David.pdf";
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    const page = link.getAttribute("data-page");
    if (page === "index") {
      link.href = isInPages ? "../index.html" : "index.html";
    } else {
      link.href = isInPages ? `${page}.html` : `pages/${page}.html`;
    }
  });
});
