import React from "react";
import { User, Home, FilePlus } from "lucide-react";
import { ViewState } from "../types";

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
}) => {
  const baseClass =
    "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200";

  const getButtonClass = (view: ViewState) => {
    const isActive = currentView === view;

    return `${baseClass} ${
      isActive
        ? "text-teal-700 font-bold"
        : "text-gray-400 font-medium hover:text-teal-600"
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 h-20 px-2 pb-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 rounded-t-3xl">
      <div className="flex justify-between items-center h-full max-w-md mx-auto relative">

        {/* PERFIL */}
        <button
          onClick={() => onNavigate(ViewState.PROFILE)}
          className={getButtonClass(ViewState.PROFILE)}
        >
          <User
            size={24}
            strokeWidth={currentView === ViewState.PROFILE ? 2.5 : 2}
          />
          <span className="text-xs">Perfil</span>
        </button>

        {/* HOME CENTRAL */}
        <div className="relative -top-6 flex flex-col items-center">
          <button
            onClick={() => onNavigate(ViewState.HOME)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              currentView === ViewState.HOME
                ? "bg-teal-600 text-white ring-4 ring-teal-100"
                : "bg-white text-gray-500 border-4 border-gray-100 hover:text-teal-600"
            }`}
          >
            <Home size={28} />
          </button>

          <span
            className={`text-xs font-bold mt-1 ${
              currentView === ViewState.HOME
                ? "text-teal-700"
                : "text-gray-400"
            }`}
          >
            Inicio
          </span>
        </div>

        {/* REPORTAR */}
        <button
          onClick={() => onNavigate(ViewState.REPORT)}
          className={getButtonClass(ViewState.REPORT)}
        >
          <FilePlus
            size={24}
            strokeWidth={currentView === ViewState.REPORT ? 2.5 : 2}
          />
          <span className="text-xs">Reportar</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;