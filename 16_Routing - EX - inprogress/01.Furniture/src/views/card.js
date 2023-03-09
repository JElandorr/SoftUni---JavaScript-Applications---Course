import { html } from "lit-html";

export const itemCardTemplate = () => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="./images/chair.jpg" />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>55 $</span></p>
                </footer>
                <div>
                    <a href="#" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`;
