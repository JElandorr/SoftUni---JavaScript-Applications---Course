import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { updateInfo } from "../app.js";
import { postApi } from "../data/api.js";

const url = `http://localhost:3030/users/login`;

let loginTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email" />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password" />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
`;

async function onSubmit(e) {
    e.preventDefault();
    // console.log("e.target", e.target);
    // console.log("e.currentTarget", e.currentTarget);
    let formData = new FormData(e.currentTarget);

    let userLoginInfo = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    if (userLoginInfo.email == "" || userLoginInfo == "") {
        alert("All field are required!");
        return;
    }

    const user = await postApi(url, userLoginInfo);

    if (user) {
        localStorage.setItem("user", user.accessToken);
        localStorage.setItem("ownerId", user._id);
        updateInfo();
        page.redirect("/catalog");
    } else {
        throw new Error(user);
    }
}

export const loginView = (context) => render(loginTemplate(), document.querySelector(".container"));
