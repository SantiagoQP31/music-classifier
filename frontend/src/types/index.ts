export type Genre =
    | 'Clásica'
    | 'Electrónica'
    | 'Hip-Hop'
    | 'Jazz'
    | 'Pop'
    | 'Rock'
    | 'Vallenato';
    
export type RecorderStatus = 
    | 'idle'
    | 'requesting-permission'
    | 'recording'
    | 'processing'
    | 'result'
    | 'error';

export interface ClassificationResult {
    genre: Genre;
    confidence: number;
}

export interface ClassificationError {
    message: string;
}