
import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, EyeOff } from 'lucide-react';

interface RegisterViewProps {
  onComplete: () => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setLoading(false);
        onComplete();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 pt-10 pb-20 text-center animate-slide-up">
      
      {/* Logo Area */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-teal-300 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
        <h1 className="relative text-6xl font-serif text-teal-900 tracking-tight z-10 drop-shadow-sm">Ruway</h1>
        <p className="text-teal-700 font-medium tracking-widest uppercase text-xs mt-2">Cultura de Bondad</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenid@</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Únete a la red de cuidado mutuo más grande del transporte público.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
             <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Correo Electrónico</label>
             <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all font-medium text-gray-700"
                required
             />
          </div>

          {/* Privacy Note */}
          <div className="bg-teal-50 rounded-xl p-3 flex items-start gap-3 border border-teal-100 text-left">
             <div className="bg-teal-100 p-1.5 rounded-full text-teal-600 mt-0.5">
                <Lock size={14} />
             </div>
             <div>
                 <p className="text-xs font-bold text-teal-800 mb-0.5">Anonimato Garantizado</p>
                 <p className="text-[11px] text-teal-600 leading-tight">
                    Tu correo solo se usa para validar tu cuenta. En la app serás <span className="font-bold">Viajero_Anónimo</span>.
                 </p>
             </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-teal-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-teal-800 transition-all active:scale-95 mt-4 disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? 'Creando perfil seguro...' : (
                <>
                    Ingresar Seguro
                    <ArrowRight size={20} />
                </>
            )}
          </button>
        </form>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={24} className="text-teal-700" />
              <span className="text-[10px] font-bold text-teal-900">Datos Encriptados</span>
          </div>
          <div className="flex flex-col items-center gap-1">
              <EyeOff size={24} className="text-teal-700" />
              <span className="text-[10px] font-bold text-teal-900">Identidad Oculta</span>
          </div>
      </div>

    </div>
  );
};

export default RegisterView;
