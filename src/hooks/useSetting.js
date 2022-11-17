import { useEffect, useRef, useState, useCallback } from "react";
import useBoxSetting from "./useBoxSetting";

const useSetting = (limitTime, intervalTime) => {
  const [isPlay, setPlay] = useState(false);
  const [setting, setSetting] = useState({
    stage: 1,
    score: 0,
    remainTime: limitTime,
  });
  const boxSetting = useBoxSetting(setting.stage);

  const timeoutID = useRef(null);

  const reset = useCallback(() => {
    setSetting((prev) => ({
      ...prev,
      stage: 1,
      score: 0,
      remainTime: limitTime,
    }));
  }, [limitTime]);

  const timer = useCallback(() => {
    clearTimeout(timeoutID.current);

    timeoutID.current = setTimeout(() => {
      setSetting((prev) => ({
        ...prev,
        remainTime: prev.remainTime - intervalTime,
      }));
    }, intervalTime * 1000);
  }, [intervalTime]);

  const onDiffBoxClick = () => {
    setSetting((prev) => ({
      ...prev,
      score: prev.score + Math.pow(prev.stage, 3) * prev.remainTime,
      remainTime: limitTime,
      stage: prev.stage + 1,
    }));

    timer();
  };

  const onSameBoxClick = () => {
    setting.remainTime < 3
      ? setSetting((prev) => ({ ...prev, remainTime: 0 }))
      : setSetting((prev) => ({ ...prev, remainTime: prev.remainTime - 3 }));
  };

  useEffect(() => {
    if (isPlay && setting.remainTime === 0) setPlay(false);
    else if (isPlay && setting.remainTime !== 0) timer();
    else if (!isPlay) reset();

    return () => clearTimeout(timeoutID.current);
  }, [isPlay, setting.remainTime, reset, timer]);

  return {
    isPlay,
    setPlay,
    setting,
    boxSetting,
    onDiffBoxClick,
    onSameBoxClick,
  };
};

export default useSetting;
