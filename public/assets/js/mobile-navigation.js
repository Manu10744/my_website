const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
const pageWrapper = document.querySelector(".page-wrapper");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation li");

mobileNavToggler.addEventListener("click", () => {
    mobileNavToggler.classList.toggle("mobile-nav-active");

    if (navigation.style.display == '' || navigation.style.display == 'none') {
        navigation.style.touchAction = 'none';
        fadeIn(navigation, 2000);


        navLinks.forEach((link, index) => {
            index == 0 ? link.style.animation = `slideLinksIn 0.5s` : link.style.animation = `slideLinksIn ${0.5 + (index / 5)}s`;
        })
    } else { 
        navLinks.forEach((link, index) => {
            index == 0 ? link.style.animation = `slideLinksOut 0.5s` : link.style.animation = `slideLinksOut ${0.5 + (index / 5)}s`;
        })
        
        fadeOut(navigation);
        navigation.style.touchAction = 'auto';
    }

    pageWrapper.classList.toggle("blurred");
});

function fadeIn(element, duration) {
   let opacity = 0;
   element.style.opacity = opacity;
   element.style.display = "block";

   let timer = setInterval(() => {
       if (opacity >= 1.0) {
           clearInterval(timer);
       }

       element.style.opacity = opacity;
       opacity = opacity + 0.1;
   }, 20);
}

function fadeOut(element, duration) {
    element.style.opacity = 1;

    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = "none";
        } else {
            setTimeout(fade, 40);
        }
    })();
}