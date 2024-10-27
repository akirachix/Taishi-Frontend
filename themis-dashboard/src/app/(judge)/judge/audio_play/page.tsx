import React from 'react';

interface AudioModalProps {
  showModal: boolean;
  onClose: () => void;
  audioSrc: string | null;
}

const AudioModal: React.FC<AudioModalProps> = ({ showModal, onClose, audioSrc }) => {
  if (!showModal || !audioSrc) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Audio Playback</h2>
        <audio controls className="w-full">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AudioModal;
