import host from '../host.js';
import postRender from './postRender.js';

window.addEventListener('load', async () => {
    console.log()
    const res = await fetch(host + '/users/me/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const posts = await res.json();
    postRender(posts, true, true);
})
