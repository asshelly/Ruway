
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, User, AlertCircle } from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate?: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pressStartTime = useRef<number>(0);
  const DURATION = 1000; // Reduced to 1 second

  // Mock positions for nearby nodes
  const nearbyNodes = [
    { id: 1, top: '32%', left: '22%', color: 'bg-purple-400', pulseColor: 'bg-purple-300', size: 'w-12 h-12', iconSize: 20 },
    { id: 2, top: '28%', left: '72%', color: 'bg-blue-400', pulseColor: 'bg-blue-300', size: 'w-14 h-14', iconSize: 24 },
    { id: 3, top: '62%', left: '18%', color: 'bg-orange-400', pulseColor: 'bg-orange-300', size: 'w-12 h-12', iconSize: 20 },
    { id: 4, top: '58%', left: '78%', color: 'bg-indigo-400', pulseColor: 'bg-indigo-300', size: 'w-10 h-10', iconSize: 18 },
    { id: 5, top: '75%', left: '45%', color: 'bg-pink-400', pulseColor: 'bg-pink-300', size: 'w-8 h-8', iconSize: 16 },
  ];

  const warningMessages = [
    "¿Es una emergencia real?",
    "El mal uso afecta a todos...",
    "Generando ubicación exacta...",
    "Activando cámaras de seguridad...",
    "Contactando enlaces cercanos..."
  ];

  const startPress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent context menu or scrolling
    setIsPressing(true);
    pressStartTime.current = Date.now();
    setMessageIndex(0);

    // Vibration feedback start
    if (navigator.vibrate) navigator.vibrate(50);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - pressStartTime.current;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      
      setProgress(newProgress);

      // Change message every 200ms (faster for 1s duration)
      const msgIdx = Math.floor(elapsed / 200) % warningMessages.length;
      setMessageIndex(msgIdx);

      if (newProgress >= 100) {
        completePress();
      }
    }, 16); // 60fps
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPressing(false);
    setProgress(0);
  };

  const completePress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Haptic feedback success
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    
    // Navigate to report
    if (onNavigate) {
      onNavigate(ViewState.REPORT);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-full px-6 pb-24 overflow-hidden select-none">
      
      {/* Background Map & Network Layer (Absolute) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -100 100 Q 150 300 400 100 T 900 300" stroke="#004D40" strokeWidth="2" fill="none" />
            <path d="M -50 400 Q 200 200 500 500" stroke="#004D40" strokeWidth="2" fill="none" />
         </svg>
         
         {nearbyNodes.map((node) => (
            <div 
                key={node.id}
                className={`absolute flex items-center justify-center rounded-full text-white shadow-lg animate-float transition-opacity duration-500 ${isPressing ? 'opacity-20' : 'opacity-100'}`}
                style={{ top: node.top, left: node.left, animationDelay: `${node.id * 0.5}s` }}
            >
                <div className={`absolute inset-0 rounded-full ${node.pulseColor} animate-ping opacity-40`}></div>
                <div className={`${node.size} ${node.color} rounded-full flex items-center justify-center relative z-10 border-2 border-white/30`}>
                    <User size={node.iconSize} />
                </div>
            </div>
         ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full h-full">
          
          {/* Status Banner - Compacted at top */}
          <div className={`transition-all duration-300 w-full rounded-2xl p-3 text-center mb-2 backdrop-blur-sm mt-0 border ${isPressing ? 'bg-red-500/20 border-red-500/40' : 'bg-teal-700/10 border-teal-700/20'}`}>
            <p className={`font-serif font-bold text-lg tracking-wide transition-colors ${isPressing ? 'text-red-800 animate-pulse' : 'text-teal-900'}`}>
              {isPressing ? warningMessages[messageIndex] : "Tu acción importa, incluso en silencio"}
            </p>
          </div>

          {/* GPS Status - Slight margin bottom */}
          <div className="flex items-center gap-2 text-teal-800 mb-2 opacity-90 bg-white/40 px-4 py-1.5 rounded-full shadow-sm">
            <MapPin size={14} className={isPressing ? "animate-ping text-red-600" : "animate-bounce"} />
            <span className="text-xs font-bold">{isPressing ? "Rastreando ubicación..." : "GPS Conectado"}</span>
          </div>

          {/* Main Alert Button Container - Lowered (pt-12) */}
          <div className="flex-1 flex flex-col items-center justify-start w-full relative pt-12">
              
              {/* Button Wrapper with strict flex centering */}
              <div className="relative group flex items-center justify-center">
                
                {/* Progress Ring SVG - Absolute Centered to Wrapper */}
                {isPressing && (
                    <svg 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0 rotate-[-90deg] pointer-events-none"
                        viewBox="0 0 320 320"
                    >
                        <circle
                            cx="160"
                            cy="160"
                            r="148"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="160"
                            cy="160"
                            r="148"
                            stroke="#EF4444"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="930"
                            strokeDashoffset={930 - (930 * progress) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-[16ms] ease-linear"
                        />
                    </svg>
                )}

                {/* Ripple Effects */}
                {!isPressing && (
                    <>
                        <div className="absolute inset-0 bg-red-500 rounded-full opacity-10 animate-ping duration-[3000ms]"></div>
                        <div className="absolute -inset-4 bg-red-500 rounded-full opacity-5 animate-pulse"></div>
                    </>
                )}
                
                {/* The Button - Fixed Size 64 (256px) */}
                <button 
                    onMouseDown={startPress}
                    onMouseUp={cancelPress}
                    onMouseLeave={cancelPress}
                    onTouchStart={startPress}
                    onTouchEnd={cancelPress}
                    className={`relative w-64 h-64 rounded-full flex flex-col items-center justify-center transform transition-all duration-200 border-4 shadow-2xl z-10 select-none
                        ${isPressing 
                            ? 'bg-red-600 scale-95 border-red-300 shadow-[0_0_50px_rgba(220,38,38,0.8)]' 
                            : 'bg-gradient-to-b from-red-500 to-red-700 hover:scale-105 border-white/20 shadow-[0_10px_50px_-10px_rgba(220,38,38,0.6)]'
                        }
                    `}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                >
                  {isPressing ? (
                      <div className="flex flex-col items-center animate-pulse">
                          <AlertCircle size={60} className="text-white mb-2" />
                          <span className="text-2xl font-bold text-white">MANTÉN</span>
                          <span className="text-lg text-white/80">{Math.ceil((DURATION - (DURATION * progress / 100))/1000)}s</span>
                      </div>
                  ) : (
                      <>
                        <span className="text-2xl font-serif text-white/90 font-medium mb-0 drop-shadow-md tracking-wider pointer-events-none">Alerta</span>
                        <span className="text-5xl font-serif text-white font-bold drop-shadow-lg tracking-wide pointer-events-none">Acoso</span>
                      </>
                  )}
                </button>
              </div>

              {/* Instructions */}
              <p className={`text-center text-sm mt-16 font-bold px-6 py-3 rounded-xl backdrop-blur-sm transition-colors pointer-events-none
                  ${isPressing ? 'text-red-700 bg-red-100' : 'text-teal-900 bg-white/40'}`}>
                {isPressing ? "No sueltes para confirmar" : "Mantener presionado 1s para activar"}
              </p>
          </div>
      </div>
    </div>
  );
};

export default HomeView;
