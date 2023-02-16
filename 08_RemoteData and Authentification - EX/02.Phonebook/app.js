function attachEvents() {
    console.log("TODO...");

    document.getElementById("btnLoad").addEventListener("click", onLoad);
    document.getElementById("btnCreate").addEventListener("click", onCreate);
}

attachEvents();

const url = "http://localhost:3030/jsonstore/phonebook";
const ulPhonebook = document.getElementById("phonebook");
const person = document.getElementById("person");
const phone = document.getElementById("phone");

function onLoad() {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                const error = response.json();
                throw new Error(error.message);
            }

            return response.json();
        })
        .then((data) => {
            console.log("data", data);
            Object.values(data).forEach((entry) => {
                const li = document.createElement("li");
                li.textContent = `${entry.person}: ${entry.phone}`;
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", () => onDelete(event, entry._id));
                li.appendChild(deleteBtn);
                ulPhonebook.appendChild(li);
            });
        })
        .catch((err) => {
            alert(err.message);
        });
}

function onCreate() {
    if (person.value == "") {
        alert(`Person name field is required!`);
        return;
    }
    if (phone.value == "") {
        alert(`Phone number field is required!`);
        return;
    }

    // if (phone.value.length != 8) {
    //     alert(`Phone number length must be of exactly 8 digits!`);
    // }

    const data = {
        person: person.value.trim(),
        phone: phone.value.trim(),
    };

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                const error = response.json();
                throw new Error(error.message);
            }

            return response.json();
        })
        .then((data) => {
            ulPhonebook.innerHTML = "";
            onLoad();
            person.value = "";
            phone.value = "";
        })
        .catch((err) => {
            alert(err.message);
        });
}

function onDelete(event, id) {
    fetch(`${url}/${id}`, {
        method: "delete",
    })
        .then((response) => {
            if (!response.ok) {
                const error = response.json();
                throw new Error(error.message);
            }

            return response.json();
        })
        .then((data) => {
            ulPhonebook.innerHTML = "";
            onLoad();
        })
        .catch((err) => {
            alert(err.message);
        });
}
