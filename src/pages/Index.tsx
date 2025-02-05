import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Welcome to ATA Feedback System</h1>
              <p className="text-ata-text mt-2">Manage and analyze employee feedback efficiently</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Active Projects</h3>
                <div className="text-3xl font-bold text-ata-blue">12</div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Pending Feedbacks</h3>
                <div className="text-3xl font-bold text-ata-blue">48</div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Overall Satisfaction</h3>
                <div className="text-3xl font-bold text-ata-blue">74%</div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;