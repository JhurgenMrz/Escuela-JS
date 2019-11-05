const fs = require('fs');

fs.mkdir('example/school/mkdir',{ recursive: true}, (err)=>{
    if(err){
        console.log(err);
    }
})