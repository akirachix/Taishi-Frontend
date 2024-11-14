import React, { useState, useEffect } from "react";
import { fetchDiarization } from "@/app/utils/diarization";
import { formatDiarizationTextWithColors } from "@/app/utils/colorUtils";
import { Speaker_tagging } from "../../../../../types";

export default function SpeakerSection({ transcriptionId }: { transcriptionId: number }) {
  const [diarization, setDiarization] = useState<Speaker_tagging| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiarizationData = async () => {
      try {
        setLoading(true);
        const data = await fetchDiarization(transcriptionId);
        setDiarization(data);
      } catch (error) {
        setError("Failed to fetch speaker data");
      } finally {
        setLoading(false);
      }
    };

    fetchDiarizationData();
  }, [transcriptionId]);

  if (loading) return <p>Loading speaker data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-h-[720px] overflow-y-auto">
      {diarization?.diarization_data ? (
        <div
          className="diarization-text"
          dangerouslySetInnerHTML={{
            __html: formatDiarizationTextWithColors(diarization.diarization_data),
          }}
        />
      ) : (
        <p>No speaker data available.</p>
      )}
    </div>
  );
}