const a = document.getElementById('a');
const ans = document.getElementById('answer');
const settings = document.querySelectorAll('#menu input')
let i = 0,
    j = 0,
    t1 = [11, 999],
    t2 = [11, 99];
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
ans.addEventListener('input', checkAns);
document.getElementById('next').addEventListener('click', c);
document.getElementById('set').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'block';
});
document.getElementById('showAns').addEventListener('click', function() {
    ans.value = i * j;
    ans.style.color = '#ff0392'
});
settings[4].addEventListener('click', function() { // 確定
    t1[0] = Number(settings[0].value);
    t1[1] = Number(settings[1].value);
    t2[0] = Number(settings[2].value);
    t2[1] = Number(settings[3].value);
    document.getElementById('menu').style.display = 'none';
    c();
});
settings[5].addEventListener('click', function() { // 取消
    document.getElementById('menu').style.display = 'none';
});
document.onkeydown = function(e) {
    if (e.keyCode == 13) {
        c();
    }
}
c();
function c() {
    i = random(t1[0], t1[1]);
    j = random(t2[0], t2[1]);
    ans.value = null;
    a.innerHTML = i + 'x' + j + '=';
    ans.focus();
}

function checkAns() {
    if (ans.value == i * j) {
        ans.style.color = '#0f0';
    } else {
        ans.style.color = '#00f';
    }
}