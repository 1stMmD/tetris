import Cell from '../Cell/Cell';
import { STAGE_WIDTH } from '../../utils/global';
import style from "./Stage.module.css";

const Stage = ({stage}) => {
    return (
        <div className={`${style.Stage} Stage`}>
            {
                stage?.map((row) => {
                    return row.map((cell , idx) => {
                    return <Cell key={idx} type={cell[0] !== 0 && cell[0]} is3d={cell[2] === "3d"}/> 
                })
                }
                )
            }


            <style>
                {`
                    .Stage
                    {
                        grid-template-columns: repeat(${STAGE_WIDTH},1fr);
                    }
                `}
            </style>
        </div>
    );
}

export default Stage;
