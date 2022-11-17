import styles from "./BoxBoard.module.css";
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
    <div className={styles.outer}>
      <div className={styles.content}>
        <div>스테이지: {stage}</div>
        <div>남은시간: {remainTime}</div>
        <div>점수: {score}</div>
      </div>
      <div className={styles.layout}>
        {[...Array(boxAmount)].map((_, boxIdx) =>
          boxIdx === diffBoxIdx ? (
            <div key={boxIdx} style={{ ...commonStyle, ...diffStyle }} onClick={onDiffBoxClick}></div>
          ) : (
            <div key={boxIdx} style={commonStyle} onClick={onSameBoxClick}></div>
          )
        )}
      </div>
    </div>
  );
}
export default BoxBoard;
