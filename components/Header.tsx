import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  currentView: ViewState;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, currentView, onBack }) => {
  const isHome = currentView === ViewState.HOME;

  if (isHome) {
    return (
      <div className="pt-12 pb-4 text-center bg-transparent">
        <h1 className="text-5xl text-teal-900 font-serif tracking-tight">Ruway</h1>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-6 px-6 flex items-center justify-between bg-transparent relative z-10">
      <button 
        onClick={onBack}
        className="p-2 bg-white/50 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
      >
        <ArrowLeft className="text-teal-900" size={24} />
      </button>
      <div className="flex-1 text-center mr-10"> {/* mr-10 balances the back button */}
        <h2 className="text-3xl text-teal-900 font-serif">{title}</h2>
        {subtitle && <p className="text-teal-700 text-sm font-medium mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Header;