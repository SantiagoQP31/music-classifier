import { API_BASE_URL } from "../constants";
import type { ClassificationResult } from "../types";

export async function classifyAudio(audioBlob: Blob): Promise<ClassificationResult> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    const response = await fetch(`${API_BASE_URL}/classify`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Classification failed with status ${response.status}`);
    }

    return response.json() as Promise<ClassificationResult>;
}