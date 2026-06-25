import { projectHistoryData } from '../../data/content';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function ProjectHistory() {
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'deployed': return 'bg-accent-green/20 text-accent-green border-accent-green/30';
      case 'scale-up': return 'bg-electric-blue/20 text-electric-blue border-electric-blue/30';
      case 'pilot': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'prototype': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'planned': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <section id="project-history" className="section-container">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Track Record</span>
          <h2 className="section-title">Project History</h2>
        </motion.div>

        {/* Metrics Summary Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-6 mb-12 flex flex-wrap justify-around items-center gap-6 border-electric-blue/20 bg-gradient-to-r from-navy-800/80 to-navy-700/50"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{projectHistoryData.metrics.totalProjects}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Total Projects</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-electric-cyan mb-1">{projectHistoryData.metrics.activePilots}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Active Pilots</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-1">{projectHistoryData.metrics.deployedSolutions}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Deployed Solutions</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{projectHistoryData.metrics.stakeholdersEngaged}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Stakeholders Engaged</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectHistoryData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col h-full hover:border-white/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white leading-tight pr-4">{project.title}</h3>
                <span className={cn("px-2.5 py-1 rounded text-xs font-bold border whitespace-nowrap", getStatusColor(project.status))}>
                  {project.status}
                </span>
              </div>
              
              <div className="space-y-4 flex-grow mb-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem</div>
                  <p className="text-slate-300 text-sm">{project.problem}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">AI Approach</div>
                  <p className="text-slate-300 text-sm">{project.approach}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Stakeholders</div>
                  <p className="text-electric-cyan text-sm">{project.stakeholders}</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Value Delivered / Expected</div>
                <p className="text-accent-green font-medium text-sm">{project.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
