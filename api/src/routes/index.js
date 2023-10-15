const express = require("express")
const router = express.Router()
const {getLoadData} = require("../controllers/getLoadData")
const {getPokemons} = require("../controllers/getPokemon")
const {getTypes} = require("../controllers/getTypes")
const {getPokemonId} = require("../controllers/getPokemoId")
const {postPokemons} = require("../controllers/postPokemons")
const {deletePokemon} =require("../controllers/deletePokemon")


router.get("/load-data", getLoadData)
router.get("/pokemons", getPokemons)
router.get("/types", getTypes)
router.get("/pokemons/:idPokemon", getPokemonId)
router.post("/pokemons", postPokemons)

router.delete("/pokemons/:idPokemon", deletePokemon)
module.exports = router;