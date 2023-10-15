const { Pokemon, Type } = require("../DB_connection");
const { Op } = require("sequelize");

const getPokemonId = async(req,res) =>{
  try{
    let {idPokemon} = req.params
    idPokemon = Number(idPokemon)
    if(isNaN(idPokemon)){
        return res.status(404).send({message: "Envie un valor numerico"})
    }
    const pokemonFinded = await Pokemon.findOne({where:{id:idPokemon}, include:Type})
    if(!pokemonFinded){
        return res.status(400).send({message: "Pokemon no encontrado"} )
    }
    
    res.status(200)
    res.json(pokemonFinded)
    return res
  } catch(error){
    res.status(404)
    res.send({message: error.message}) 
  }
}

module.exports = {getPokemonId};