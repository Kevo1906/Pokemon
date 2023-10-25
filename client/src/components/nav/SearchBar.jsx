import { useState } from "react";
import style from "./SearchBar.module.css"
import axios from "axios";
import { lookFor,changePage } from "../../redux/actions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch()
  let [name, setName] = useState("")
  // Funcion que maneja el cambio del input
  const handleChange = (event) => {
    setName(event.target.value)
  }
  // Funcion que busca en la API y muestra en la pagina
  const onSearch = async()=>{
    try {
      if(name){
    const {data} = await axios(`http://localhost:3001/pokemons/?name=${name}`)
    
      dispatch(changePage(1))
      dispatch(lookFor(data))} else {
        window.alert("Ingrese el nombre de un pokemon")
      }
    } catch(error){
      console.log(error.response.data)
      window.alert(error.response.data.message)
    }
    
      
  }
  return (
    <div className={style.searchbar}>
      <div className={style.container}>
        
            <input className={style.input} placeholder="Insert pokemon name " type="search" value={name} onChange={handleChange}/>
            
            <button className={style.search__btn} onClick={onSearch}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#efeff1"></path>
    </svg>
  </button>

      
      
      </div>
    </div>
  );
}

export default SearchBar;
