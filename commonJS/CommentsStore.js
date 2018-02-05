const CommentModel = require('./CommentModel.js');
const CommentView = require('./CommentView.js');
const CommentViewAdditional = require('./CommentViewAdditional.js');
const AddCommentsView = require('./AddCommentsView.js');

const commentStore = [];
let id = 0;

const commentView = new CommentView(document.getElementById('JS-CommentsNode'));

const publicInterface = {
    add(item) {
        const {title, text} = item;
        const comment = new CommentModel({
            id: id,
            title,
            text,
        });
        
        id += 1;
        
        commentStore.push(comment);
        
        CommentViewAdditional.render(comment.get())
        commentView.render(comment.get());
    },
    getAll() {
        return commentStore.map(comment => (comment.get()));
    },
    remove(id) {
        const comment = commentStore[id];
        commentStore.slice(id, 1);
        
        CommentViewAdditional.remove(comment.get());
        commentView.remove(comment.get());
    }
};

commentView.on('remove', function(id) {
    publicInterface.remove(id);
});

AddCommentsView.on('add', function(comment) {
    publicInterface.add(comment);
})

module.exports = publicInterface;

