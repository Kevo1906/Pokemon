const { typeData, pokemonData } = require("../utils/getData")
const { Pokemon, Type } = require("../DB_connection");
const getLoadData = async(req,res) =>{
    try{
    console.log("Uploading Types...")
    const types = await typeData()
    const typesPromises = types.map(async(element) => {
        let[newType, created] = await Type.findOrCreate({
            where: {id: element.id},
            defaults: {
                id: element.id,
                name: element.name
            }
        })
    })
    await Promise.all(typesPromises)

    console.log("Uploading Pokemons...")
    const pokemons = await pokemonData()
    const pokemonsPromises = pokemons.map( async(element)=>{
        let [newPokemon, created] = await Pokemon.findOrCreate({
            where: {id: element.id},
            defaults: {
                  id: element.id,
                  name: element.name,
                  img_anime: element.img_anime,
                  img_game: element.img_game,
                  hp: element.hp,
                  attack: element.attack,
                  defense: element.defense,
                  speed: element.speed,
                  height: element.height,
                  weight: element.weight,}
         
               })
            await newPokemon.addType(element.types)
    })
    await Promise.all(pokemonsPromises)
    res.status(200)
    res.send({message: "All data has been uploaded"})
    return res
    } catch(error){
        res.status(404)
        res.send({error: error.message})
        return res
    }

}
module.exports = {getLoadData};