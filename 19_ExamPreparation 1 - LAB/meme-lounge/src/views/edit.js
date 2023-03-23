import { deleteMeme, editMeme, getAllMemes, getById } from "../api/memes.js";
import { html, nothing } from "../lib.js";
import { notify } from "../notify.js";

const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title} />
                <label for="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Enter Description"
                    name="description"
                    .value=${meme.description}
                ></textarea>
                <label for="imageUrl">Image Url</label>
                <input
                    id="imageUrl"
                    type="text"
                    placeholder="Enter Meme ImageUrl"
                    name="imageUrl"
                    .value=${meme.imageUrl}
                />
                <input type="submit" class="registerbtn button" value="Edit Meme" />
            </div>
        </form>
    </section>
`;

export async function editPage(ctx) {
    // console.log(ctx);
    // console.log(ctx.params);

    const meme = await getById(ctx.params.id);

    ctx.render(editTemplate(meme, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const meme = {
            title: formData.get("title").trim(),
            description: formData.get("description").trim(),
            imageUrl: formData.get("imageUrl").trim(),
        };

        if (meme.title == "" || meme.description == "" || meme.imageUrl == "") {
            notify("All fields are required!");
            return;
        }

        await editMeme(ctx.params.id, meme);

        ctx.page.redirect("/catalog");
    }
}
