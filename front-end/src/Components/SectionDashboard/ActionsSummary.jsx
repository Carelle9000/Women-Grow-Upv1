import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pieChart } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Forums", value: 45 },
  { name: "Blog", value: 30 },
  { name: "Événements", value: 25 },
];

const COLORS = ["#F472B6", "#8B5CF6", "#93C5FD"];

const ActionsSummary = () => {
  return (
    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Répartition des actions</CardTitle>
        <pieChart className="h-5 w-5 text-violet" />
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsSummary;
