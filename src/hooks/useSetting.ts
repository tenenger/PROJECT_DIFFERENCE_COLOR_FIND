import { useEffect, useRef, useState, useCallback } from "react";
import useBoxSetting from "./useBoxSetting";

const useSetting: useSettingHook = (limitTime, intervalTime) => {
  const [isPlay, setPlay] = useState(false);
  const [setting, setSetting] = useState<settingState>({
    stage: 1,
    score: 0,
    remainTime: limitTime,
  });
  const boxSetting = useBoxSetting(setting.stage, isPlay);
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
    if (timeoutID.current) clearTimeout(timeoutID.current);

    timeoutID.current = setTimeout(() => {
      if (setting.remainTime === 0) return setPlay(false);

      setSetting((prev) => ({
        ...prev,
        remainTime: prev.remainTime - intervalTime,
      }));
    }, intervalTime * 1000);
  }, [setting.remainTime, intervalTime]);

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
    if (!isPlay) reset();

    timer();
    return () => clearTimeout(timeoutID.current);
  }, [isPlay, reset, timer]);

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
