function solution() {
    //1. fetch data from server
    //2. create divs with titles // toggle buttons
    //3. onclick fetch details data
    //4. update html with data
    const mainElement = document.getElementById("main");

    const listUrl = `http://localhost:3030/jsonstore/advanced/articles/list`;

    fetch(listUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("data", data);

            const articles = JSON.parse(JSON.stringify(data));

            articles.forEach((article) => {
                const divAccordion = document.createElement("div");
                divAccordion.classList.add("accordion");

                const divHead = document.createElement("div");
                divHead.classList.add("head");

                const span = document.createElement("span");
                span.textContent = `${article.title}`;

                const btn = document.createElement("button");
                btn.classList.add("button");
                btn.setAttribute("id", `article`);
                btn.textContent = "More";
                btn.addEventListener("click", reveal);

                const divExtra = document.createElement("div");
                divExtra.classList.add("extra");

                divHead.appendChild(span);
                divHead.appendChild(btn);
                divAccordion.appendChild(divHead);
                divAccordion.appendChild(divExtra);

                mainElement.appendChild(divAccordion);
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
}

function reveal(e) {
    console.log("e.currentTarget", e.currentTarget);
    console.log("e.currentTarget", e.currentTarget._id);

    const divExtra = e.currentTarget.parentNode;

    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.currentTarget._id}`);
}

solution();
