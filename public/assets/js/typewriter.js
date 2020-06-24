const typewriters = document.querySelectorAll(".typewriter");

/**
 * Creates a Typewriter object
 * @param {*} el The element that the typewriter effect is applied on
 * @param {*} speed The desired typing speed
 */
const Typewriter = function(el, speed) {
  this.el = el;
  this.wordsToPrint = el.innerText;
  this.currValue = '';
  this.speed = speed;

  this.el.innerText = '';
  this.type();
}

/**
 * Typing method for the typewriter effect
 */
Typewriter.prototype.type = function() {
  if (isInViewport(this.el)) {
    this.currValue = this.wordsToPrint.substring(0, this.currValue.length + 1);
    this.el.innerHTML = this.currValue;
  }

  setTimeout(() => { this.type(); }, this.speed);
}


function isInViewport(element) {
  let elemTop = element.getBoundingClientRect().top;
  let elemDown = element.getBoundingClientRect().bottom;

  let isVisible = (elemTop >= 0) && (elemDown <= window.innerHeight);

  if (isVisible) return true;
}

// Create a Typewriter object for every HTMLElement with class 'typewriter'
typewriters.forEach((twElement) => {
  let test = new Typewriter(twElement, 35);
})
