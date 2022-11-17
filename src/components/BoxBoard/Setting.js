import { useEffect, useRef, useState, useCallback } from "react";

const Setting = (time) => {
  const [setting, setSetting] = useState({
    stage: 1,
    time: time,
    score: 0,
    isPlay: true,
  });
  const intervalID = useRef(null);

  const gameover = useCallback(
    (intervalID) => {
      clearInterval(intervalID.current);

      setSetting((prev) => ({
        ...prev,
        isPlay: false,
      }));

      alert(`GAME OVER!\n스테이지: ${setting.stage}, 점수: ${setting.score}`);
    },
    [setting.stage, setting.score]
  );

  const reset = () => {
    setSetting((prev) => ({
      ...prev,
      stage: 1,
      time: 15,
      score: 0,
      isPlay: true,
    }));
  };

  const timer = useCallback((time) => {
    setSetting((prev) => ({
      ...prev,
      time: prev.time - time,
    }));
  }, []);

  useEffect(() => {
    // 1초씩 감소하는 타이머(조금 늦게 끝남)
    // React에서 setInterval를 사용하기 위해서는 useRef.current에 저장해야 사용가능하다.
    intervalID.current = setInterval(() => {
      if (setting.time === 0) {
        gameover(intervalID);
        reset();
        return;
      }
      timer(1);
    }, 1000);

    return () => clearInterval(intervalID.current);
  }, [gameover, setting.time, timer]);

  return { ...setting, setSetting };
};
export default Setting;
