var n = document.createElement('p');
var t = document.createTextNode('Created by 靚');
n.appendChild(t);
n.style.cssText = "transition:.8s;opacity:0;color:#000;z-index: 9999;text-shadow: 0.2vw 0.2vw 0.2vw #fff;position:fixed;bottom:50%;right:50%;font-size:5vw;transform:translate(50%, 50%);";
document.body.appendChild(n);
setTimeout(function(){
    n.style.opacity = 1;
},75);

setTimeout(function(){
    n.style.opacity = 0;
},500);
