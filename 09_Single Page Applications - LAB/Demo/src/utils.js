import { get } from "./api.js";

export function checkUserNav() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData != null) {
        document.getElementById("greeting").textContent = `Welcome, ${userData.userName}!`;
        document.getElementById("usernav").style.display = "inline-block";
        document.getElementById("guestnav").style.display = "none";
    } else {
        document.getElementById("usernav").style.display = "none";
        document.getElementById("guestnav").style.display = "inline-block";
    }
}

export function onLogout(context) {
    get(`/users/login`);
    sessionStorage.removeItem("userData");

    context.checkUserNav();
    context.goTo("homeBtn");
}
