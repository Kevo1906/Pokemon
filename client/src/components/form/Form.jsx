
import style from "./Form.module.css"
import pikachuHalloween from "../../img/icon.png"


export default function Form(props) {
  
  const onClick = (event) => {
    props.login()
  };

  return (
    
    <div className={style.container}>
      <img src={pikachuHalloween} alt="pikachuHalloween" className={style.img} onClick={onClick}/>
      <button className={style.login_button} onClick={onClick}>START</button>
    </div>
    
  );
}

