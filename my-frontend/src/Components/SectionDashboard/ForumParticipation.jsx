import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ForumParticipation() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="text-indigo-500" size={24} />
        <h2 className="text-indigo-600 dark:text-indigo-300 font-semibold text-xl">Participation au Forum</h2>
      </div>
      <p className="text-purple-300 dark:text-gray-300">
        Tu as participé à <span className="font-bold text-pink-500">12 discussions</span> ce mois-ci 🌟
      </p>
    </motion.div>
  );
}
