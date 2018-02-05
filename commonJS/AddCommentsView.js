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
