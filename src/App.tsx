import "./App.css";
import BoxBoard from "./components/BoxBoard/BoxBoard";

function App() {
  return (
    <>
      <BoxBoard limitTime={15} intervalTime={1} />
    </>
  );
}

export default App;
