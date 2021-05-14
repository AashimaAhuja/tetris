(function() {
  let eleList = document.getElementById('bricks');
  let eleBoard = document.getElementsByClassName('board')[0];
  let eleBall = document.getElementsByClassName('ball')[0];
  console.log(eleList);
  var d = document.createDocumentFragment();

  for (let i = 0; i < 50; i++) {
    let eleBrick = document.createElement('div');
    eleBrick.setAttribute('class', 'brick');
    d.appendChild(eleBrick);
  }
  eleList.appendChild(d);

  let pos = 0;

  function getCordinates(elem) {
    const { x, y, width, height } = elem.getBoundingClientRect();
    return { x, y, width, height };
  }

  function moveLeft(e) {
    console.log(e.code);
    if (e.code == 'ArrowLeft') {
      // eleBoard.style.transform = "translateX('10px')";
      // eleBoard.animate({ left: '10px' });
      pos -= 10;
      eleBoard.style.left = `${pos}px`;
    }
  }
  function moveRight(e) {
    console.log(e.code);
    if (e.code == 'ArrowRight') {
      pos += 10;
      eleBoard.style.left = `${pos}px`;
    }
  }

  let dir = [1, -1];
  let { x, y } = getCordinates(eleBall);
  let vh = window.innerHeight - eleBall.offsetHeight;
  let vw = window.innerWidth - eleBall.offsetHeight;

  let { x: boardX, y: boardY, width: boardWidth } = getCordinates(eleBoard);
  let {
    x: brickX,
    y: brickY,
    width: brickXWidth,
    height: brickHeight
  } = getCordinates(eleList);

  let id = setInterval(() => {
    x = x + dir[0] * 2;
    y = y + dir[1] * 2;

    if (x >= boardX && x <= boardX + boardWidth && y == boardY)
      dir = [dir[0], -1];
    if (x >= vw) dir = [-1, dir[1]];
    if (x == 0) dir = [1, dir[1]];

    if (
      x >= brickX &&
      x <= brickX + brickXWidth &&
      y >= brickY &&
      y <= brickY + brickHeight
    ) {
      let pointEl = document.elementFromPoint(x, y);

      if (pointEl && pointEl.classList.contains('brick')) {
        dir = [dir[0], 1];
        console.log(pointEl);
        pointEl.style.display = 'none';
      }
    }
  }, 16.7);

  function renderFrame() {
    eleBall.style.left = x;
    eleBall.style.top = y;

    requestAnimationFrame(renderFrame);
  }

  // renderFrame();
  document.addEventListener('keyup', moveLeft);
  document.addEventListener('keyup', moveRight);
})();
