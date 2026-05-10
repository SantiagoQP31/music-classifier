import { useState } from "react";
import type { ClassificationResult, RecorderStatus } from "./types";
import { RecorderPanel } from "./components/RecorderPanel/RecorderPanel";
import { ResultPanel } from './components/ResultPanel/ResultPanel';

export default function App() {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleResult = (data: ClassificationResult) => {
    setResult(data);
    setStatus('idle');
  }

  const handleReset = () => {
    setResult(null);
    setStatus('idle');
  }

  return (
    <main className="app">
      <RecorderPanel 
        status={status}
        setStatus={setStatus}
        onResult={handleResult}
      />
      {status === 'result' && result && (
        <ResultPanel 
          result={result}
          onReset={handleReset}
        />
      )}
    </main>
  )
}