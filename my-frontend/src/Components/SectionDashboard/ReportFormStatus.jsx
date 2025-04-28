import { FileText } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export function ReportFormStatus() {
  return (
    <AnimatedCard>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-pink-500" size={24} />
        <h2 className="text-pink-500 font-semibold text-xl">Formulaires de Signalement</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        3 signalements envoyés récemment 📝
      </p>
    </AnimatedCard>
  );
}
