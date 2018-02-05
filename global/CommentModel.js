var CommentModel = (function() {
    class _CommentModel {
        constructor(model) {
            const commentStore = {};
            
            this.get = this.get.bind(this, commentStore);
            this.set = this.set.bind(this, commentStore);
            
            this.set(model);
        }
        
        get(commentStore) {
            return Object.assign({}, commentStore);
        }
        
        set(commentStore, model) {
            const {id = commentStore.id, title = commentStore.title, text = commentStore.text } = model;
            commentStore.id = id;
            commentStore.title = title;
            commentStore.text = text;
        }
    }
    
    return _CommentModel;
}());
