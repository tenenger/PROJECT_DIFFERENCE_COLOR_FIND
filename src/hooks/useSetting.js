import { useEffect, useRef, useState, useCallback } from "react";
import useBoxSetting from "./useBoxSetting";

const useSetting = (limitTime, intervalTime) => {
  const [setting, setSetting] = useState({
    stage: 1,
    score: 0,
    remainTime: limitTime
  });
  const boxSetting = useBoxSetting(setting.stage);
  
  const timeoutID = useRef(null);

  const gameover = useCallback(() => {
    // change plan: alert -> modal
    alert(`GAME OVER!\n스테이지: ${setting.stage}, 점수: ${setting.score}`);

    setSetting((prev) => ({
      ...prev,
      stage: 1,
      score: 0,
      remainTime: limitTime,
    }));
  }, [setting.stage, setting.score, limitTime]);

  const timer = useCallback(() => {
    setSetting((prev) => ({
      ...prev,
      remainTime: prev.remainTime - intervalTime,
    }));
  }, [intervalTime]);

  const onDiffBoxClick = () => {
    setSetting((prev) => ({
      ...prev,
      score: prev.score + Math.pow(prev.stage, 3) * prev.remainTime,
      remainTime: limitTime,
      stage: prev.stage + 1,
    }));
  };

  const onSameBoxClick = () => {
    setting.remainTime < 3
      ? setSetting((prev) => ({ ...prev, remainTime: 0 }))
      : setSetting((prev) => ({ ...prev, remainTime: prev.remainTime - 3 }));
  };

  useEffect(() => {
    timeoutID.current = setTimeout(() => {
      if (setting.remainTime === 0) gameover();
      else timer();
    }, intervalTime * 1000);

    return () => clearTimeout(timeoutID.current);
  }, [intervalTime, setting.remainTime, gameover, timer]);

  return { ...setting, ...boxSetting, onDiffBoxClick, onSameBoxClick };
};

export default useSetting;
