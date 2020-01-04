function scrollNav() {  // nav scrolling feature
	var heigh = Math.round(document.getElementsByTagName("header")[0].offsetHeight * 0.7);
    if (document.body.scrollTop > heigh || document.documentElement.scrollTop > heigh) {
        document.getElementById("open").style.backgroundColor = "#000";
    } else {
        document.getElementById("open").style.backgroundColor = "";
    }
}
window.addEventListener("scroll", scrollNav);


const nav = document.querySelector("nav");
document.querySelector("#open span").addEventListener("click", function () {
	nav.style.width = "100%";
})
document.querySelector("#close").addEventListener("click", function () {
	nav.style.width = "0";
})


const $top = document.getElementById("top");
window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $top.style.display = "block";
    } else {
        $top.style.display = "none";
    }
})
$top.addEventListener("click", function() {
	scrollTo(0, 0);
});

const container = document.querySelectorAll(".container");
for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("touchstart", function () {
        this.children[1].style.visibility = "visible";
        this.children[1].style.opacity = "1";
    });
    /* container[i].addEventListener("touchend", function () {
        this.children[1].style.visibility = "hidden";
        this.children[1].style.opacity = "0";
    }); */
}
