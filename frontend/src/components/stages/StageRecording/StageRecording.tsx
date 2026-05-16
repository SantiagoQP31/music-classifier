import { useEffect } from 'react';
import { useAudioRecorder } from '../../../hooks/useAudioRecorder';
import { WaveformVisualizer } from '../../shared/WaveformVisualizer';
import type { Stage, ClassificationResult } from '../../../types';
import './StageRecording.css';

interface StageRecordingProps {
  setStage: (stage: Stage) => void;
  onResult: (result: ClassificationResult) => void;
}

export function StageRecording({ setStage, onResult }: StageRecordingProps) {
  const { startRecording, stream } = useAudioRecorder({ setStage, onResult });

  useEffect(() => {
    startRecording();
  }, []);

  return (
    <section className="stage-recording">
      <div className="stage-recording__content">
        <div className="stage-recording__visualizer">
          <WaveformVisualizer stream={stream} isActive={true} />
        </div>

        <div className="stage-recording__indicator">
          <span className="stage-recording__dot" />
          <span className="stage-recording__label">Escuchando</span>
        </div>

        <p className="stage-recording__hint">
          Pon música cerca del micrófono
        </p>
      </div>
    </section>
  );
}