import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Shared counter, so a visit from any laptop lands in the same total.
// The previous service (countapi.xyz) no longer resolves, which is why the
// counter had been falling back to a per-browser tally.
const COUNTER_BASE = 'https://abacus.jasoncameron.dev';
const COUNTER_NAMESPACE = 'easa-26.github.io';
const COUNTER_KEY = 'easa-site-visits';

// Last good shared total, so a blocked or slow network shows the real figure
// rather than a number that only means something on this device.
const LAST_KNOWN_KEY = 'easa-visitor-last-known';

// StrictMode runs effects twice in development, and the component remounts if
// the section is re-rendered. The hit must happen once per page load.
let hitSentThisLoad = false;

type CounterState = {
  value: string;
  label: string;
  status: string;
};

const readLastKnown = () => {
  try {
    const stored = Number(localStorage.getItem(LAST_KNOWN_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : null;
  } catch {
    return null;
  }
};

const writeLastKnown = (value: number) => {
  try {
    localStorage.setItem(LAST_KNOWN_KEY, String(value));
  } catch {
    // Private browsing or blocked storage: the counter still works, it just
    // has nothing to fall back on next time.
  }
};

export function VisitorCounter() {
  const [counter, setCounter] = useState<CounterState>({
    value: '--',
    label: 'Website Opens',
    status: 'Syncing',
  });

  useEffect(() => {
    let isMounted = true;

    const showFallback = () => {
      if (!isMounted) return;
      const lastKnown = readLastKnown();
      setCounter({
        value: lastKnown === null ? '--' : lastKnown.toLocaleString(),
        label: 'Website Opens',
        status: lastKnown === null ? 'Unavailable' : 'Last known total',
      });
    };

    const updateVisitorCounter = async () => {
      // Every open counts, but only once per page load.
      const action = hitSentThisLoad ? 'get' : 'hit';
      hitSentThisLoad = true;

      try {
        const response = await fetch(
          `${COUNTER_BASE}/${action}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,
          // keepalive lets the hit finish even if the visitor closes the tab or
          // clicks straight through to somewhere else. Without it a quick bounce
          // is dropped mid-flight and that open never gets counted.
          { cache: 'no-store', keepalive: true },
        );

        if (!response.ok) {
          throw new Error(`Counter service responded ${response.status}`);
        }

        const data = await response.json() as { value?: number };

        if (typeof data.value !== 'number') {
          throw new Error('Counter response missing value');
        }

        writeLastKnown(data.value);

        if (isMounted) {
          setCounter({
            value: data.value.toLocaleString(),
            label: 'Website Opens',
            status: 'All devices',
          });
        }
      } catch {
        showFallback();
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
