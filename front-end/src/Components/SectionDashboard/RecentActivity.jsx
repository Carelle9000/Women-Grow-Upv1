import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monitor } from "lucide-react";

const RecentActivity = () => {
  return (
    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Activité récente</CardTitle>
        <monitor className="h-5 w-5 text-violet" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { action: "Forum - Nouveau message", time: "Il y a 5 min" },
            { action: "Blog - Article publié", time: "Il y a 2h" },
            { action: "Événement - Inscription", time: "Il y a 1j" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm">{item.action}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
