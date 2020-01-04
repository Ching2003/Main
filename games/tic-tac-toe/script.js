const $box = document.querySelectorAll(".box"),
    $player = ["X", "O"],
    $combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    re = document.querySelector("#re");
let $board = [],
    $step = 0,
    gameOver = false,
    d = [],
    exist = 5;
for (let i = 0; i < 9; i++) {
    $box[i].addEventListener("click", play);
    $board[i] = i;
    d[i] = 0;
}

function play (e) {
    if (gameOver == true) {return;}
    var $id = e.target.id;
    if (typeof($board[$id]) != "number") {return;}
    $board[$id] = $player[$step % 2];
    e.target.innerHTML = $player[$step % 2];
    re.innerHTML = `${$player[1 - ($step % 2)]}'s Turn`;
    if (checkWin()) {return;}
    d[$id] = exist;
    checkD();
    logBoard(d);
    $step++;
}

function checkWin () {
    for (let i = 0; i < $combos.length; i++) {
        if ($board[$combos[i][0]] == $board[$combos[i][1]] && $board[$combos[i][1]] == $board[$combos[i][2]]) {
            re.innerHTML = "<h1>" + $player[$step % 2] + ' wins</h1>';
            gameOver = true;
            return true;
        }
    }
}

function checkD () {
    for (let i = 0; i < d.length; i++) {
        if (d[i] == 0) {
            if (typeof($board[i]) != "number") {
                $board[i] = i;
                $box[i].innerHTML = "";
            }
            continue;
        }
        d[i] -=1;
    }
}

function logBoard (d) {
    console.clear();
    console.log(`
        ${d[0] + "|" + d[1] + "|" + d[2]}
        - - -
        ${d[3] + "|" + d[4] + "|" + d[5]}
        - - -
        ${d[6] + "|" + d[7] + "|" + d[8]}
    `);
}
