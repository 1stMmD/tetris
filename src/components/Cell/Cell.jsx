import { memo } from "react";
import { tetrominos } from "../../utils/global";
import "./style.css"

const Cell = ({type , is3d}) => {
    return (
        <span 
        className={`Cell ${type ? "color" : ""} ${is3d ? "withShadow" : ""}`}
        style={{
            "--color" : tetrominos[type]?.color,
            "--shadow-color" : tetrominos[type]?.shadowColor
        }}
        >

        </span>
    );
}

export default memo(Cell);
