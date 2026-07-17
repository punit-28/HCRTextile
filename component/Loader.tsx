// components/loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div 
        className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#C9A84C]"
        style={{ animation: 'spin 0.8s linear infinite' }}
      ></div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;