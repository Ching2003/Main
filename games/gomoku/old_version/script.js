const canvas = document.getElementById("myCanvas"),
	turn = document.getElementById("turn"),
	back = document.getElementById("back"),
	playAgain = document.getElementById("playAgain"),
	ctx = canvas.getContext("2d");
let step,
	chessData = [],
	gameOver = true;

start ();
function start () {
	if (gameOver==false){alert("還沒分出勝負");return;}
	step = 0,
	chessData = [],
	gameOver = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
	for (let i = 0; i < 27; i++) {
		chessData[i] = [];
		for (let j = 0; j < 27; j++) {
			chessData[i][j] = 0;
		}
	}
}


function draw () { // draw chess board
	
	canvas.style.backgroundColor = "#ccf";
	for (let i = 0; i <= 750; i += 30) {
		ctx.beginPath(); // draw x
		ctx.moveTo(0, i)
		ctx.lineTo(750, i);
		ctx.stroke();
		
		
		ctx.beginPath(); // draw y
		ctx.moveTo(i, 0)
		ctx.lineTo(i, 750);
		ctx.stroke();
	}
}

function drawChess (chess, x, y) {
	if (chess == 1) {
		ctx.beginPath();
		ctx.arc(x * 30, y * 30, 13, 0, 2*Math.PI);
		ctx.fillStyle="#000";
		ctx.fill();
	} else {
		ctx.beginPath();
		ctx.arc(x * 30, y * 30, 13, 0, 2*Math.PI);
		ctx.fillStyle="#fff";
		ctx.fill();
	}
}

function play (e) {
	let x = Math.round(e.pageX / 30); // count where player click
	let y = Math.round(e.pageY / 30);
	if (!chessData[x][y] == 0 && e.altKey != true || gameOver) { // 防止下在以下過的地方 || draw
		return;
	}
	// check turn
		drawChess (1 + step % 2, x, y);
		chessData[x][y] = 1 + step % 2;
		checkWin (1 + step % 2, x, y);
	
	step++;
}

function checkWin (player, x, y) {
	for (let i = -1; i < 1; i++) {
		for (let j = -1; j < 2; j++) {
			if (i == 0 && j == 0) {break;}
			let count = 0;
			let nx = x + i;
			let ny = y + j;
			while (chessData[nx][ny] == player) {
				nx += i;
				ny += j;
				count++;
			}
			nx = x - i;
			ny = y - j;
			while (chessData[nx][ny] == player) {
				nx -= i;
				ny -= j;
				count++;
			}
			if (count == 4) {
				gameOver = true;
				if (player == 1) {
					turn.innerHTML = "黑棋勝利";
				} else {
					turn.innerHTML = "白棋勝利";
				}
				return;
			}
		}
	}
	if (player == 1) {
		turn.innerHTML = "輪到白棋";
	} else {
		turn.innerHTML = "輪到黑棋";
	}
	
}

var cancelKeypress = false;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    cancelKeypress = /^(116|82)$/.test("" + evt.keyCode);
    if (cancelKeypress) {
		//start();
        return false;
    }
};
canvas.addEventListener("click", play);
playAgain.addEventListener("click", start);
back.addEventListener("click", function (e) {
	let img = document.createElement("img");
	img.src = "https://ching367436.github.io/img/nope.jpg";
	img.style.cssText = "position:fixed;top:0;left:50%;transform:translate(-50%,0); height:100%;";
	img.onload = function(){setTimeout(function () {
		document.body.removeChild(img);
	}, 370)};
	document.body.appendChild(img);
});
