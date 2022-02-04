import React, { useState, useEffect } from "react";

function Board({ stage }) {
  const [red, setRed] = useState(0);
  const [blue, setBlue] = useState(0);
  const [green, setGreen] = useState(0);
  const [opacity, setOpacity] = useState(0.4);
  const [count, setCount] = useState(stage);
  const arr = [...Array(count)];
  const [randomNumber, setRandomNumber] = useState(0);
  const style = {
    // 사각형으로 스테이지가 올라가면 크기와 색상을 변경해야한다.
    width: "176px",
    height: "176px",
    margin: "2px",
    backgroundColor: `rgb(${red}, ${blue}, ${green})`,
  };
  const diffStyle = {
    // 사각형으로 스테이지가 올라가면 크기와 색상을 변경해야한다.
    width: "176px",
    height: "176px",
    margin: "2px",
    backgroundColor: `rgba(${red}, ${blue}, ${green}, ${opacity})`,
  };
  useEffect(() => {
    const arr = [...Array(count)];
    setRandomNumber(parseInt(Math.random() * count));
  }, [count]);

  useEffect(() => {
    setRed(parseInt(Math.random() * 255));
    setBlue(parseInt(Math.random() * 255));
    setGreen(parseInt(Math.random() * 255));
    setOpacity((prev) => prev + 0.02);
    setCount(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2));
  }, [stage]);

  const boxList = arr.map((num, index) => {
    if (index === randomNumber) {
      return <div key={index} style={diffStyle}></div>;
    } else {
      return <div key={index} style={style}></div>;
    }
  });

  return <div>{boxList}</div>;
}

export default Board;
