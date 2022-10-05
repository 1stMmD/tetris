import { useState , useRef , useEffect } from "react";
import style from "./Game.module.css";
import { useStage } from "./Hooks/useStage";
import { usePlayer } from "./Hooks/usePlayer";
import { isMovePosible , createStage } from "./utils/global";
import { useInterval } from "./Hooks/useInterval";
import { useGameStatus } from "./Hooks/useGameStatus";
import {
  StartButton , 
  Stage , 
  StageWrapper , 
  StatusTable ,
  GameGuide ,
  ControlButton,
  NextTetrominoes
  } from "./components/index";
function Game() {
  const container = useRef()

  //state to control stageboard array👇🏻
  const [
    player ,
    updatePlayer ,
    resetPlayer , 
    rotatePlayer ,
    startPlayer,
    isRotatePossible
  ] = usePlayer();

  const [
    score,
    rows,
    level,
    addScore,
    setRows,
    resetStatus,
    highestLevel
  ] = useGameStatus();

  const [stage , setStage] = useStage(player , resetPlayer , addScore , setRows);
  const [gameover , setGameover] = useState(true);
  const [moveSpeed , setMoveSpeed] = useState(null);
  const [showGuide , setShowGuide] = useState(true);

  const startGame = () => {
    startPlayer()
    setStage(createStage());
    setGameover(false);
    resetStatus();
    setMoveSpeed((1000 - 300) / level + 300);
  }

  const moveHorizontal = (dir) => {
    if(!isMovePosible(player,stage,{y:0,x:dir})){
    updatePlayer({y : 0, x :dir})
    }
  }

  const moveVeritical = (dir) => {
    if(!isMovePosible(player,stage,{y:dir,x:0})){
      return updatePlayer({y : dir, x :0})
    }

    updatePlayer({x : 0 , y : 0, bottom : true});

    if(player.pos.y < 1){
      setGameover(true);
      setMoveSpeed(null);
    }
  }

  const keyUp = ({key}) => {
    if(gameover) return;

    if(key === "ArrowDown"){
      setMoveSpeed((1000 - 250) / level + 250)
    }
  }

  const move = ({key}) => {

    if(gameover)return;

    if(key === "ArrowDown"){
      moveVeritical(+1);
      setMoveSpeed(null)
    }

    if(key === "ArrowRight"){
        moveHorizontal(+1)
    }

    if(key === "ArrowLeft"){
      moveHorizontal(-1);
    }

    if(key === "e"){
      if(!isRotatePossible(player , stage )){
        rotatePlayer("reverse")
      }
    }

    if(key === "r"){
      if(!isRotatePossible(player , stage )){
      rotatePlayer()
      }
    }

  }

    useInterval(() => moveVeritical(+1) , moveSpeed);

  useEffect(() => {
    container.current.focus()
  },[gameover])
  useEffect(() => {
    setMoveSpeed((1000 - 300) / level + 300)
  },[level])

  return (
    <div 
    className={style.Container} 
    tabIndex="0"
    ref={container}
    onKeyDown={move}
    onKeyUp={keyUp}
    >

      <div className={style.Game}>

        <GameGuide
        showGuide={showGuide}
        setShowGuide={setShowGuide}/>

        <div>

          <StatusTable
          dir="left"
          name="personal level record"
          data={highestLevel}/>
          
          <StatusTable
          dir="left"
          name="Level"
          data={level}/>

          <StatusTable
          dir="left"
          name="Rows"
          data={rows}/>

        </div>

        <StageWrapper>
          <Stage 
          stage={stage}/>
          <StartButton
          gameover={gameover}
          start={startGame}/>
        </StageWrapper>

        <div>
          <NextTetrominoes player={player} />
          <StatusTable 
          name="Score" 
          data={score}
          dir="right"/>
        </div>
      </div>

      <div className={style.Controlers}>

        <div>

          <ControlButton
          src="r.svg"
          func={() => {
            if(!gameover){
              if(!isRotatePossible(player , stage )){
                rotatePlayer()
              }
            }
          }}/>

          <ControlButton 
          src="e.svg"
          func={() => {
            if(!gameover){
              if(!isRotatePossible(player , stage )){
                rotatePlayer("reverse")
              }
            }
          }}/>

        </div>

        <div>

          <ControlButton
          src="ArrowLeft.svg"
          func={() => {
            if(!gameover){
              moveHorizontal(-1);
            }
          }}/>

          <ControlButton 
          src="ArrowDown.svg"
          func={() => {
            moveVeritical(+1);
          }}/>

          <ControlButton 
          src="ArrowRight.svg"
          func={() => {
            if(!gameover){
              moveHorizontal(+1);
            }
          }}/>

        </div>

      </div>

    </div>
  );
}

export default Game;
