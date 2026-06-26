'use client';

import { useState, useEffect } from 'react';

export default function AccessibilityTools() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply font size to root
    document.documentElement.style.fontSize = `${fontSize}%`;

    // Apply high contrast
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  const increaseFont = () => setFontSize(Math.min(fontSize + 10, 150));
  const decreaseFont = () => setFontSize(Math.max(fontSize - 10, 80));
  const resetFont = () => setFontSize(100);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm hover:shadow-md transition"
        aria-label="Accessibility Options"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-xs font-semibold text-gray-700 hidden sm:inline">Accessibility</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-saffron" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            विशेष व्यवस्था / Accessibility
          </h4>

          {/* Font Size Controls */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 block mb-2">Font Size / फ़ॉन्ट आकार</label>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFont}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-700 transition"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <span className="text-xs text-gray-600 w-12 text-center">{fontSize}%</span>
              <button
                onClick={increaseFont}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-700 transition"
                aria-label="Increase font size"
              >
                A+
              </button>
              <button
                onClick={resetFont}
                className="px-3 py-1 bg-brand-saffron text-white text-xs rounded hover:bg-[#C8491A] transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600">High Contrast / उच्च कंट्रास्ट</span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 rounded-full transition ${highContrast ? 'bg-brand-saffron' : 'bg-gray-300'}`}
              aria-label="Toggle high contrast"
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${highContrast ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
