
import React, { useState } from 'react';
import { User, Edit2, Shield, Award, TrendingUp, RefreshCw, Settings, Bell, Lock, Camera, Smile } from 'lucide-react';

const ProfileView: React.FC = () => {
  // State for Avatar Customization simulation
  const [seed, setSeed] = useState('Felix');
  const [style, setStyle] = useState<'lorelei' | 'notionists' | 'avataaars'>('lorelei');
  const [username, setUsername] = useState('Viajero_01');
  const [isEditingName, setIsEditingName] = useState(false);

  // Avatar Styles - Curated for Friendliness
  const styles = [
    { id: 'lorelei', name: 'Amigable', icon: '😊' }, // Very friendly, Disney-esque
    { id: 'notionists', name: 'Artístico', icon: '🎨' }, // Sketch style, very clean
    { id: 'avataaars', name: 'Casual', icon: '🧢' }, // Classic
  ];

  const randomizeAvatar = () => {
    // Generate a random seed
    const randomSeed = Math.random().toString(36).substring(7);
    setSeed(randomSeed);
  };

  // We force light/warm background colors to avoid "gloomy" looks
  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;

  return (
    <div className="px-4 pb-32 overflow-y-auto h-full bg-gray-50/50">
       
      {/* Avatar Creator Section (Hero) */}
      <div className="flex flex-col items-center pt-4 mb-8">
        
        {/* Avatar Display Circle */}
        <div className="relative group">
            <div className="w-44 h-44 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-teal-50 relative z-10 transition-all duration-300 transform group-hover:scale-105">
                <img 
                    src={avatarUrl} 
                    alt="Tu Avatar" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Randomize Button */}
            <button 
                onClick={randomizeAvatar}
                className="absolute bottom-2 right-2 z-20 bg-teal-500 text-white p-3 rounded-full shadow-lg hover:bg-teal-600 transition-transform active:scale-90 border-4 border-white"
                title="Generar nuevo rasgo"
            >
                <RefreshCw size={20} />
            </button>
            
            {/* Aura/Level Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-teal-200 to-purple-200 rounded-full opacity-50 blur-xl -z-10 animate-pulse-slow"></div>
        </div>

        {/* Username Editor */}
        <div className="mt-6 flex items-center gap-2">
            {isEditingName ? (
                <div className="flex items-center bg-white rounded-full px-4 py-1 shadow-sm border border-teal-200">
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-center font-bold text-xl text-teal-900 outline-none w-40 bg-transparent"
                        autoFocus
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    />
                </div>
            ) : (
                <h2 onClick={() => setIsEditingName(true)} className="text-2xl font-serif font-bold text-teal-900 cursor-pointer hover:text-teal-700 flex items-center gap-2">
                    {username}
                    <Edit2 size={16} className="text-teal-400" />
                </h2>
            )}
        </div>
        <p className="text-sm text-teal-600/80 font-medium bg-teal-50 px-3 py-1 rounded-full mt-2 border border-teal-100">
            Nivel 3 • Defensor de la Bondad
        </p>

        {/* Style Selectors */}
        <div className="flex gap-2 mt-6 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            {styles.map((s) => (
                <button
                    key={s.id}
                    onClick={() => setStyle(s.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                        style === s.id 
                        ? 'bg-teal-100 text-teal-800 border-teal-200 shadow-sm' 
                        : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50'
                    }`}
                >
                    <span className="text-base">{s.icon}</span>
                    {s.name}
                </button>
            ))}
        </div>
      </div>

      {/* Stats "Passport" Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
         
         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
            <Award className="text-orange-500" size={20} />
            Tu Impacto Positivo
         </h3>
         
         <div className="grid grid-cols-3 gap-4 relative z-10">
            <div className="text-center">
                <p className="text-2xl font-bold text-teal-800">12</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Alertas</p>
            </div>
             <div className="text-center border-l border-r border-gray-100">
                <p className="text-2xl font-bold text-teal-800">850</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Puntos</p>
            </div>
             <div className="text-center">
                <p className="text-2xl font-bold text-teal-800">8</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Logros</p>
            </div>
         </div>
      </div>

      {/* Secondary Actions / Settings */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2 mb-2">Configuración de Cuenta</p>
        
        <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition">
                    <Bell size={20} />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-700 text-sm">Notificaciones</p>
                    <p className="text-xs text-gray-400">Alertas cercanas y comunidad</p>
                </div>
            </div>
            <div className="w-10 h-6 bg-teal-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
        </button>

        <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition">
                    <Lock size={20} />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-700 text-sm">Privacidad y Anonimato</p>
                    <p className="text-xs text-gray-400">Gestionar visibilidad del perfil</p>
                </div>
            </div>
        </button>

        <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition">
                    <Settings size={20} />
                </div>
                <div className="text-left">
                    <p className="font-bold text-gray-700 text-sm">Configuración General</p>
                    <p className="text-xs text-gray-400">Idioma, pantalla, sonido</p>
                </div>
            </div>
        </button>
      </div>

    </div>
  );
};

export default ProfileView;
