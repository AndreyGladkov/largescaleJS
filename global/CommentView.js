var CommentView = (function() {
    class _CommentView extends Events {
        constructor(commentsNode) {
            super();
            this.commentsNode = commentsNode;
            commentsNode.addEventListener('click', (event) => {
                if (event.target.classList.contains('JS-Comment-ItemEdit')) {
                    const commentNode = event.target.closest('.JS-Comment-Item');
                    
                    if (commentNode) {
                        const id = commentNode.getAttribute('data-id');
                        this.trigger('remove', id);
                    }
                }
            });
        }
        
        render(commentData) {
            const {title, text, id} = commentData;
            const template = `
            <div class="comment-item JS-Comment-Item" data-id="${id}">
                <div class="comment-item__content">
                    <div class="comment-item__title">${title}</div>
                    <div class="comment-item__text">${text}</div>
                </div>
                <div class="comment-item__edit JS-Comment-ItemEdit">❌</div>
            </div>
        `.trim();
            
            const commentNode = new DOMParser().parseFromString(template, 'text/html').body.childNodes;
            commentNode.forEach((node) => {this.commentsNode.appendChild(node);})
        }
        
        remove(commentData) {
            const commentsList = this.commentsNode.querySelectorAll('.JS-Comment-Item');
            for (let i = 0; i < commentsList.length; i++) {
                if (+commentsList[i].getAttribute('data-id') === commentData.id) {
                    commentsList[i].remove();
                }
            }
        }
    }
    
    return _CommentView;
}());
