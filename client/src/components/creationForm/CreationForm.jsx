import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";

function CreationForm(){
    const allPokemons = useSelector(state => state.allPokemons)
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const [pokemonToCreate, setPokemonToCreate] = useState({
        id:11000,
        name:"",
        img_anime:"",
        img_game:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        types:[]

    })
    const [errors, setErrors] = useState({
        name:"Espacio vacio",
        img_anime:"No se subio ninguna imagen",
        hp:"Espacio vacio",
        attack:"Espacio vacio",
        defense:"Espacio vacio",
        speed:"Espacio vacio",
        height:"Espacio vacio",
        weight:"Espacio vacio",
        types:"Debe seleccionarse al menos 2 tipos"

    })
    // Buscamos el id que no existe 
    useEffect(()=>{let idNewPokemon = 11000
    while(allPokemons.filter(element => element.id === idNewPokemon).length>0){
        idNewPokemon +=1
    }
    setPokemonToCreate({...pokemonToCreate,id:idNewPokemon})},[])
    // Funcion que controla el cambio en los inputs 
    const handleChange = (event)=>{
        if(event.target.name === "name"){
        setPokemonToCreate({...pokemonToCreate, [event.target.name]:event.target.value})
        validation({...pokemonToCreate, [event.target.name]: event.target.value},event)
        } else if(event.target.name === "img_anime"){
            console.log(event.target.files[0])
            const formData = new FormData()
            formData.append('image', event.target.files[0]);
            console.log(formData)
            // setPokemonToCreate({...pokemonToCreate, [event.target.name]: formData})
            // validation({...pokemonToCreate, [event.target.name]:Number(event.target.value)},event)
        }else{
            setPokemonToCreate({...pokemonToCreate, [event.target.name]:Number(event.target.value)})
            validation({...pokemonToCreate, [event.target.name]:Number(event.target.value)},event)
        }
        
    }
    // Funcion que controla el cambio en el input types 
    const handleTypeChange = (event) => {
        const typeName = event.target.value

        if(event.target.checked){
            setPokemonToCreate({...pokemonToCreate,["types"]:[...pokemonToCreate.types,typeName]})
            validation({...pokemonToCreate,["types"]:[...pokemonToCreate.types,typeName]},event)
        } else {
            setPokemonToCreate({...pokemonToCreate,["types"]:pokemonToCreate.types.filter(type => type!== typeName)})
            validation({...pokemonToCreate,["types"]:pokemonToCreate.types.filter(type => type!== typeName)},event)
        }

    }
    //Funcion que valida los datos
    const validation = (input,event) => {
        if (event.target.name === "name") {
            if(input.name.length ===0){
                setErrors({ ...errors, name: "Espacio vacio" })
            }else if(input.name.length > 30){
                setErrors({ ...errors, name: "Maximo 30 caracteres" })
            } else if (input.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g)) {
                setErrors({ ...errors, name: "Solo se aceptan letras" })
            } else {
                setErrors({ ...errors, name: "" });
              }
        }
        if(event.target.name === "img_anime"){
            if(input.img_anime.length ===0){
                setErrors({...errors, img_anime:"No se subio ninguna imagen"})
            } else if(!/\.(jpg|jpeg|png|gif|bmp)$/.test(input.img_anime)){
                setErrors({...errors, img_anime:"El archivo debe ser una imagen"})
            } else{
                setErrors({ ...errors, img_anime: "" });
            }
        }
        if(event.target.name === "types"){
            if(input.types.length < 2){
                setErrors({...errors, types:"Debe seleccionarse al menos 2 tipos"})
            } else{
                setErrors({...errors, types:""})
            }
        }
        if(!["types", "name", "img_anime"].includes(event.target.name)){
            if(Number.isNaN(input[event.target.name])){
                setErrors({...errors, [event.target.name]:"Solo se aceptan numeros"})
            } else if(input[event.target.name]<0){
                setErrors({...errors, [event.target.name]:"No se aceptan stats negativos"})
            } else if(input[event.target.name]===0){
                setErrors({...errors, [event.target.name]:"No se aceptan stats iguales a cero"})
            } else {
                setErrors({...errors, [event.target.name]:""})
            }
        }
    }
    
    // Funcion para enviar los datos al back para crear
    const handleSubmit = async (event) =>{
        
        try{
        const hasErrors = Object.values(errors).some((error) => error !== "")
        if(hasErrors){
            window.alert("Formulario con errores")
            event.preventDefault()
        } else{
            const pokemonCreated = await axios.post("http://localhost:3001/pokemons", pokemonToCreate).then(({data}) => data)
            dispatch(createPokemon(pokemonCreated))
        }
    } catch(error){
        console.log(error.response.data.message)
        window.alert(error.response.data.message)
    }
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                <input 
                type="text" 
                name="name"
                placeholder="Insert pokemon name..."
                value={pokemonToCreate.name}
                onChange={handleChange}/>
                </label>
                <span>{errors.name}</span>            
                <label>
                    Image:
                <input 
                type="file" 
                name="img_anime"
                value={pokemonToCreate.img_anime}
                onChange={handleChange}/>
                </label>
                <span>{errors.img_anime}</span>
                <span>{pokemonToCreate.img_anime}</span>
                <label>
                    Hp:
                <input 
                type="text" 
                name="hp"
                placeholder="Insert pokemon hp..."
                value={pokemonToCreate.hp}
                onChange={handleChange}/>
                </label>
                <span>{errors.hp}</span>
                <label>
                    Attack:
                <input 
                type="text" 
                name="attack"
                placeholder="Insert pokemon attack..."
                value={pokemonToCreate.attack}
                onChange={handleChange}/>
                </label>
                <span>{errors.attack}</span>
                <label>
                    Defense:
                <input 
                type="text" 
                name="defense"
                placeholder="Insert pokemon defense..."
                value={pokemonToCreate.defense}
                onChange={handleChange}/>
                </label>

                <label>
                    Speed:
                <input 
                type="text" 
                name="speed"
                placeholder="Insert pokemon speed..."
                value={pokemonToCreate.speed}
                onChange={handleChange}/>
                </label>

                <label>
                    Height:
                <input 
                type="text" 
                name="height"
                placeholder="Insert pokemon height..."
                value={pokemonToCreate.height}
                onChange={handleChange}/>
                </label>

                <label>
                    Weight:
                <input 
                type="text" 
                name="weight"
                placeholder="Insert pokemon weight..."
                value={pokemonToCreate.weight}
                onChange={handleChange}/>
                </label>
                <label>
                    Types:
                {types.map((type) => (
                    <label key={type}>
                        <input type="checkbox" name="types" value={type} checked={pokemonToCreate.types.includes(type)} onChange={handleTypeChange} />
                        {type}
                    </label>
                ))}
                </label>
                <span>{errors.types}</span>
                <button type="submit" >SUBMIT</button>
            </form>
        </div>
    )
}

export default CreationForm;
