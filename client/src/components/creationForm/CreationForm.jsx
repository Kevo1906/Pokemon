import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";
import style from "./CreationForm.module.css";
import { typeColor } from "../../utils/typeColors"

function CreationForm() {
  const allPokemons = useSelector((state) => state.allPokemons);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [pokemonToCreate, setPokemonToCreate] = useState({
    id: 11000,
    name: "",
    img_anime: "",
    img_game: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "Empty space",
    img_anime: "Empty space",
    hp: "Empty space",
    attack: "Empty space",
    defense: "Empty space",
    speed: "Empty space",
    height: "Empty space",
    weight: "Empty space",
    types: "At least 2 types must be selected",
  });
  // Buscamos el id que no existe
  useEffect(() => {
    let idNewPokemon = 11000;
    while (
      allPokemons.filter((element) => element.id === idNewPokemon).length > 0
    ) {
      idNewPokemon += 1;
    }
    setPokemonToCreate({ ...pokemonToCreate, id: idNewPokemon });
  }, []);
  // Funcion que controla el cambio en los inputs
  const handleChange = (event) => {
    if (event.target.name === "name" || event.target.name === "img_anime") {
      setPokemonToCreate({
        ...pokemonToCreate,
        [event.target.name]: event.target.value,
      });
      validation(
        { ...pokemonToCreate, [event.target.name]: event.target.value },
        event
      );
    } else {
      setPokemonToCreate({
        ...pokemonToCreate,
        [event.target.name]: Number(event.target.value),
      });
      validation(
        { ...pokemonToCreate, [event.target.name]: Number(event.target.value) },
        event
      );
    }
  };
  // Funcion que controla el cambio en el input types
  const handleTypeChange = (event) => {
    const typeName = event.target.value;

    if (event.target.checked) {
      setPokemonToCreate({
        ...pokemonToCreate,
        ["types"]: [...pokemonToCreate.types, typeName],
      });
      validation(
        { ...pokemonToCreate, ["types"]: [...pokemonToCreate.types, typeName] },
        event
      );
    } else {
      setPokemonToCreate({
        ...pokemonToCreate,
        ["types"]: pokemonToCreate.types.filter((type) => type !== typeName),
      });
      validation(
        {
          ...pokemonToCreate,
          ["types"]: pokemonToCreate.types.filter((type) => type !== typeName),
        },
        event
      );
    }
  };
  //Funcion que valida los datos
  const validation = (input, event) => {
    if (event.target.name === "name") {
      if (input.name.length === 0) {
        setErrors({ ...errors, name: "Empty space" });
      } else if (input.name.length > 30) {
        setErrors({ ...errors, name: "Maximum 30 characters" });
      } else if (input.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g)) {
        setErrors({ ...errors, name: "Only letters are accepted" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }
    if (event.target.name === "img_anime") {
      if (input.img_anime.length === 0) {
        setErrors({ ...errors, img_anime: "Empty space" });
      } else if (!/^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(input.img_anime)) {
        setErrors({ ...errors, img_anime: "Only urls are allowed" });
      } else {
        setErrors({ ...errors, img_anime: "" });
      }
    }
    if (event.target.name === "types") {
      if (input.types.length < 2) {
        setErrors({ ...errors, types: "At least 2 types must be selected" });
      } else {
        setErrors({ ...errors, types: "" });
      }
    }
    if (!["types", "name", "img_anime"].includes(event.target.name)) {
      if (Number.isNaN(input[event.target.name])) {
        setErrors({
          ...errors,
          [event.target.name]: "Only numbers are accepted",
        });
      } else if (input[event.target.name] < 0) {
        setErrors({
          ...errors,
          [event.target.name]: "Negative stats are not accepted",
        });
      } else if (input[event.target.name] === 0) {
        setErrors({
          ...errors,
          [event.target.name]: "Stats equal to zero are not accepted",
        });
      } else {
        setErrors({ ...errors, [event.target.name]: "" });
      }
    }
  };

  // Funcion para enviar los datos al back para crear al Pokemon
  const handleSubmit = async (event) => {
    try {
      const hasErrors = Object.values(errors).some((error) => error !== "");
      event.preventDefault();
      if (hasErrors) {
        window.alert("Form with errors");
        
      } else {
        const pokemonCreated = await axios
          .post("http://localhost:3001/pokemons", pokemonToCreate)
          .then(({ data }) => data);
        dispatch(createPokemon(pokemonCreated));
        setPokemonToCreate({...pokemonToCreate, id:pokemonToCreate.id +1})
        window.alert("Pokemon created successfully");
        
      }
    } catch (error) {
      
      window.alert(error.response.data.message);

    }
  };

  return (
    <div className={style.formContainer}>
      <p className={style.title}>Create a Pokemon</p>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <label className={style.mainLabel}>Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Insert pokemon name..."
            value={pokemonToCreate.name}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.name? <span className={style.errors}>{errors.name}</span>:null}
        <div>
          <label className={style.mainLabel}>Image:</label>
          <input
            type="text"
            name="img_anime"
            placeholder="Insert pokemon image url..."
            value={pokemonToCreate.img_anime}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.img_anime? <span className={style.errors}>{errors.img_anime}</span>:null}
        <div>
          <label className={style.mainLabel}>Hp:</label>
          <input
            type="text"
            name="hp"
            placeholder="Insert pokemon hp..."
            value={pokemonToCreate.hp}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.hp? <span className={style.errors}>{errors.hp}</span>:null}
        <div>
          <label className={style.mainLabel}>Attack:</label>
          <input
            type="text"
            name="attack"
            placeholder="Insert pokemon attack..."
            value={pokemonToCreate.attack}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.attack? <span className={style.errors}>{errors.attack}</span>:null}

        <div>
          <label className={style.mainLabel}>Defense:</label>
          <input
            type="text"
            name="defense"
            placeholder="Insert pokemon defense..."
            value={pokemonToCreate.defense}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.defense? <span className={style.errors}>{errors.defense}</span>:null}
        <div>
          <label className={style.mainLabel}>Speed:</label>
          <input
            type="text"
            name="speed"
            placeholder="Insert pokemon speed..."
            value={pokemonToCreate.speed}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.speed? <span className={style.errors}>{errors.speed}</span>:null}
        <div>
          <label className={style.mainLabel}>Height:</label>
          <input
            type="text"
            name="height"
            placeholder="Insert pokemon height..."
            value={pokemonToCreate.height}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.height? <span className={style.errors}>{errors.height}</span>:null}
        <div>
          <label className={style.mainLabel}>Weight:</label>
          <input
            type="text"
            name="weight"
            placeholder="Insert pokemon weight..."
            value={pokemonToCreate.weight}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {errors.weight? <span className={style.errors}>{errors.weight}</span>:null}
        <div className={style.typesContainer}>
        <label className={style.typesLabel}>
          Types:</label>
          <div>
          {types.map((type) => (
            
            <label className={style.typeLabel} key={type} style={{ backgroundColor: typeColor[type] }}>
              <input
                type="checkbox"
                name="types"
                value={type}
                checked={pokemonToCreate.types.includes(type)}
                onChange={handleTypeChange}
              />
              {type}
            </label>
            
          ))}
          </div>
        
        </div>
        {errors.types? <span className={style.errors}>{errors.types}</span>:null}
        <button type="submit" className={style.submitButton}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default CreationForm;
