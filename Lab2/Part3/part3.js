function searchUser() {
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayUserInfo(data);
            if (data.repos_url) {
                fetchRepos(data.repos_url);
            }
        })
        .catch(error => console.error(error));
}

function displayUserInfo(user) {
    const avatar = document.getElementById('avatar');
    const name = document.getElementById('name');
    const UName = document.getElementById('UName');
    const bio = document.getElementById('bio');
    const email = document.getElementById('email');
    const location = document.getElementById('location');
    const gistsCount = document.getElementById('gistsCount');

    avatar.src = user.avatar_url;
    name.innerText = `Name: ${user.name || 'Not provided'}`;
    UName.innerText = `Username: ${user.login || 'Not provided'}`;

    if (user.bio) {
        bio.innerText = `Bio: ${user.bio}`;
    } else {
        bio.innerText = 'Bio: No bio available';
    }

    if (user.email) {
        email.innerText = `Email: ${user.email}`;
    } else {
        email.innerText = 'Email: Not provided';
    }

    if (user.location) {
        location.innerText = `Location: ${user.location}`;
    } else {
        location.innerText = 'Location: Not provided';
    }

    gistsCount.innerText = `Number of Gists: ${user.public_gists || 0}`;
}



function fetchRepos(reposUrl) {
    fetch(reposUrl)
        .then(response => response.json())
        .then(repos => {
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = ''; 
            if (repos.length === 0) {
                repoList.innerHTML = 'No repositories found.';
            } else {
                repos.slice(0, 100).forEach(repo => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>Name:</strong> ${repo.name}<br><strong>Description:</strong> ${repo.description || 'No description available'}<br><a href="${repo.html_url}" target="_blank">Link to Repository</a>`;
                    repoList.appendChild(li);
                });
            }
        })
        .catch(error => console.error(error));
}




