let dest = document.querySelector("[data-container]");
let posts = [];
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

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch("http://metteskovnielsen.dk/kea/eksamen-2-semester/wordpress/wp-json/wp/v2/multiple-post-type?&type[]=malerier&type[]=print&type[]=brugskunst&per_page=50");
    posts = await jsonData.json();
    visPosts();
}



function visPosts() {
    console.log(posts);
    let dest = document.querySelector("[data-container]"),

        temp = document.querySelector("[data-template]");

    let postContainer = document.querySelector("[data-container]");

    posts.forEach(post => {
        let klon = temp.cloneNode(true).content;
        /*klon.querySelector("[data-title]").textContent = post.title.rendered

        klon.querySelector("[data-text]").innerHTML = post.content.rendered

        klon.querySelector("[data-pris]").textContent = ("Pris: ") + post.acf.pris + (",-")*/



        klon.querySelector("[data-billede]").src = post.acf.billede.url;

        klon.querySelector("img").addEventListener("click", () => {
            visModal(post);
        });

        /* if (post.acf.mål) { klon.querySelector("[data-maal]").textContent = ("Mål: ") + post.acf.mål }*/


        postContainer.appendChild(klon);


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
    setTimeout(carousel, 2000); // Change image every 2 seconds
}





// BURGER

function burgerFunction(x) {
    x.classList.toggle("change");
     document.querySelector("nav").classList.toggle("show");
}


