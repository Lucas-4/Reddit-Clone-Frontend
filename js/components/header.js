import host from '../host.js';

document.querySelector('header').innerHTML = `
    <a href="home.html"><img id="logo" src="https://www.redditinc.com/assets/images/site/reddit-logo.png"/></a>
    
        <input type="text" placeholder="Search">
    <div id="menu"></div>
`;


async function getUser() {
    const res = await fetch(host + '/users/me', {
        method: 'GET',
        credentials: 'include'
    })
    const user = await res.json();

    return user;
}


window.addEventListener('load', async () => {
    const user = await getUser();
    const menu = document.querySelector('#menu');
    if (user.name === null) {
        menu.innerHTML = `<a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>`;
    } else {
        menu.innerHTML = `<a href="createPost.html"><i class="bi bi-pen"></i>Create Post</a> <p id="logout" >Logout</p> <a href="user.html?${user.id}"><i class="bi bi-person"></i>${user.name}</a>`;
    }

    const logoutBtn = document.querySelector('#logout');
    if (!(logoutBtn == undefined))
        logoutBtn.addEventListener('click', async () => {
            await fetch(host + '/users/logout', {
                method: 'POST',
                credentials: 'include'
            })

            window.location.href = 'home.html';
        })
})
