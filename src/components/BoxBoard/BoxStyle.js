import { useCallback, useEffect, useState } from "react";

const BoxStyle = (stage) => {
  const [boxStyle, setBoxStyle] = useState({
    red: 0,
    blue: 0,
    green: 0,
    opacity: 0.4,
    boxAmount: 4,
    boxSize: 176,
    diffBoxIdx: 0,
  });

  // 랜덤 박스 색상 생성
  const randomColor = useCallback((opacity) => {
    setBoxStyle((prev) => ({
      ...prev,
      red: parseInt(Math.random() * 255),
      blue: parseInt(Math.random() * 255),
      green: parseInt(Math.random() * 255),
      opacity: opacity ? opacity : prev.opacity !== 1 ? prev.opacity + 0.02 : 1,
    }));
  }, []);

  // 스테이지별 박스 총 개수
  const boxInit = useCallback(() => {
    const row = Math.round((stage + 0.5) / 2) + 1;
    const square = row ** 2;

    setBoxStyle((prev) => ({
      ...prev,
      boxAmount: square,
      diffBoxIdx: Math.floor(Math.random() * square),
      boxSize: 360 / row - 4,
    }));
  }, [stage]);

  useEffect(() => {
    randomColor(boxStyle.opacity);
    boxInit();
  }, [boxStyle.opacity, randomColor, boxInit]);

  const commonStyle = {
    width: `${boxStyle.boxSize}px`,
    height: `${boxStyle.boxSize}px`,
    margin: "2px",
    backgroundColor: `rgb(${boxStyle.red}, ${boxStyle.blue}, ${boxStyle.green})`,
  };
  const diffStyle = {
    opacity: `${boxStyle.opacity}`,
  };

  return {
    commonStyle,
    diffStyle,
    boxStyle,
  };
};
export default BoxStyle;
