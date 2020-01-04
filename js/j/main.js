(function () {
    if (document.readyState !== 'complete') {
        alert('此網頁尚未載入完畢\n請等載入完成後再試一次');
        return;
    }
    if (confirm('確定要跳過本網頁的所有影片嗎?\n\n本script由 靚 維護')) {
        Ching367436_v('https://Ching367436.github.io/js/j/skip.js');
    } else {
        return;
    }
    Ching367436_v('https://Ching367436.github.io/js/j/name.js');
}) ();

function Ching367436_v (adresss) {
    let s = document.createElement('script');
    s.src = adresss + '?m=' + Math.floor(Math.random() * 999999);
    document.head.appendChild(s);
}
