import { navigationData } from '../data/content';
import { cn } from '../utils/cn';
import { BrainCircuit } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel border-y-0 border-l-0 rounded-none z-40 bg-navy-900/90">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-lg bg-electric-blue/20 flex items-center justify-center border border-electric-blue/30">
          <BrainCircuit className="text-electric-blue w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white leading-tight">EASA</h1>
          <p className="text-xs text-slate-400">Dashboard Deck</p>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        {navigationData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "nav-item w-full text-left",
              activeSection === item.id ? "nav-item-active" : "nav-item-inactive"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 text-xs text-slate-500 text-center">
        For internal stakeholder communication. Replace sample content.
      </div>
    </div>
  );
}
