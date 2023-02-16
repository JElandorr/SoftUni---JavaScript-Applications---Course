async function cookingBook() {
    console.log("page is fully loaded");

    try {
        const response = await fetch(
            `http://localhost:3030/jsonstore/cookbook/recipes`
        );

        if (response.ok === false) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data);
        const values = Object.values(data);
        console.log(values);

        document.querySelector(`main`).innerHTML = "";

        for (let recipe of values) {
            // console.log(recipe);
            // console.log(recipe._id);
            // console.log(recipe.name);
            // console.log(recipe.img);
            const article = document.createElement("article");
            article.className = `preview`;
            article.addEventListener("click", onClick);

            const divTitle = document.createElement("div");
            divTitle.className = `title`;

            const h2 = document.createElement("h2");
            h2.innerText = `${recipe.name}`;

            divTitle.appendChild(h2);

            const divSmall = document.createElement("div");
            divSmall.className = `small`;

            const img = document.createElement(`img`);
            img.src = `${recipe.img}`;

            divSmall.appendChild(img);

            article.appendChild(divTitle);

            article.appendChild(divSmall);

            document.querySelector(`main`).appendChild(article);
        }

        function onClick() {
            const h2 = document.createElement(`h2`);
            const divBand = document.createElement(`div`);
            divBand.className = `band`;
            const divThumb = document.createElement(`div`);
            divThumb.className = `thumb`;
            const img = document.createElement(`img`);
            img.src = `${recipe.img}`;
            divThumb.appendChild(img);
            divBand.appendChild(divThumb);
            const divDescription = document.createElement(`div`);
            divDescription.className = `description`;
        }
    } catch (err) {
        console.log(err.message);
    }
}
