import Board_style from "../css/BoxBoard.module.css";
import BoxStyle from "./BoxStyle";
import Setting from "./Setting";

function BoxBoard() {
  // setting값과 boxstyle값을 가져온다.
  const { stage, setStage, timer, setTimer, setScore, playing, score } =
    Setting();
  const { style, diffStyle, boxCount, randomBox } = BoxStyle(stage, playing);

  const onDiffBoxClick = () => {
    // 다른 색상의 박스를 클릭한경우에 점수, 타이머, 스테이지를 변화시킨다.
    setScore((prev) => prev + Math.pow(stage, 3) * timer);
    setTimer(15);
    setStage((prev) => prev + 1);
  };

  const onSameBoxClick = () => {
    // 같은 색상의 박스를 클릭한 경우에 시간을 감소시킨다.
    // 만약 시간이 3초 미만이면 0초로 바꾸고, 아니라면 3초를 빼준다.
    timer < 3 ? setTimer(0) : setTimer((prev) => prev - 3);
  };

  return (
    <div className={Board_style.outer}>
      <div className={Board_style.content}>
        <div>스테이지: {stage}</div>
        <div>남은시간: {timer}</div>
        <div>점수: {score}</div>
      </div>
      <div className={Board_style.layout}>
        {/* 숫자만큼 태그를 반복하여 호출한다.(숫자를 배열로 변환) */}
        {[...Array(boxCount)].map((element, index) => {
          if (index === randomBox) {
            return (
              <div key={index} style={diffStyle} onClick={onDiffBoxClick}></div>
            );
          } else {
            return (
              <div key={index} style={style} onClick={onSameBoxClick}></div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default BoxBoard;
