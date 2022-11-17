import { SLayout, SInfomation, SBoxBoard } from "./BoxBoard.style";
import useSetting from "../../hooks/useSetting";

function BoxBoard({limitTime, intervalTime}) {
  const {
    stage,
    score,
    remainTime,
    commonStyle,
    diffStyle,
    boxAmount,
    diffBoxIdx,
    onDiffBoxClick,
    onSameBoxClick,
  } = useSetting(limitTime, intervalTime);

  return (
    <SLayout>
      <SInfomation>
        <div>스테이지: {stage}</div>
        <div>남은시간: {remainTime}</div>
        <div>점수: {score}</div>
      </SInfomation>
      <SBoxBoard>
        {Array(boxAmount)
          .fill()
          .map((_, boxIdx) =>
            boxIdx === diffBoxIdx ? (
              <div key={boxIdx} style={{ ...commonStyle, ...diffStyle }} onClick={onDiffBoxClick}></div>
            ) : (
              <div key={boxIdx} style={commonStyle} onClick={onSameBoxClick}></div>
            )
          )}
      </SBoxBoard>
    </SLayout>
  );
}
export default BoxBoard;
