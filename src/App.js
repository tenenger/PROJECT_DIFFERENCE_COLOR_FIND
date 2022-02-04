import React, { useState, useEffect } from "react";
import Board from "./components/Board";
function App() {
  const [stage, setState] = useState(1);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const time = () => {
    setTimeout(() => {
      setTimer((time) => time - 1);
    }, 1000);
  };
  useEffect(() => {
    if (timer === 0) {
      clearTimeout();
      window.confirm(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
    } else {
      time();
    }
  }, [timer]);

  return (
    <>
      <header>
        <>
          스테이지: {stage}, 남은시간: {timer}, 점수: {score}
        </>
      </header>
      <Board stage={stage}></Board>
    </>
  );
}

export default App;
