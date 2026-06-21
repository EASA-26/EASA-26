import { introData } from '../../data/content';
import { MetricCard } from '../MetricCard';
import { motion } from 'framer-motion';

export function Introduction() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="intro" className="section-container min-h-screen pt-24 md:pt-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 rounded-full bg-electric-cyan/20 text-electric-cyan text-sm font-bold tracking-widest border border-electric-cyan/30">
              {introData.acronym}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight leading-tight">
            {introData.title}
          </h1>
          <p className="text-xl md:text-2xl text-electric-cyan font-medium mb-8 max-w-3xl leading-relaxed">
            {introData.subtitle}
          </p>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            {introData.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleScroll('what-we-do')}
              className="btn-primary"
            >
              Explore What We Do
            </button>
            <button 
              onClick={() => handleScroll('project-history')}
              className="btn-secondary"
            >
              View Project History
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {introData.metrics.map((metric, index) => (
            <MetricCard 
              key={metric.id}
              label={metric.label}
              value={metric.value}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
