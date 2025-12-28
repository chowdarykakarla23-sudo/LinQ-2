import React from 'react';
import { Home, Car, LayoutGrid, Mail, Wallet } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[88px] pb-5 z-50 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="relative flex items-center justify-between h-full max-w-md mx-auto">
        
        {/* Home */}
        <button className={getTabClass('home')} onClick={() => onTabChange('home')}>
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Rides */}
        <button className={getTabClass('rides')} onClick={() => onTabChange('rides')}>
          <Car size={24} strokeWidth={activeTab === 'rides' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Rides</span>
        </button>

        {/* Center Button (Floating) */}
        <div className="relative w-full flex justify-center items-end h-full">
           <button 
             className="absolute -top-6 bg-blue-600 rounded-full h-14 w-14 flex items-center justify-center shadow-lg shadow-blue-600/30 text-white transform transition-transform active:scale-95"
             onClick={() => onTabChange('center')}
           >
             <LayoutGrid size={28} strokeWidth={2.5} />
           </button>
           <span className={`text-[10px] font-medium mt-auto mb-1.5 transition-colors ${activeTab === 'center' ? 'text-blue-600' : 'text-gray-400'}`}>Center</span>
        </div>

        {/* Inbox (Formerly Alerts) */}
        <button className={getTabClass('inbox')} onClick={() => onTabChange('inbox')}>
          <Mail size={24} strokeWidth={activeTab === 'inbox' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Inbox</span>
        </button>

        {/* Wallet (New) */}
        <button className={getTabClass('wallet')} onClick={() => onTabChange('wallet')}>
          <Wallet size={24} strokeWidth={activeTab === 'wallet' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Wallet</span>
        </button>

      </div>
    </div>
  );
};