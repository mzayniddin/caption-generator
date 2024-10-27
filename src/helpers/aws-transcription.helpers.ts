import { SimplifiedTranscriptionItem, TranscriptionItem } from '@/types';

export function clearTranscriptionItems(
  items: TranscriptionItem[]
): SimplifiedTranscriptionItem[] {
  items.forEach((item, key) => {
    if (!item.start_time) {
      const prev = items[key - 1];
      if (prev) {
        prev.alternatives[0].content += item.alternatives[0].content;
      }
      delete items[key]; // Mark for deletion
    }
  });

  // Filter out any undefined entries after deletion and map to structured format
  return items.filter(Boolean).map((item) => {
    const { start_time, end_time } = item;
    const content = item.alternatives[0].content;
    return { start_time, end_time, content };
  });
}

function secondsToHHMMSSMS(timeString: string): string {
  const d = new Date(parseFloat(timeString) * 1000);
  return d.toISOString().slice(11, 23).replace('.', ',');
}

export function transcriptionItemsToSrt(
  items: SimplifiedTranscriptionItem[]
): string {
  let srt = '';
  let i = 1;

  items
    .filter((item) => !!item)
    .forEach((item) => {
      const { start_time, end_time, content } = item;

      // Sequence number
      srt += i + '\n';

      // Timestamps
      if (start_time && end_time) {
        srt +=
          secondsToHHMMSSMS(start_time) +
          ' --> ' +
          secondsToHHMMSSMS(end_time) +
          '\n';
      }

      // Content
      srt += content + '\n\n';
      i++;
    });

  return srt;
}
