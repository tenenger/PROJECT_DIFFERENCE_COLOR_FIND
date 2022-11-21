import { SLayout, SInfomation, SBoxBoard, SBox } from "./BoxBoard.style";
import useSetting from "../../hooks/useSetting";
import Modal from "../modal/Modal";
import ModalContent from "./ModalContent";

function BoxBoard({ limitTime, intervalTime }: BoxBoardComponent) {
  const {
    isPlay,
    setPlay,
    setting,
    boxSetting,
    onDiffBoxClick,
    onSameBoxClick,
  } = useSetting(limitTime, intervalTime);

  return (
    <SLayout>
      <SInfomation>
        <div>스테이지: {setting.stage}</div>
        <div>남은시간: {setting.remainTime}</div>
        <div>점수: {setting.score}</div>
      </SInfomation>
      <SBoxBoard>
        {Array(boxSetting.boxAmount)
          .fill(0)
          .map((_, boxIdx) => (
            <SBox
              key={boxIdx}
              onClick={
                boxIdx === boxSetting.diffBoxIdx
                  ? onDiffBoxClick
                  : onSameBoxClick
              }
              boxIdx={boxIdx}
              {...boxSetting}
            />
          ))}
      </SBoxBoard>
      {!isPlay && (
        <Modal>
          <ModalContent setPlay={setPlay} {...setting} />
        </Modal>
      )}
    </SLayout>
  );
}
export default BoxBoard;
