import { CHANGE_PAGE, ORDER, CREATE_POKEMON, FILTER,LOOK_FOR, FILTER_BY_SOURCE } from "./action-types";

export const changePage = (page) =>{
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export const filterByType = (type) => {
    return {
        type: FILTER,
        payload: type
    }
}

export const filterBySource = (type) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: type
    }
}

export const lookFor = (pokemons) => {
    return {
        type: LOOK_FOR,
        payload: pokemons
    }
}

export const order = (orden) => {
    return {
        type: ORDER,
        payload: orden
    }
}

export const createPokemon = (pokemonToCreate) =>{
    return {
        type: CREATE_POKEMON,
        payload: pokemonToCreate
    }
}