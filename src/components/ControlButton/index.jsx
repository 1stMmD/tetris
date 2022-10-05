import style from "./style.module.css";

const ControlButton = ({src , func , func2}) => {
    return (
        <button
        className={style.ControlButton}
        style={{"background" : `url(${src})`}}
        onClick={func}
        >
        </button>
    );
}

export default ControlButton;
