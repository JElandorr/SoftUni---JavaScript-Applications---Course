const input = document.getElementById("input");
const list = document.getElementById("list");
const url = `http://localhost:3030/jsonstore/demo`;
document.getElementById("createBtn").addEventListener("click", postData);
document.getElementById("refreshBtn").addEventListener("click", getData);

let isEdit = false;

async function getData() {
    try {
        const response = await fetch(url);
        const resData = await response.json();

        // console.log("resData:", resData);

        // const liElements = Object.values(resData);
        // console.log("liElements", liElements);

        list.replaceChildren(...Object.values(resData).map(createLiElement));
    } catch (error) {}
}

async function postData() {
    const inputData = input.value;
    input.value = "";

    const data = {
        name: inputData,
    };

    if (inputData != "") {
        try {
            const response = await fetch(`${url}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const resData = await response.json();

            list.appendChild(createLiElement(resData));
        } catch (error) {
            console.log("error", error);
        }
    }
}

function createLiElement(element) {
    const liElement = document.createElement("li");
    liElement.setAttribute("id", `${element._id}`);
    liElement.textContent = element.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteData(element));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editData(element));

    liElement.appendChild(editBtn);
    liElement.appendChild(deleteBtn);

    // console.log(element.name);

    return liElement;
}

async function deleteData(element) {
    try {
        const response = await fetch(`${url}/${element._id}`, {
            method: "delete",
        });
        const resData = await response.json();

        console.log("resData", resData);

        const rem = document.getElementById(`${element._id}`);
        rem.remove();
    } catch (error) {}
}

async function editData(element) {
    input.value = element.name;

    try {
        const response = await fetch(`${url}/${element._id}`, {
            method: "delete",
        });
        const resData = await response.json();

        console.log("resData", resData);

        const rem = document.getElementById(`${element._id}`);
        rem.remove();
    } catch (error) {
        console.log("error", error);
    }
}
