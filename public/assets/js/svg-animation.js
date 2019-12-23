var { tween, physics, styler, easing, value } = window.popmotion;

function init() {
  const circleStyler = styler(document.getElementById('tick-outline-path'));
  const tickStyler = styler(document.getElementById('tick-path'));
  
  function showTick() {
    // Complete outline
    tween({
      from: circleStyler.get('pathLength'),
      to: 100
    }).start(circleStyler.set('pathLength'));
    
    tween().start((v) => tickStyler.set({
      opacity: v,
      pathLength: v * 100
    }));
  }
  
  tween({ ease: easing.easeIn }).start({
    update: (v) => circleStyler.set({
      opacity: v,
      pathLength: v * 45
    }),
    complete: () => physics({ velocity: -400 })
      .start(circleStyler.set('rotate'))
  });
  
  // Emulate data received after delay
  setTimeout(showTick, 2000);
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
