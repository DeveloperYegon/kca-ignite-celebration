import { useState, useRef, useEffect } from 'react';

interface SpeakerHoverModalProps {
  speakerName: string;
  speakerImage: string;
  isVisible: boolean;
  position: { x: number; y: number };
}

const SpeakerHoverModal = ({ speakerName, speakerImage, isVisible, position }: SpeakerHoverModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isVisible) return null;

  return (
    <div
      ref={modalRef}
      className="fixed z-50 pointer-events-none transition-opacity duration-200"
      style={{
        left: position.x + 10,
        top: position.y - 100,
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="bg-background border border-border rounded-lg shadow-[var(--shadow-primary)] p-3 max-w-xs">
        <div className="flex items-center gap-3">
          <img
            src={speakerImage}
            alt={speakerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <p className="font-medium text-sm">{speakerName}</p>
            <p className="text-xs text-muted-foreground">Click for full profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerHoverModal;