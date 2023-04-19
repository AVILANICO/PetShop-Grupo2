const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");

function showNavbar() {
  navbar.classList.add("show");
  menuBtn.classList.add("hide");
  body.classList.add("disabled");
}

function hideNavbar() {
  body.classList.remove("disabled");
  navbar.classList.remove("show");
  menuBtn.classList.remove("hide");
}

function toggleStickyNavbar() {
  window.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

menuBtn.addEventListener("click", showNavbar);
cancelBtn.addEventListener("click", hideNavbar);
window.addEventListener("scroll", toggleStickyNavbar);
