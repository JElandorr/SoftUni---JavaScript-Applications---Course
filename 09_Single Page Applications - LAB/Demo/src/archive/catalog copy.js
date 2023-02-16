export async function showCatalog() {
    document.getElementById("catalog").style.display = "block";
    const list = document.getElementById("list");

    try {
        list.replaceChildren("Loading...");

        const response = await fetch("http://localhost:3030/data/movies");
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const resData = await response.json();
        console.log("resData", resData);

        const workData = JSON.parse(JSON.stringify(resData));

        setTimeout(() => {
            list.replaceChildren(...workData.map(createMovieItem));
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
    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(p);

    return li;
}
