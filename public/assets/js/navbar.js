const navbar = document.querySelector(".navbar");
const navlinks = document.querySelectorAll(".navlinks a");

window.onscroll = () => {
    if (document.scrollingElement.scrollTop >= 100) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
};