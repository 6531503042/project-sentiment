
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";

const ProjectDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Project Dashboard</h1>
              <p className="text-ata-text mt-2">View project metrics and statistics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Total Projects</h3>
                <div className="text-3xl font-bold text-ata-blue">8</div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Active Projects</h3>
                <div className="text-3xl font-bold text-ata-blue">3</div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Completed Projects</h3>
                <div className="text-3xl font-bold text-ata-blue">5</div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProjectDashboard;
