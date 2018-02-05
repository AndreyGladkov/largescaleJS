define(function() {
    const commentsNode = document.getElementById('JS-CommentsNode-Additional');
    
    function renderComment(commentData) {
        const {title, text, id} = commentData;
        const template = `
            <div class="comment-item JS-Comment-Item-Additional" data-id="${id}">
                <div class="comment-item__content">
                    <div class="comment-item__title">Заголовок: ${title}</div>
                    <div class="comment-item__text">Текст комментария: ${text}</div>
                </div>
            </div>
        `.trim();
        
        const commentNode = new DOMParser().parseFromString(template, 'text/html').body.childNodes;
        commentNode.forEach((node) => {commentsNode.appendChild(node);})
    }
    
    function remove(commentData) {
        const commentsList = commentsNode.querySelectorAll('.JS-Comment-Item-Additional');
        for (let i = 0; i < commentsList.length; i++) {
            if (+commentsList[i].getAttribute('data-id') === commentData.id) {
                commentsList[i].remove();
            }
        }
    }
    
    return {
        render: renderComment,
        remove: remove
    }
});



