import { useSelector, useDispatch } from "react-redux";
import { filterByType, order, filterBySource, changePage} from "../../redux/actions";

import { useState } from "react";

function Filters () {
  const dispatch = useDispatch();
  const [aux, setAux] = useState("A")
  const types = useSelector(state => state.types)
  
  // Funcion para ordenar los pokemons 
  const handleOrder = (event) => {
    dispatch(order(event.target.value));
    setAux(event.target.value)
  };
  // Funcion para filtrar 
  const handleFilter = (event) => {
    dispatch(changePage(1))
    dispatch(filterByType(event.target.value));
    dispatch(order(aux));
  };
  // Funcion para filtrar por fuente de creacion de pokemons
  const handleFilterBySource = (event) => {
    dispatch(changePage(1))
    dispatch(filterBySource(event.target.value));
    dispatch(order(aux));
  };
  return (
    <div>
      <select onChange={handleOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select onChange={handleFilterBySource}>
        <option value="All">All</option>
        <option value="API">API</option>
        <option value="Created">Created</option>        
      </select>
      <select onChange={handleFilter}>
      <option value="All">All</option>
      {types.map((element,index) => <option key={index} value={element}>{element}</option>)}
      </select>
    </div>
  );
}

export default Filters;
