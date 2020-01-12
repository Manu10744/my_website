const navBar = document.querySelector(".navbar");
const navLinks = document.querySelector(".navlinks");
const mobileNavToggler = document.querySelector(".mobile-nav");

mobileNavToggler.addEventListener('click', () => {

    if (navLinks.style.display == 'block') {
        navBar.classList.remove("navbar-expanded");
        navLinks.style.display = 'none';
    } 
    else {
        navLinks.style.display = 'block';
        navBar.classList.add("navbar-expanded");
    }
});
