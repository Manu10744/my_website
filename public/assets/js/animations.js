const splashWindow = document.querySelector(".splash-screen");
const heading = document.querySelector('.heading');
const subtitle = document.querySelector('.subtitle');

// Animation for the Welcome Screen
// Wrap every letter in a span and animate them
heading.innerHTML = heading.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
subtitle.innerHTML = subtitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

if (document.cookie.indexOf('visited=', 0) == 0) {
	welcomeScreenAnimation();
}

function welcomeScreenAnimation() {
	anime.timeline({ loop: false })
		.add({
			targets: '.splash-text .line',
			opacity: [0.5, 1],
			scaleX: [0, 1],
			easing: "easeInOutExpo",
			duration: 700
		})
		.add({
			targets: '.splash-text .line',
			duration: 600,
			easing: "easeOutExpo",
			translateY: (el, i) => (-1.2 + 1.2 * 2 * i) + "em"
		})
		.add({
			targets: '.splash-text .letter',
			translateX: [40, 0],
			translateZ: 0,
			opacity: [0, 1],
			easing: "easeOutExpo",
			duration: 1200,
			delay: (el, i) => 500 + 30 * i
		}, "-=800").add({
			targets: '.splash-text .letter',
			translateX: [0, -30],
			opacity: [1, 0],
			easing: "easeInExpo",
			duration: 1100,
			delay: (el, i) => 100 + 30 * i
		}, "-=1100").add({
			targets: '.splash-text .line',
			duration: 600,
			easing: "easeOutExpo",
			opacity: [1, 0]
		}).add({
			targets: '.splash-screen',
			opacity: [1, 0],
			duration: 1100,
			complete: () => {
				splashWindow.style.display = 'none';
			}
		})
}

/*   					
   ANIMATIONS ON SCROLL 
*/
const revealables = document.querySelectorAll(".revealable");
let observerConfig = {
	rootMargin: '-70px'
}

export const observer = new IntersectionObserver((entries) => {
	let intersectedElements = [];
	let animationDelay = 0;

	for (const entry of entries) {
		if (entry.isIntersecting) {
			intersectedElements.push(entry.target);
		}
	}

	for (const element of intersectedElements) {
		animationDelay += 200;

		let revealType = element.getAttribute("data-reveal-type");
		
		switch (revealType) {
			case "fade":
				fade(element, animationDelay);
				break;
			case "fadeUp": 
				fadeUp(element, animationDelay); 
				break;
			case "fadeFromLeft": 
				fadeFromLeft(element, animationDelay); 
				break;
			case "fadeFromRight": 
				fadeFromRight(element, animationDelay);
				break;
			case "fadeAndZoomIn": 
				fadeAndZoomIn(element, animationDelay);
				break;
		}

		observer.unobserve(element);
	}

}, observerConfig);

for (const element of revealables) {
	observer.observe(element);
}

function fade(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		duration: 800,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeUp(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateY: ['50px', '0px'],
		duration: 800,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeFromLeft(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateX: ['-100px', '0px'],
		duration: 800,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeFromRight(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateX: ['100px', '0px'],
		duration: 800,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeAndZoomIn(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		scale: [0, 1],
		duration: 800,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}