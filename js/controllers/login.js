import host from '../host.js';

document.querySelector('button').addEventListener('click', () => {
    const body = {};
    body.email = document.querySelector('#email').value;
    body.password = document.querySelector('#password').value;
    fetch(host + '/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status === 401) {
            document.querySelector('#failed-login-msg p').innerText = 'Email or password incorrect';
            document.querySelectorAll('#form input')[0].classList.add('failed-login');
            document.querySelectorAll('#form input')[1].classList.add('failed-login')

        } else {
            document.querySelector('#failed-login-msg p').innerText = '';
            document.querySelectorAll('#form input')[0].classList.remove('failed-login');
            document.querySelectorAll('#form input')[1].classList.remove('failed-login')
            window.location.href = 'home.html';
        }
    });
})
