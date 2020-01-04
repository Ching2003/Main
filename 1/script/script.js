const container = document.getElementById('container');
function o (a) {
	return (a < 10) ? "0" + a : a;
}

c(new Date(2019, 0, 25, 9, 15).getTime(), new Date(2019, 0, 26, 16, 50).getTime(), '學測');
c(new Date(2019, 6, 1, 9, 15).getTime(), new Date(2019, 6, 2, 16, 50).getTime(), '指考');

function c (start, end, text) {
    const target = document.createElement('h1');
    target.title=`${text}時間 ${new Date(start)}`;
    container.appendChild(target);
    count(start, end, text, target);
    setInterval(count, 1000, start, end, text, target);
}

function count (start, end, text, target) {
    const now = new Date().getTime();
    if (now < start){
        const r = start - now;
        const day = Math.floor(r / 86400000),
            hour = Math.floor(r % 86400000 / 3600000),
            minute = Math.floor(r % 3600000 / 60000),
            second = Math.floor(r % 60000 / 1000);
        target.innerHTML = `距離${text}還有 ${day}天 ${hour}小時 ${o(minute)}分鐘 ${o(second)}秒`;
    } else if (now > end){
        const r = now - end;
        const day = Math.floor(r / 86400000),
            hour = Math.floor(r % 86400000 / 3600000),
            minute = Math.floor(r % 3600000 / 60000),
            second = Math.floor(r % 60000 / 1000);
        target.innerHTML = `距離${text}已過 ${day}天 ${hour}小時 ${o(minute)}分鐘 ${o(second)}秒`;
    } else {
        target.innerHTML = `${text}進行中`;
    }
}