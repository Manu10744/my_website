const Typewriter = function(element, wordsToPrint, condition) {
    this.element = element;
    this.wordsToPrint = wordsToPrint;
    this.condition = condition;
    this.currValue = '';
    this.type();
}

// Method for the typing effect
Typewriter.prototype.type = function() {
    if (this.condition == null || this.condition != null && this.condition()) {
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
    
    // Clear text of elements
    programmingTW.element.innerHTML = '';
    personalInfoTW.element.innerHTML = '';

    const hasScrolledEnough = function() {
        if (document.scrollingElement.scrollTop > 400) return true
        else return false;
    }

    // Create Typewriters
    new Typewriter(programmingTW.element, programmingTW.content, hasScrolledEnough); 
    new Typewriter(personalInfoTW.element, personalInfoTW.content, null);
}

