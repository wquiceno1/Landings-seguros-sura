let vermasBtn = document.querySelectorAll(".desplegar-todas-coberturas");
        let capaOculta = document.querySelectorAll(".close");
        let arrow = document.querySelectorAll(".arrow-todas-coberturas");
        console.log("enlaces: ", vermasBtn.length);
        console.log("oculto: ", capaOculta.length);
        console.log("flechas: ", arrow.length);
        for (let i = 0; i <= vermasBtn.length; i++) {
            vermasBtn[i].addEventListener("click", () => {
                console.log("click");
                if (capaOculta[i].classList.contains("close")) {
                    console.log("estaba cerradp y lo abrio");
                    capaOculta[i].classList.remove("close");
                    capaOculta[i].classList.add("open");
                    arrow[i].classList.remove("arrow-todas-coberturas");
                    arrow[i].classList.add("arrow-close");
                } else {
                    console.log("estaba abierto y lo cerro");
                    // vermasBtn[i].classList.add('close');
                    capaOculta[i].classList.remove("open");
                    capaOculta[i].classList.add("close");
                    arrow[i].classList.remove("arrow-close");
                    arrow[i].classList.add("arrow-todas-coberturas");
                }
            });
        }