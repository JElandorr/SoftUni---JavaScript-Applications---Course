function attachEvents() {
    console.log("TODO...");
    //1. Get elements fron the HTML
    //2. Fetch the code of the location
    //3. Fetch the current forecast
    //4. Fetch the 3-day forecast
    //5. Creat DOM elements with all info
    //6. Display elements

    const inputLocation = document.getElementById("location");
    const inputBtn = document.getElementById("submit");
    inputBtn.addEventListener("click", getForecast);

    const divForecast = document.getElementById("forecast");
    const divForecasts = document.getElementById("forecasts");

    const divCurrent = document.getElementById("current");
    const divUpcoming = document.getElementById("upcoming");

    const divLabel = document.querySelectorAll(".label");
    // console.log("divLabel", divLabel);

    let code = "";

    const locationBaseUrl = `http://localhost:3030/jsonstore/forecaster/locations/`;
    const currForcastBaseUrl = `http://localhost:3030/jsonstore/forecaster/today/`;
    const upcForcastBaseUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/`;

    // console.log("inputLocation.value", inputLocation.value);
    // console.log("typeof inputLocation.value", typeof inputLocation.value);
    // console.log("`${locationBaseUrl}${inputLocation.value}`", `${locationBaseUrl}${inputLocation.value}`);

    // Symbols

    const conditionsIcons = {
        Sunny: "&#x2600;",
        "Partly sunny": "&#x26C5;",
        Overcast: "&#x2601;",
        Rain: "&#x2614;",
        Degrees: "&#176;",
    };

    let counter = 0;

    async function getForecast() {
        divForecast.style.display = "inline";
        divCurrent.innerHTML = "";
        divUpcoming.innerHTML = "";

        try {
            const response = await fetch(`${locationBaseUrl}`);
            // console.log("response:", response);
            const data = await response.json();
            // console.log("data:", data);

            // console.log("data:", data);

            data.forEach((location) => {
                if (location.name === inputLocation.value) {
                    code = location.code;
                    counter++;
                }
            });

            // console.log("code:", code);
        } catch (error) {
            // console.log("Error", error);
            throw new Error(`Error: ${error}`);
        }

        try {
            const response = await fetch(`${currForcastBaseUrl}${code}`);
            const data = await response.json();

            let currForecast = JSON.parse(JSON.stringify(data));
            // console.log("currForecast", currForecast);

            const locationName = currForecast.name;
            // console.log("locationName", locationName);
            const locationForecast = currForecast.forecast;
            // console.log("locationForecast", locationForecast);

            const divElementLabel = document.createElement("div");
            divElementLabel.setAttribute("class", "label");
            divElementLabel.textContent = `Current conditions`;

            const divElementForecasts = document.createElement("div");
            divElementForecasts.setAttribute("class", "forecasts");

            const spanElementCS = document.createElement("span");
            spanElementCS.setAttribute("class", "condition symbol");
            // spanElementCS.textContent = conditionsIcons[locationForecast.condition].toString();
            // spanElementCS.appendChild(document.createTextNode(conditionsIcons[locationForecast.condition]));

            spanElementCS.innerHTML = conditionsIcons[locationForecast.condition];

            // const symbol = document.createTextNode(conditionsIcons[locationForecast.condition]);
            // spanElementCS.appendChild(symbol);

            // console.log("conditionsIcons[locationForecast.condition]", conditionsIcons[locationForecast.condition]);

            const spanElementC = document.createElement("span");
            spanElementC.setAttribute("class", "condition");

            const spanElementFD1 = document.createElement("span");
            spanElementFD1.setAttribute("class", "forecast-data");
            spanElementFD1.innerHTML = locationName;
            const spanElementFD2 = document.createElement("span");
            spanElementFD2.setAttribute("class", "forecast-data");
            spanElementFD2.innerHTML = `${locationForecast.low}${conditionsIcons.Degrees}/${locationForecast.high}${conditionsIcons.Degrees}`;
            const spanElementFD3 = document.createElement("span");
            spanElementFD3.setAttribute("class", "forecast-data");
            spanElementFD3.innerHTML = locationForecast.condition;

            spanElementC.appendChild(spanElementFD1);
            spanElementC.appendChild(spanElementFD2);
            spanElementC.appendChild(spanElementFD3);

            divElementForecasts.appendChild(spanElementCS);
            divElementForecasts.appendChild(spanElementC);

            divCurrent.appendChild(divElementLabel);
            divCurrent.appendChild(divElementForecasts);
            currForecast = "";

            // console.log("divCurrent", divCurrent);
        } catch (error) {
            divForecast.innerHTML = ``;
            divForecast.innerHTML = `Error: ${error}`;
        }

        try {
            const response = await fetch(`${upcForcastBaseUrl}${code}`);
            const data = await response.json();

            // console.log("data:", data);

            let upcForecast = JSON.parse(JSON.stringify(data));

            const locationForecast = upcForecast.forecast;

            const divElementLabel = document.createElement("div");
            divElementLabel.setAttribute("class", "label");
            divElementLabel.textContent = `Three-day forecast`;

            const divElementFI = document.createElement("div");
            divElementFI.setAttribute("class", "forecast-info");

            locationForecast.forEach((day) => {
                const spanElementU = document.createElement("span");
                spanElementU.setAttribute("class", "upcoming");

                const spanElementS = document.createElement("span");
                spanElementS.setAttribute("class", "symbol");
                spanElementS.innerHTML = conditionsIcons[day.condition];

                const spanElementFD1 = document.createElement("span");
                spanElementFD1.setAttribute("class", "forecast-data");
                spanElementFD1.innerHTML = `${day.low}${conditionsIcons.Degrees}/${day.high}${conditionsIcons.Degrees}`;
                const spanElementFD2 = document.createElement("span");
                spanElementFD2.setAttribute("class", "forecast-data");
                spanElementFD2.innerHTML = day.condition;

                spanElementU.appendChild(spanElementS);
                spanElementU.appendChild(spanElementFD1);
                spanElementU.appendChild(spanElementFD2);

                divElementFI.appendChild(spanElementU);

                divUpcoming.appendChild(divElementLabel);
                divUpcoming.appendChild(divElementFI);
                upcForecast = "";
            });
        } catch (error) {
            divForecast.innerHTML = ``;
            divForecast.innerHTML = `Error: ${error}`;
        }
    }
}

attachEvents();
