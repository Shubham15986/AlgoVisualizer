// src/components/HashingVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const HashingVisualizer = ({
  defaultAlgorithm = "HashTable",
  tableSize = 10
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Hashing Algorithms =================

  // 1️⃣ Hash Table (Direct Addressing)
  const hashTable = (operations = ["insert 12","insert 25","insert 32","search 25","delete 12"]) => {
    const stepsArr = [];
    const table = Array(tableSize).fill(null);

    const hash = (key) => key % tableSize;

    for (let op of operations) {
      const [action, valStr] = op.split(" ");
      const val = parseInt(valStr);

      if (action === "insert") {
        table[hash(val)] = val;
        stepsArr.push({ board: copySteps(table), message: `Inserted ${val} at index ${hash(val)}` });
      } else if (action === "search") {
        const found = table[hash(val)] === val;
        stepsArr.push({ board: copySteps(table), message: `${val} ${found ? "found" : "not found"} at index ${hash(val)}` });
      } else if (action === "delete") {
        if (table[hash(val)] === val) table[hash(val)] = null;
        stepsArr.push({ board: copySteps(table), message: `Deleted ${val} from index ${hash(val)}` });
      }
    }

    return stepsArr;
  };

  // 2️⃣ Chaining Hash Table
  const chainingHashTable = (operations = ["insert 12","insert 25","insert 32","search 25","delete 12"]) => {
    const stepsArr = [];
    const table = Array.from({ length: tableSize }, () => []);

    const hash = (key) => key % tableSize;

    for (let op of operations) {
      const [action, valStr] = op.split(" ");
      const val = parseInt(valStr);
      const idx = hash(val);

      if (action === "insert") {
        table[idx].push(val);
        stepsArr.push({ board: copySteps(table), message: `Inserted ${val} in bucket ${idx}` });
      } else if (action === "search") {
        const found = table[idx].includes(val);
        stepsArr.push({ board: copySteps(table), message: `${val} ${found ? "found" : "not found"} in bucket ${idx}` });
      } else if (action === "delete") {
        const bucket = table[idx];
        const removeIdx = bucket.indexOf(val);
        if (removeIdx > -1) bucket.splice(removeIdx, 1);
        stepsArr.push({ board: copySteps(table), message: `Deleted ${val} from bucket ${idx}` });
      }
    }

    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "HashTable":
        generatedSteps = hashTable();
        break;
      case "ChainingHashTable":
        generatedSteps = chainingHashTable();
        break;
      default:
        setMessage("Algorithm not implemented!");
        return;
    }

    if (generatedSteps.length === 0) {
      setMessage("No steps generated. Check input.");
      return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) {
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        return;
      }
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  // ================= Controls =================
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Select an algorithm and run.");
  };

  // ================= Render =================
  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard) && !Array.isArray(stepBoard[0])) {
      // Direct Hash Table
      return (
        <div className="list-visualizer">
          {stepBoard.map((val, i) => (
            <span key={i} className="list-item">{val === null ? "-" : val}</span>
          ))}
        </div>
      );
    }

    if (Array.isArray(stepBoard[0])) {
      // Chaining Hash Table
      return (
        <div className="board">
          {stepBoard.map((bucket, i) => (
            <div key={i} className="board-row">
              <div className="cell header">Bucket {i}</div>
              {bucket.map((val, j) => (
                <div key={j} className="cell active">{val}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="hashing-visualizer">
      <h2>Hashing Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="HashTable">Hash Table</option>
          <option value="ChainingHashTable">Chaining Hash Table</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default HashingVisualizer;
