const typewriters = document.querySelectorAll(".typewriter");
import { barbaIsRunning } from './barbaConfig.js';

export const typewriterList = [];

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
    this.currValue = this.wordsToPrint.substring(0, this.currValue.length + 1);
    this.el.innerHTML = this.currValue;
  }

  setTimeout(() => { this.type(); }, 40);
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
