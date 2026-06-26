import { engageData } from '../../data/content';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, User } from 'lucide-react';

export function EngageWithUs() {
  return (
    <section id="engage-with-us" className="section-container">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Next Steps</span>
          <h2 className="section-title">Engage With Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Engagement Journey */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-panel p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-8">How We Work Together</h3>
            <div className="space-y-6">
              {engageData.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-navy-800 border border-electric-blue/30 flex items-center justify-center text-electric-cyan font-bold flex-shrink-0 group-hover:bg-electric-blue group-hover:text-navy-900 transition-colors duration-300">
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 rounded-xl bg-electric-blue/5 border border-electric-blue/20">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <ArrowRight className="text-electric-blue w-5 h-5" />
                What to Prepare Before Engaging EASA
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {engageData.preparationChecklist.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Us</h3>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-electric-cyan">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Contact Person</div>
                  <div className="text-white font-medium">{engageData.contact.person}</div>
                  <div className="text-sm text-slate-400">{engageData.contact.unit}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-electric-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</div>
                  <a href={`mailto:${engageData.contact.email}`} className="text-electric-blue hover:underline text-sm break-all">
                    {engageData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-electric-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Office Location</div>
                  <div className="text-slate-300 text-sm">{engageData.contact.location}</div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-center text-electric-cyan font-semibold">
                Partner with EASA to transform power plant challenges into scalable AI solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
