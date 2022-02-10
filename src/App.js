import React, { useState, useEffect, useRef } from "react";
import Board_style from "./components/Board.module.css";
import "./App.css";

const BoxStyle = (stage, playing) => {
  const [red, setRed] = useState(0);
  const [blue, setBlue] = useState(0);
  const [green, setGreen] = useState(0);
  const [opacity, setOpacity] = useState(0.4);
  const [boxCount, setBoxCount] = useState(4);
  const [row, setRow] = useState(1);
  const [boxSize, setBoxSize] = useState(176);
  const [randomBox, setRandomBox] = useState(0);

  const ColorCreate = () => {
    // 무작위 박스색상 생성기
    setRed(parseInt(Math.random() * 255));
    setBlue(parseInt(Math.random() * 255));
    setGreen(parseInt(Math.random() * 255));
    setOpacity((prev) => prev + 0.02);
  };

  useEffect(() => {
    // 무작위 박스색상 생성기
    ColorCreate();
    // 박스 개수 생성기
    setBoxCount(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2));
  }, [stage]);

  useEffect(() => {
    // 한행의 박스 개수
    setRow((prev) => prev + 1);
  }, [boxCount]);

  useEffect(() => {
    // 박스 랜덤 선택
    setRandomBox(parseInt(Math.random() * boxCount));
  }, [stage, boxCount]);

  useEffect(() => {
    // 한행의 박스 개수로 박스 사이즈 생성기
    setBoxSize(() => 360 / row - 4);
  }, [row]);

  useEffect(() => {
    if (playing) {
      console.log("Start!!!!");
      setRow(2);
      setOpacity(0.4);
    }
  }, [playing]);

  const style = {
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    margin: "2px",
    backgroundColor: `rgb(${red}, ${blue}, ${green})`,
  };
  const diffStyle = {
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    margin: "2px",
    backgroundColor: `rgba(${red}, ${blue}, ${green}, ${opacity})`,
  };
  return {
    style,
    diffStyle,
    boxCount,
    randomBox,
  };
};

function Board({ stage, setStage, timer, setTimer, setScore, playing }) {
  const { style, diffStyle, boxCount, randomBox } = BoxStyle(stage, playing);

  const onDiffBoxClick = () => {
    // 다른 색상의 박스를 클릭한경우에 점수, 타이머, 스테이지를 변화시킨다.
    setScore((prev) => prev + Math.pow(stage, 3) * timer);
    setTimer(15);
    setStage((prev) => prev + 1);
  };

  const onSameBoxClick = () => {
    // 같은 색상의 박스를 클릭한 경우에 시간을 감소시킨다.
    timer < 3 ? setTimer(0) : setTimer((prev) => prev - 3);
  };

  return (
    <div className={Board_style.layout}>
      {[...Array(boxCount)].map((element, index) => {
        if (index === randomBox) {
          return (
            <div key={index} style={diffStyle} onClick={onDiffBoxClick}></div>
          );
        } else {
          return <div key={index} style={style} onClick={onSameBoxClick}></div>;
        }
      })}
    </div>
  );
}

function App() {
  const [stage, setStage] = useState(1);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalID = useRef(null);

  const gameReSet = () => {
    setStage(1);
    setTimer(15);
    setScore(0);
    setPlaying(true);
  };

  useEffect(() => {
    // 1초씩 감소하는 타이머(조금 늦게 끝남)
    // React에서 setInterval를 사용하기 위해서는 useRef.current에 저장해야 사용가능하다.
    intervalID.current = setInterval(() => {
      if (timer > 0) {
        setTimer((second) => second - 1);
      } else {
        clearInterval(intervalID.current);
        intervalID.current = null;
        setPlaying(false);
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        gameReSet();
      }
    }, 1000);
    return () => clearInterval(intervalID.current);
  }, [timer]);

  return (
    <div className="outer">
      <div className="content">
        <div>스테이지: {stage}</div>
        <div>남은시간: {timer}</div>
        <div>점수: {score}</div>
      </div>
      <Board
        stage={stage}
        setStage={setStage}
        timer={timer}
        setTimer={setTimer}
        setScore={setScore}
        playing={playing}
      ></Board>
    </div>
  );
}

export default App;
