import { Calendar } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export function EventInventory() {
  return (
    <AnimatedCard>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-pink-600" size={24} />
        <h2 className="text-pink-600 font-semibold text-xl">Événements Organisés</h2>
      </div>
      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
        <li>Atelier Bien-Être 🌸</li>
        <li>Conférence Empowerment 💼</li>
      </ul>
    </AnimatedCard>
  );
}
