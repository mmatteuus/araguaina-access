import React, { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from 'next-themes';
import { SigNavbar } from '@/components/sig/SigNavbar';
import { SigSidebar } from '@/components/sig/SigSidebar';
import { LoginDialog } from '@/components/sig/LoginDialog';
import { HomePage } from '@/components/sig/pages/HomePage';
import { IptuPage } from '@/components/sig/pages/IptuPage';
import { ProtocolosPage } from '@/components/sig/pages/ProtocolosPage';
import { RhPage } from '@/components/sig/pages/RhPage';
import { MasterStudioPage } from '@/components/sig/pages/MasterStudioPage';

const Index = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showMasterStudio, setShowMasterStudio] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'home':
        return <HomePage />;
      case 'iptu':
        return <IptuPage />;
      case 'protocolos':
        return <ProtocolosPage />;
      case 'rh':
        return <RhPage />;
      case 'master':
        return <MasterStudioPage />;
      default:
        return <HomePage />;
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleOpenMasterStudio = () => {
    setActiveModule('master');
    setShowMasterStudio(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <SigNavbar 
            onOpenLogin={() => setShowLogin(true)}
            onOpenMasterStudio={handleOpenMasterStudio}
          />
          
          <div className="flex">
            <SigSidebar 
              activeModule={activeModule}
              onModuleSelect={handleModuleSelect}
            />
            
            <main className="flex-1 p-6 min-h-[calc(100vh-64px)] max-w-7xl mx-auto">
              {renderContent()}
            </main>
          </div>

          <footer className="border-t bg-surface-subtle">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>Desenvolvido por <strong>MtsFerreira</strong></p>
                <p className="text-xs mt-1">
                  SIG Araguaína - Sistema Integrado de Gestão Municipal
                </p>
              </div>
            </div>
          </footer>

          <LoginDialog 
            open={showLogin}
            onOpenChange={setShowLogin}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;