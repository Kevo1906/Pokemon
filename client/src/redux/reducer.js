import { FaArrowAltCircleUp } from "react-icons/fa"
import { FILTER, CHANGE_PAGE,CREATE_POKEMON, FILTER_BY_SOURCE, ORDER, LOOK_FOR } from "./action-types"
import axios from "axios"

const initialState = {
    page:1,
    allPokemons: await axios("http://localhost:3001/pokemons").then(({data}) =>data),
    pokemons: [],
    types: await axios("http://localhost:3001/types").then(({data}) => data.map(element => element.name))
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_PAGE:
            return {
                ...state, page: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state, allPokemons: [...state.allPokemons,...action.payload]
            }
        case LOOK_FOR:
            return {
                ...state, pokemons: action.payload
            }
        case FILTER:
            if(action.payload === "All"){
                return{
                    ...state, pokemons: state.allPokemons
                }
            }
            return {
                ...state, pokemons: state.allPokemons.filter(element => {for(let i in element.Types){
                    if(element.Types[i].name === action.payload){
                        return true
                    }
                    return false
                }})
            }
        case FILTER_BY_SOURCE:
                if(action.payload === "All"){
                    return{
                        ...state, pokemons: state.allPokemons
                    }
                }
                if(action.payload === "API"){
                    return{
                        ...state, pokemons: state.allPokemons.filter(element => element.id<11000)
                    }
                }
                if(action.payload === "Created"){
                    return{
                        ...state, pokemons: state.allPokemons.filter(element => element.id>=11000)
                    }
                } 
        case ORDER:
            let orderCopy = [...state.pokemons]
            if(action.payload === "A") {
                orderCopy.sort(
                    (a, b) => {
                        if (a.name > b.name) return 1;
                        else return -1;
                    }
                )
            } else if (action.payload === "D") {
                orderCopy.sort(
                    (a, b) => {
                        if (a.name < b.name) return 1;
                        else return -1;
                    }
                )
            }
            return {
                ...state, pokemons: orderCopy
            }
        default :
            return {...state} 
    }
}

export default reducer