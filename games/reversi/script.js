const board = document.getElementById('chess-board');
const message = document.getElementById('message');
var turn = 1,
    $board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

windowResize();
drawChessBoard();

function windowResize () {
    const h = window.innerHeight * 0.92,
        w = window.innerWidth * 0.92;
    if (h > w) {
        board.style.width = w + 'px';
        board.style.height = w + 'px';
    } else {
        board.style.width = h + 'px';
        board.style.height = h + 'px';
    }
}
function drawChessBoard () {
        const boardPartWidth = Math.floor(board.offsetWidth / 8 - 2) + 'px';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const boardPart = document.createElement('div');
            boardPart.id = "" + i + j;
            board.className = 'boardPart';
            boardPart.style.height = boardPartWidth;
            board.appendChild(boardPart);
            boardPart.addEventListener('click', play);
        }
    }
    drawChess(3, 4);
    drawChess(4, 3);
    turn = 2;
    drawChess(3, 3);
    drawChess(4, 4);
    turn = 1;
    hint();
}
function drawChess (x, y) {
    $board[x][y] = turn;
    const chess = document.createElement('div'),
        b = document.createElement('div'),
        w = document.createElement('div');
        
        b.className = 'b';
        w.className = 'w';
        chess.className = 'chess';
        
        chess.appendChild(b);
        chess.appendChild(w);
        
        document.getElementById("" + x + y).appendChild(chess);
        
        if (turn === 2) {
            chess.classList.add('change');
        }
}

function play () {
    var target = this.id;
    
    // 玩家點擊的位置
    const x = parseInt(target.charAt(0));
    const y = parseInt(target.charAt(1));
    
    // 防止玩家點擊已翻過的棋子
    if ($board[x][y] !== 0) {return;}
    
    if (check(x, y, true)) {
        changeTurn();
        hint();
        console.log(x, y);
    }
}

function check(x, y, flip) {
    var m = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {continue;}
            let nx = x + i,
                ny = y + j,
                n = 0;
            if (nx < 0 || ny < 0 || nx > 7 || ny > 7) {continue;}
            while ($board[nx][ny] === 3 - turn) {
                nx += i;
                ny += j;
                n++;
                if (nx < 0 || ny < 0 || nx > 7 || ny > 7) {break;}
            }
            if (nx < 0 || ny < 0 || nx > 7 || ny > 7) {continue;}
            if ($board[nx][ny] === turn && n > 0) {
                m += n;
                if (flip) {
                    let nx = x + i,
                        ny = y + j;
                    while ($board[nx][ny] === 3 - turn) {
                        flipChess(nx, ny);
                        nx += i;
                        ny += j;
                    }
                } else {
                    return true;
                }
                
                
            }
        }
    }
    if (m > 0) {
        drawChess(x, y);
        return true;
    };
}

function flipChess (x, y) {
    $board[x][y] = turn;
    document.getElementById("" + x + y).firstChild.classList.toggle('change');
}

function changeTurn () {
    var b = 0,
        w = 0;
    turn = 3 - turn;
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ($board[i][j] == 0 && check(i, j, false)) {
                message.innerHTML = ((turn == 1) ? 'Black' : 'White') + '\'s Move';
                return;
            }
        }
    }
    turn = 3 - turn;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ($board[i][j] == 0 && check(i, j, false)) {
                document.getElementById('pass').style.display = 'block';
                message.innerHTML = ((turn == 1) ? 'Black' : 'White') + '\'s Move';
                setTimeout(function(){
                    document.getElementById('pass').style.display = 'none';
                }, 700);
                return;
            } else {
                if ($board[i][j] == 1) {
                    b++;
                }
                if ($board[i][j] == 2) {
                    w++;
                }
            }
        }
    }
    gameOver(b, w)
}

function gameOver (b, w) {
    if (b === w) {
        message.innerHTML = 'draw';
    } else {
        message.innerHTML = ((b > w) ? 'Black' : 'White') + ' won!<br>';
    }
    message.innerHTML += `Black: ${b} White: ${w}`;
    if (b === 13 && w === 0) {
        document.querySelector('#name').href = "./encrypted.html";
    }
}

function hint () {
    var a = document.querySelectorAll('.active');
    for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ($board[i][j] == 0 && check(i, j, false)) {
                document.getElementById('' + i + j).classList.add('active');
            }
        }
    }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    cancelKeypress = /^(116|82)$/.test("" + evt.keyCode);
    if (cancelKeypress) {
        let img = document.createElement("img");
        img.src = "https://ching367436.github.io/img/nope.jpg";
        img.style.cssText = "position:fixed;top:0;left:50%;transform:translate(-50%,0); height:100%;";
        img.onload = function(){setTimeout(function () {
            document.body.removeChild(img);
        }, 370)};
        document.body.appendChild(img);
        return false;
    }
}
