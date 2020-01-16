const somethingsWillHappen = () => {
    return new Promise((resolve, reject)=>{
        if (true) {
            resolve('Hey! :D')
        }else {
            reject('Whoooops :C')
        }
    })
}
somethingsWillHappen()
    .then(response=> console.log(response))
    .catch(err=> console.error(err))


const somethingsWillHappen2 = () => {
    return new Promise((resolve, reject)=>{
        if(true){
            setTimeout(()=>{
                resolve('True! :D')
            },2000)
        }
        else{
            const error = new Error('Whoooops! :C')
            reject(error);
        }
    })
}

somethingsWillHappen2()
    .then(response=> console.log(response))
    .catch(error=> console.error(error))


Promise.all([somethingsWillHappen(), somethingsWillHappen2()])
    .then(response=>console.log('Array of results', response))
    .catch(error=> console.error(error));