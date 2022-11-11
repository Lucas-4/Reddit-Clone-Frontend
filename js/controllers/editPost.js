import host from '../host.js';

window.addEventListener('load', async () => {
    const param = new URLSearchParams(window.location.search);
    const id = parseInt(param.get('id'));
    const res = await fetch(host + `/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const post = await res.json();
    console.log(post)

    document.querySelector('#title').value = post[0].title;
    document.querySelector('#content').value = post[0].content;
    
    document.querySelector('#submit').addEventListener('click', async () => {
        const put = {};
        put.title = document.querySelector('#title').value;
        put.content = document.querySelector('#content').value;

        const res = await fetch(host + `/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(put)
        })

        

        if(res.status===400){
            const validation = await res.json();
            console.log(validation)
            if(validation.title==='valid'){
                document.querySelector('#title').classList.remove('create-post-failed');
                document.querySelectorAll('.create-post-failed-msg p')[0].innerText = '';
            }else{
                document.querySelector('#title').classList.add('create-post-failed');
                document.querySelectorAll('.create-post-failed-msg p')[0].innerText = validation.title;
            }

            if(validation.content==='valid'){
                document.querySelector('#content').classList.remove('create-post-failed');
                document.querySelectorAll('.create-post-failed-msg p')[1].innerText = '';
            }else{
                document.querySelector('#content').classList.add('create-post-failed');
                document.querySelectorAll('.create-post-failed-msg p')[1].innerText = validation.content;
            }
        }else{
            window.location.href = 'user.html';
        }
    })
})