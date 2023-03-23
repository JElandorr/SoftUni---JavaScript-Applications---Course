import { get, post, put, del } from "./api.js";

const endpoints = {
    getAll: "/data/memes?sortBy=_createdOn%20desc",
    getById: "/data/memes",
    create: "/data/memes",
    edit: "/data/memes",
    delete: "/data/memes",
};

export async function getAllMemes() {
    const memes = await get(endpoints.getAll);
    return memes;
}

export async function getById(id) {
    const meme = await get(endpoints.getById + "/" + id);
    return meme;
}

export async function getByUser(userId) {
    const memes = await get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return memes;
}

export async function editMeme(id, data) {
    const meme = await put(endpoints.edit + "/" + id, data);
    return meme;
}

export async function createMeme(data) {
    const meme = await post(endpoints.create, data);
    return meme;
}

export async function deleteMeme(id) {
    del(endpoints.delete + "/" + id);
}
