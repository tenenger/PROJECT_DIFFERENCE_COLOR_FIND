import { useCallback, useEffect, useState } from "react";

const useBoxSetting = (stage, isPlay) => {
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
    if (stage === 1 || isPlay) {
      boxColorInit();
      boxContentInit();
    }
  }, [stage, boxColorInit, boxContentInit, isPlay]);

  return {
    ...boxColor,
    ...boxContent,
  };
};
export default useBoxSetting;
