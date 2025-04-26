import { Layout } from "../layouts/DashboardLayout";
import { ActivityOverview } from "@/Components/SectionDashboard/ActivityOverview";
import { ActionsSummary } from "@/Components/SectionDashboard/ActionsSummary";
import { RecentActivity } from "@/Components/SectionDashboard/RecentActivity";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-violet animate-fade-in">Tableau de bord</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ActivityOverview />
          <ActionsSummary />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;