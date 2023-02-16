function solve() {
    //1. Get all elements
    //2. Depart function - fetch data for the next stop, start from "depot"
    //3. update HTML Elements with text from server
    //4. Activate "Arrive" btn
    //5. Arrive function - update btns

    const divElement = document.querySelector("#info");
    const departBtn = document.querySelector("#depart");
    const arriveBtn = document.querySelector("#arrive");

    let busStop = {
        next: "depot",
    };

    async function depart() {
        // console.log("Depart TODO...");
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;

        try {
            const response = await fetch(url);
            console.log("response", response);
            const data = await response.json();

            // busStop = JSON.parse(JSON.stringify(data));
            busStop = Object.assign(data);

            console.log("data", data);
            console.log("busStop", busStop);

            divElement.textContent = `Next stop ${busStop.name}`;
        } catch (error) {
            divElement.textContent = `Error`;
            throw new Error(`Error: ${error}`);
        }
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        divElement.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
