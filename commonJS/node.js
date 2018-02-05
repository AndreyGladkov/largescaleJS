const readline = require('readline');

const CommentModel = require('./CommentModel.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let id = 0;

rl.question('Введите заголовок комментария? ', (title) => {
    rl.question('Введите текст комментария? ', (text) => {
    
        const comment = new CommentModel({
            id,
            title,
            text
        });
        
        id++;
        
        console.log(comment.get());
        
        rl.close();
    });
});


