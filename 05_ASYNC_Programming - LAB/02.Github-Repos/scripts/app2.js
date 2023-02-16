function loadRepos() {
    const userName = document.querySelector(`#username`).value;

    const url = `https://api.github.com/users/${userName}/repos`;

    const list = document.querySelector(`#repos`);

    fetch(url).then(handleResponse).then(displayRepos).catch(handleError);

    function handleResponse(response) {
        if (response.ok === false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    function displayRepos(data) {
        list.innerHTML = "";
        for (let repo of data) {
            list.innerHTML += `        
                <li>
                    <a href="${repo.html_url}" target="_blank">
                        ${repo.full_name}
                    </a>
                </li>`;
        }
    }

    function handleError(err) {
        list.innerHTML = `${err.message}`;
    }
}
