import { useEffect, useState } from "react";
import { SLayout } from "./ModalContent.style";

const ModalContent = ({stage, score, remainTime, setPlay})  => {
  const [contents, setContents] = useState({
    header: '다른 색깔 찾기 게임.. 두둥!',
    stage: '최대 30라운드까지 식별가능',
    score: '최고 점수를 목표로 삼으세요',
    button: '시작'
  })

  useEffect(() => {
    if (remainTime === 0)
    setContents((prev) => ({
        ...prev,
        header: "GAME OVER!",
        stage,
        score,
        button: "계속",
      }));
  }, [stage, score, remainTime]);

  return (
    <SLayout>
      <div>
        <div>{contents.header}</div>
        <div>{`스테이지 : ${contents.stage}`}</div>
        <div>{`점수 : ${contents.score}`}</div>
      </div>
      <button onClick={() => {setPlay(true)}}>{contents.button}</button>
    </SLayout>
  )
}

export default ModalContent;