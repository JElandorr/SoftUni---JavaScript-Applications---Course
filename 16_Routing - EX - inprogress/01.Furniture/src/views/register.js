import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { updateInfo } from "../app.js";
import { postApi } from "../data/api.js";

const url = `http://localhost:3030/users/register`;

let registerTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
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
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass" />
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>
`;

async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let userRegisterInfo = {
        email: formData.get("email"),
        password: formData.get("password"),
        repass: formData.get("rePass"),
    };

    if (userRegisterInfo.email == "" || userRegisterInfo.password == "") {
        alert("All field are required!");
        return;
    }

    if (userRegisterInfo.repass !== userRegisterInfo.password) {
        alert("Passwords do not match!");
        return;
    }

    const user = await postApi(url, userRegisterInfo);

    if (user) {
        localStorage.setItem("user", user.accessToken);
        localStorage.setItem("ownerId", user._id);
        updateInfo();
        page.redirect("/catalog");
    } else {
        throw new Error(user);
    }
}

export const registerView = (context) => render(registerTemplate(), document.querySelector(".container"));
