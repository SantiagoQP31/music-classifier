import { useRef, useCallback, useState } from 'react';
import type { Stage, ClassificationResult } from '../types';
import { classifyAudio } from '../services/classifier';
import { RECORDING_DURATION_MS } from '../constants';

interface UseAudioRecorderProps {
  setStage: (stage: Stage) => void;
  onResult: (result: ClassificationResult) => void;
}

interface UseAudioRecorderReturn {
  startRecording: () => Promise<void>;
  stream:         MediaStream | null;
}

export function useAudioRecorder({
  setStage,
  onResult,
}: UseAudioRecorderProps): UseAudioRecorderReturn {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setStage('recording');

      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);

        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });

        try {
          setStage('processing');
          const result = await classifyAudio(audioBlob);
          onResult(result);
        } catch {
          setStage('idle');
        }
      };

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, RECORDING_DURATION_MS);

    } catch {
      setStage('idle');
    }
  }, [setStage, onResult]);

  return { startRecording, stream };
}