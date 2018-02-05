/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Events);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CommentsStore_js__ = __webpack_require__(2);







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CommentModel_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CommentViewAdditional_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CommentView_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AddCommentsViewModel_js__ = __webpack_require__(6);





const commentStore = [];
let id = 0;

const commentView = new __WEBPACK_IMPORTED_MODULE_2__CommentView_js__["a" /* default */](document.getElementById('JS-CommentsNode'));

const publicInterface = {
    add(item) {
        const {title, text} = item;
        const comment = new __WEBPACK_IMPORTED_MODULE_0__CommentModel_js__["a" /* default */]({
            id: id,
            title,
            text,
        });

        id += 1;

        commentStore.push(comment);
    
        __WEBPACK_IMPORTED_MODULE_1__CommentViewAdditional_js__["a" /* default */].render(comment.get())
        commentView.render(comment.get());
    },
    getAll() {
        return commentStore.map(comment => (comment.get()));
    },
    remove(id) {
        const comment = commentStore[id];
        commentStore.slice(id, 1);
    
        __WEBPACK_IMPORTED_MODULE_1__CommentViewAdditional_js__["a" /* default */].remove(comment.get());
        commentView.remove(comment.get());
    }
};

commentView.on('remove', function(id) {
    publicInterface.remove(id);
});

__WEBPACK_IMPORTED_MODULE_3__AddCommentsViewModel_js__["a" /* default */].on('add', function(comment) {
    publicInterface.add(comment);
})

/* unused harmony default export */ var _unused_webpack_default_export = (publicInterface);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (CommentModel);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
    render: renderComment,
    remove
});



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events_js__ = __webpack_require__(0);


class CommentView extends __WEBPACK_IMPORTED_MODULE_0__Events_js__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (CommentView);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events_js__ = __webpack_require__(0);


const titleInput = document.querySelector('#JS-CommentTitle');
const textInput = document.querySelector('#JS-CommentText');
const addCommentButton = document.querySelector('#JS-CommentSubmit');
const publicInterface = new __WEBPACK_IMPORTED_MODULE_0__Events_js__["a" /* default */]();

addCommentButton.addEventListener('click', (event) => {
    'use strict'
    event.preventDefault();
    publicInterface.trigger('add', {title: titleInput.value, text: textInput.value})

    titleInput.value = '';
    textInput.value = '';
});

/* harmony default export */ __webpack_exports__["a"] = (publicInterface);


/***/ })
/******/ ]);