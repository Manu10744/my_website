const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
const pageWrapper = document.querySelector(".page-wrapper");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation li");

mobileNavToggler.addEventListener("click", activateMobileNavigation)

function activateMobileNavigation() {
    mobileNavToggler.classList.toggle("mobile-nav-active");

    if (navigation.style.display == '' || navigation.style.display == 'none') {
        navigation.style.touchAction = 'none';
        fadeIn(navigation, 400);


        navLinks.forEach((link, index) => {
            index == 0 ? link.style.animation = `slideLinksIn 0.5s` : link.style.animation = `slideLinksIn ${0.5 + (index / 5)}s`;
        })
    } else { 
        navLinks.forEach((link, index) => {
            index == 0 ? link.style.animation = `slideLinksOut 0.5s` : link.style.animation = `slideLinksOut ${0.5 + (index / 5)}s`;
        })
        
        fadeOut(navigation, 400);
        navigation.style.touchAction = 'auto';
    }

    pageWrapper.classList.toggle("blurred");
}

/**
 * Fades an element in by using its opacity.
 * @param {*} element The element to fade in
 * @param {*} duration The desired duration
 */
export function fadeIn(element, duration) {
   let opacity = 0;
   element.style.opacity = opacity;
   element.style.display = "block";

   let timer = setInterval(() => {
       if (opacity >= 1.0) {
           clearInterval(timer);
       }

       element.style.opacity = opacity;
       opacity = opacity + 0.1;
   }, duration / 10);
}

/**
 * Fades an element out by using its opacity.
 * @param {*} element The element to fade out
 * @param {*} duration The desired duration
 */
export function fadeOut(element, duration) {
    element.style.opacity = 1;

    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = "none";
        } else {
            setTimeout(fade, duration / 10);
        }
    })();
}