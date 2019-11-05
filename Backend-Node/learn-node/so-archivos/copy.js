const fs = require('fs');

fs.copyFile('textExample.txt', 'Prueba.txt',err=>{
    if(err){
        console.log(err);
    }
    console.log('Nuestro archivo fue copiado :D');
})