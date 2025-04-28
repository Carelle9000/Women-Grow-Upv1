import { motion } from 'framer-motion';

export function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-2xl shadow-md p-6 bg-white dark:bg-gray-800 transition"
    >
      {children}
    </motion.div>
  );
}
