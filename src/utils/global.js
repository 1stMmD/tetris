export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 18;

export const createStage = () => {
    return Array.from(Array(STAGE_HEIGHT) ,
    () => new Array(STAGE_WIDTH).fill([0,"none","2d"]))
}

export const tetrominos = {
    I : 
    {
        shape : [
            [0,0,0,0],
            ["I","I","I","I"],
            [0,0,0,0],
            [0,0,0,0]
        ],
        color : "#028097",
        shadowColor : "#00C4E0"
        
    },

    O : {
        shape : [
            ["O","O"],
            ["O","O"]
        ],
        color : "#ECC106",
        shadowColor : "#E8D702"
    },

    T:{
        shape: [
            ["T","T","T"],
            [0 ,"T", 0],
            [0 , 0 , 0],
        ],
        color : "#5E31B0",
        shadowColor : "#A776F4"
    },
    L:{ 
        shape: [
            ["L",0,0],
            ["L","L","L"],
            [0 , 0 ,0]
        ],
        color : '#EF851D',
        shadowColor: "#F8AC2F"
    },
    S:{
        shape: [
            [0,"S","S"],
            ["S" ,"S", 0 ],
            [0 , 0 , 0]
        ],
        color : "#018F80",
        shadowColor : "#00D2B9"
    },
    V:{
        shape: [
            ["V",0],
            ["V","V"]
        ],
        color : "#CC2554",
        shadowColor :"#F53A79"
    }

};

export const randomShape = () => {
    let shapes = "LTIVSO";
    return tetrominos[shapes[Math.floor(Math.random() * shapes.length)]];
}

export const isMovePosible = (player , stage , {x: dirX, y: dirY}) => {
    
    let finale = false;
    
    player.tetromine[0].shape?.map((row , y) => {
        return row.map((cell , x) => {
            if(cell !== 0){
                if(
                !stage[player.pos.y + y + dirY] ||
                !stage[player.pos.y + y + dirY][player.pos.x + x + dirX] ||
                stage[player.pos.y + y + dirY][player.pos.x + x + dirX][1] !== "none"
            ){
                finale = true;
            }}
        })
    })

    return finale
}

export const isRotatePossible = ({pos , tetromine}, stage , rotate) => {
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