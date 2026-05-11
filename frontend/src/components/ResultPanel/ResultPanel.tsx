import type { ClassificationResult } from '../../types';
import { GENRE_INFO } from '../../constants';
import './ResultPanel.css';

interface ResultPanelProps {
  result:  ClassificationResult;
  onReset: () => void;
}

export function ResultPanel({ result, onReset }: ResultPanelProps) {
  const { genre, confidence } = result;
  const info                  = GENRE_INFO[genre];
  const confidencePercent     = Math.round(confidence * 100);

  return (
    <section
      className="result-panel"
      style={{ '--genre-color': info.color } as React.CSSProperties}
    >
      <div className="result-panel__watermark" aria-hidden="true">
        {genre}
      </div>

      <div className="result-panel__content">
        <div className="result-panel__top">
          <span className="result-panel__label">Género detectado</span>
          <h2 className="result-panel__name">{genre}</h2>

          <div className="result-panel__confidence">
            <div className="result-panel__confidence-bar">
              <div
                className="result-panel__confidence-fill"
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
            <span className="result-panel__confidence-value">
              {confidencePercent}% de confianza
            </span>
          </div>
        </div>

        <div className="result-panel__divider" />

        <div className="result-panel__bottom">
          <p className="result-panel__description">{info.description}</p>

          <div className="result-panel__tracks">
            <span className="result-panel__tracks-label">Escucha también</span>
            <div className="result-panel__track-list">
              {info.tracks.map((track) => (
                <div
                  key={`${track.artist}-${track.title}`}
                  className="result-panel__track"
                >
                  <span className="result-panel__track-title">
                    {track.title}
                  </span>
                  <span className="result-panel__track-artist">
                    {track.artist}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="result-panel__reset-btn" onClick={onReset}>
          ↩ Identificar otro
        </button>
      </div>
    </section>
  );
}