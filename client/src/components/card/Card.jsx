import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { typeColor } from "../../utils/typeColors"
import { capitalize } from "../../utils/typeColors";


function Card(props) {

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
                <Link to={`/detail/${props.id}`} className={style.nameLink}>
                  <h2 className={style.name}>{capitalize(props.name)}</h2>
                </Link>
                
              </div>
              <div className={style.card_footer}>
                {props.Types.map((type,index) =>(<span key={index} 
                 style={{ backgroundColor: typeColor[type]}}>{type}</span>) )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
