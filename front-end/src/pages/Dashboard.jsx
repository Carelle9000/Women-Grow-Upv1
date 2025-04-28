import momo from "@/assets/images/momo.png";
import { Target, Users, MessageSquare, CheckCircle } from "lucide-react"; // Import icons

function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-secondary">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <img
          src={momo}
          className="h-[100px] w-[250px]"
          alt="Logo"
        />      
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Women Grow Up Dashboard
        </h1>
        {/* Placeholder for User Menu/Auth */}
        <div className="ml-auto">
           {/* <UserNav /> Can be added later */}
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 space-y-6">
        {/* Stats Cards Section */}
       

        {/* Charts and Recent Activity Section */}
        
      </main>
       <footer className="text-center p-4 text-xs text-muted-foreground border-t border-border/50">
        © {new Date().getFullYear()} Women Grow Up. All rights reserved.
      </footer>
    </div>
  );
} export default Dashboard;
