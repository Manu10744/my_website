const selectBtn = document.querySelector(".select-language button");
const selectionIndicator = document.querySelector(".selection-indicator");
const languageOptions = document.querySelector(".language-options");

selectBtn.addEventListener("click", () => {
    if (selectBtn.style.color != 'lightskyblue') {
        selectBtn.style.color = 'lightskyblue';
    } else {
        selectBtn.style.color = '#f7f7f7';
    }

    selectionIndicator.classList.toggle("selection-activated");
    expandLangOptions();
})

// Calculate and set the proper height for the CSS slide down animation
function expandLangOptions() {
    if (!languageOptions.style.height || languageOptions.style.height == '0px') { 
        languageOptions.style.height = Array.prototype.reduce.call(languageOptions.childNodes, function(p, c) {return p + (c.offsetHeight || 0);}, 0) + 'px';
    } else {
        languageOptions.style.height = '0px';
    }
}