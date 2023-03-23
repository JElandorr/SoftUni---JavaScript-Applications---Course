import { clearUserData, setUserData } from "../utils.js";
import { get, post, put, del } from "./api.js";

const endpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
};

export async function login(email, password) {
    const user = await post(endpoints.login, { email, password });
    const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        accessToken: user.accessToken,
    };

    setUserData(userData);
    return user;
}

export async function register(username, email, password, gender) {
    const user = await post(endpoints.register, { username, email, password, gender });
    const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        accessToken: user.accessToken,
    };

    setUserData(userData);
    return user;
}

export function logout() {
    get(endpoints.logout);
    clearUserData();
}
