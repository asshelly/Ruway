
export enum ViewState {
  REGISTER = 'REGISTER', // Login/Registro
  HOME = 'HOME', // Alerta
  PROFILE = 'PROFILE', // Perfil
  REPORT = 'REPORT', // Acciona (Reporte)
}

export interface User {
  name: string;
  level: string;
  levelNumber: number;
  points: number;
  alerts: number;
  achievements: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CommunityPost {
  id: number;
  user: string;
  content: string;
  likes: number;
  timeAgo: string;
  tag: string;
}
