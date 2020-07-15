import { fadeIn, fadeOut } from './mobile-navigation.js';
import { typewriterList, Typewriter } from './typewriter.js';
import { languageMap, showLanguageOptions, hideLanguageOptions, showConfirmButton } from './select-language.js';
import { observer } from './animations.js';

const transition = document.querySelector(".transition-container");

// --- BarbaJS Configurations --- //
barba.init({
    debug: true,
    preventRunning: true,
    transitions: [
        {
            name: 'default-transition',
            sync: true,
            async leave(data) {
                // Dont show the new container until transition is at 50%
                data.next.container.style.display = 'none';
                const done = this.async();
                leaveAnimation();

                await delay(1300);
                done();

                // Page transition is 50% and ready to switch containers, so show next container
                data.next.container.style.display = 'block';
            },
        }]
})

barba.hooks.after((data) => {
    reinitNavigationListeners();
    reinitLanguageSelectionListeners();
    reinitTypewriters();
    reinitIntersectionObserver();
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

/**
 * @return true if barba is transitioning
 * @return false if barba is not transitioning
 */
export function barbaIsRunning() {
    return barba.transitions.isRunning;
}

function reinitNavigationListeners() {
    const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
    const pageWrapper = document.querySelector(".page-wrapper");
    const navigation = document.querySelector(".navigation");
    const navLinks = document.querySelectorAll(".navigation li");

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
}

function reinitLanguageSelectionListeners() {
    const languageModal = document.querySelector(".language-modal-container");
    const showOptionsBtn = document.querySelector(".show-options-btn");
    const selectLanguageBtn = document.querySelector(".language-selection button");
    const languageOptions = document.querySelectorAll(".language-option");
    const closeModalBtn = document.querySelector(".close-modal-btn");
    const confirmLanguageBtn = document.querySelector(".confirm-btn");

    closeModalBtn.addEventListener("click", () => {
        anime.timeline({
            easing: 'easeInQuad'
        }).add({
            targets: '.language-modal-container',
            opacity: [1, 0],
            duration: 400
        }).add({
            targets: '.language-modal-container .modal',
            scale: [1, 0],
            duration: 200,
            complete: () => { languageModal.style.display = ''; }
        }, '-=400')
    })

    selectLanguageBtn.addEventListener("click", () => {
        anime.timeline({
            easing: 'easeInQuad'
        }).add({
            targets: '.language-modal-container',
            opacity: [0, 1],
            duration: 600,
            begin: () => { languageModal.style.display = 'flex'; }
        }).add({
            targets: '.language-modal-container .modal',
            scale: [0, 1],
            opacity: [0, 1],
            rotate: ['90deg', '0deg'],
            translateY: ['800px', '0px'],
            duration: 1000
        }, '-=1000')
    })

    showOptionsBtn.addEventListener("click", () => {
        if (languageOptions[0].style.opacity == 0) {
            showLanguageOptions();
        } else {
            // Language options are shown, so hide them
            hideLanguageOptions();
        }
    })

    languageOptions.forEach((option) => {
        option.addEventListener("click", () => {
            let language = option.innerText;
            showOptionsBtn.innerText = language;

            hideLanguageOptions();
            showConfirmButton();
        })
    })

    confirmLanguageBtn.addEventListener("click", () => {
        let selectedLanguage = showOptionsBtn.innerText;
        let languagePrefix = languageMap.get(selectedLanguage)

        location.href = '/' + languagePrefix;
    });
}

function reinitTypewriters() {
    typewriterList.forEach((el, idx) => { typewriterList[idx] = null; })
    typewriterList.splice(0, typewriterList.length);

    document.querySelectorAll('.typewriter').forEach((twElement) => {
        let typewriter = new Typewriter(twElement, 35);
        typewriterList.push(typewriter);
    });
}

function reinitIntersectionObserver() {
    const revealables = document.querySelectorAll(".revealable");
    for (const element of revealables) {
        observer.observe(element);
    }
}