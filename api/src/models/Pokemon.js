const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Pokemon', {
        id:{type: DataTypes.INTEGER, allowNull:false, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull:false, notEmpty: true },
        img_anime: {type: DataTypes.STRING, allowNull:true, isUrl: true, defaultValue: 'https://e7.pngegg.com/pngimages/706/299/png-clipart-pokemon-pokeball-illustration-pikachu-ash-ketchum-pokemon-coloring-book-pokeball-rim-pokemon.png'},
        img_game: {type: DataTypes.STRING, allowNull:true, isUrl: true, defaultValue: 'https://e7.pngegg.com/pngimages/112/329/png-clipart-minecraft-pixel-art-poke-ball-drawing-pokeball-opening-mincraft-rectangle-logo.png'},
        hp: {type: DataTypes.INTEGER, allowNull:false, notEmpty: true },
        attack: {type: DataTypes.INTEGER, allowNull:false, notEmpty: true },
        defense: {type: DataTypes.INTEGER, allowNull:false, notEmpty: true },
        speed: {type: DataTypes.INTEGER, allowNull:true, defaultValue:0},
        height: {type: DataTypes.INTEGER, allowNull:true, defaultValue:0},
        weight: {type: DataTypes.INTEGER, allowNull:true, defaultValue:0},
        
    })
}