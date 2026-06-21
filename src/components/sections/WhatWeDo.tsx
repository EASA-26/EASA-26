import { whatWeDoData } from '../../data/content';
import { motion } from 'framer-motion';

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-container">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Capabilities</span>
          <h2 className="section-title">What We Do</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {whatWeDoData.capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(100,255,218,0.1)] hover:border-electric-blue/40"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-electric-cyan group-hover:text-electric-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{cap.description}</p>
                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 font-medium">
                  {cap.status}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-10">Delivery Flow</h3>
          <div className="flex flex-col md:flex-row justify-between items-center relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-navy-700 -z-10 transform -translate-y-1/2" />
            
            {whatWeDoData.deliveryFlow.map((flow, index) => (
              <div key={index} className="flex flex-col items-center relative mb-8 md:mb-0">
                <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-electric-blue font-bold text-xl mb-4 shadow-[0_0_15px_rgba(100,255,218,0.2)]">
                  {flow.step}
                </div>
                <div className="text-center">
                  <h4 className="text-white font-semibold mb-1">{flow.label}</h4>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">{flow.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
