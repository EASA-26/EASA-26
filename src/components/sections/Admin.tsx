import { useState } from 'react';
import type { FormEvent } from 'react';
import { BarChart3, Eye, EyeOff, FileDown, ImageIcon, Lock, LogOut, Maximize2, Save, ShieldCheck, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectHistoryData } from '../../data/content';

const ADMIN_PASSWORD = 'easa26';
const ADMIN_UNLOCK_KEY = 'easa-admin-unlocked';
const ADMIN_STORAGE_KEY = 'easa-project-management-updates';
const STATUS_OPTIONS = ['Prototype', 'Deployed', 'Pilot', 'Planned'] as const;

type Project = (typeof projectHistoryData.projects)[number];
type StatusOption = (typeof STATUS_OPTIONS)[number];

type AdminProjectUpdate = {
  isVisible: boolean;
  status: StatusOption;
  currentProgress: string;
  wayForward: string;
  savedAt?: string;
};

type AdminProjectUpdates = Record<string, AdminProjectUpdate>;
type AdminPage = 'project-update' | 'kpi';

const createDefaultUpdate = (project: Project): AdminProjectUpdate => ({
  isVisible: true,
  status: STATUS_OPTIONS.includes(project.status as StatusOption) ? project.status as StatusOption : 'Prototype',
  currentProgress: `${project.status}: ${project.value}`,
  wayForward: '',
});

const getStatusColor = (status: StatusOption) => {
  switch (status) {
    case 'Deployed':
      return '34D399';
    case 'Pilot':
      return 'A78BFA';
    case 'Planned':
      return '38BDF8';
    case 'Prototype':
    default:
      return 'FDBA74';
  }
};

const formatSlideText = (value: string) => value.trim() || 'To be updated.';
const compactSlideText = (value: string, maxLength = 210) => {
  const cleanValue = formatSlideText(value).replace(/\s+/g, ' ');
  return cleanValue.length > maxLength ? `${cleanValue.slice(0, maxLength - 1)}...` : cleanValue;
};

const loadSavedUpdates = (): AdminProjectUpdates => {
  try {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
    return saved ? JSON.parse(saved) as AdminProjectUpdates : {};
  } catch {
    return {};
  }
};

const saveUpdates = (updates: AdminProjectUpdates) => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updates));
};

