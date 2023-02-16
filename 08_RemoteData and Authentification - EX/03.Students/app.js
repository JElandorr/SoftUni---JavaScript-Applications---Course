console.log("TODO...");

const url = "http://localhost:3030/jsonstore/collections/students";
const table = document.querySelector("tbody");
const form = document.querySelector("form");
const button = document.getElementById("submit");
button.addEventListener("click", () => createStudent(event));

window.addEventListener("load", onLoad);

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
                const row = document.createElement("tr");
                const tdFirstName = document.createElement("td");
                tdFirstName.textContent = entry.firstName;
                const tdLastName = document.createElement("td");
                tdLastName.textContent = entry.lastName;
                const tdFacultyNumber = document.createElement("td");
                tdFacultyNumber.textContent = entry.facultyNumber;
                const tdGrade = document.createElement("td");
                tdGrade.textContent = Number(entry.grade).toFixed(2);
                row.appendChild(tdFirstName);
                row.appendChild(tdLastName);
                row.appendChild(tdFacultyNumber);
                row.appendChild(tdGrade);
                table.appendChild(row);
            });
        })
        .catch((err) => {
            alert(err.message);
        });
}

function createStudent(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const firstName = formData.get("firstName").trim();
    const lastName = formData.get("lastName").trim();
    const facultyNumber = formData.get("facultyNumber").trim();
    const grade = formData.get("grade").trim();

    document.querySelector('[name="firstName"').value = "";
    document.querySelector('[name="lastName"').value = "";
    document.querySelector('[name="facultyNumber"').value = "";
    document.querySelector('[name="grade"').value = "";

    if (firstName == "") {
        alert("First name field is required!");
        return;
    }
    if (lastName == "") {
        alert("Last name field is required!");
        return;
    }
    if (facultyNumber == "") {
        alert("Faculty number field is required!");
        return;
    }
    if (grade == "") {
        alert("Grade field is required!");
        return;
    }

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                const error = response.json();
                throw new Error(error.message);
            }

            return response.json();
        })
        .then((data) => {
            table.innerHTML = "";
            onLoad();
        })
        .catch((err) => {
            alert(err.message);
        });
}
