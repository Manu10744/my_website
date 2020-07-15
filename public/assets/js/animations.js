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