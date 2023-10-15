const { Pokemon, Type } = require("../DB_connection");
const { Op } = require("sequelize");

const getTypes = async(req,res) =>{
    try {
        const allTypes = await Type.findAll()
        res.status(200)
        res.json(allTypes)
        return res
    } catch(error) {
        res.status(404)
    res.send({message: error.message}) 
    }
}


module.exports = {getTypes};