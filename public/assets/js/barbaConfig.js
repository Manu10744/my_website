import { fadeIn, fadeOut } from './mobile-navigation.js';
import { typewriterList, Typewriter } from './typewriter.js';

const transition = document.querySelector(".transition-container");

// --- BarbaJS Configurations --- //
barba.init({
    debug: true,
    preventRunning: true,
    transitions: [{
        name: 'default-transition',
        sync: true,
        async leave(data) {
            const done = this.async();
            leaveAnimation();

            await delay(1300);
            done();
        },
      }]
})

barba.hooks.after((data) => {
    // Reinitialize Event Listeners
    const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
    const pageWrapper = document.querySelector(".page-wrapper");
    const navigation = document.querySelector(".navigation");
    const navLinks = document.querySelectorAll(".navigation li");

    console.log(mobileNavToggler);

    mobileNavToggler.addEventListener("click", () => {
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
    });

    const welcomeWrapper = document.querySelector(".welcome-wrapper");
    window.addEventListener("scroll", () => {
        wrapperHeight = welcomeWrapper.offsetHeight;
        scrollHeight = window.scrollY;

        welcomeWrapper.style.opacity = (scrollHeight == 0) ? 1 : 1 - ((scrollHeight / wrapperHeight) / 2);
    })

    // Reinitialize Typewriters
    typewriterList.forEach((el, idx) => { typewriterList[idx] = null; })
    typewriterList.splice(0, typewriterList.length);
    document.querySelectorAll('.typewriter').forEach((twElement) => {
        let typewriter = new Typewriter(twElement, 35);
        typewriterList.push(typewriter);

        console.log(typewriterList);
    })
}) 


// --- Custom Code --- //
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n)
    })
}

function leaveAnimation() {
    let tl = anime.timeline({
        easing: 'easeInCubic'
    })

    tl.add({
        targets: '.navigation ul li',
        opacity: [1, 0],
        translateY: ['0px', '100px'],
        duration: 300,
        delay: anime.stagger(75),
    })

    tl.add({
        targets: '.transition-container',
        opacity: [0, 1],
        duration: 600,
        begin: () => { transition.style.display = 'block'; },
    }, '-=300')

    tl.add({
        targets: '.transition-container',
        opacity: [1, 0],
        duration: 600,
        complete: () => { transition.style.display = ''; }
    })

    tl.add({
        targets: '.navigation ul li',
        opacity: [0, 1],
        translateY: ['100px', '0px'],
        duration: 100,
        delay: anime.stagger(75)
    }, '-=600')
}

export function barbaIsRunning() {
    return barba.transitions.isRunning;
}