import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import type { RecorderStatus, ClassificationResult } from "../../types";
import './RecorderPanel.css';

interface RecorderPanelProps {
    status:    RecorderStatus;
    setStatus: (status: RecorderStatus) => void;
    onResult:  (result: ClassificationResult) => void;
}

const STATUS_LABELS: Record<RecorderStatus, string> = {
    'idle':                 'Toca el botón para identificar un género',
    'requesting-permission': 'Solicitando acceso al micrófono...',
    'recording':            'Escuchando...',
    'processing':           'Analizando audio...',
    'result':               'Género identificado',
    'error':                'Algo salió mal. Intenta de nuevo',
}

export function RecorderPanel({ status, setStatus, onResult }: RecorderPanelProps) {
    const { startRecording } = useAudioRecorder({ setStatus, onResult });

    const isActive   = status === 'recording';
    const isDisabled = status === 'requesting-permission' 
                    || status === 'recording'
                    || status === 'processing';
    
    return (
    <section className="recorder-panel">
      <div className="recorder-panel__header">
        <h1 className="recorder-panel__title">SoundID</h1>
        <p className="recorder-panel__subtitle">
          Identificación de géneros musicales
        </p>
      </div>

      <div className="recorder-panel__stage">
        <button
          className={`recorder-panel__mic-btn ${isActive ? 'recorder-panel__mic-btn--active' : ''}`}
          onClick={startRecording}
          disabled={isDisabled}
          aria-label="Iniciar grabación"
        >
          <MicIcon />
        </button>

        {isActive && (
          <div className="recorder-panel__rings">
            <span className="recorder-panel__ring" />
            <span className="recorder-panel__ring" />
          </div>
        )}
      </div>

      <p className={`recorder-panel__status ${status === 'error' ? 'recorder-panel__status--error' : ''}`}>
        {STATUS_LABELS[status]}
      </p>
    </section>
  );
}

function MicIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    );
  }