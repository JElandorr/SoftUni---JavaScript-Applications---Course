const form = document.getElementById("create-form");

export async function onEdit(event, id) {
    event.preventDefault();

    //detect which book is clicked
    //load book details from server
    //change form look
    //load book details on form
    form.querySelector("h3").textContent = "Edit Book";
    form.querySelector("button").textContent = "Save";
    form.dataset.type = "edit";
}

export async function onEditSubmit(event) {
    event.preventDefault();
    console.log("onEditSubmit is clicked!");

    form.querySelector("h3").textContent = "Create Book";
    form.querySelector("button").textContent = "Submit";
    form.dataset.type = "create";
}
