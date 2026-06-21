import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface MetricCardProps {
  label: string;
  value: string;
  delay?: number;
  className?: string;
}

export function MetricCard({ label, value, delay = 0, className }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn("glass-card p-6 flex flex-col justify-center", className)}
    >
      <div className="text-4xl font-bold text-white mb-2 tracking-tight">
        {value}
      </div>
      <div className="text-sm font-medium text-electric-cyan uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
