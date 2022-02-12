import { useEffect, useRef, useState } from "react";

function Setting() {
  const [stage, setStage] = useState(1);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalID = useRef(null);

  const gameReSet = () => {
    // 게임 재시작시 초기값 세팅
    setStage(1);
    setTimer(15);
    setScore(0);
    setPlaying(true);
  };

  useEffect(() => {
    // 1초씩 감소하는 타이머(조금 늦게 끝남)
    // React에서 setInterval를 사용하기 위해서는 useRef.current에 저장해야 사용가능하다.
    intervalID.current = setInterval(() => {
      if (timer > 0) {
        setTimer((second) => second - 1);
      } else {
        clearInterval(intervalID.current);
        intervalID.current = null;
        setPlaying(false);
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        // 알림창의 확인을 누르면, 뒤의 코드가 실행된다. 누르지 않으면 실행되지 않는다.
        gameReSet();
      }
    }, 1000);
    return () => clearInterval(intervalID.current);
  }, [timer, stage, score]);
  return { stage, setStage, timer, setTimer, setScore, playing, score };
}
export default Setting;
