import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
function App() {
  const [stage, setStage] = useState(1);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const intervalID = useRef(null);

  useEffect(() => {
    intervalID.current = setInterval(() => {
      if (timer > 0) {
        console.log("Set Interval");
        setTimer((second) => second - 1);
      } else {
        console.log("Clear Interval");
        clearInterval(intervalID.current);
        intervalID.current = null;
        window.confirm(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      }
    }, 1000);

    return () => clearInterval(intervalID.current);
  }, [timer]);

  const onClick = () => {
    setTimer(15);
  };
  return (
    <>
      <header>
        <>
          스테이지: {stage}, 남은시간: {timer}, 점수: {score}
        </>
      </header>
      <Board
        stage={stage}
        setStage={setStage}
        timer={timer}
        setTimer={setTimer}
        setScore={setScore}
      ></Board>
      <button onClick={onClick}>시간초기화</button>
    </>
  );
}

export default App;
