async function getInfo() {
    // console.log("click!");
    // 1. get all elements by ID

    const baseURL = "http://localhost:3030/jsonstore/bus/businfo/";

    let inputElement = document.querySelector("#stopId");
    const ulElement = document.querySelector("#buses");
    const divElement = document.querySelector("#stopName");

    // 2. fetch data from server
    try {
        const response = await fetch(`${baseURL}${inputElement.value}`);
        const data = await response.json();
        // console.log("data", data);

        const busStopName = data.name;
        divElement.textContent = busStopName;
        ulElement.innerHTML = "";

        // 3. forEach bus create li element with text

        Object.keys(data.buses).forEach((bus) => {
            const liElement = document.createElement("li");
            liElement.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;

            // 4. append all li-elements to the ul-element

            ulElement.appendChild(liElement);
        });
    } catch (error) {
        ulElement.innerHTML = "";
        divElement.textContent = `Error`;
        throw new Error(`Error: ${error}`);
    }

    // console.log("`${baseURL}${inputElement.textContent}`", `${baseURL}${inputElement.textContent}`);
}
