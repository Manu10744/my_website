const mobileNavToggler = document.querySelector(".mobile-nav-toggler");
const navigation = document.querySelector(".navigation");

mobileNavToggler.addEventListener("click", activateMobileNavigation)

function activateMobileNavigation() {
    // Only activate mobile navigation when no other elements are being animated
    if (anime.running.length == 0) {
        mobileNavToggler.classList.toggle("mobile-nav-active");

        if (navigation.style.display == '' || navigation.style.display == 'none') {
            navigation.style.touchAction = 'none';            
            fadeNavigationIn();
        } else { 
            fadeNavigationOut();
            navigation.style.touchAction = 'auto';
        }
    }
}

export function fadeNavigationIn() {
    anime.timeline({ easing: 'easeInQuad' })
        .add({
            targets: '.navigation',
            opacity: [0, 1],
            duration: 800,
            begin: () => { 
                document.querySelector(".navigation").style.display = 'block'; 
            }
        })
        .add({
            targets: '.navigation ul li',
            translateX: ['-100%', '0%'],
            delay: anime.stagger(100)
        }, '-=1400')
        .add({
            targets: '.navigation-personal-info-wrapper',
            easing: 'easeOutQuad',
            opacity: [0, 1],
            translateY: ['50px', '0px']
        })
        .add({
            targets: '.navigation-social-container',
            translateY: ['50px', '0px'],
            easing: 'easeOutQuad',
            opacity: [0, 1],
            delay: anime.stagger(150)
        }, '-=1000')
}

export function fadeNavigationOut() {
    anime.timeline({ easing: 'easeOutQuad' })
        .add({
            targets: '.navigation ul li',
            translateX: ['0%', '-100%'],
            delay: anime.stagger(100)
        }, '-=800')
        .add({
            targets: '.navigation-personal-info-wrapper',
            opacity: [1, 0],
        })
        .add({
            targets: '.navigation',
            opacity: [1, 0],
            complete: () => { 
                document.querySelector(".navigation").style.display = ''; 
            }
        })
}