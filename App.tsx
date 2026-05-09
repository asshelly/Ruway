import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import ReportView from "./views/ReportView";
import ProfileView from "./views/ProfileView";
import RegisterView from "./views/RegisterView";
import { ViewState } from "./types";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(
    ViewState.REGISTER
  );

  /* ---------------- AUTH FLOW ---------------- */

  const handleRegistrationComplete = () => {
    setCurrentView(ViewState.HOME);
  };

  /* ---------------- REPORT ---------------- */

  const handleReportSubmit = async (reportData: any) => {
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (!res.ok) {
        throw new Error("Error al enviar reporte");
      }

      return await res.json();
    } catch (error) {
      console.error("Report error:", error);
      alert("No se pudo enviar el reporte. Intenta de nuevo.");
    }
  };

  /* ---------------- VIEW RENDER ---------------- */

  const renderView = () => {
    switch (currentView) {
      case ViewState.REGISTER:
        return (
          <RegisterView onComplete={handleRegistrationComplete} />
        );

      case ViewState.HOME:
        return <HomeView onNavigate={setCurrentView} />;

      case ViewState.REPORT:
        return <ReportView onSubmit={handleReportSubmit} />;

      case ViewState.PROFILE:
        return <ProfileView />;

      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  /* ---------------- HEADER TEXT ---------------- */

  const getTitle = () => {
    switch (currentView) {
      case ViewState.REPORT:
        return "Reporte Activo";
      case ViewState.PROFILE:
        return "Mi Perfil";
      default:
        return "";
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case ViewState.REPORT:
        return "Estamos contigo, reporta seguro";
      case ViewState.PROFILE:
        return "Tus datos y actividad";
      default:
        return "";
    }
  };

  /* ---------------- UI CONTROL ---------------- */

  const isAuthScreen = currentView === ViewState.REGISTER;

  const showNavigation = !isAuthScreen;
  const showHeader = !isAuthScreen;

  const handleBack = () => {
    if (currentView === ViewState.REPORT) {
      setCurrentView(ViewState.HOME);
    } else if (currentView === ViewState.PROFILE) {
      setCurrentView(ViewState.HOME);
    } else {
      setCurrentView(ViewState.HOME);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-teal-400 via-emerald-300 to-teal-50 overflow-hidden flex flex-col font-sans">

      {/* Background (ligero, sin sobrecargar móvil) */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] bg-teal-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[50%] bg-emerald-400 rounded-full opacity-10 blur-3xl"></div>

      {/* HEADER */}
      {showHeader && (
        <Header
          title={getTitle()}
          subtitle={getSubtitle()}
          currentView={currentView}
          onBack={handleBack}
        />
      )}

      {/* MAIN */}
      <main className="flex-1 relative z-10 overflow-hidden">
        {renderView()}
      </main>

      {/* NAVIGATION */}
      {showNavigation && (
        <Navigation
          currentView={currentView}
          onNavigate={setCurrentView}
        />
      )}
    </div>
  );
};

export default App;