async function loadCommits() {
    // Try it with Fetch API
    const username = document.querySelector(`#username`).value;
    const repo = document.querySelector(`#repo`).value;
    const list = document.querySelector(`#commits`);

    try {
        const response = await fetch(
            `https://api.github.com/repos/${username}/${repo}/commits`
        );

        if (response.ok === false) {
            throw new Error(`${response.status} (${response.statusText})`);
        }

        const data = await response.json();

        console.log(data);
        const keys = Object.keys(data);
        console.log(keys);

        list.innerHTML = "";
        // console.log(data);

        // for (let { commit } of data) {
        //     list.innerHTML += `<li>${commit.author.name}: ${commit.message}</li>`;
        // }

        for (let commit of data) {
            // console.log(commit);
            list.innerHTML += `<li>${commit.commit.author.name}: ${commit.commit.message}</li>`;
        }
    } catch (error) {
        list.innerHTML = `<li> Error: ${error.message}</li>`;
    }
}
