import { useEffect, useState } from "react";
import Card from "../card/Card";
import style from "./Cards.module.css"
import { useSelector,useDispatch } from "react-redux";
import { changePage,order, filterByType } from "../../redux/actions";
import Pager from "../pager/Pager";
import Filters from "./Filters";

function Cards() {
  const page = useSelector(state => state.page)
  const pokemons = useSelector(state => state.pokemons)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(filterByType("All"))
    dispatch(order("A"))
  }, [])
  
  
  const [pokemonsToShow, setPokemonsToShow] = useState([])

  
  useEffect(()=>{
    if(pokemons.length){
      setPokemonsToShow(pokemons.slice((page-1)*12,page*12))
    }
  }, [pokemons, page])
  

  const changePagePager = (event)=>{
    const newPage = Number(event.target.value)
    dispatch(changePage(newPage))

  }
  const previousPage = ()=>{
    if(page>1){
    const newPage = page - 1
    dispatch(changePage(newPage))}
  }
  const nextPage = ()=>{
    const newPage = page + 1
    dispatch(changePage(newPage))
  }
  
  return (
    <div className={style.mainContainer}>
      <Filters/>
      <div className={style.cardsContainer}>
      {pokemonsToShow.map((pokemon) => {
        pokemon.types = pokemon.Types.map(element => element.name)

        return(
          <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          img_anime={pokemon.img_anime}
          img_game={pokemon.img_game}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          speed={pokemon.speed}
          height={pokemon.height}
          weight={pokemon.weight}
          Types = {pokemon.types}
        />)}
        
      )}
      </div>
      <Pager 
        changePagePager={changePagePager}
        previousPage={previousPage}
        nextPage={nextPage}
        numPokemons={pokemons.length}/>
    </div>
  );
}

export default Cards;
