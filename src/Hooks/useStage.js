import { useState , useEffect} from "react";

import { createStage, STAGE_WIDTH } from "../utils/global";

export const useStage = (player , resetPlayer , addScore , setRows) => {
    const [stage , setStage] = useState(
            createStage()
        );

    useEffect( () => {
        let rowsCleared = 0;

        const updateStage = prevStage => {
            const newStage = prevStage?.map(row => {
               return row.map(cell => {
                 cell[2] = "2d"
                 return cell = cell[1] === "none" ? [0 , "none" , "2d"] : cell;
               })
            });


            player.tetromine[0]?.shape.map((row , y) => {
            return row.map((cell , x) =>{
                if(cell !== 0) newStage[player.pos.y + y][player.pos.x + x] =
                [cell,
                `${player.bottom ? "fixed" : "none"}`,
                "2d"
                ];
                })
            })

            newStage?.map((row , y) => {
                return row.map((cell , x) => {
                    if(cell[0] === 0) return cell;

                    if(!newStage[y-1]){
                        cell[2] = "3d";
                        return cell;
                    }

                    if(newStage[y-1][x][0] === 0){ 
                        cell[2] = "3d";
                        return cell;
                    }
                    
                    return cell

                })
            })
            
            newStage.map((row , idx) => {
                if(row.every((cell) => cell[1] === "fixed")){
                    newStage.splice(idx , 1);
                    newStage.unshift(Array.from(Array(STAGE_WIDTH)).fill([0,"none"]))
                    rowsCleared++
                }
            })

            addScore(rowsCleared)
            setRows(prev => prev + rowsCleared);

            if(player.bottom === true){
                resetPlayer()
            }
            return newStage;
        }

        setStage(prev => updateStage(prev));
    },[player]);

        return[stage,setStage];
}