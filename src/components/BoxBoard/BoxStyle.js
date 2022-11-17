import { useCallback, useEffect, useState } from "react";

const BoxStyle = (stage) => {
  const [boxColor, setBoxColor] = useState({
    red: 0,
    blue: 0,
    green: 0,
    opacity: 0.4,
  });
  const [boxContent, setBoxContent] = useState({
    boxAmount: 4,
    boxSize: 176,
    diffBoxIdx: 0,
  });

  const boxColorInit = useCallback(() => {
    setBoxColor((prev) => ({
      ...prev,
      red: parseInt(Math.random() * 255),
      blue: parseInt(Math.random() * 255),
      green: parseInt(Math.random() * 255),
      opacity: prev.opacity !== 1 ? prev.opacity + 0.02 : stage !== 1 ? 1 : 0.4,
    }));
  }, [stage]);

  const boxContentInit = useCallback(() => {
    const row = Math.round((stage + 0.5) / 2) + 1;
    const square = row ** 2;

    setBoxContent((prev) => ({
      ...prev,
      boxAmount: square,
      diffBoxIdx: Math.floor(Math.random() * square),
      boxSize: 360 / row - 4,
    }));
  }, [stage]);

  useEffect(() => {
    boxColorInit();
    boxContentInit();
  }, [boxColorInit, boxContentInit]);

  // change plan: css module -> emotion
  const commonStyle = {
    width: `${boxContent.boxSize}px`,
    height: `${boxContent.boxSize}px`,
    margin: "2px",
    backgroundColor: `rgb(${boxColor.red}, ${boxColor.blue}, ${boxColor.green})`,
  };
  const diffStyle = {
    opacity: `${boxColor.opacity}`,
  };

  return {
    commonStyle,
    diffStyle,
    ...boxContent,
  };
};
export default BoxStyle;
