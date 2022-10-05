import {useState , useRef , useEffect} from "react";

export const useInterval = (callback , moveSpeed) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    },[callback]);

    useEffect(() => {
        function run(){
            savedCallback.current();
        };
    
        if(moveSpeed !== null){
            let int = setInterval(run , moveSpeed);
            return () => clearInterval(int);
        };
},[moveSpeed])
}