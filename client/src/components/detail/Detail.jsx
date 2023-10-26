import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import style from "./Detail.module.css"
import { typeColor } from "../../utils/typeColors"
import { capitalize } from "../../utils/typeColors"


function Detail(props){
    const {id} = useParams()
    const[pokemon, setPokemon] = useState({})
    
    useEffect(()=>{
        fetch(`http://localhost:3001/pokemons/${id}`)
        .then((res) => res.json())
        .then((data) => data.name ? setPokemon(data): window.alert("No hay personajes con ese ID"))
    },[id])
    let types =[]
    pokemon.name ? types = pokemon.Types.map(element => element.name): null
    let themeColor =[]
    pokemon.name ? themeColor = types.map(element => typeColor[element]):null
    
    if(pokemon.name){
    return(
        <div className={style.container}>
        <div className={style.card} style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor[0]} 36%, #ffffff 36%)` }}>
            <p className={style.hp}>
                <span>HP </span>
                {pokemon.hp}
            </p>
            <img src={pokemon.img_anime} alt={pokemon.name} />
            <h2 className={style.poke_name}>{capitalize(pokemon.name)}</h2>
            <div className={style.types}>
                {types.map((element,index) => (<span key={index} style={{ backgroundColor: themeColor[index] }}>{element}</span>))}
            </div>
            <div className={style.stats}>
                <div>
                    <h3>{pokemon.attack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>{pokemon.defense}</h3>
                    <p>Defense</p>
                </div>
                <div>
                    <h3>{pokemon.speed}</h3>
                    <p>Speed</p>
                </div>
            </div>

        </div>
        </div>
    )} else{ return null }
}

export default Detail