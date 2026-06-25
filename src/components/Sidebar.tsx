import { introData, navigationData } from '../data/content';
import { cn } from '../utils/cn';

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
      <div className="border-b border-electric-cyan/10 p-3">
        <div className="sidebar-brand-panel">
          {introData.logos.map((logo) => (
            <div key={logo.id} className="sidebar-logo-card">
              <img
                src={`${import.meta.env.BASE_URL}${logo.src}`}
                alt={`${logo.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
          <div className="border-t border-electric-cyan/15 pt-2.5">
            <h1 className="font-bold text-white leading-tight tracking-wide">EASA</h1>
            <p className="text-xs leading-snug text-slate-300">Enterprise AI Solution Architect</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
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
