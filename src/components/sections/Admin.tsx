import { useState } from 'react';
import type { FormEvent } from 'react';
import { Lock, Save, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectHistoryData } from '../../data/content';

const ADMIN_PASSWORD = 'easa26';
const ADMIN_UNLOCK_KEY = 'easa-admin-unlocked';
const ADMIN_STORAGE_KEY = 'easa-project-management-updates';

type Project = (typeof projectHistoryData.projects)[number];

type AdminProjectUpdate = {
  currentProgress: string;
  wayForward: string;
  savedAt?: string;
};

type AdminProjectUpdates = Record<string, AdminProjectUpdate>;

const createDefaultUpdate = (project: Project): AdminProjectUpdate => ({
  currentProgress: `${project.status}: ${project.value}`,
  wayForward: '',
});

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
      result[project.title] = savedUpdates[project.title] ?? createDefaultUpdate(project);
      return result;
    }, {});
  });
  const [lastSaved, setLastSaved] = useState('');

  const projects = projectHistoryData.projects;

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

  const handleUpdate = (projectTitle: string, field: keyof Pick<AdminProjectUpdate, 'currentProgress' | 'wayForward'>, value: string) => {
    setUpdates((current) => ({
      ...current,
      [projectTitle]: {
        ...(current[projectTitle] ?? createDefaultUpdate(projects.find((project) => project.title === projectTitle) ?? projects[0])),
        [field]: value,
      },
    }));
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

  const handleLock = () => {
    sessionStorage.removeItem(ADMIN_UNLOCK_KEY);
    setIsUnlocked(false);
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
            <div className="glass-panel mb-6 flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent-green/30 bg-accent-green/10 text-accent-green">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Project Management Update List</h3>
                  <p className="text-sm text-slate-400">{projects.length} projects copied from Project History.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {lastSaved && <span className="text-xs text-slate-400">Saved {lastSaved}</span>}
                <button type="button" onClick={() => handleSave()} className="btn-primary inline-flex items-center gap-2">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save All
                </button>
                <button type="button" onClick={handleLock} className="btn-secondary">
                  Lock
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-electric-cyan/15 bg-navy-900/45 shadow-2xl shadow-black/20">
              <table className="min-w-[1200px] w-full border-collapse text-left">
                <thead className="bg-navy-800/90 text-xs uppercase tracking-widest text-electric-cyan">
                  <tr>
                    <th className="w-12 px-4 py-4">No</th>
                    <th className="w-56 px-4 py-4">Project</th>
                    <th className="w-32 px-4 py-4">Status</th>
                    <th className="w-36 px-4 py-4">Stakeholder</th>
                    <th className="w-80 px-4 py-4">Value Summary</th>
                    <th className="w-96 px-4 py-4">Current Progress</th>
                    <th className="w-96 px-4 py-4">Way Forward</th>
                    <th className="w-32 px-4 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => {
                    const update = updates[project.title] ?? createDefaultUpdate(project);

                    return (
                      <tr key={project.title} className="border-t border-white/10 align-top odd:bg-white/[0.025] hover:bg-electric-cyan/[0.035]">
                        <td className="px-4 py-4 text-sm font-bold text-slate-400">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-white">{project.title}</div>
                          <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-slate-400">{project.problem}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full border border-electric-cyan/25 bg-electric-cyan/10 px-2.5 py-1 text-xs font-bold text-electric-cyan">
                            {project.status}
                          </span>
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
                            onClick={() => handleSave(project.title)}
                            className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
                          >
                            <Save className="h-4 w-4" aria-hidden="true" />
                            Save
                          </button>
                          {update.savedAt && <div className="mt-2 text-xs text-slate-500">{update.savedAt}</div>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
