const canvas = document.getElementById('c'),
      message = document.getElementById('message'),
      mouse = {
          x: 8,
          y: 8
      },
      ctx = canvas.getContext('2d'),
      board = {
          canvasHeight: 520,
          q: 17, // 棋盤的格數
          border: 20, // 棋盤的邊界
          interval: 30 // 棋盤間隔
      };
board.interval = (board.canvasHeight - board.border * 2 ) / (board.q - 1 );
let turn = 1,
    chessData = [],
    history = [],
    gameOver = false;

canvas.height = board.canvasHeight;
canvas.width = board.canvasHeight;
initGame();
function initGame () {
    gameOver = false;
    message.innerHTML = 'Black\'s Turn'
    for (let i = 0; i < board.q; i++) {
        chessData[i] = []
        for (let j = 0; j < board.q; j++) {
            chessData[i][j] = 0;
        }
    }
    windowResize();
    drawChessboard(true);
}
const b = board.canvasHeight / canvas.offsetHeight; //座標倍數
function windowResize () {
    const h = window.innerHeight * 0.9,
        w = window.innerWidth * 0.9;
    if (h > w) {
        canvas.style.width = w + 'px';
        canvas.style.height = w + 'px';
    } else {
        canvas.style.width = h + 'px';
        canvas.style.height = h + 'px';
    }
}



canvas.addEventListener('mousemove', hoverHandler);
canvas.addEventListener('click', play);
document.getElementById('replay').addEventListener('click', initGame);
document.getElementById('repent').addEventListener('click', repent);

function repent () {
    if (history.length == 0) {return;}
    if (gameOver) {
        gameOver = false;
    }
    chessData[history[history.length - 1][0]][history[history.length - 1][1]] = 0;
    history.pop();
    message.innerHTML = (turn === 1) ? 'White\'s turn' : 'Black\'s turn';
    turn = 3 - turn;
    drawChessboard(false);
    
}
document.onkeydown = function keyboardHandler (e) {
    switch (e.keyCode) {
        case 13: // enter
            play();
            return;
            break;
        case 37: // left
            mouse.x = (mouse.x === 0) ? board.q - 1 : mouse.x - 1;
            break;
        case 38: // up
            mouse.y = (mouse.y === 0) ? board.q - 1 : mouse.y - 1;
            break;
        case 39: // right
            mouse.x = (mouse.x === board.q - 1) ? 0 : mouse.x + 1;
            break;
        case 40: // down
            mouse.y = (mouse.y === board.q - 1) ? 0 : mouse.y + 1;
            break;
    }
    drawChessboard(false);
    return false;
}

function hoverHandler (e) {
    if (mouse.x == Math.round((e.offsetX * b - board.border) / board.interval) && mouse.y == Math.round((e.offsetY * b - board.q) / board.interval)) {
        return;
    }
    mouse.x = Math.round((e.offsetX * b - board.border) / board.interval);
    mouse.y = Math.round((e.offsetY * b - board.border) / board.interval);
    if (mouse.x < 0) {mouse.x = 0;}
    if (mouse.y < 0) {mouse.y = 0;}
    if (mouse.x > board.q - 1) {mouse.x = board.q - 1;}
    if (mouse.y > board.q - 1) {mouse.y = board.q - 1;}
    drawChessboard(false);
}

function play () {
    if (chessData[mouse.x][mouse.y] !== 0 || gameOver) {return;}
    chessData[mouse.x][mouse.y] = turn;
    history.push([mouse.x, mouse.y]);
    drawChess(turn, mouse.x, mouse.y);
    checkWin(turn, mouse.x, mouse.y);
    turn = 3 - turn;
}

function drawChessboard (init) {
    ctx.clearRect(0, 0, board.canvasHeight, board.canvasHeight);
    drawLine();
    drawLocation();
    drawChing();
    if (init) {return;}
    rechess();
}

function drawChing () {
    ctx.font = 53 + 'px';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#367436';
    ctx.fillText('Created By 靚', board.canvasHeight, board.canvasHeight * 0.99);
}

function rechess () {
    for (let i = 0; i < board.q; i++) {
        for (let j = 0; j < board.q; j++) {
            if (chessData[i][j] !== 0) {
                drawChess(chessData[i][j], i, j);
            }
            
        }
    }
}
function drawLine () {
    ctx.strokeStyle = '#333';
    ctx.setLineDash([]);
    for (let i = board.border; i < board.canvasHeight; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, board.border);
        ctx.lineTo(i, board.canvasHeight - board.border);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(board.border, i);
        ctx.lineTo(board.canvasHeight - board.border, i);
        ctx.stroke();
    }
}
function drawLocation () {
    ctx.beginPath();
    ctx.setLineDash([board.interval * 0.3, board.interval * 0.2, board.interval * 0.6, board.interval * 0.2, board.interval * 0.6, board.interval * 0.2, board.interval * 0.6, board.interval * 0.2]);
    ctx.strokeStyle = '#c00';
    ctx.strokeRect((mouse.x - 0.4) * board.interval + board.border, (mouse.y - 0.4) * board.interval + board.border, board.interval * 0.8, board.interval * 0.8);
    
}
function drawChess (chess, x, y) {
    let b = ctx.createRadialGradient(x * board.interval + board.border * 0.85, y * board.interval + board.border * 0.85, board.interval * 0.1, x * board.interval + board.border * 0.95, y * board.interval + board.border * 0.95, board.interval * 0.4);
    if (chess === 1) {
        b.addColorStop(0, '#aaa');
        b.addColorStop(1, '#010000');
    } else {
        b.addColorStop(0, '#f9f9f9');
        b.addColorStop(1, '#d1d1d1');
    }
    ctx.beginPath();
    ctx.arc(board.border + x * board.interval, board.border + y * board.interval, board.interval * 0.4, 0, Math.PI * 2, true);
    ctx.fillStyle = b;
    ctx.fill();
}

function checkWin (player, x, y) {
	for (let i = -1; i < 1; i++) {
		for (let j = -1; j < 2; j++) {
			if (i == 0 && j == 0) {break;}
			let count = 0;
			let nx = x + i;
			let ny = y + j;
            if (!(nx < 0 || ny < 0 || nx === board.q || ny === board.q)) {
                while (chessData[nx][ny] == player) {
                    nx += i;
                    ny += j;
                    count++;
                    if (nx < 0 || ny < 0 || nx === board.q || ny === board.q) {break;}
                }
            }
            nx = x - i;
            ny = y - j;
            if (!(nx < 0 || ny < 0 || nx === board.q || ny === board.q)) {
                
                while (chessData[nx][ny] == player) {
                    nx -= i;
                    ny -= j;
                    count++;
                    if (nx < 0 || ny < 0 || nx === board.q || ny === board.q) {break;}
                }
            }
			if (count == 4) {
				gameOver = true;
                message.innerHTML = (turn === 1) ? '黑棋勝利!' : '白棋勝利!';
				return;
			}
		}
	}
	
    message.innerHTML = (turn === 1) ? 'White\'s turn' : 'Black\'s turn';
}
