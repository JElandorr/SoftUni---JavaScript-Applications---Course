import { get } from "./api.js";

const section = document.getElementById("catalog");
section.remove();

export async function showCatalog(context) {
    context.render(section);

    const list = document.getElementById("list");

    try {
        list.replaceChildren("Loading...");

        const resData = await get("/data/movies");
        console.log("resData", resData);

        const workData = JSON.parse(JSON.stringify(resData));

        const fragment = document.createDocumentFragment();

        workData.map(createMovieItem).forEach((element) => {
            fragment.appendChild(element);
        });

        setTimeout(() => {
            list.replaceChildren(fragment);
        }, 500);
    } catch (error) {
        alert(error.message);
    }
}

function createMovieItem(movie) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", `${movie.img}`);
    img.setAttribute("alt", `${movie.img}-pic`);
    const h3 = document.createElement("h3");
    h3.textContent = `${movie.title}`;
    const p = document.createElement("p");
    p.textContent = `${movie.description}`;
    const pUser = document.createElement("p");
    pUser.textContent = `Created by ${movie._ownerId}.`;
    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(pUser);

    return li;
}
