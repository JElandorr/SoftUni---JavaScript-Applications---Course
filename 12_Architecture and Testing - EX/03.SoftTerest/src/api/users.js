import { get, post } from "./api.js";

const endPoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
};

async function login(data) {
    const user = await post(endPoints.login, data);

    localStorage.setItem("user", JSON.stringify(user));
}

async function register(data) {
    const user = await post(endPoints.register, data);

    localStorage.setItem("user", JSON.stringify(user));
}

async function logout() {
    get(endPoints.logout);
    localStorage.removeItem("user");
}

export { login, register, logout };
