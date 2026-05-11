import { useRef, useCallback, useState } from 'react';
import type { RecorderStatus, ClassificationResult } from '../types';
import { classifyAudio } from '../services/classifier';
import { RECORDING_DURATION_MS } from '../constants';

interface UseAudioRecorderProps {
  setStatus: (status: RecorderStatus) => void;
  onResult:  (result: ClassificationResult) => void;
}

interface UseAudioRecorderReturn {
  startRecording: () => Promise<void>;
  stream: MediaStream | null;
}

export function useAudioRecorder({
  setStatus,
  onResult,
}: UseAudioRecorderProps): UseAudioRecorderReturn {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setStatus('requesting-permission');

      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setStream(mediaStream);
      setStatus('recording');

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
          setStatus('processing');
          const result = await classifyAudio(audioBlob);
          onResult(result);
        } catch {
          setStatus('error');
        }
      };

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, RECORDING_DURATION_MS);

    } catch {
      setStatus('error');
    }
  }, [setStatus, onResult]);

  return { startRecording, stream };
}