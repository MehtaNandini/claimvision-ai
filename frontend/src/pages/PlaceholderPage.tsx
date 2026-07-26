import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px] h-full flex flex-col items-center justify-center">
        <div className="glass-panel p-3xl rounded-3xl text-center max-w-2xl mx-auto border-primary/20 bg-surface-container-low/50">
          <div className="w-24 h-24 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-xl">
            <span className="material-symbols-outlined !text-[48px]">construction</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-md">{pageName}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
            This module is currently under active development. The new {pageName} interface will be available in the upcoming release.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="px-xl py-md bg-primary text-on-primary font-label-lg rounded-xl hover:opacity-90 transition-opacity glowing-btn"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
