import { Link } from "react-router-dom";
import style from "./Card.module.css";
// import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card(props) {
  // const [isFav, setIsFav] = useState(false);

  // const handleFavorite = () => {
  //   if (isFav) {
  //     setIsFav(false);
  //     props.removeFav(props.id);
  //   } else {
  //     setIsFav(true);

  //     props.addFav(props);
  //   }
  // };
  // useEffect(() => {
  //   props.allCharecters.forEach((fav) => {
  //     if (fav.id === props.id) {
  //       setIsFav(true);
  //     }
  //   });
  // }, [props.allCharecters]);

  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.back}>
          <img className={style.back_img} src={props.img_anime} alt={props.name} />
        </div>
        <div className={style.front}>
          <img className={style.front_img} src={props.img_anime} alt={props.name} />
          <div className={style.front_content}>
            <div className={style.description}>
              <div className={style.title}>
                <Link to={`/detail/${props.id}`}>
                  <h2 className={style.name}>{props.name}</h2>
                </Link>
                
              </div>
              <div className={style.card_footer}>
                <h3 className={style.status}>{props.Types}</h3>
                <h3 className={style.gender}>{props.hp}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addFav: (character) => {
//       dispatch(addFav(character));
//     },
//     removeFav: (id) => {
//       dispatch(removeFav(id));
//     },
//   };
// };

const mapStateToProps = (state) => {
  return {
    allPokemons: state.allPokemons,
  };
};

export default connect(mapStateToProps,null)(Card);
