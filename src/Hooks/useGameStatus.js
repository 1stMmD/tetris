import {useState , useEffect} from "react";

export const useGameStatus = () => {
    const [score , setScore] = useState(0);
    const [rows , setRows] = useState(0);
    const [level , setLevel] = useState(1);
    const [highestLevel,setHighestLevel] = useState(
        localStorage.getItem("level") ||
        1
    )

    const scores = [40 , 100 , 300 , 1200];

    useEffect(() => {
        if (rows > level * 10){
            setLevel(prev => prev + 1);
        }
    },[rows])

    const addScore = (rowsCleared) => {
        if(rowsCleared === 0) return;
        if(rowsCleared <= scores.length){
             return setScore(prev => prev + scores[rowsCleared - 1]);
        }
        return setScore(prev => prev + scores[scores.length - 1])
    }

    const resetStatus = () => {
        setLevel(1);
        setRows(0);
        setScore(0);
    }

    useEffect(() => {
        if(level > highestLevel){
            localStorage.setItem("level" , level);
        }
        setHighestLevel(localStorage.getItem("level"))
    },[level])

    return [
        score ,
        rows,
        level,
        addScore,
        setRows,
        resetStatus,
        highestLevel
    ];
}