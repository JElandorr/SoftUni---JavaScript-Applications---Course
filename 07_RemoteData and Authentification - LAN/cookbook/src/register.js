document.querySelector("form").addEventListener("submit", onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("rePass");

    try {
        if (email == "" || password == "") {
            throw new Error("All fields are required!");
        }

        if (password !== rePass) {
            throw new Error("Passwords don't match!");
        }

        const response = await fetch("http://localhost:3030/users/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        console.log("response", response);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();

        console.log("resData", resData);

        sessionStorage.setItem("accessToken", resData.accessToken);

        window.location = "./index.html";
        // window.location = "/";  - when the target is index.html this works both ways! If the target is another page, it's filename should replace index.html!
    } catch (error) {
        alert(error.message);
    }
}
