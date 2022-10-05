import style from "./StartButton.module.css"

const StartButton = ({gameover , start}) => {
    return (
        <button
        className={style.StartButton}
        style={{
            display:`${gameover ? "block" : "none"}`
        }}
        onClick={() => {
            start()
        }}>
            Play
        </button>
    );
}

export default StartButton;
