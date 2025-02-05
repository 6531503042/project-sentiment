import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Projects = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-ata-blue">Projects</h1>
                <p className="text-ata-text mt-2">Manage your feedback projects</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Employee Satisfaction 2024</h3>
                <p className="text-sm text-ata-text mb-4">Annual feedback collection for employee satisfaction and engagement</p>
                <div className="flex justify-between items-center text-sm text-ata-text">
                  <span>Feb 1 - Feb 28, 2024</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                </div>
              </Card>
              
              {/* Add more project cards here */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Projects;