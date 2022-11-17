interface BoxBoardComponent {
  limitTime: number;
  intervalTime: number;
}

interface BoxBoardStyle {
  boxSize: number;
  red: number;
  blue: number;
  green: number;
  boxIdx: number;
  diffBoxIdx: number;
  opacity: number;
}

interface ModalContentComponent {
  stage: number;
  score: number;
  remainTime: number;
  setPlay: (prev: boolean) => void;
}

interface ModalContentState {
  header: string;
  stage: string | number;
  score: string | number;
  button: string;
}
