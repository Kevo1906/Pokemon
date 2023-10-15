require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const PokemonModel = require("./models/Pokemon")
const UserModel = require("./models/User")
const TypeModel = require("./models/Type")


const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   { logging: false, native: false }
);
// Inicializamos los modelos importados
   PokemonModel(sequelize)
   TypeModel(sequelize)
   UserModel(sequelize)

const{ Pokemon, Type, User } = sequelize.models
// Relacion entre pokemon y tipos de pokemon
Pokemon.belongsToMany(Type, { through: 'pokemon_type'})
Type.belongsToMany(Pokemon, { through: 'pokemon_type'})

// Relacion entre usuarios y pokemon
User.belongsToMany(Pokemon, { through: 'favorites'})
Pokemon.belongsToMany(User, { through: 'favorites'})

module.exports = {
   User,
   Pokemon,
   Type,
   conn: sequelize,
};
