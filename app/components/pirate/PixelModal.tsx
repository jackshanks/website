'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function PixelModal({ isOpen, onClose, title, children }: PixelModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = 'pixel-modal-title';

  // Close on escape key + auto-focus close button
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Auto-focus close button for keyboard users
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 modal-backdrop animate-modal-fade-in" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-auto pixel-art animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pixel border frame */}
        <div className="relative bg-ocean-deep">
          {/* Outer border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: '8px solid #333c57',
              boxShadow: `
                inset 4px 4px 0 0 #566c86,
                inset -4px -4px 0 0 #1a1c2c,
                8px 8px 0 0 rgba(0, 0, 0, 0.3)
              `,
            }}
          />

          {/* Header */}
          <div
            className="relative flex items-center justify-between px-6 py-4"
            style={{
              backgroundColor: '#333c57',
              borderBottom: '4px solid #1a1c2c',
            }}
          >
            {/* Title with scroll decoration */}
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6"
                style={{
                  background: `
                    linear-gradient(135deg, #d4a574 25%, transparent 25%),
                    linear-gradient(225deg, #d4a574 25%, transparent 25%),
                    linear-gradient(45deg, #d4a574 25%, transparent 25%),
                    linear-gradient(315deg, #d4a574 25%, #f5d6a5 25%)
                  `,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '4px 0, 4px 0, 0 0, 0 0',
                }}
              />
              <h2 id={titleId} className="font-pixel text-sm md:text-base text-pirate-gold tracking-wider">
                {title}
              </h2>
            </div>

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 hover:bg-pixel-darkgray transition-colors"
              style={{
                border: '2px solid #566c86',
              }}
            >
              <X className="w-5 h-5 text-pixel-lightgray" />
            </button>
          </div>

          {/* Content area */}
          <div
            className="p-6 md:p-8"
            style={{
              backgroundColor: '#1a1c2c',
              minHeight: '200px',
            }}
          >
            {/* Parchment-style inner container */}
            <div
              className="p-4 md:p-6"
              style={{
                backgroundColor: 'rgba(244, 244, 244, 0.05)',
                border: '2px solid #333c57',
              }}
            >
              {children}
            </div>
          </div>

          {/* Footer with decorative elements */}
          <div
            className="flex justify-center py-3"
            style={{
              backgroundColor: '#333c57',
              borderTop: '4px solid #1a1c2c',
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
}
