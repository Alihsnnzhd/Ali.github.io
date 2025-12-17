import React from 'react';
import { Home, Briefcase, FolderGit2, Cpu, Mail, Globe, User } from 'lucide-react';
import { Translation } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  lang: 'fa' | 'en';
  t: Translation;
  toggleLang: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, lang, t, toggleLang }) => {
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'experience', label: t.nav.experience, icon: Briefcase },
    { id: 'projects', label: t.nav.projects, icon: FolderGit2 },
    { id: 'skills', label: t.nav.skills, icon: Cpu },
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  return (
    // 'lg' breakpoint makes it responsive for tablets
    <aside className="fixed bottom-0 left-0 right-0 z-50 lg:left-0 lg:top-0 lg:h-screen lg:w-80 flex flex-col items-center py-4 lg:py-8 pointer-events-none">
      
      {/* Glass Container */}
      <div className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] 
                     w-[95%] lg:w-full lg:h-[95%] lg:my-auto lg:ml-6 lg:rounded-[40px] rounded-2xl mb-4 lg:mb-0
                     flex flex-row lg:flex-col justify-between p-2 lg:p-8 overflow-hidden relative">
        
        {/* Decorative Blur Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-neon-glow rounded-full blur-[50px] opacity-10 pointer-events-none"></div>
        
        {/* Brand */}
        <div className="hidden lg:flex items-center gap-4 px-2 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-neon rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-neon font-bold text-xl">
              <span className="mt-1">&lt;/&gt;</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg tracking-wider font-en">Ali_hsnnzhd</h1>
            <span className="text-xs text-neon/80 font-en tracking-widest uppercase">Android Develope</span>
          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex lg:flex-col w-full gap-1 lg:gap-4 justify-around lg:justify-start">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                // --- 🟢 CHANGE APPLIED HERE ---
                // `justify-center` for mobile/tablet, `lg:justify-start` for desktop
                className={`
                  relative group flex items-center justify-center lg:justify-start gap-4 px-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl w-full transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'bg-white/5 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                {/* Active/Hover Glow Indicator */}
                <div className={`
                    absolute left-0 top-0 bottom-0 w-1 bg-neon shadow-[0_0_15px_#39ff14] transition-all duration-300
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                `}></div>
                
                {/* Mobile Active Dot */}
                {isActive && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon rounded-full shadow-[0_0_5px_#39ff14] lg:hidden block"></div>
                )}
                
                <Icon 
                  size={22} 
                  className={`relative z-10 transition-transform duration-300 ${isActive ? 'text-neon scale-110' : 'group-hover:text-neon group-hover:scale-110'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Text label, hidden on mobile/tablet */}
                <span className={`
                  hidden lg:block text-sm font-medium relative z-10 transition-all duration-300
                  ${lang === 'fa' ? 'font-fa' : 'font-en'}
                  ${isActive ? 'translate-x-2 text-white' : 'group-hover:translate-x-2'}
                `}>
                  {item.label}
                </span>

                {/* Subtle gradient background on hover/active */}
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent opacity-100"></div>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Footer Actions (Lang Switcher) */}
        <div className="hidden lg:flex flex-col gap-4 mt-auto">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-white/5 hover:border-neon/30 bg-black/20 hover:bg-neon/5 transition-all group"
          >
            <div className="p-2 rounded-lg bg-white/5 group-hover:text-neon transition-colors">
                <Globe size={18} />
            </div>
            <span className={`text-sm font-medium text-gray-400 group-hover:text-white transition-colors ${lang === 'fa' ? 'font-fa' : 'font-en'}`}>
              {lang === 'fa' ? 'English' : 'فارسی'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
