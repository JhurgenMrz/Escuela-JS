const fetchData = require('../utils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/';

const anotherFunction = async (url_api) => {
    try {
        const response = await fetchData(url_api);
        const character = await fetchData(`${url_api}${response.results[0].id}`);
        const origin = await fetchData(character.origin.url);
        console.log(response.info.count);
        console.log(character.name);
        console.log(origin.dimension);
    } catch (error) {
        console.error(error);
    }
}

console.log('Before');
anotherFunction(API);
console.log('After');