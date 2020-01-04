(function () {
    let a = document.querySelectorAll('video');
    for (let i = 0; i < a.length; i++) {
        a[i].play();
        a[i].currentTime = a[i].duration;
    }
    a = document.querySelectorAll('audio');
    for (let i = 0; i < a.length; i++) {
        a[i].play();
        a[i].currentTime = a[i].duration;
    }
}) ();
