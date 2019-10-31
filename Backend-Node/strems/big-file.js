const fs = require('fs')
const file = fs.createWriteStream('./big');

for(let i = 0; i <= 1e6; i++){
    file.write('Tengo que aprender un monton de cosas en poco tiempo y no se como administrarmi tiempo. DESDE DE LA FACU HASTA LOS CURSO S Y LA SUSCRIPCION A PLATZZI. aYUDA!!!! :C . Animo que se viene el espectaculo de Nvidada')
}

file.end()