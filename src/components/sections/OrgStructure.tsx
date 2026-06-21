import { orgStructureData } from '../../data/content';
import { motion } from 'framer-motion';

export function OrgStructure() {
  return (
    <section id="org-structure" className="section-container">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Team</span>
          <h2 className="section-title">Org Structure</h2>
        </motion.div>

        <div className="mt-12 flex justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-electric-blue border-b-4 w-full md:w-1/2 text-center relative z-10"
          >
            <h3 className="text-xl font-bold text-white mb-1">{orgStructureData[0].role}</h3>
            <p className="text-electric-cyan font-medium mb-3">{orgStructureData[0].name}</p>
            <p className="text-slate-400 text-sm mb-4">{orgStructureData[0].responsibility}</p>
            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300">
              {orgStructureData[0].focus}
            </span>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting lines for org chart feel */}
          <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-8 bg-navy-700 -translate-x-1/2" />
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-navy-700" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {orgStructureData.slice(1).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 relative"
              >
                {/* Vertical line connection for desktop */}
                <div className="hidden md:block absolute -top-8 left-1/2 w-0.5 h-8 bg-navy-700 -translate-x-1/2" />
                
                <h3 className="text-lg font-bold text-white mb-1">{member.role}</h3>
                <p className="text-electric-cyan text-sm font-medium mb-3">{member.name}</p>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{member.responsibility}</p>
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300">
                    {member.focus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
