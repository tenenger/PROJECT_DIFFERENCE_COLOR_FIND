// useBoxSetting type start
interface boxColorState {
  red: number,
  blue: number,
  green: number,
  opacity: number,
}
interface boxContentState {
  boxAmount: number,
  boxSize: number,
  diffBoxIdx: number,
}
interface useBoxSettingState extends boxColorState, boxContentState{}
type useBoxSettingHook = (stage: number, isPlay: boolean) => useBoxSettingState;
// useBoxSetting type end

// useSetting type start
interface settingState {
  stage: number,
  score: number,
  remainTime: number,
}

interface useSettingState {
  isPlay: boolean,
  setPlay: (prev: boolean) => void,
  setting: settingState,
  boxSetting: useBoxSettingState,
  onDiffBoxClick: () => void,
  onSameBoxClick: () => void
}

type useSettingHook = (limitTime: number, intervalTime: number) => useSettingState;
// useSetting type end