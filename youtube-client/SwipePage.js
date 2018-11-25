function swipePage() {
  let touchStartCoords = { x: -1, y: -1 };


  let touchEndCoords = { x: -1, y: -1 }; let 
    direction = 'undefined'; const 
    minDistanceXAxis = 30; const 
    maxDistanceYAxis = 30; const 
    maxAllowedTime = 1000; let 
    startTime = 0; let 
    elapsedTime = 0; const 
    uElement = document.getElementsByClassName('videos-list')[0];

  function swipeStart(e) {
    e = e || window.event;
    e = ('changedTouches' in e) ? e.changedTouches[0] : e;
    touchStartCoords = { x: e.pageX, y: e.pageY };
    startTime = new Date().getTime();
  }

  function swipeMove(e) {
    e = e || window.event;
    e.preventDefault();
  }

  function swipeEnd(e) {
    e = e || window.event;
    e = ('changedTouches' in e) ? e.changedTouches[0] : e;
    touchEndCoords = { x: e.pageX - touchStartCoords.x, y: e.pageY - touchStartCoords.y };
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= maxAllowedTime) {
      if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis) {
        direction = (touchEndCoords.x < 0) ? 'left' : 'right';
        switch (direction) {
          case 'left':
            turnPage('right');
            break;
          case 'right':
            turnPage('left');
            break;
          default:
            break;
        }
      }
    }
  }

  function addMultipleListeners(el, s, fn) {
    const evts = s.split(' ');
    for (let i = 0, iLen = evts.length; i < iLen; i++) {
      el.addEventListener(evts[i], fn, false);
    }
  }

  addMultipleListeners(uElement, 'mousedown touchstart', swipeStart);
  addMultipleListeners(uElement, 'mousemove touchmove', swipeMove);
  addMultipleListeners(uElement, 'mouseup touchend', swipeEnd);
}
