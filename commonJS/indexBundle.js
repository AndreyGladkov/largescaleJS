(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Events = require('./Events.js');

const titleInput = document.querySelector('#JS-CommentTitle');
const textInput = document.querySelector('#JS-CommentText');
const addCommentButton = document.querySelector('#JS-CommentSubmit');
const publicInterface = new Events();

addCommentButton.addEventListener('click', (event) => {
    'use strict'
    event.preventDefault();
    publicInterface.trigger('add', {title: titleInput.value, text: textInput.value})
    
    titleInput.value = '';
    textInput.value = '';
});

module.exports = publicInterface;

},{"./Events.js":6}],2:[function(require,module,exports){
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
        const {id = commentStore.id, title = commentStore.title, text = commentStore.text } = model;
        commentStore.id = id;
        commentStore.title = title;
        commentStore.text = text;
    }
}

module.exports = CommentModel;

},{}],3:[function(require,module,exports){
const Events = require('./Events.js');

class CommentView extends Events {
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

module.exports = CommentView;






},{"./Events.js":6}],4:[function(require,module,exports){
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

module.exports = {
    render: renderComment,
    remove: remove
}

},{}],5:[function(require,module,exports){
const CommentModel = require('./CommentModel.js');
const CommentView = require('./CommentView.js');
const CommentViewAdditional = require('./CommentViewAdditional.js');
const AddCommentsViewModel = require('./AddCommentsViewModel.js');

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

AddCommentsViewModel.on('add', function(comment) {
    publicInterface.add(comment);
})

module.exports = publicInterface;


},{"./AddCommentsViewModel.js":1,"./CommentModel.js":2,"./CommentView.js":3,"./CommentViewAdditional.js":4}],6:[function(require,module,exports){
class Events {
    constructor() {
        const listeners = [];
        this.on = this.on.bind(this, listeners);
        this.trigger = this.trigger.bind(this, listeners);
    }
    
    on(listeners, name, cb) {
        if (!listeners[name]) {
            listeners[name] = [];
        }
        
        listeners[name].push(cb);
    }
    
    trigger(listeners, name, data) {
        if (listeners[name]) {
            listeners[name].forEach(
                cb => cb(data)
            );
        }
    }
}

module.exports = Events;

},{}],7:[function(require,module,exports){
require('./CommentsStore.js');

},{"./CommentsStore.js":5}]},{},[7]);
