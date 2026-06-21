import { backgroundData } from '../../data/content';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function Background() {
  return (
    <section id="background" className="section-container">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Context</span>
          <h2 className="section-title">Background & Rationale</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">The Evolution of AI in Power Plants</h3>
            <div className="space-y-6">
              {backgroundData.context.map((text, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-cyan mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  <p className="text-slate-300 text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold text-electric-blue mb-6 flex items-center gap-3">
              <span className="p-2 bg-electric-blue/10 rounded-lg">Why EASA Exists</span>
            </h3>
            <ul className="space-y-5">
              {backgroundData.whyEasaExists.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
