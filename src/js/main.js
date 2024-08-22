const navMenu = document.querySelector(".nav-menu");
const hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburguer.classList.toggle("active");
})

function fechar() {
    navMenu.classList.remove("active");
    hamburguer.classList.remove("active");
}