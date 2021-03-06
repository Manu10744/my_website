if (document.querySelector('.tech-glider')) {
    new Glide('.tech-glider', {
        perView: 6,
        bound: false,
        autoplay: 2000,
        hoverpause: true,
        touchRatio: 1,
        breakpoints: {
            480: {
                perView: 3
            },
            768: {
                perView: 4
            },
            1080: {
                perView: 5
            }
        }
    }).mount();
}