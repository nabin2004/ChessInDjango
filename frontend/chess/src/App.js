// import './App.css';
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <div className="App h-screen flex justify-center items-center">
      <div className="w-full max-w-md flex justify-center">
        <Chessboard id="BasicBoard" />
      </div>
    </div>
  );
}

export default App;
