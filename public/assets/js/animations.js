/*   					
   ANIMATIONS ON SCROLL 
*/
const revealables = document.querySelectorAll(".revealable");
const ANIMATION_STAGGER_AMOUNT = 300;
const ANIME_ANIMATION_DURATION = 800;

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
		animationDelay += ANIMATION_STAGGER_AMOUNT;

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
			case "timeline": 
				timelineAnimation(element, animationDelay);
				break;
			case "revealTextFromOverflow": 
				revealUpFromOverflow(element, animationDelay);
				break;
			case "scaleXFromLeft":
				scaleXFromLeft(element, animationDelay);
				break;
			case "scaleXFromRight": 
				scaleXFromRight(element, animationDelay);
				break;
			case "textRevealFromOverflow":
				revealUpFromOverflow(element, animationDelay);
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
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeUp(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateY: ['50px', '0px'],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeFromLeft(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateX: ['-100px', '0px'],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeFromRight(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		translateX: ['100px', '0px'],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function fadeAndZoomIn(element, animationDelay) {
	anime({
		targets: element,
		opacity: [0, 1],
		scale: [0, 1],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad'
	})
}

function scaleXFromLeft(element, animationDelay) {
	anime({
		targets: element, 
		opacity: [0, 1],
		scaleX: [0, 1],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad',
		begin: () => { element.style.transformOrigin = 'left'; }
	})
}

function scaleXFromRight(element, animationDelay) {
	anime({
		targets: element, 
		opacity: [0, 1],
		scaleX: [0, 1],
		duration: ANIME_ANIMATION_DURATION,
		delay: animationDelay,
		easing: 'easeInQuad',
		begin: () => { element.style.transformOrigin = 'right'; }
	})
}

function revealUpFromOverflow(element, animationDelay) {
	// Wrap Element into a Wrapper with Overflow hidden
	let wrapper = document.createElement("div");
	wrapper.style.overflowY = "hidden";
	element.parentNode.insertBefore(wrapper, element);
	wrapper.appendChild(element);

	anime({
		targets: element,
		translateY: ['110%', '0'],
		opacity: [0, 1],
		delay: animationDelay,
		duration: ANIME_ANIMATION_DURATION + 200,
		easing: 'easeOutCubic'
	})
}

/* /////////////////////////////////////// */
/* 	   TIMELINE ANIMATION RELATED CODE	   */

/**
 * Reveals the timeline from top to bottom by using CSS KeyFrames Animation.
 * Not possible with AnimeJS, as the timeline is a :before (pseudo) element of
 * the timeline container.
 */
function timelineAnimation(element, animationDelay) {
	element.style.opacity = 1;
	element.classList.add('animate-timeline-scaleY');
}