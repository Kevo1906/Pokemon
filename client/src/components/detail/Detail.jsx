import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import style from "./Detail.module.css"

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
    
    if(pokemon.name){
    return(
        <div className={style.container}>
            <div className={style.characterContainer}>
            <h1 className={style.name}>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.img_anime} alt={pokemon.name} className={style.img}/>
            <div className={style.status}>
            <p>STATUS : {pokemon.hp}</p>
            </div>
            <div className={style.info}>
            <div className={style.infoBox}>
                <p className={style.label}>TYPES</p>
                <h2 className={style.content}>{pokemon.hp}</h2>
            </div>
            <div className={style.infoBox}>
                <p className={style.label}>HEIGHT</p>
                <h2 className={style.content}>{pokemon.height}</h2>
            </div>
            <div className={style.infoBox}>
                <p className={style.label}>WHEIGHT</p>
                <h2 className={style.content}>{pokemon.weight}</h2>
            </div>
            {types.map((element,index) => <p key={index}>{element}</p>)}
            </div>
            </div>
            
        </div>
    )} else{ return null }
}

export default Detail