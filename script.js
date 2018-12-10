let dest = document.querySelector("[data-container]");
let posts = [];

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch ("http://metteskovnielsen.dk/kea/eksamen-2-semester/wordpress/wp-json/wp/v2/multiple-post-type?&type[]=malerier&type[]=print&type[]=brugskunst&per_page=50");
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
         klon.querySelector("[data-title]").textContent = post.title.rendered

        klon.querySelector("[data-text]").innerHTML = post.content.rendered

        klon.querySelector("[data-billede]").src = post.acf.billede.url
                    postContainer.appendChild(klon);


       /* !!!!!! + mål, pris osv !!!!!!!!!*/
    });
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

