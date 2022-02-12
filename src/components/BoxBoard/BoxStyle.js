import { useEffect, useState } from "react";

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
    // 게임이 재시작되면 초기 박스 세팅값 초기화
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
export default BoxStyle;
