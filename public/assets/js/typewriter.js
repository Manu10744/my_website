const Typewriter = function(element, wordsToPrint, wait = 3000) {
    this.element = element;
    this.wordsToPrint = wordsToPrint;
    this.currValue = '';
    this.currentIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
}

// Method for the typing effect
Typewriter.prototype.type = function() {
    // Add char to the element
    this.currValue = this.wordsToPrint.substring(0, this.currValue.length + 1);
    this.element.innerHTML = this.currValue;

    setTimeout(() => this.type(), 80);
}

// Set up Typewriters after DOM is loaded
document.addEventListener("DOMContentLoaded", init);

function init() {
    const programmingTW = {
        element: document.querySelector(".programming-languages h1"),
        content: document.querySelector(".programming-languages h1").innerHTML
    }

    const personalInfoTW = {
        element: document.querySelector(".personal-information h1"),
        content: document.querySelector(".personal-information h1").innerHTML
    }
    
    // Clear text of elements
    programmingTW.element.innerHTML = '';
    personalInfoTW.element.innerHTML = '';

    // Create Typewriters
    new Typewriter(programmingTW.element, programmingTW.content); 
    new Typewriter(personalInfoTW.element, personalInfoTW.content);
}

