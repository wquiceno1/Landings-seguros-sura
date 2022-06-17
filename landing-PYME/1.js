window.onload = function () {
    var e = document.querySelectorAll(".detalle nav ul li a");
    // console.log(e);
    document.querySelectorAll("div.content"), document.querySelector("span"),
        document.querySelectorAll("nav ul li");
    for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function (e) {
        e.preventDefault();
        var t = document.querySelector("nav ul li a.active"),
            o = document.querySelector("section>div.active");
        t.classList.remove("active"), o.classList.remove("active"), this.classList.add(
            "active");
        var a = this.getAttribute("href");
        document.querySelector(a).classList.add("active")

    }))

}

$(document).ready(function () {
    $(".desplegar-todas-coberturas").click(function () {
        let contenido = $(".contenido-tabla-todas-coberturas");
        let arrow = $(".arrow-todas-coberturas");
        // let vermenosbtn = $(".ver-menos-btn");
        // console.log(contenido);
        if (contenido.css("display") == "none") { //open		
            contenido.slideDown(300);
            arrow.addClass("down")
            $(this).addClass("open");
        } else { //close		
            contenido.slideUp(500);
            arrow.removeClass("down")
            $(this).removeClass("open");
        }
    });

    $(".ver-menos-btn").click(function () {
        let contenido = $(".contenido-tabla-todas-coberturas");
        // let arrow = $(".arrow-todas-coberturas");
        // let vermenosbtn = $(".ver-menos-btn");
        // console.log(contenido);
        if (contenido.css("display") == "block") { //open		
            contenido.slideUp(500);
            // arrow.removeClass("down")
            $(this).removeClass("open");
        }
    });
});