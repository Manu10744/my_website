const Typewriter = function(element, wordsToPrint) {
    this.element = element;
    this.wordsToPrint = wordsToPrint;
    this.currValue = '';
    this.type();
}

const isInViewport = function isInViewport(element) {
    let elemTop = element.getBoundingClientRect().top;
    let elemDown = element.getBoundingClientRect().bottom;

    let isVisible = (elemTop >= 0) && (elemDown <= window.innerHeight);

    if (isVisible) return true;
}

// Method for the typing effect
Typewriter.prototype.type = function() {
    if (isInViewport(this.element)) {
        // Add char to the element
        this.currValue = this.wordsToPrint.substring(0, this.currValue.length + 1);
        this.element.innerHTML = this.currValue;
    }

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

    const myWayTW = {
        element: document.querySelector(".way-into-it h1"),
        content: document.querySelector(".way-into-it h1").innerHTML
    }
    
    
    // Clear text of elements
    programmingTW.element.innerHTML = '';
    personalInfoTW.element.innerHTML = '';
    myWayTW.element.innerHTML = '';

    // Create Typewriters
    new Typewriter(programmingTW.element, programmingTW.content); 
    new Typewriter(personalInfoTW.element, personalInfoTW.content);
    new Typewriter(myWayTW.element, myWayTW.content);
}

