(function (root, factory) {
    'use strict';
    
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return factory();
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.returnExportsGlobal = factory();
    }
    
}(this, function () {
    'use strict';
    class CommentModel {
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
            const {
                id = commentStore.id,
                title = commentStore.title,
                text = commentStore.text
            } = model;
            commentStore.id = id;
            commentStore.title = title;
            commentStore.text = text;
        }
    }
    
    return CommentModel;
}));
