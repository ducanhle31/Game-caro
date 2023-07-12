import { useState } from "react";
import Gomoku from "./component/Gomoku";
import "./App.css";

const App = () => {
  const [dimension, setDimension] = useState(10); // Mặc định số lượng ô là 6x6

  const handleDimensionChange = (event) => {
    const newDimension = parseInt(event.target.value);
    setDimension(newDimension);
  };

  return (
    <div className="app">
      <div className="app-container">
        <h2 className="title">
          Gomoku {dimension}x{dimension}
        </h2>
        <div className="dimension-selector">
          <select
            id="dimension-select"
            value={dimension}
            onChange={handleDimensionChange}
          >
            <option value={10}>Select dimension: 10x10</option>
            <option value={12}>Select dimension: 12x12</option>
            <option value={16}> Select dimension:16x16</option>
            <option value={20}> Select dimension:20x20</option>
          </select>
        </div>
      </div>

      <Gomoku key={dimension} dimension={dimension} />
    </div>
  );
};

export default App;
