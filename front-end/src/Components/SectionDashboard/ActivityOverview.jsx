import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activity } from "lucide-react";

const ActivityOverview = () => {
  return (
    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Vue d'ensemble</CardTitle>
        <activity className="h-5 w-5 text-violet" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Connexions</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Messages</span>
            <span className="font-semibold">156</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Publications</span>
            <span className="font-semibold">38</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityOverview;
