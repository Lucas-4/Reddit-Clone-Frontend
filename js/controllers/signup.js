import host from '../host.js';

document.querySelector('#submit').addEventListener('click', async () => {
    const body = {};
    body.name = document.querySelector('#name').value;
    body.email = document.querySelector('#email').value;
    body.password = document.querySelector('#password').value;
    const res = await fetch(host + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })

    const validation = await res.json();
    if (res.status === 400) {
        if (validation.username === 'valid') {
            document.querySelector('#name').classList.remove('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[0].innerText = '';
        } else {
            document.querySelector('#name').classList.add('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[0].innerText = validation.username;
        }

        if (validation.email === 'valid') {
            document.querySelector('#email').classList.remove('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[1].innerText = '';
        } else {
            document.querySelector('#email').classList.add('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[1].innerText = validation.email;
        }

        if (validation.password === 'valid') {
            document.querySelector('#password').classList.remove('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[2].innerText = '';
        } else {
            document.querySelector('#password').classList.add('failed-signup');
            document.querySelectorAll('.failed-signup-msg p')[2].innerText = validation.password;
        }
    } else {
        window.location.href = 'home.html';
    }

})