import { useEffect, useRef, useState, useCallback } from "react";

const Setting = (limitTime, intervalTime) => {
  const [setting, setSetting] = useState({
    stage: 1,
    remainTime: limitTime,
    score: 0,
  });
  const intervalID = useRef(null);

  const gameover = useCallback(() => {
    // change plan: alert -> modal
    alert(`GAME OVER!\n스테이지: ${setting.stage}, 점수: ${setting.score}`);

    setSetting((prev) => ({
      ...prev,
      stage: 1,
      remainTime: limitTime,
      score: 0,
    }));
  }, [setting.stage, setting.score, limitTime]);

  const timer = useCallback(() => {
    setSetting((prev) => ({
      ...prev,
      remainTime: prev.remainTime - intervalTime,
    }));
  }, [intervalTime]);

  useEffect(() => {
    intervalID.current = setTimeout(() => {
      if (setting.remainTime === 0) gameover(intervalID);
      else timer();
    }, intervalTime * 1000);

    return () => clearTimeout(intervalID.current);
  }, [intervalTime, setting.remainTime, gameover, timer]);

  return { ...setting, setSetting };
};

export default Setting;
