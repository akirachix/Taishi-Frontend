import tinycolor from "tinycolor2";

export const generateRandomColor = (): string => {
  return tinycolor.random().toHexString();
};

export const getColorForSpeaker = (
  speaker: string,
  speakerColorMap: { [key: string]: string }
) => {
  if (!speakerColorMap[speaker]) {
    speakerColorMap[speaker] = generateRandomColor();
  }
  return speakerColorMap[speaker];
};

export const formatDiarizationTextWithColors = (text: string) => {
  if (!text) return "";

  const speakerColorMap: { [key: string]: string } = {};
  const colorizedText = text.replace(/(Speaker\s\d+:)/g, (match, speaker) => {
    const color = getColorForSpeaker(speaker, speakerColorMap);
    return `<strong style="color: ${color};">${speaker}</strong>`;
  });

  const paragraphs = colorizedText.split(/\n+/).map((paragraph, index) => {
    return `<p key=${index} style="color: black; margin-bottom: 16px; font-size:25px;">${paragraph}</p>`;
  });

  return paragraphs.join("");
};