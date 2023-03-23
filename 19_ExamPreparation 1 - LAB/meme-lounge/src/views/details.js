import { deleteMeme, getAllMemes, getById } from "../api/memes.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (meme, onDelete, isAuthor) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl} />
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                ${isAuthor
                    ? html` <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                          <a class="button warning" href="/edit/${meme._id}">Edit</a>
                          <button class="button danger" @click=${onDelete}>Delete</button>`
                    : nothing}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    // console.log(ctx);
    // console.log(ctx.params);

    let isAuthor = false;
    const user = getUserData();

    const meme = await getById(ctx.params.id);

    // console.log("MEME:", meme);

    if (user) {
        // console.log("USER:", user);
        if (user.id == meme._ownerId) {
            isAuthor = true;
        }
    }

    ctx.render(detailsTemplate(meme, onDelete, isAuthor));

    async function onDelete() {
        const choise = confirm("Are you sure you want to delete this meme?");

        if (choise) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect("/catalog");
        }
    }
}
