/* Hvor værkerne bliver vist i og variabel, der viser hvad der filtreres på */
let dest = document.querySelector("[data-container]"),
    posts, prisFilter = "priskategori";
/* Tom variabel til indlæsning af personer */
let page = [];


let modal = document.querySelector("#modal");


document.addEventListener("DOMContentLoaded", hentJson2);

async function hentJson2() {
    let jsonData2 = await fetch("http://metteskovnielsen.dk/kea/eksamen-2-semester/wordpress/wp-json/wp/v2/posts/93");
    page = await jsonData2.json();
    visGalleriH1();
}

function visGalleriH1() {
    console.log(page)

    document.querySelector(".h1-galleri").textContent = page.title.rendered
}

/* Når dom er loadet, begynder funktionen hentJson */
document.addEventListener("DOMContentLoaded", hentJson);

/* Funktionen, der henter Json */
async function hentJson() {
    let jsonData = await fetch("http://metteskovnielsen.dk/kea/eksamen-2-semester/wordpress/wp-json/wp/v2/multiple-post-type?&type[]=malerier&type[]=print&type[]=brugskunst&per_page=50");
    posts = await jsonData.json();
    visPosts();
}

document.querySelectorAll(".menu-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

/* Når Json er hentet, starter funktionen filtrering */
function filtrering() {
    dest.textContent = "";
    prisFilter = this.getAttribute("data-priskategori");
    visPosts();
}

/* Derefter begynder funktionen visPosts, hvor det valgte indhold fra Json bliver vist */
function visPosts() {
    console.log(posts);
    let dest = document.querySelector("[data-container]"),

        temp = document.querySelector("[data-template]");

    let postContainer = document.querySelector("[data-container]");

    document.querySelector("h3").textContent = prisFilter;
    posts.forEach(post => {
        if (post.acf.priskategori == prisFilter || prisFilter == "priskategori") {
            let klon = temp.cloneNode(true).content;

            klon.querySelector("[data-billede]").src = post.acf.lilleBillede.url;

            klon.querySelector(".data-pris").textContent = post.acf.pris + (",-")
            klon.querySelector("img").addEventListener("click", () => {
                visModal(post);
            });

            postContainer.appendChild(klon);

        }


    });
}

function visModal(posten) {
    modal.classList.add("vis");

    modal.querySelector(".modal-title").textContent = posten.title.rendered

    modal.querySelector(".modal-text").innerHTML = posten.content.rendered

    modal.querySelector(".modal-pris").textContent = ("Pris: ") + posten.acf.pris + (",-")



    modal.querySelector(".modal-billede").src = posten.acf.billede.url

    modal.querySelector("button").addEventListener("click", skjulModal);

    if (posten.acf.mål) {
        modal.querySelector(".modal-maal").textContent = ("Mål: ") + posten.acf.mål
    }
}

function skjulModal() {
    modal.classList.remove("vis");
}

/* Får slideshowet til at skifte */
let myIndex = 0;
carousel();

function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1
    }
    x[myIndex - 1].style.display = "block";

    setTimeout(carousel, 15000); // Change image every 2 seconds

    setTimeout(carousel, 3500); // Change image every 2 seconds

}




// BURGER

/* Funktionen, der får de tre streger til at vende sig til et kryds og vise menuen */
function burgerFunction(x) {
    x.classList.toggle("change");
    document.querySelector("nav").classList.toggle("show");
}


$(function(){
    $('.postListview').postListview({
        effect: "fadeIn",
        effectTime: 2000,
        threshold: 0
    });
});
