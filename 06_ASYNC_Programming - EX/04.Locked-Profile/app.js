function lockedProfile() {
    const mainElement = document.getElementById("main");
    mainElement.innerHTML = "";

    let counter = 1;

    function lockUnlock() {
        console.log("e.target:");
    }

    function showHide(e) {
        console.log("e.target:", e.target);
    }

    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then((response) => {
            // console.log("response:", response);

            if (response.status === 200 && response.ok === true) {
                return response.json();
            } else {
                throw new Error(`Error in RESPONSE!`);
            }
        })
        .then((data) => {
            // console.log("data:", data);

            const userData = Object.assign(data);

            for (const key in userData) {
                if (Object.hasOwnProperty.call(userData, key)) {
                    const element = userData[key];
                    // console.log("element:", element);

                    const divProfile = document.createElement("div");
                    divProfile.setAttribute("class", "profile");

                    const imgElement = document.createElement("img");
                    imgElement.setAttribute("src", "./iconProfile2.png");
                    imgElement.setAttribute("class", "userIcon");

                    const labelElementLock = document.createElement("label");
                    labelElementLock.textContent = `Lock`;

                    const inputElementLock = document.createElement("input");
                    inputElementLock.setAttribute("id", "lock");
                    inputElementLock.setAttribute("type", "radio");
                    inputElementLock.setAttribute("name", `user${counter}Locked`);
                    inputElementLock.setAttribute("value", "lock");
                    inputElementLock.setAttribute("checked", "true");

                    const labelElementUnlock = document.createElement("label");
                    labelElementUnlock.textContent = `Unlock`;

                    const inputElementUnlock = document.createElement("input");
                    inputElementUnlock.setAttribute("id", "unlock");
                    inputElementUnlock.setAttribute("type", "radio");
                    inputElementUnlock.setAttribute("name", `user${counter}Unlocked`);
                    inputElementUnlock.setAttribute("value", "unlock");
                    inputElementUnlock.setAttribute("unchecked", "true");

                    const hrOuter = document.createElement("hr");

                    const labelElementUsername = document.createElement("label");
                    labelElementUsername.textContent = `Username`;

                    const divElementUsername = document.createElement("div");
                    divElementUsername.setAttribute("class", `user${counter}Username`);

                    const inputElementUsername = document.createElement("input");
                    inputElementUsername.setAttribute("type", "text");
                    inputElementUsername.setAttribute("name", `user${counter}Username`);
                    inputElementUsername.setAttribute("value", `${element.username}`);
                    inputElementUsername.setAttribute("disabled", "true");
                    inputElementUsername.setAttribute("readonly", "true");

                    const hrInner = document.createElement("hr");

                    const labelElementEmail = document.createElement("label");
                    labelElementEmail.textContent = `Email:`;

                    const inputElementEmail = document.createElement("input");
                    inputElementEmail.setAttribute("type", "text");
                    inputElementEmail.setAttribute("name", `user${counter}Email`);
                    inputElementEmail.setAttribute("value", `${element.email}`);
                    inputElementEmail.setAttribute("disabled", "true");
                    inputElementEmail.setAttribute("readonly", "true");

                    const labelElementAge = document.createElement("label");
                    labelElementAge.textContent = `Age:`;

                    const inputElementAge = document.createElement("input");
                    inputElementAge.setAttribute("type", "text");
                    inputElementAge.setAttribute("name", `user${counter}Age`);
                    inputElementAge.setAttribute("value", `${element.age}`);
                    inputElementAge.setAttribute("disabled", "true");
                    inputElementAge.setAttribute("readonly", "true");

                    const btn = document.createElement("button");
                    btn.textContent = "Show More";

                    divElementUsername.appendChild(hrInner);
                    divElementUsername.appendChild(labelElementEmail);
                    divElementUsername.appendChild(inputElementEmail);
                    divElementUsername.appendChild(labelElementAge);
                    divElementUsername.appendChild(inputElementAge);

                    divProfile.appendChild(imgElement);
                    divProfile.appendChild(labelElementLock);
                    divProfile.appendChild(inputElementLock);
                    divProfile.appendChild(labelElementUnlock);
                    divProfile.appendChild(inputElementUnlock);
                    divProfile.appendChild(hrOuter);
                    divProfile.appendChild(labelElementUsername);
                    divProfile.appendChild(inputElementUsername);
                    divProfile.appendChild(divElementUsername);
                    divProfile.appendChild(btn);

                    mainElement.appendChild(divProfile);

                    // console.log("user${counter}Age", `user${counter}Age`);
                    counter++;
                }
            }
        })
        .catch((error) => {
            console.log("ERROR:", error);
        });
}
