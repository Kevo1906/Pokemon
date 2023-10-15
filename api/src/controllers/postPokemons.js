const { Pokemon, Type } = require("../DB_connection");
const { Op, INTEGER } = require("sequelize");
const {arrayEquals} = require("../utils/arrayEquals")

const postPokemons = async(req,res) =>{
    try{
      const pokemon = req.body
      // Creamos un array de los atributos para validar de que tenga todos
      let PokemonsAtributes = Object.keys(Pokemon.getAttributes())
      PokemonsAtributes = PokemonsAtributes.slice(0, -2);
      PokemonsAtributes.push('types')
      // Validacion de que tenga todos los atributos necesarios
      if(!arrayEquals(Object.keys(pokemon),PokemonsAtributes)){
        return res.status(400).send({message: "Faltan atributos"})
      }
      //Validacion de que no hayan vacios o nulos
      for(let atribute in pokemon){
        if(atribute ==="img_anime" || atribute ==="img_game"){
          continue
        }
        if(!pokemon[atribute]){
          return res.status(422).send({message: "No se aceptan atributos vacios"})  
        }
      }
      //Validaciones ID
      if(typeof pokemon.id !== 'number'){
        return res.status(422).send({message: "id: tipo de dato erroneo"})
      }
      //Validaciones NAME
      if(typeof pokemon.name !== 'string'){
        return res.status(422).send({message: "name: tipo de dato erroneo"})
      }
      if(pokemon.name.length > 30){
        return res.status(422).send({message: "name: Debe tener maximo 30 caracteres"})
      }
      
      if(pokemon.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g)){
        console.log(pokemon.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g))
        return res.status(422).send({message: "name: No esta permitido numeros ni caracteres diferentes a letras"})
      }
      // Validaciones STATS
      const stats = ["hp", "attack", "defense", "speed", "height",
        "weight"]
      for(let stat in stats){
        if(typeof pokemon[stats[stat]] !== 'number'){
          return res.status(422).send({message: `${stats[stat]}: tipo de dato erroneo`})
        }
        if(pokemon[stats[stat]] <0){
          return res.status(422).send({message: `${stats[stat]}: No se aceptan stats negativas`})
        }
      }
      //Validaciones TYPES
           
      if(typeof pokemon.types !== 'object'){
        return res.status(422).send({message: "types: tipo de dato erroneo"})
      }
      if(pokemon.types.length < 2){
        return res.status(422).send({message: "types: debe tener al menos asignado dos tipos"})
      }
      let AllTypes = await Type.findAll()
      // Se convierten los tipos en un objeto donde la llave es el nombre y el valor el id
      let types ={}
      for(let type=0; type<AllTypes.length; type++){
        types[AllTypes[type].name] = AllTypes[type].id
      }
      console.log(types)
      for(let i =0;i<pokemon.types.length;i++){
        if(!Object.keys(types).includes(pokemon.types[i])){
          return res.status(422).send({message: `${pokemon.types[i]}: No existe ese tipo de pokemon`
        })
      }}
      pokemon.types = pokemon.types.map(element => types[element])
      console.log(pokemon.types)
      // Si pasa todas las validaciones recien se crea el pokemon
      let [newPokemon, created] = await Pokemon.findOrCreate({where: {[Op.or]: [
        { id: pokemon.id },
        { name: pokemon.name }
      ]}, defaults: {
        id: pokemon.id,
        name: pokemon.name,
        img_anime: pokemon.img_anime,
        img_game: pokemon.img_game,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight
      }})
      if(!created){
        return res.status(400).send({message:"Pokemon ya existe"})
      }
      await newPokemon.addType(pokemon.types)
      res.status(200)
      res.send({message: "Pokemon creado"})
      return res
    } catch(error){
      res.status(404)
      res.send({message: error.message}) 
    }
  }
  
  module.exports = {postPokemons};


