import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { postApi } from "../data/api.js";

const url = `http://localhost:3030/data/catalog`;

const createTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control valid" id="new-make" type="text" name="make" />
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" />
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" />
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>
`;

async function onSubmit(e) {
    e.preventDefault();

    let newFurnitureElements = {
        make: document.getElementById("new-make"),
        model: document.getElementById("new-model"),
        year: document.getElementById("new-year"),
        description: document.getElementById("new-description"),
        price: document.getElementById("new-price"),
        img: document.getElementById("new-image"),
        material: document.getElementById("new-material"),
    };

    let isValid = false;

    newFurnitureElements.make.value.length >= 4
        ? validate(newFurnitureElements.make, true)
        : validate(newFurnitureElements.make, false);

    newFurnitureElements.model.value.length >= 4
        ? validate(newFurnitureElements.model, true)
        : validate(newFurnitureElements.model, false);

    Number(newFurnitureElements.year.value) >= 1950 && Number(newFurnitureElements.year.value) <= 2050
        ? validate(newFurnitureElements.year, true)
        : validate(newFurnitureElements.year, false);

    newFurnitureElements.description.value.length > 10
        ? validate(newFurnitureElements.description, true)
        : validate(newFurnitureElements.description, false);

    Number(newFurnitureElements.price.value) > 0
        ? validate(newFurnitureElements.price, true)
        : validate(newFurnitureElements.price, false);

    newFurnitureElements.img.value.length != ""
        ? validate(newFurnitureElements.img, true)
        : validate(newFurnitureElements.img, false);

    function validate(element, bool) {
        if (!bool) {
            isValid = false;
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            isValid = bool;
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        }
    }

    if (isValid) {
        console.log("isValid:", isValid);
        let newFurnitureData = {
            make: newFurnitureElements.make.value,
            model: newFurnitureElements.model.value,
            year: newFurnitureElements.year.value,
            description: newFurnitureElements.description.value,
            price: newFurnitureElements.price.value,
            img: newFurnitureElements.img.value,
            material: newFurnitureElements.material.value,
        };

        const newFurniture = await postApi(url, newFurnitureData);

        console.log(newFurniture);

        if (newFurniture) {
            page.redirect("/catalog");
        } else {
            throw new Error(newFurniture);
        }
    } else {
        return;
    }
}

export const createView = (context) => render(createTemplate(), document.querySelector(".container"));
