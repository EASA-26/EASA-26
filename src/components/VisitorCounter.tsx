import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const COUNTER_NAMESPACE = 'easa-26';
const COUNTER_KEY = 'enterprise-ai-solution-architect-visits';
const SESSION_KEY = 'easa-visitor-counted';
const LOCAL_COUNT_KEY = 'easa-local-visitor-count';

type CounterState = {
  value: string;
  label: string;
  status: string;
};

export function VisitorCounter() {
  const [counter, setCounter] = useState<CounterState>({
    value: '--',
    label: 'Website Opens',
    status: 'Syncing',
  });

  useEffect(() => {
    let isMounted = true;

    const updateFallbackCounter = () => {
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === 'true';
      const currentCount = Number(localStorage.getItem(LOCAL_COUNT_KEY) ?? '0');
      const nextCount = alreadyCounted ? currentCount : currentCount + 1;

      if (!alreadyCounted) {
        localStorage.setItem(LOCAL_COUNT_KEY, String(nextCount));
        sessionStorage.setItem(SESSION_KEY, 'true');
      }

      if (isMounted) {
        setCounter({
          value: nextCount.toLocaleString(),
          label: 'Website Opens',
          status: 'Local device',
        });
      }
    };

    const updateVisitorCounter = async () => {
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === 'true';
      const action = alreadyCounted ? 'get' : 'hit';
      const endpoint = `https://api.countapi.xyz/${action}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

      try {
        const response = await fetch(endpoint, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Counter service unavailable');
        }

        const data = await response.json() as { value?: number };

        if (typeof data.value !== 'number') {
          throw new Error('Counter response missing value');
        }

        if (!alreadyCounted) {
          sessionStorage.setItem(SESSION_KEY, 'true');
        }

        if (isMounted) {
          setCounter({
            value: data.value.toLocaleString(),
            label: 'Website Opens',
            status: alreadyCounted ? 'Current total' : 'Updated',
          });
        }
      } catch {
        updateFallbackCounter();
      }
    };

    updateVisitorCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="inline-flex items-center gap-3 rounded-xl border border-electric-cyan/25 bg-navy-900/45 px-4 py-3 shadow-[0_0_22px_rgba(37,216,255,0.16)] backdrop-blur-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-electric-cyan/25 bg-electric-cyan/10 text-electric-cyan">
        <Activity className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-2xl font-extrabold leading-none text-white tracking-tight">{counter.value}</span>
        <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-widest text-electric-cyan">{counter.label}</span>
        <span className="mt-0.5 block text-[0.65rem] uppercase tracking-wider text-slate-400">{counter.status}</span>
      </span>
    </motion.div>
  );
}
