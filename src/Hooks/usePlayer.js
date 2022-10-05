import {useState , useEffect , useCallback} from "react";
import { randomShape , STAGE_WIDTH } from "../utils/global";

export const usePlayer = () => {
    const [player , setPlayer] = useState({
        pos : {x: Math.floor(STAGE_WIDTH / 2 - 1) , y:0},
        tetromine : [{
            shape:[],
            color: ''
        },{
            shape:[],
            color: '' 
        }],
        bottom : false
    })

    const updateTetromine = (array) => {
        array.shift();
        array.push(randomShape());
        return array;
    }

    const resetPlayer = useCallback(() => {
        setPlayer(prev => {
            return {
            pos : {x: Math.floor(STAGE_WIDTH / 2 - 1) , y:0},
            tetromine : updateTetromine(prev.tetromine),
            bottom : false
        }})
    })

    const updatePlayer = ({x , y ,bottom=false}) => {
        setPlayer( prev => {
            return {
            ...prev,
            pos:{ y:(prev.pos.y += y) , x : (prev.pos.x += x)},
            bottom
            }
        }
        )
        
    }

    const startPlayer = () => {
        setPlayer({
        pos : {x:Math.floor(STAGE_WIDTH / 2 - 1) , y:0},
        tetromine : [randomShape() , randomShape() , randomShape()],
        bottom : false
        })
    }
    
    const rotateReverse = (shape) => {
        let shapeClone = shape.slice(0);
        shapeClone = shapeClone.map((row) => row.reverse())
        return shapeClone;
    }
    

    const rotate = (shape) => {

        let shapeClone = shape.map((n , y) => {
            return shape.map((row , x) => {
                return row[y]
            })
        })

        return shapeClone.reverse()
    }

    const isRotatePossible = ({pos , tetromine}, stage) => {
        let shapeClone = [].concat(tetromine[0].shape);
        shapeClone = rotate(shapeClone);
        
        let finale = false;
    
        for(let y = 0 ; y < shapeClone.length; y++){
            for(let x = 0 ; x < shapeClone[y].length ; x++){
                if(shapeClone[y][x] !== 0){
                    if(
                        !stage[pos.y + y][pos.x + x] ||
                        stage[pos.y + y][pos.x + x][1] !== "none"
                    ){
                        finale = true;
                    }
                } 
            }
        }
        return finale;
    }

    const rotatePlayer = (dir) => {
        let playerClone = JSON.parse(JSON.stringify(player))
        playerClone.tetromine[0].shape = dir === "reverse" ? rotateReverse(playerClone.tetromine[0].shape) : rotate(playerClone.tetromine[0].shape);
        setPlayer(playerClone);
    }


    return [
        player , 
        updatePlayer , 
        resetPlayer , 
        rotatePlayer ,  
        startPlayer,
        isRotatePossible
    ];
}
