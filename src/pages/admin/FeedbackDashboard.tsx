import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";

const FeedbackDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Feedback Analytics</h1>
              <p className="text-ata-text mt-2">View feedback performance and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Active Campaigns</h3>
                <p className="text-3xl font-bold text-ata-blue">3</p>
                <p className="text-sm text-ata-text mt-2">Currently running</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Response Rate</h3>
                <p className="text-3xl font-bold text-green-600">78%</p>
                <p className="text-sm text-ata-text mt-2">Average across campaigns</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Total Responses</h3>
                <p className="text-3xl font-bold text-yellow-600">342</p>
                <p className="text-sm text-ata-text mt-2">Last 30 days</p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FeedbackDashboard;