function getInfo() {
    // console.log("click!");
    // 1. get all elements by ID

    const baseURL = "http://localhost:3030/jsonstore/bus/businfo/";

    const inputElement = document.querySelector("#stopId");
    const ulElement = document.querySelector("#buses");
    const divElement = document.querySelector("#stopName");

    // 2. fetch data from server

    // console.log("`${baseURL}${inputElement.textContent}`", `${baseURL}${inputElement.textContent}`);

    fetch(`${baseURL}${inputElement.value}`)
        .then((response) => response.json())
        .then((data) => {
            let buses = data.buses;
            let name = data.name;

            divElement.textContent = name;
            ulElement.innerHTML = "";

            Object.keys(buses).forEach((bus) => {
                let liElement = document.createElement("li");
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
                ulElement.appendChild(liElement);
            });
        })
        .catch((error) => {
            ulElement.innerHTML = "";
            divElement.textContent = `Error - ${error}`;
        });

    // 3. forEach bus create li element with text
    // 4. append all li-elements to the ul-element
}
