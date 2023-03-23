import { getByUser } from "../api/memes.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const profileTemplate = (user, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png" />
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes && memes.length > 0
                ? memes.map(memeProfileCard)
                : html` <!-- Display : If user doesn't have own memes  -->
                      <p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;

const memeProfileCard = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
        <a class="button" href="/catalog/${meme._id}">Details</a>
    </div>
`;

export async function profilePage(ctx) {
    const user = getUserData();
    // console.log(user);

    const memes = await getByUser(user.id);

    ctx.render(profileTemplate(user, memes));
}
