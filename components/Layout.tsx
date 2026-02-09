
import React from 'react';
import { AppView } from '../types';
import { Home, Calendar, Car, Tag, User, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems = [
    { id: AppView.HOME, icon: Home, label: 'Home' },
    { id: AppView.SCHEDULE, icon: Calendar, label: 'Agendar' },
    { id: AppView.STOCK, icon: Car, label: 'Estoque' },
    { id: AppView.CAMPAIGNS, icon: Tag, label: 'Ofertas' },
    { id: AppView.PROFILE, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#003366] rounded flex items-center justify-center">
                <span className="text-white font-black text-xs">M</span>
            </div>
            <h1 className="font-bold text-xl tracking-tight text-[#003366]">MAGGI</h1>
        </div>
        <button 
          onClick={() => setActiveView(AppView.SPEC)}
          className={`p-2 rounded-full transition-colors ${activeView === AppView.SPEC ? 'bg-blue-50 text-blue-800' : 'text-gray-400'}`}
          title="Ver Especificação Técnica"
        >
          <FileText size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t safe-area-bottom flex justify-around py-3 px-2 z-50 max-w-md mx-auto border-x border-gray-200">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-[#003366]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
