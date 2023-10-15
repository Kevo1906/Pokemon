const axios = require("axios");

// Funcion que devuelve el objeto Pokemon para subir a la base de datos
const getPokemonData = (data) => {
  let hp = data.stats.filter((element) => element.stat.name === "hp");
  hp = hp[0].base_stat;

  let attack = data.stats.filter((element) => element.stat.name === "attack");
  attack = attack[0].base_stat;

  let defense = data.stats.filter((element) => element.stat.name === "defense");
  defense = defense[0].base_stat;

  let speed = data.stats.filter((element) => element.stat.name === "speed");
  speed = speed[0].base_stat;

  let types = data.types.map((element) => element.type.url);
  types = types.map((element) => element.split("/"));
  types = types.map((element) => Number(element[element.length - 2]));
  return {
    id: data.id,
    name: data.name,
    img_anime: data.sprites.other["official-artwork"].front_default,
    img_game: data.sprites.front_default,
    hp: hp,
    attack: attack,
    defense: defense,
    speed: speed,
    height: data.height,
    weight: data.weight,
    types: types,
  };
};
const getPokemonUrls = async () => {
  
  let urls = ["https://pokeapi.co/api/v2/pokemon"];
  for (let i = 20; i <= 1260; i = i + 20) {
    urls.push(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`);
  }
  urls.push("https://pokeapi.co/api/v2/pokemon?offset=1280&limit=12");

    let urlsPromises = urls.map(async (element) => {

    let { data } = await axios(element);
    return data.results;
  });
  let results = await Promise.all(urlsPromises);
  let pokemonsUrls = [].concat(...results);
  return pokemonsUrls;
};

const getPokemons = async (urls) => {
  let pokemonPromises = urls.map(async (element) => {
    try {
      let { data } = await axios(element.url);
     
      return getPokemonData(data);
    } catch (error) {
      return {
        url: element.url,
        error: error.message,
      };
    }
  });
  let resultsPokemonPromises = await Promise.all(pokemonPromises);
  return resultsPokemonPromises
};
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
const pokemonData = async() =>{
    console.log("Getting urls data")
    const pokemonUrl = await getPokemonUrls()
    console.log(pokemonUrl.length)
    let pokemonData = await getPokemons(pokemonUrl)
    let pokemonError = pokemonData.filter(element => element.error)
    pokemonData = pokemonData.filter(element => !element.error)
    while(pokemonError.length){
        await wait(200)
        let temporary = await getPokemons(pokemonError)
        
        pokemonError = temporary.filter(element => element.error)
        pokemonData = pokemonData.concat(temporary.filter(element => !element.error))
        
    }
    console.log("Finished")
    return pokemonData
}

// Funcion para obtener los tipos de pokemon de la API
const typeData = async() => {
    const { data } = await axios("https://pokeapi.co/api/v2/type")
    let types = data.results.map(element => {  return {id: Number(element.url.split("/")[6]),name: element.name}})
    return types
}


module.exports = {
    pokemonData,
    typeData
}