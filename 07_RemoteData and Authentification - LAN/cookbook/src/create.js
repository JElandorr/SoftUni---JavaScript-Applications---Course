document.querySelector("form").addEventListener("submit", onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const img = formData.get("img").trim();
    const ingredients = formData.get("ingredients").trim().split("\n");
    const steps = formData.get("steps").trim().split("\n");

    const recipe = {
        name,
        img,
        ingredients,
        steps,
    };

    console.log("recipe", recipe);

    try {
        if (name == "") {
            throw new Error("The name of the recipe is required!");
        }
        if (img == "") {
            throw new Error("Image is required!");
        }
        if (ingredients == "") {
            throw new Error("The ingredients are essential part of any recipe, you simply can't do without them...");
        }
        if (steps == "") {
            throw new Error("You must specify how the recipe is prepared!");
        }

        const response = await fetch("http://localhost:3030/data/recipes", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": `${sessionStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(recipe),
        });

        if (response.ok == false) {
            const error = response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();
        console.log("resData", resData);

        window.location = "./index.html";
    } catch (error) {
        alert(error.message);
    }
}
