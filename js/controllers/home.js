import host from '../host.js';
import postRender from './postRender.js';

window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderBy = urlParams.get('orderBy');
    console.log(orderBy)
    try {
        document.querySelector(`#${orderBy}`).classList.add('selected');
    } catch (e) {
        console.log(e)
    }
    const res = await fetch(host + '/posts' + '?orderBy=' + orderBy, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const posts = await res.json();
    postRender(posts);
})