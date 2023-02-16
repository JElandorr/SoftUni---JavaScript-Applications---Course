async function loadRepos() {
    const userName = document.querySelector(`#username`).value;

    const url = `https://api.github.com/users/${userName}/repos`;

    const list = document.querySelector(`#repos`);

    try {
        const response = await fetch(url);

        // console.log(response);

        if (response.ok === false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // console.log(data);

        list.innerHTML = "";

        for (let repo of data) {
            list.innerHTML += `
            <li>
                <a href="${repo.html_url}" target="_blank">
                    ${repo.full_name}
                </a>
            </li>`;
        }
    } catch (error) {
        list.innerHTML = `${error.message}`;
    }
}
