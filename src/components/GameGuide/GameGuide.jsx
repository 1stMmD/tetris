import style from "./GameGuide.module.css"

const GameGuide = ({showGuide , setShowGuide}) => {
    return (
        <div className={style.div}
        style={{display : `${showGuide ? "block" : "none"}`}}
        onClick={() => setShowGuide(false)}
        >
            <img 
            src="game-giude.svg" 
            alt=""
            className={style.GameGuide} />
        </div>
    );
}

export default GameGuide;
