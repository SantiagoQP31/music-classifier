import { useState, useEffect } from "react";
import type { ClassificationResult, RecorderStatus } from "./types";
import { GENRE_INFO } from "./constants";
import { RecorderPanel } from "./components/RecorderPanel/RecorderPanel";
import { ResultPanel } from './components/ResultPanel/ResultPanel';
import './App.css';

export default function App() {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  
  const hasResult = status === 'result' && result !== null;

  useEffect(() => {
    const root = document.documentElement;
    if (hasResult && result) {
      root.style.setProperty('--genre-color', GENRE_INFO[result.genre].color);
      root.style.setProperty('--genre-color-rgb', hexToRgb(GENRE_INFO[result.genre].color));
    } else {
      root.style.setProperty('--genre-color', '#7C3AED');
      root.style.setProperty('--genre-color-rgb', '124, 58, 237');
    }
  }, [hasResult, result]);

  const handleResult = (data: ClassificationResult) => {
    setResult(data);
    setStatus('result');
  }

  const handleReset = () => {
    setResult(null);
    setStatus('idle');
  }


  return (
    <main className={`app ${hasResult ? 'app--has-result' : ''} app--${status}`}>
      <div className="app__noise" aria-hidden="true" />
      <div className="app__recorder">
        <RecorderPanel
          status={status}
          setStatus={setStatus}
          onResult={handleResult}
        />
      </div>
      {hasResult && result && (
        <div className="app__result">
          <ResultPanel result={result} onReset={handleReset} />
        </div>
      )}
    </main>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}