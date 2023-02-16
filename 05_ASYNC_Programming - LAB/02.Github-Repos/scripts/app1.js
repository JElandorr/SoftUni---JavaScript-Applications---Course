async function loadRepos() {
    // get input field info
    const userName = document.querySelector(`#username`);
    // console.log(userName.value);
    const url = `https://api.github.com/users/${userName.value}/repos`;

    // fetch remote data
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
    } catch (err) {
        alert(err.message);
    }
    // display received remote data
}

function cde(type) {
    const e = document.createElement(`${type}`);
}
