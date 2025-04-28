import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatedCard } from './AnimatedCard';

const data = [
  { name: 'Jan', participations: 2 },
  { name: 'Fév', participations: 5 },
  { name: 'Mars', participations: 8 },
  { name: 'Avr', participations: 12 },
];

export function ForumGraph() {
  return (
    <AnimatedCard>
      <h2 className="text-violet-600 font-semibold text-xl mb-4">Évolution de ta participation</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="participations" stroke="#d946ef" strokeWidth={3} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </AnimatedCard>
  );
}
