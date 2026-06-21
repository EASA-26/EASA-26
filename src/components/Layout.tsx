import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { navigationData } from '../data/content';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [activeSection, setActiveSection] = useState(navigationData[0].id);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide back to top
      setShowBackToTop(window.scrollY > 500);

      // Determine active section
      const sections = navigationData.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = navigationData.findIndex(item => item.id === activeSection);
      
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && currentIndex < navigationData.length - 1) {
        e.preventDefault();
        const nextId = navigationData[currentIndex + 1].id;
        document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
      } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && currentIndex > 0) {
        e.preventDefault();
        const prevId = navigationData[currentIndex - 1].id;
        document.getElementById(prevId)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-300 font-sans selection:bg-electric-cyan selection:text-navy-900">
      <Sidebar activeSection={activeSection} />
      <Topbar activeSection={activeSection} />
      
      <main className="md:ml-64 pt-16 md:pt-0 relative">
        {children}
        
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-electric-blue/20 text-electric-blue border border-electric-blue/30 hover:bg-electric-blue/30 transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </main>
    </div>
  );
}
