import { barbaIsRunning } from './barbaConfig.js';

export const typewriterList = [];
const typewriters = document.querySelectorAll(".typewriter");

/**
 * Creates a Typewriter object
 * @param {*} el The element that the typewriter effect is applied on
 * @param {*} speed The desired typing speed
 */
export const Typewriter = function(el, speed) {
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
  if (isInViewport(this.el) && !barbaIsRunning()) {
    if (!this.el.classList.contains("revealable") || this.el.classList.contains("revealable") && this.el.style.opacity > 0) {
      this.currValue = this.wordsToPrint.substring(0, this.currValue.length + 1);
      this.el.innerHTML = this.currValue;
    }
  }

  let timeout = setTimeout(() => { this.type(); }, 40);
  
  // End Timeout as soon as typewriter is finished typing
  if (this.el.innerText == this.wordsToPrint) {
    clearTimeout(timeout);
  }
}


function isInViewport(element) {
  let elemTop = element.getBoundingClientRect().top;
  let elemDown = element.getBoundingClientRect().bottom;

  let isVisible = (elemTop >= 0) && (elemDown <= window.innerHeight);

  if (isVisible) return true;
}

// Create a Typewriter object for every HTMLElement with class 'typewriter'
typewriters.forEach((twElement) => {
  let typewriter = new Typewriter(twElement, 35);
  typewriterList.push(typewriter);
})
