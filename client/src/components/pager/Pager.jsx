import { useSelector } from "react-redux"
import style from "./Pager.module.css"

function Pager(props) {
    const page = useSelector(state => state.page)
    const totalButtons = Math.ceil(props.numPokemons/12)
     
    const numButtons = []
    for(let i=1; i<=totalButtons;i++){
        numButtons.push(i)
    }
    let pagesBefore = numButtons.filter(element => element<page)
    let pagesAfter = numButtons.filter(element => element>page)
    
    return(
        <div>
            {page !== numButtons[0] ? <button onClick={props.previousPage}>Prev</button>:null}
            {pagesBefore.length>3? <button value={pagesBefore[0]} onClick={props.changePagePager}>{pagesBefore[0]}</button>:null}
            {pagesBefore.length>4? <button>...</button>:null}
            
            {pagesBefore.slice(-3).map((element, index) => <button key={index} onClick={props.changePagePager} value={element}>{element}</button>)}
            <button className={style.actual}>{page}</button>
            {pagesAfter.slice(0,3).map((element, index) => <button  key={index} onClick={props.changePagePager} value={element}>{element}</button>)}
            {pagesAfter.length>4? <button>...</button>:null}
            {pagesAfter.length>3? <button value={pagesAfter.slice(-1)} onClick={props.changePagePager}>{pagesAfter.slice(-1)}</button>:null}
            {page !== numButtons.slice(-1)[0] ? <button onClick={props.nextPage}>Next</button>:null}
        </div>
    )
}

export default Pager