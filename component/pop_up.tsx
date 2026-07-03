"use client";

import { X } from "lucide-react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            This feature will be available in the next update.
          </p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}