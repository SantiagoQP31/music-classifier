import { useState } from "react";
import type { ClassificationResult, RecorderStatus } from "./types";
import { RecorderPanel } from "./components/RecorderPanel/RecorderPanel";
import { ResultPanel } from './components/ResultPanel/ResultPanel';
import './App.css';

export default function App() {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleResult = (data: ClassificationResult) => {
    setResult(data);
    setStatus('result');
  }

  const handleReset = () => {
    setResult(null);
    setStatus('idle');
  }

  const hasResult = status === 'result' && result !== null;

  return (
    <main className={`app ${hasResult ? 'app--has-result' : ''}`}>
      <div className="app__recorder">
        <RecorderPanel
          status={status}
          setStatus={setStatus}
          onResult={handleResult}
        />
      </div>
      {hasResult && (
        <div className="app__result">
          <ResultPanel result={result} onReset={handleReset} />
        </div>
      )}
    </main>
  );
}