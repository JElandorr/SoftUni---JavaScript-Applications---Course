import { getAllMemes } from "../api/memes.js";
import { html } from "../lib.js";

const catalogTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memes.length > 0
                ? memes.map(memeCard)
                : html` <!-- Display : If there are no memes in database -->
                      <p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;

const memeCard = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl} />
            </div>
            <div id="data-buttons">
                <a class="button" href="/catalog/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;

export async function catalogPage(ctx) {
    // console.log("catalogPage is called!");
    const memes = await getAllMemes();
    // console.log(memes);

    ctx.render(catalogTemplate(memes));
}
