import { useState } from 'react';
import { ChevronDown, UserRound, UsersRound } from 'lucide-react';
import { orgStructureData, rizalSubordinateData } from '../../data/content';
import { motion } from 'framer-motion';

type OrgMember = (typeof orgStructureData)[number];
type RizalSubordinate = (typeof rizalSubordinateData)[number];

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
        <div className="ai-avatar-frame mx-auto mb-5">
          <img
            src={photoSrc}
            alt={member.name}
            className="ai-avatar-image"
          />
          <span className="ai-avatar-shimmer" />
        </div>
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

function CompactOrgCard({
  member,
  expanded,
  onToggle,
  locked = false,
  delay = 0,
}: {
  member: OrgMember | RizalSubordinate;
  expanded: boolean;
  onToggle?: () => void;
  locked?: boolean;
  delay?: number;
}) {
  const photoSrc = 'photo' in member && member.photo ? `${import.meta.env.BASE_URL}${member.photo}` : undefined;
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card relative z-10 w-full overflow-hidden p-5 text-left transition-all ${locked ? 'border-accent-green/35 shadow-[0_0_28px_rgba(120,214,75,0.16)]' : ''}`}
    >
      <div className="flex items-start gap-4">
        {photoSrc ? (
          <div className="ai-avatar-frame shrink-0" style={{ width: '5rem', height: '5rem' }}>
            <img
              src={photoSrc}
              alt={member.name}
              className="ai-avatar-image"
            />
            <span className="ai-avatar-shimmer" />
          </div>
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-electric-cyan/35 bg-electric-cyan/10 text-lg font-bold text-electric-cyan shadow-[0_0_18px_rgba(37,216,255,0.14)]">
            {initials}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold leading-snug text-white">{member.name}</h3>
              <p className="mt-1 text-sm font-medium leading-snug text-electric-cyan">{member.role}</p>
            </div>
            {locked ? (
              <span className="rounded-full border border-accent-green/30 bg-accent-green/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-accent-green">
                EASA
              </span>
            ) : (
              <button
                type="button"
                onClick={onToggle}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-electric-cyan/25 bg-white/5 text-electric-cyan transition hover:bg-electric-cyan/10"
                aria-expanded={expanded}
                aria-label={`${expanded ? 'Minimise' : 'Expand'} ${member.name}`}
              >
                <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            )}
          </div>

          {expanded && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-sm leading-relaxed text-slate-300">{member.responsibility}</p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                <UserRound className="h-3.5 w-3.5 text-electric-cyan" aria-hidden="true" />
                {member.focus}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function OrgStructure() {
  const [chiefEngineer, lead, platformManager, applicationManager, dataEngineer, protegeDataEngineer, devOpsEngineer] = orgStructureData;
  const [showRizalReports, setShowRizalReports] = useState(false);
  const [expandedReports, setExpandedReports] = useState<Record<string, boolean>>({});
  const visibleRizalReports: Array<OrgMember | RizalSubordinate> = showRizalReports
    ? [rizalSubordinateData[0], rizalSubordinateData[1], lead, rizalSubordinateData[2], rizalSubordinateData[3]]
    : [lead];
  const toggleReport = (name: string) => {
    setExpandedReports((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  return (
    <section id="org-structure" className="section-container">
      <div className="max-w-6xl mx-auto w-full">
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
            <div className="relative w-full md:max-w-xl">
              <OrgCard member={chiefEngineer} featured />
              <button
                type="button"
                onClick={() => setShowRizalReports((current) => !current)}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg border border-electric-cyan/35 bg-navy-900/80 px-3 py-2 text-xs font-bold uppercase tracking-wider text-electric-cyan shadow-[0_0_18px_rgba(37,216,255,0.2)] backdrop-blur-md transition hover:bg-electric-cyan/10"
                aria-expanded={showRizalReports}
                aria-label={`${showRizalReports ? 'Minimise' : 'Expand'} Rizal direct reports`}
              >
                <UsersRound className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Direct Reports</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showRizalReports ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="h-10 w-1 rounded-full bg-electric-cyan shadow-[0_0_18px_rgba(93,244,255,0.65)]" />
          </div>

          <div className="relative mb-10">
            {showRizalReports ? (
              <svg
                className="pointer-events-none absolute left-0 right-0 top-0 hidden h-16 w-full overflow-visible xl:block"
                viewBox="0 0 100 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M50 0 V24 M10 24 H90 M10 24 V64 M30 24 V64 M50 24 V64 M70 24 V64 M90 24 V64"
                  fill="none"
                  stroke="rgba(93,244,255,0.92)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                  className="drop-shadow-[0_0_10px_rgba(93,244,255,0.75)]"
                />
              </svg>
            ) : null}
            {showRizalReports ? (
              <div className="grid grid-cols-1 gap-5 pt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {visibleRizalReports.map((member, index) => (
                  <div key={member.name} className="relative">
                    <div className="hidden md:block absolute -top-16 left-1/2 h-16 w-1 -translate-x-1/2 rounded-full bg-electric-cyan shadow-[0_0_18px_rgba(93,244,255,0.65)] xl:hidden" />
                    <CompactOrgCard
                      member={member}
                      expanded={member.name === lead.name || Boolean(expandedReports[member.name])}
                      locked={member.name === lead.name}
                      onToggle={() => toggleReport(member.name)}
                      delay={0.05 + (index * 0.05)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-xl pt-16">
                <div className="relative">
                  <div className="hidden md:block absolute -top-16 left-1/2 h-16 w-1 -translate-x-1/2 rounded-full bg-accent-green shadow-[0_0_18px_rgba(120,214,75,0.65)]" />
                  <OrgCard member={lead} featured delay={0.05} />
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex justify-center">
            <div className="h-10 w-1 rounded-full bg-accent-green shadow-[0_0_18px_rgba(120,214,75,0.65)]" />
          </div>

          <div className="mx-auto mb-8 max-w-xl rounded-full border border-accent-green/20 bg-accent-green/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-accent-green">
            Enterprise AI Solution Architect branch
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto md:mt-10">
            <div className="relative flex flex-col items-center">
              <div className="hidden md:block absolute -top-10 left-1/2 h-10 w-0.5 -translate-x-1/2 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={platformManager} delay={0.1} />
              <div className="hidden md:block h-10 w-0.5 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={dataEngineer} delay={0.2} />
              <div className="hidden md:block h-10 w-0.5 bg-electric-cyan/70 shadow-[0_0_10px_rgba(0,229,255,0.35)]" />
              <OrgCard member={protegeDataEngineer} delay={0.3} />
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