export function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem(ADMIN_UNLOCK_KEY) === 'true');
  const [updates, setUpdates] = useState<AdminProjectUpdates>(() => {
    const savedUpdates = loadSavedUpdates();

    return projectHistoryData.projects.reduce<AdminProjectUpdates>((result, project) => {
      result[project.title] = {
        ...createDefaultUpdate(project),
        ...savedUpdates[project.title],
      };
      return result;
    }, {});
  });
  const [lastSaved, setLastSaved] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const [maximizedProjectTitle, setMaximizedProjectTitle] = useState<string | null>(null);
  const [activeAdminPage, setActiveAdminPage] = useState<AdminPage>('project-update');

  const projects = projectHistoryData.projects;
  const getProjectUpdate = (project: Project) => updates[project.title] ?? createDefaultUpdate(project);
  const visibleProjects = projects.filter((project) => getProjectUpdate(project).isVisible);
  const hiddenProjects = projects.filter((project) => !getProjectUpdate(project).isVisible);
  const maximizedProject = projects.find((project) => project.title === maximizedProjectTitle);
  const maximizedUpdate = maximizedProject ? getProjectUpdate(maximizedProject) : undefined;
  const statusSummary = STATUS_OPTIONS.map((status) => ({
    status,
    count: visibleProjects.filter((project) => getProjectUpdate(project).status === status).length,
  }));
  const deployedCount = statusSummary.find((item) => item.status === 'Deployed')?.count ?? 0;
  const activeBuildCount = visibleProjects.filter((project) => ['Prototype', 'Pilot'].includes(getProjectUpdate(project).status)).length;
  const plannedCount = statusSummary.find((item) => item.status === 'Planned')?.count ?? 0;

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_UNLOCK_KEY, 'true');
      setIsUnlocked(true);
      setError('');
      setPassword('');
      return;
    }

    setError('Incorrect password.');
  };

  const handleUpdate = (
    projectTitle: string,
    field: keyof Pick<AdminProjectUpdate, 'status' | 'currentProgress' | 'wayForward'>,
    value: StatusOption | string,
  ) => {
    setUpdates((current) => ({
      ...current,
      [projectTitle]: {
        ...(current[projectTitle] ?? createDefaultUpdate(projects.find((project) => project.title === projectTitle) ?? projects[0])),
        [field]: value,
      },
    }));
  };

  const handleVisibilityChange = (projectTitle: string, isVisible: boolean) => {
    const project = projects.find((item) => item.title === projectTitle) ?? projects[0];
    const savedAt = new Date().toLocaleString('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const nextUpdates = {
      ...updates,
      [projectTitle]: {
        ...(updates[projectTitle] ?? createDefaultUpdate(project)),
        isVisible,
        savedAt,
      },
    };

    setUpdates(nextUpdates);
    saveUpdates(nextUpdates);
    setLastSaved(savedAt);
  };

  const handleSave = (projectTitle?: string) => {
    const savedAt = new Date().toLocaleString('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const nextUpdates = projectTitle
      ? {
          ...updates,
          [projectTitle]: {
            ...updates[projectTitle],
            savedAt,
          },
        }
      : Object.fromEntries(
          Object.entries(updates).map(([title, update]) => [
            title,
            {
              ...update,
              savedAt,
            },
          ]),
        ) as AdminProjectUpdates;

    setUpdates(nextUpdates);
    saveUpdates(nextUpdates);
    setLastSaved(savedAt);
  };

  const handleExportPowerPoint = async () => {
    setIsExporting(true);
    setExportError('');

    try {
      const { default: pptxgen } = await import('pptxgenjs');
      const pptx = new pptxgen();
      pptx.layout = 'LAYOUT_WIDE';
      pptx.author = 'EASA';
      pptx.company = 'TNB Genco';
      pptx.subject = 'EASA project management updates';
      pptx.title = 'EASA Project Management Updates';
      pptx.theme = {
        headFontFace: 'Aptos Display',
        bodyFontFace: 'Aptos',
      };

      const generatedAt = new Date().toLocaleString('en-MY', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
      const statusCounts = STATUS_OPTIONS.map((status) => ({
        status,
        count: visibleProjects.filter((project) => (updates[project.title] ?? createDefaultUpdate(project)).status === status).length,
      }));
      const splitIndex = Math.ceil(visibleProjects.length / 2);
      const slideGroups = [
        visibleProjects.slice(0, splitIndex),
        visibleProjects.slice(splitIndex),
      ];
      const columnLayout = [
        { label: 'No', x: 0.35, w: 0.35 },
        { label: 'Project', x: 0.75, w: 1.45 },
        { label: 'Status', x: 2.25, w: 0.82 },
        { label: 'Stakeholder', x: 3.12, w: 0.88 },
        { label: 'Summary / Value', x: 4.05, w: 3.05 },
        { label: 'Current Progress', x: 7.15, w: 2.85 },
        { label: 'Way Forward', x: 10.05, w: 2.9 },
      ];

      slideGroups.forEach((group, slideIndex) => {
        const slide = pptx.addSlide();
        const rowHeight = Math.min(0.82, 5.05 / Math.max(group.length, 1));

        slide.background = { color: '071426' };
        slide.addText('EASA Project Management Updates', { x: 0.35, y: 0.28, w: 6.8, h: 0.34, fontFace: 'Aptos Display', fontSize: 18, bold: true, color: 'FFFFFF', margin: 0 });
        slide.addText(`Compressed management view ${slideIndex + 1} / 2`, { x: 0.36, y: 0.68, w: 3.8, h: 0.22, fontSize: 8.5, color: '66F6FF', margin: 0 });
        slide.addText(`Generated ${generatedAt}`, { x: 9.45, y: 0.3, w: 3.5, h: 0.2, fontSize: 8, color: 'A7B4C8', align: 'right', margin: 0 });

        slide.addText(String(visibleProjects.length), { x: 0.35, y: 1.02, w: 1.05, h: 0.35, fontSize: 15, bold: true, color: 'FFFFFF', align: 'center', margin: 0.04, fill: { color: '14375F' }, breakLine: false });
        slide.addText('VISIBLE', { x: 0.35, y: 1.38, w: 1.05, h: 0.18, fontSize: 5.8, bold: true, color: '66F6FF', align: 'center', margin: 0.02, fill: { color: '14375F' } });

        statusCounts.forEach(({ status, count }, index) => {
          const x = 1.55 + index * 1.12;
          slide.addText(String(count), { x, y: 1.02, w: 0.9, h: 0.35, fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', margin: 0.04, fill: { color: '102E52' }, breakLine: false });
          slide.addText(status.toUpperCase(), { x, y: 1.38, w: 0.9, h: 0.18, fontSize: 5.3, bold: true, color: getStatusColor(status), align: 'center', margin: 0.02, fill: { color: '102E52' } });
        });

        slide.addText(
          'Hidden projects are excluded. Rows contain compressed project summary, value, current progress, and way forward from the Admin page.',
          { x: 6.25, y: 1.08, w: 6.7, h: 0.36, fontSize: 7.5, color: 'D8E2F0', margin: 0.04, breakLine: false, fit: 'shrink' },
        );

        columnLayout.forEach((column) => {
          slide.addText(column.label, { x: column.x, y: 1.78, w: column.w, h: 0.22, fontSize: 6.5, bold: true, color: '66F6FF', margin: 0.02, fill: { color: '10233D' } });
        });

        if (group.length === 0) {
          slide.addText('No projects in this section.', { x: 0.35, y: 2.25, w: 12.6, h: 3, fontSize: 16, bold: true, color: '64748B', align: 'center', valign: 'middle', margin: 0.1, fill: { color: '10233D' } });
        }

        group.forEach((project, rowIndex) => {
          const update = updates[project.title] ?? createDefaultUpdate(project);
          const y = 2.05 + rowIndex * rowHeight;
          const fillColor = rowIndex % 2 === 0 ? '0D213A' : '102945';
          const summary = `${project.problem} Value: ${project.value}`;

          columnLayout.forEach((column) => {
            slide.addText('', { x: column.x, y, w: column.w, h: rowHeight - 0.03, fill: { color: fillColor }, margin: 0.01 });
          });

          slide.addText(String(slideIndex * splitIndex + rowIndex + 1), { x: 0.35, y: y + 0.03, w: 0.35, h: rowHeight - 0.08, fontSize: 5.7, bold: true, color: 'A7B4C8', align: 'center', margin: 0.02, fit: 'shrink' });
          slide.addText(compactSlideText(project.title, 42), { x: 0.75, y: y + 0.03, w: 1.45, h: rowHeight - 0.08, fontSize: 5.9, bold: true, color: 'FFFFFF', margin: 0.03, fit: 'shrink' });
          slide.addText(update.status, { x: 2.25, y: y + 0.03, w: 0.82, h: rowHeight - 0.08, fontSize: 5.5, bold: true, color: getStatusColor(update.status), align: 'center', margin: 0.02, fit: 'shrink' });
          slide.addText(compactSlideText(project.stakeholders, 28), { x: 3.12, y: y + 0.03, w: 0.88, h: rowHeight - 0.08, fontSize: 5.4, color: 'D5DEEA', margin: 0.03, fit: 'shrink' });
          slide.addText(compactSlideText(summary, 260), { x: 4.05, y: y + 0.03, w: 3.05, h: rowHeight - 0.08, fontSize: 5.15, color: 'D5DEEA', margin: 0.04, breakLine: false, fit: 'shrink' });
          slide.addText(compactSlideText(update.currentProgress, 230), { x: 7.15, y: y + 0.03, w: 2.85, h: rowHeight - 0.08, fontSize: 5.15, color: 'F8FAFC', margin: 0.04, breakLine: false, fit: 'shrink' });
          slide.addText(compactSlideText(update.wayForward, 230), { x: 10.05, y: y + 0.03, w: 2.9, h: rowHeight - 0.08, fontSize: 5.15, color: 'F8FAFC', margin: 0.04, breakLine: false, fit: 'shrink' });
        });

        slide.addText('Enterprise AI Solution Architect | TNB Genco', { x: 0.35, y: 7.06, w: 5, h: 0.16, fontSize: 7, color: '7DD3FC', margin: 0 });
        slide.addText(`${slideIndex + 1} / 2`, { x: 12.3, y: 7.06, w: 0.65, h: 0.16, fontSize: 7, color: '7DD3FC', align: 'right', margin: 0 });
      });

      await pptx.writeFile({
        fileName: `EASA-project-management-updates-${new Date().toISOString().slice(0, 10)}.pptx`,
        compression: true,
      });
    } catch {
      setExportError('PowerPoint export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_UNLOCK_KEY);
    setIsUnlocked(false);
    setPassword('');
    setError('');
  };

  return (
    <section id="admin" className="section-container">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Management Update</span>
          <h2 className="section-title">Admin</h2>
        </motion.div>

        {!isUnlocked ? (
          <motion.form
            onSubmit={handleUnlock}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel mx-auto mt-10 max-w-lg p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                <Lock className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Admin Access</h3>
                <p className="text-sm text-slate-400">Enter password to update management progress.</p>
              </div>
            </div>

            <label htmlFor="admin-password" className="mb-2 block text-xs font-bold uppercase tracking-widest text-electric-cyan">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-electric-cyan/25 bg-navy-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/30"
              placeholder="Enter admin password"
            />
            {error && <p className="mt-3 text-sm font-medium text-orange-300">{error}</p>}
            <button type="submit" className="btn-primary mt-6 w-full">
              Unlock Admin
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="mb-6 inline-flex rounded-xl border border-electric-cyan/20 bg-navy-900/55 p-1 shadow-[0_0_24px_rgba(37,216,255,0.12)]">
              {[
                { id: 'project-update' as const, label: 'Project Update', icon: ShieldCheck },
                { id: 'kpi' as const, label: 'KPI', icon: BarChart3 },
              ].map((page) => {
                const Icon = page.icon;
                const isActive = activeAdminPage === page.id;

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setActiveAdminPage(page.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${
                      isActive
                        ? 'bg-electric-cyan/15 text-electric-cyan shadow-[0_0_18px_rgba(93,244,255,0.2)]'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {page.label}
                  </button>
                );
              })}
            </div>

            {activeAdminPage === 'project-update' ? (
              <>
            <div className="glass-panel mb-6 flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent-green/30 bg-accent-green/10 text-accent-green">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Project Management Update List</h3>
                  <p className="text-sm text-slate-400">
                    Showing {visibleProjects.length} of {projects.length} projects. Hidden projects are excluded from PowerPoint export.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {lastSaved && <span className="text-xs text-slate-400">Saved {lastSaved}</span>}
                <button type="button" onClick={() => handleSave()} className="btn-primary inline-flex items-center gap-2">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save All
                </button>
                <button
                  type="button"
                  onClick={handleExportPowerPoint}
                  disabled={isExporting}
                  className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  {isExporting ? 'Preparing...' : 'Export PPT'}
                </button>
                <button type="button" onClick={handleLogout} className="btn-secondary inline-flex items-center gap-2">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Log Out
                </button>
              </div>
            </div>
            {exportError && <p className="mb-4 text-sm font-medium text-orange-300">{exportError}</p>}

            {hiddenProjects.length > 0 && (
              <div className="glass-panel mb-5 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">Hidden Projects</h4>
                    <p className="text-xs text-slate-400">Use Show to return a project to the Admin list.</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                    {hiddenProjects.length} hidden
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hiddenProjects.map((project) => (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => handleVisibilityChange(project.title, true)}
                      className="inline-flex items-center gap-2 rounded-lg border border-electric-cyan/25 bg-electric-cyan/10 px-3 py-2 text-xs font-bold text-electric-cyan transition hover:border-electric-cyan/60 hover:bg-electric-cyan/15"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-x-auto rounded-xl border border-electric-cyan/15 bg-navy-900/45 shadow-2xl shadow-black/20">
              <table className="min-w-[1360px] w-full border-collapse text-left">
                <thead className="bg-navy-800/90 text-xs uppercase tracking-widest text-electric-cyan">
                  <tr>
                    <th className="w-12 px-4 py-4">No</th>
                    <th className="w-72 px-4 py-4">Project</th>
                    <th className="w-32 px-4 py-4">Status</th>
                    <th className="w-36 px-4 py-4">Stakeholder</th>
                    <th className="w-80 px-4 py-4">Value Summary</th>
                    <th className="w-96 px-4 py-4">Current Progress</th>
                    <th className="w-96 px-4 py-4">Way Forward</th>
                    <th className="w-40 px-4 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.length === 0 && (
                    <tr className="border-t border-white/10">
                      <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">
                        No visible projects. Restore a project from Hidden Projects above.
                      </td>
                    </tr>
                  )}
                  {visibleProjects.map((project, index) => {
                    const update = getProjectUpdate(project);

                    return (
                      <tr key={project.title} className="border-t border-white/10 align-top odd:bg-white/[0.025] hover:bg-electric-cyan/[0.035]">
                        <td className="px-4 py-4 text-sm font-bold text-slate-400">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-white">{project.title}</div>
                          <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-slate-400">{project.problem}</div>
                          <div className="mt-3">
                            {'image' in project && project.image ? (
                              <div className="overflow-hidden rounded-lg border border-electric-cyan/20 bg-white/95 shadow-[0_0_18px_rgba(37,216,255,0.12)]">
                                <img
                                  src={`${import.meta.env.BASE_URL}${project.image}`}
                                  alt={`${project.title} user interface preview`}
                                  className="aspect-video w-full object-cover object-top"
                                />
                              </div>
                            ) : (
                              <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-white/10 bg-navy-800/70 text-slate-500">
                                <ImageIcon className="h-6 w-6" aria-hidden="true" />
                                <span className="sr-only">No UI preview available</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <label className="sr-only" htmlFor={`status-${project.title}`}>
                            Status for {project.title}
                          </label>
                          <select
                            id={`status-${project.title}`}
                            value={update.status}
                            onChange={(event) => handleUpdate(project.title, 'status', event.target.value as StatusOption)}
                            className="w-full rounded-lg border border-electric-cyan/25 bg-navy-900/80 px-3 py-2 text-xs font-bold text-electric-cyan outline-none transition focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status} className="bg-navy-900 text-white">
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-slate-300">{project.stakeholders}</td>
                        <td className="px-4 py-4 text-sm leading-relaxed text-slate-300">{project.value}</td>
                        <td className="px-4 py-4">
                          <textarea
                            value={update.currentProgress}
                            onChange={(event) => handleUpdate(project.title, 'currentProgress', event.target.value)}
                            className="min-h-32 w-full resize-y rounded-lg border border-white/10 bg-navy-900/80 p-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                            placeholder="Update current project progress"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <textarea
                            value={update.wayForward}
                            onChange={(event) => handleUpdate(project.title, 'wayForward', event.target.value)}
                            className="min-h-32 w-full resize-y rounded-lg border border-white/10 bg-navy-900/80 p-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                            placeholder="Add way forward, next action, target, or management decision"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setMaximizedProjectTitle(project.title)}
                            className="btn-secondary mb-2 inline-flex items-center gap-2 whitespace-nowrap"
                          >
                            <Maximize2 className="h-4 w-4" aria-hidden="true" />
                            Maximize
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(project.title)}
                            className="btn-secondary mb-2 inline-flex items-center gap-2 whitespace-nowrap"
                          >
                            <Save className="h-4 w-4" aria-hidden="true" />
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVisibilityChange(project.title, false)}
                            className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
                          >
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                            Hide
                          </button>
                          {update.savedAt && <div className="mt-2 text-xs text-slate-500">{update.savedAt}</div>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {maximizedProject && maximizedUpdate && (
              <div
                className="fixed inset-y-0 left-0 right-0 z-50 flex items-center justify-center bg-navy-950/85 p-4 backdrop-blur-md md:left-64"
                role="dialog"
                aria-modal="true"
                aria-labelledby="maximized-project-title"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-electric-cyan/30 bg-navy-900 shadow-2xl shadow-electric-cyan/10"
                >
                  <div className="flex flex-col gap-4 border-b border-white/10 bg-navy-800/95 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-electric-cyan">Maximized Project View</div>
                      <h3 id="maximized-project-title" className="text-3xl font-black leading-tight text-white lg:text-4xl">
                        {maximizedProject.title}
                      </h3>
                      <p className="mt-2 text-base text-slate-300">Full management reading view with complete project wording.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="sr-only" htmlFor={`max-status-${maximizedProject.title}`}>
                        Status for {maximizedProject.title}
                      </label>
                      <select
                        id={`max-status-${maximizedProject.title}`}
                        value={maximizedUpdate.status}
                        onChange={(event) => handleUpdate(maximizedProject.title, 'status', event.target.value as StatusOption)}
                        className="rounded-lg border border-electric-cyan/25 bg-navy-950 px-4 py-3 text-sm font-bold text-electric-cyan outline-none transition focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status} className="bg-navy-900 text-white">
                            {status}
                          </option>
                        ))}
                      </select>
                      <button type="button" onClick={() => handleSave(maximizedProject.title)} className="btn-primary inline-flex items-center gap-2">
                        <Save className="h-4 w-4" aria-hidden="true" />
                        Save
                      </button>
                      <button type="button" onClick={() => setMaximizedProjectTitle(null)} className="btn-secondary inline-flex items-center gap-2">
                        <X className="h-4 w-4" aria-hidden="true" />
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="overflow-y-auto p-5 lg:p-7">
                    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                      <div className="space-y-5">
                        {'image' in maximizedProject && maximizedProject.image ? (
                          <div className="overflow-hidden rounded-xl border border-electric-cyan/25 bg-white shadow-[0_0_30px_rgba(37,216,255,0.18)]">
                            <img
                              src={`${import.meta.env.BASE_URL}${maximizedProject.image}`}
                              alt={`${maximizedProject.title} user interface preview`}
                              className="w-full object-cover object-top"
                            />
                          </div>
                        ) : (
                          <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-white/10 bg-navy-800 text-slate-500">
                            <ImageIcon className="h-10 w-10" aria-hidden="true" />
                            <span className="sr-only">No UI preview available</span>
                          </div>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-xl border border-white/10 bg-navy-800/70 p-4">
                            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Stakeholder</div>
                            <p className="text-xl font-bold text-electric-cyan">{maximizedProject.stakeholders}</p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-navy-800/70 p-4">
                            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Status</div>
                            <p className="text-xl font-bold" style={{ color: `#${getStatusColor(maximizedUpdate.status)}` }}>
                              {maximizedUpdate.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="rounded-xl border border-white/10 bg-navy-800/70 p-5">
                          <div className="mb-2 text-sm font-bold uppercase tracking-widest text-electric-cyan">Problem / Description</div>
                          <p className="text-xl leading-relaxed text-white">{maximizedProject.problem}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-navy-800/70 p-5">
                          <div className="mb-2 text-sm font-bold uppercase tracking-widest text-electric-cyan">AI Approach</div>
                          <p className="text-xl leading-relaxed text-white">{maximizedProject.approach}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-navy-800/70 p-5">
                          <div className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-green">Value Delivered / Expected</div>
                          <p className="text-xl leading-relaxed text-white">{maximizedProject.value}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                      <div>
                        <label htmlFor={`max-progress-${maximizedProject.title}`} className="mb-2 block text-sm font-bold uppercase tracking-widest text-electric-cyan">
                          Current Progress
                        </label>
                        <textarea
                          id={`max-progress-${maximizedProject.title}`}
                          value={maximizedUpdate.currentProgress}
                          onChange={(event) => handleUpdate(maximizedProject.title, 'currentProgress', event.target.value)}
                          className="min-h-56 w-full resize-y rounded-xl border border-white/10 bg-navy-950/80 p-5 text-xl leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                          placeholder="Update current project progress"
                        />
                      </div>
                      <div>
                        <label htmlFor={`max-way-forward-${maximizedProject.title}`} className="mb-2 block text-sm font-bold uppercase tracking-widest text-electric-cyan">
                          Way Forward
                        </label>
                        <textarea
                          id={`max-way-forward-${maximizedProject.title}`}
                          value={maximizedUpdate.wayForward}
                          onChange={(event) => handleUpdate(maximizedProject.title, 'wayForward', event.target.value)}
                          className="min-h-56 w-full resize-y rounded-xl border border-white/10 bg-navy-950/80 p-5 text-xl leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/25"
                          placeholder="Add way forward, next action, target, or management decision"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-electric-cyan">KPI Dashboard</span>
                      <h3 className="mt-2 text-2xl font-black text-white">Management KPI Snapshot</h3>
                      <p className="mt-2 text-sm text-slate-400">Current KPI view is calculated from visible projects in Admin.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveAdminPage('project-update')}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Back to Project Update
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {[
                    { label: 'Visible Projects', value: visibleProjects.length, tone: 'text-white' },
                    { label: 'Deployed', value: deployedCount, tone: 'text-accent-green' },
                    { label: 'Pilot / Prototype', value: activeBuildCount, tone: 'text-electric-cyan' },
                    { label: 'Planned', value: plannedCount, tone: 'text-sky-300' },
                    { label: 'Hidden', value: hiddenProjects.length, tone: 'text-orange-300' },
                  ].map((metric) => (
                    <div key={metric.label} className="glass-card p-5">
                      <div className={`text-4xl font-black ${metric.tone}`}>{metric.value}</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="glass-card p-6">
                    <h4 className="mb-5 text-lg font-bold text-white">Status Breakdown</h4>
                    <div className="space-y-4">
                      {statusSummary.map((item) => {
                        const percentage = visibleProjects.length ? Math.round((item.count / visibleProjects.length) * 100) : 0;

                        return (
                          <div key={item.status}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="font-bold" style={{ color: `#${getStatusColor(item.status)}` }}>{item.status}</span>
                              <span className="text-slate-300">{item.count} ({percentage}%)</span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-navy-900/80">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${percentage}%`, backgroundColor: `#${getStatusColor(item.status)}` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="glass-card overflow-hidden">
                    <div className="border-b border-white/10 p-6">
                      <h4 className="text-lg font-bold text-white">Visible Project KPI List</h4>
                      <p className="mt-1 text-sm text-slate-400">Status and stakeholder view for management tracking.</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead className="bg-navy-800/80 text-xs uppercase tracking-widest text-electric-cyan">
                          <tr>
                            <th className="px-4 py-3">Project</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Stakeholder</th>
                            <th className="px-4 py-3">Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleProjects.map((project) => {
                            const update = getProjectUpdate(project);

                            return (
                              <tr key={project.title} className="border-t border-white/10 odd:bg-white/[0.025]">
                                <td className="px-4 py-3 text-sm font-bold text-white">{project.title}</td>
                                <td className="px-4 py-3 text-sm font-bold" style={{ color: `#${getStatusColor(update.status)}` }}>{update.status}</td>
                                <td className="px-4 py-3 text-sm text-slate-300">{project.stakeholders}</td>
                                <td className="px-4 py-3 text-sm text-slate-300">{compactSlideText(update.currentProgress, 110)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
