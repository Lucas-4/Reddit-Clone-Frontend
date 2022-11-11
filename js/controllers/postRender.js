import host from '../host.js'
const postRender = (posts, allowDelete = false, allowEdit = false) => {

    function displayVoteError() {
        document.querySelector('#vote_error').style.visibility = 'visible';
        setTimeout(() => {
            document.querySelector('#vote_error').style.visibility = 'hidden'
        }, 2000)
    }

    function voteHandler() {

        const voteBtns = document.querySelectorAll('.vote_btn');

        for (let voteBtn of voteBtns) {
            voteBtn.addEventListener('click', (e) => {

                const post_id = parseInt(e.target.parentElement.parentElement.getAttribute('data-post-id'));
                const voteCount = e.target.parentElement.querySelector('.vote_count');
                const voteCountValue = parseInt(e.target.parentElement.querySelector('.vote_count').innerText);
                if (e.target.classList.contains('upvoted') || e.target.classList.contains('downvoted')) {
                    fetch(host + `/votes/${post_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',

                    }).then(res => {
                        if (res.ok) {
                            if (e.target.classList.contains('upvoted')) {
                                e.target.classList.remove('upvoted');
                                voteCount.innerText = voteCountValue - 1;
                            } else if (e.target.classList.contains('downvoted')) {
                                e.target.classList.remove('downvoted');
                                voteCount.innerText = voteCountValue + 1;
                            }
                            return res.json();
                        }
                        throw Error();
                    }).catch((e) => {
                        displayVoteError();
                    });
                } else if (e.target.classList.contains('upvote')) {
                    const body = {
                        vote_value: 1,
                        post_id: post_id
                    }
                    fetch(host + '/votes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(body)
                    }).then(res => {
                        if (res.ok) {
                            let vote = 0;
                            if (e.target.parentElement.querySelector('.downvote').classList.contains('downvoted')) {
                                e.target.parentElement.querySelector('.downvote').classList.remove('downvoted');
                                vote = 1;
                            }
                            e.target.classList.add('upvoted');
                            voteCount.innerText = voteCountValue + 1 + vote;
                            return res.json();
                        } else {
                            throw Error('');
                        }
                    }).catch(() => {
                        displayVoteError();
                    })
                } else if (e.target.classList.contains('downvote')) {
                    const body = {
                        vote_value: -1,
                        post_id: post_id
                    }
                    fetch(host + '/votes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(body)
                    }).then(res => {
                        let vote = 0;
                        if (res.ok) {
                            if (e.target.parentElement.querySelector('.upvote').classList.contains('upvoted')) {
                                e.target.parentElement.querySelector('.upvote').classList.remove('upvoted');
                                vote = 1;
                            }
                            e.target.classList.add('downvoted');
                            voteCount.innerText = voteCountValue - 1 - vote;
                            return res.json();
                        } else {
                            throw Error('');
                        }
                    }).catch(() => {
                        displayVoteError();
                    })
                }
            })




        }
    }

    function postDeleteHandler() {
        const deletePostBtns = document.querySelectorAll('.delete_post');
        for (let btn of deletePostBtns) {
            btn.addEventListener('click', async (e) => {
                const post_id = parseInt(e.target.parentElement.parentElement.parentElement.getAttribute('data-post-id'));

                fetch(host + `/posts/${post_id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                }).then(res => {
                    if (res.ok) {
                        window.location.reload();
                        return;
                    }
                    throw Error();
                }).catch(() => {
                    console.log('error when deleting')
                })
            })
        }
    }


    function displayDeleteBtn() {
        if (allowDelete) {
            return '<i class="bi bi-trash delete_post"></i>';
        }
        return '';
    }

    function displayEditBtn(id) {
        if (allowEdit) {
            return `<a href="editPost.html?id=${id}"><i class="bi bi-pen edit_post"></i></a>`;
        }
        return '';
    }

    if (posts.length == 0) {
        document.querySelector('#posts').innerHTML = '<h1>No posts here...</h1>'
        return;
    }
    for (let post of posts) {
        document.querySelector('#posts').innerHTML += `
            <div data-post-id="${post.id}" class="post">
            
                <div class="vote">
                    <i class="bi bi-caret-up-square vote_btn upvote"></i>
                    <p class="vote_count">${post.vote_count}</p>
                    <i class="bi bi-caret-down-square vote_btn downvote"></i>
                </div>
                <div class="post-container">
                    <div class="post_info">
                        <p class="subreddit_name">r/${post.subreddit_name}</p>
                        <p class="username">Posted by u/${post.username}</p>
                        ${displayDeleteBtn()}
                        ${displayEditBtn(post.id)}
                    </div>
                    
                    <h1 class="title"><a href="post.html?id=${post.id}">${post.title}</a></h1>
                    <p class="content">${post.content}</p>
                    
                </div>
                
            </div>`
        if (post.vote_value != undefined) {
            if (post.vote_value === 1) {
                document.querySelector('#posts').lastChild.querySelector('.upvote').classList.add('upvoted');
            } else {
                document.querySelector('#posts').lastChild.querySelector('.downvote').classList.add('downvoted');
            }
        }
    }
    voteHandler();
    if (allowDelete === true) {
        postDeleteHandler();

    }
    console.log(window.location)
    if (window.location.href.includes('post.html')) {
        document.querySelector('.post').style.maxHeight = '100%';
    }

}

export default postRender;