(function() {
  let speed = 3;
  let eleList = document.getElementById('bricks');
  let eleBoard = document.getElementsByClassName('board')[0];
  let eleBall = document.getElementsByClassName('ball')[0];

  let vh = window.innerHeight - eleBall.offsetHeight;
  let vw = window.innerWidth - eleBall.offsetHeight;

  let {
    x: boardX,
    y: boardY,
    width: boardWidth,
    right: boardRight
  } = getCordinates(eleBoard);

  var d = document.createDocumentFragment();

  for (let i = 0; i < 50; i++) {
    let eleBrick = document.createElement('div');
    eleBrick.setAttribute('class', 'brick');
    d.appendChild(eleBrick);
  }
  eleList.appendChild(d);

  function getCordinates(elem) {
    const { x, y, width, height, right } = elem.getBoundingClientRect();
    return { x, y, width, height, right };
  }

  function moveLeft(e) {
    console.log(e.code);
    if (e.code == 'ArrowLeft') {
      if (boardX - 10 >= 0) boardX -= 10;
      eleBoard.style.left = `${boardX}px`;
    }
  }
  function moveRight(e) {
    if (e.code == 'ArrowRight') {
      // if (boardX + boardWidth < vw) boardX += 10;
      // if (boardX + boardWidth >= vw) {
      //   boardX = vw - boardWidth;
      // }

      boardX += 10;
      eleBoard.style.left = `${boardX}px`;
    }
  }

  function resetGame() {
    console.log('game resetted');
    eleBoard.style.left = 'calc(50% - 40px)';
    x = 'calc(50% - 8px)';
    y = null;
  }

  let dir = [1, -1];
  let { x, y } = getCordinates(eleBall);

  let {
    x: brickX,
    y: brickY,
    width: brickXWidth,
    height: brickHeight
  } = getCordinates(eleList);

  let id = setInterval(() => {
    x = x + dir[0] * speed;
    y = y + dir[1] * speed;

    if (y - eleBall.offsetHeight > vh) {
      clearTimeout(id);
      resetGame();
    }
    if (x >= boardX && x <= boardX + boardWidth && y >= boardY && y <= vh)
      dir = [dir[0], -1];
    if (x >= vw) dir = [-1, dir[1]];
    if (x <= 0) dir = [1, dir[1]];

    if (
      x >= brickX &&
      x <= brickX + brickXWidth &&
      y >= brickY &&
      y <= brickY + brickHeight
    ) {
      let pointEl = document.elementFromPoint(x, y);

      if (pointEl && pointEl.classList.contains('brick')) {
        dir = [dir[0], 1];
        pointEl.classList.remove('brick');
        pointEl.classList.add('broken-brick');
      }
    }
  }, 16.7);

  function renderFrame() {
    eleBall.style.left = x;
    eleBall.style.top = y;

    requestAnimationFrame(renderFrame);
  }

  renderFrame();
  document.addEventListener('keydown', moveLeft);
  document.addEventListener('keydown', moveRight);
})();
