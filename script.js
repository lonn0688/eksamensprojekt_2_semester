let modal = document.querySelector("#modal");
        let dest = document.querySelector(".data-container"),
            retter,
            kategoriFilter = "alle";


        document.addEventListener("DOMContentLoaded", hentJson);

        async function hentJson() {
            let myJson = await fetch("menu1.json");
            retter = await myJson.json();






            visRetter();
            console.log(retter);
        }


        document.querySelectorAll(".menu-item").forEach(knap => {


            knap.addEventListener("click", filtrering)
        });


        function filtrering() {
            dest.textContent = "";
            kategoriFilter = this.getAttribute("data-kategori");
            visRetter();
        }

        function visRetter() {
            let dest = document.querySelector(".data-container"),
                temp = document.querySelector(".data-template");


            //løb listen igennem og lav en klon LOOP
            retter.forEach(ret => {

                if (ret.Kategori == kategoriFilter || kategoriFilter == "alle") {
                    let klon = temp.cloneNode(true).content;
                    //indsæt data i klonen


                    klon.querySelector("h2").textContent = ret.Navn;
                    klon.querySelector("img").src = "billeder/small/" + ret.Billede + ".png";
                     klon.querySelector("img").addEventListener("click", () => {
                        visModal(ret);
                    });


                    // klon.querySelector(".data-kategori").textContent = ret.kategori;
                    klon.querySelector(".data-pris").textContent = ret.Pris;
                    klon.querySelector(".data-kortbeskrivelse").textContent = ret.KortBeskrivelse;

                    //placer klon i DOM
                    dest.appendChild(klon);
                }
            })
        }


        function visModal(retten) {
            modal.classList.add("vis");
            //modal.querySelector(".modal-id").textContent = retten.id;
            modal.querySelector(".modal-kategori").textContent = retten.Kategori;
            modal.querySelector(".modal-navn").textContent = retten.Navn;
            modal.querySelector(".modal-pris").textContent = retten.Pris;
            modal.querySelector(".modal-langbeskrivelse").textContent = retten.LangBeskrivelse;
            modal.querySelector(".modal-billede").src = "billeder/small/" + retten.Billede + ".png";
            modal.querySelector(".modal-billede").alt = "Foto af" + retten.Billede;
            modal.querySelector("button").addEventListener("click", skjulModal);
        }

        function skjulModal() {
            modal.classList.remove("vis");
        }








let myIndex = 0;
carousel();

function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}





//blomster//
