const { Pokemon, Type } = require("../DB_connection");
const { Op } = require("sequelize");

const getPokemons = async(req,res) =>{
  try{
    // Trae al pokemon que coincida con el nombre enviado por query
    const {name} = req.query
    if(name){
      const nameCleaned = name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '').replace(" ", "").toLowerCase()
      
      const pokemonsFound = await Pokemon.findAll({ where:
      {name:nameCleaned}, include:Type})
      if(!pokemonsFound.length){
        return res.status(400).send({message: "Pokemon no encontrado"} )
    }
      return res.status(200).json(pokemonsFound)
    
    }
    // Trae a todos los pokemons de la base de datos
    const allPokemons = await Pokemon.findAll({
      include: Type
    })
    
    res.status(200)
    res.json(allPokemons)
    return res
  } catch(error){
    res.status(404)
    res.send({message: error.message}) 
  }
}

module.exports = {getPokemons};