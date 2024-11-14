import React, { useState, useEffect } from "react";
import { getSingleTranscription } from "@/app/utils/singleTranscription";
import { formatDiarizationTextWithColors } from "@/app/utils/colorUtils";

export default function FullHearingNotes({ transcriptionId }: { transcriptionId: number }) {
  const [transcription, setTranscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        setLoading(true);
        const data = await getSingleTranscription(transcriptionId);
        setTranscription(data);
      } catch (error) {
        setError("Failed to fetch transcription");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscription();
  }, [transcriptionId]);

  if (loading) return <p>Loading transcription...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-h-[755px] overflow-y-auto">
      <div
        className="transcription-text"
        dangerouslySetInnerHTML={{
          __html: formatDiarizationTextWithColors(
            transcription?.transcription_text || "Transcription does not exist"
          ),
        }}
      />
    </div>
  );
}