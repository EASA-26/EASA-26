import { useState } from 'react';
import { navigationData } from '../data/content';
import { cn } from '../utils/cn';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  activeSection: string;
}

export function Topbar({ activeSection }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel border-x-0 border-t-0 rounded-none z-50 flex items-center justify-between px-4 bg-navy-900/90">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-electric-blue/20 flex items-center justify-center border border-electric-blue/30">
            <BrainCircuit className="text-electric-blue w-5 h-5" />
          </div>
          <h1 className="font-bold text-white">EASA</h1>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 right-0 glass-panel border-none rounded-none z-40 bg-navy-800/95 shadow-xl"
          >
            <nav className="flex flex-col py-4 px-4 gap-1">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
