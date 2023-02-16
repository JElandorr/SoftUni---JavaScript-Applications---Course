async function solution() {
    //1. fetch data from server
    //2. create divs with titles // toggle buttons
    //3. onclick fetch details data
    //4. update html with data
    const mainElement = document.getElementById("main");

    const listUrl = `http://localhost:3030/jsonstore/advanced/articles/list`;

    try {
        const response = await fetch(listUrl);
        // console.log("response", response);

        const data = await response.json();
        console.log("data:", data);

        const articles = JSON.parse(JSON.stringify(data));

        articles.forEach((article) => {
            // console.log("article:", article);
            // console.log("article._id:", article._id);
            // console.log("article.title:", article.title);

            const divAccordion = document.createElement("div");
            divAccordion.setAttribute("class", "accordion");

            const divHead = document.createElement("div");
            divHead.setAttribute("class", "head");

            const span = document.createElement("span");
            span.innerHTML = `${article.title}`;

            const btn = document.createElement("button");
            btn.setAttribute("id", `${article._id}`);
            btn.setAttribute("class", "button");
            btn.textContent = `More`;
            btn.addEventListener("click", reveal);

            const divExtra = document.createElement("div");
            divExtra.setAttribute("class", "extra");

            divHead.appendChild(span);
            divHead.appendChild(btn);

            divAccordion.appendChild(divHead);
            divAccordion.appendChild(divExtra);
            mainElement.appendChild(divAccordion);
        });
    } catch (error) {
        console.log("error", error);
    }
}

async function reveal(e) {
    // console.log("e.target", e.currentTarget);
    // console.log("e.target", e.currentTarget.id);
    // console.log("e.target", e.currentTarget.parentNode);
    // console.log("e.target", e.currentTarget.parentNode.parentNode);

    const accordion = e.currentTarget.parentNode.parentNode;
    console.log("accordion", accordion);
    const divExtra = accordion.querySelector(".extra");
    console.log("divExtra", divExtra);

    const baseUrlDetails = `http://localhost:3030/jsonstore/advanced/articles/details/`;

    try {
        const response = await fetch(`${baseUrlDetails}${e.currentTarget.id}`);
        // console.log("response", response);
        const data = await response.json();

        const details = JSON.parse(JSON.stringify(data));

        console.log("details", details);

        const p = document.createElement("p");
        p.textContent = `${details.content}`;

        divExtra.appendChild(p);

        if (e.target.textContent === "More") {
            divExtra.style.display = "block";
            e.target.textContent = "Less";
        } else if (e.target.textContent === "Less") {
            divExtra.style.display = "none";
            e.target.textContent = "More";
        }
    } catch (error) {}
}

solution();
