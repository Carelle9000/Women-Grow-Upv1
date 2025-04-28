import { Users } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export function ChatSummary() {
  return (
    <AnimatedCard>
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-fuchsia-600" size={24} />
        <h2 className="text-fuchsia-600 font-semibold text-xl">Messages Privés</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        Discussions avec <span className="font-bold text-fuchsia-500">8 membres</span> 💬
      </p>
    </AnimatedCard>
  );
}
