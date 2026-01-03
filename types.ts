
export type VoiceID = 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';

export interface VoiceOption {
  id: VoiceID;
  name: string;
  gender: 'Nam' | 'Nữ';
  description: string;
  color: string;
}

export interface TTSState {
  text: string;
  selectedVoice: VoiceID;
  isLoading: boolean;
  error: string | null;
  wordCount: number;
}
