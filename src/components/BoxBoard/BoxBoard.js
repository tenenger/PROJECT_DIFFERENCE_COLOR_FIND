import styles from "./BoxBoard.module.css";
import useBoxStyle from "../../hooks/useBoxStyle";
import useSetting from "../../hooks/useSetting";

function BoxBoard({limitTime, intervalTime}) {
  const { stage, remainTime, score, onDiffBoxClick, onSameBoxClick } =
    useSetting(limitTime, intervalTime);
  const { commonStyle, diffStyle, boxAmount, diffBoxIdx } = useBoxStyle(stage);

  return (
    <div className={styles.outer}>
      <div className={styles.content}>
        <div>스테이지: {stage}</div>
        <div>남은시간: {remainTime}</div>
        <div>점수: {score}</div>
      </div>
      <div className={styles.layout}>
        {[...Array(boxAmount)].map((_, index) =>
          index === diffBoxIdx ? (
            <div key={index} style={{ ...commonStyle, ...diffStyle }} onClick={onDiffBoxClick}></div>
          ) : (
            <div key={index} style={commonStyle} onClick={onSameBoxClick}></div>
          )
        )}
      </div>
    </div>
  );
}
export default BoxBoard;
