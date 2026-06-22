import { orgStructureData } from '../../data/content';
import { motion } from 'framer-motion';

type OrgMember = (typeof orgStructureData)[number];

function OrgCard({ member, featured = false, delay = 0 }: { member: OrgMember; featured?: boolean; delay?: number }) {
  const photoSrc = member.photo ? `${import.meta.env.BASE_URL}${member.photo}` : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card relative z-10 w-full p-6 text-center ${featured ? 'border-electric-blue border-b-4 md:max-w-xl' : ''}`}
    >
      {photoSrc && (
        <img
          src={photoSrc}
          alt={member.name}
          className="mx-auto mb-5 h-24 w-24 rounded-full border-2 border-electric-blue/50 object-cover shadow-[0_0_20px_rgba(100,255,218,0.22)] md:h-28 md:w-28"
        />
      )}
      <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-white mb-1 break-words`}>{member.role}</h3>
      <p className="text-electric-cyan text-sm font-medium mb-3 break-words">{member.name}</p>
      <p className="text-slate-400 text-sm mb-4">{member.responsibility}</p>
      <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300">
        {member.focus}
      </span>
    </motion.div>
  );
}

export function OrgStructure() {
  const [chiefEngineer, lead, platformManager, applicationManager, dataEngineer, devOpsEngineer] = orgStructureData;

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

        <div className="mt-12">
          <div className="flex justify-center">
            <OrgCard member={chiefEngineer} featured />
          </div>

          <div className="hidden md:flex justify-center">
            <div className="h-10 w-0.5 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
          </div>

          <div className="flex justify-center">
            <OrgCard member={lead} featured delay={0.05} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto md:mt-10">
            <div className="relative flex flex-col items-center">
              <div className="hidden md:block absolute -top-10 left-1/2 h-10 w-0.5 -translate-x-1/2 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={platformManager} delay={0.1} />
              <div className="hidden md:block h-10 w-0.5 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={dataEngineer} delay={0.2} />
            </div>

            <div className="relative flex flex-col items-center">
              <div className="hidden md:block absolute -top-10 left-1/2 h-10 w-0.5 -translate-x-1/2 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={applicationManager} delay={0.15} />
              <div className="hidden md:block h-10 w-0.5 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={devOpsEngineer} delay={0.25} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
