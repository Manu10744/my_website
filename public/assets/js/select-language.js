const languageModal = document.querySelector(".language-modal-container");
const showOptionsBtn = document.querySelector(".show-options-btn");
const selectLanguageBtn = document.querySelector(".language-selection button");
const languageOptions = document.querySelectorAll(".language-option");
const closeModalBtn = document.querySelector(".close-modal-btn");
const confirmLanguageBtn = document.querySelector(".confirm-btn");

export const languageMap = new Map();
languageMap.set("Deutsch", "de");
languageMap.set("English", "en");

/**
 * Closes the language selection modal
 */
closeModalBtn.addEventListener("click", () => { 
  anime.timeline({
    easing: 'easeInQuad'
  })
  .add({
    targets: '.language-modal-container',
    opacity: [1, 0],
    duration: 400
  }).add({
    targets: '.language-modal-container .modal',
    scale: [1, 0],
    duration: 200,
    complete: () => { languageModal.style.display = ''; }
  }, '-=400')
})

/**
 * Opens the language selection modal
 */
selectLanguageBtn.addEventListener("click", () => {
    anime.timeline({
        easing: 'easeInQuad'
      })
      .add({
        targets: '.language-modal-container',
        opacity: [0, 1],
        duration: 600,
        begin: () => { languageModal.style.display = 'flex'; }
      }).add({
        targets: '.language-modal-container .modal',
        scale: [0, 1],
        opacity: [0, 1],
        rotate: ['90deg', '0deg'],
        translateY: ['800px', '0px'],
        duration: 1000
      }, '-=1000')
})

/**
 * Reveals or hides the available language options, depending on their opacity value
 */
showOptionsBtn.addEventListener("click", () => {
  if (languageOptions[0].style.opacity == 0) {
    showLanguageOptions();
  } else {
    // Language options are shown, so hide them
    hideLanguageOptions();
  }
})

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    let language = option.innerText;
    showOptionsBtn.innerText = language;

    hideLanguageOptions();
  })
})

confirmLanguageBtn.addEventListener("click", () => { 
  let selectedLanguage = showOptionsBtn.innerText;
  let languagePrefix = languageMap.get(selectedLanguage)

  location.href = '/' + languagePrefix;
});

export function showLanguageOptions() {
  anime({
    targets: '.language-option',
    opacity: [0, 1],
    easing: 'easeInQuad',
    duration: 200,
    delay: anime.stagger(100),
    begin: () => { document.querySelectorAll(".language-option").forEach((option) => { option.style.display = 'block'; })}
  })
}

export function hideLanguageOptions() {
  anime({
    targets: '.language-option',
    opacity: [1, 0],
    easing: 'easeInQuad',
    duration: 200,
    delay: anime.stagger(100),
    complete: () => { document.querySelectorAll(".language-option").forEach((option) => { option.style.display = ''; })}
  })
}