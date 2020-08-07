new Glider(document.querySelector(".glider"), {
  slidesToShow: 'auto',
  itemWidth: 400,
  // dots: '#dots',
  draggable: true,
  exactWidth: true,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next',
  }, 
  responsive: [
    {
      // screens greater than >= 1024px
      breakpoint: 1079,
      settings: {
        itemWidth: 1000,
        dragVelocity: 1.75
      }
    }
  ]
})    
