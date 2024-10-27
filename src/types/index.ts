export type TranscriptionItem = {
  start_time?: string;
  end_time?: string;
  alternatives: { content: string }[];
};

export type SimplifiedTranscriptionItem = {
  start_time?: string;
  end_time?: string;
  content: string;
};
