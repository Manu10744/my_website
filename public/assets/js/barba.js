const transition = document.querySelector(".transition-container");

barba.init({
    preventRunning: true,
    transitions: [{
        sync: true,
        async leave(data) {
            const done = this.async();
            leaveAnimation();

            await delay(1300);
            done();
        },

        async enter(data) {
            enterAnimation();
        }
      }]
})

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n)
    })
}

function enterAnimation() {
    
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
