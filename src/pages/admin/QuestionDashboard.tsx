import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";

const QuestionDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Question Analytics</h1>
              <p className="text-ata-text mt-2">View question performance and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Most Used Questions</h3>
                <p className="text-3xl font-bold text-ata-blue">15</p>
                <p className="text-sm text-ata-text mt-2">Questions used in 3+ projects</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Average Response Rate</h3>
                <p className="text-3xl font-bold text-green-600">92%</p>
                <p className="text-sm text-ata-text mt-2">Across all questions</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Question Categories</h3>
                <p className="text-3xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-ata-text mt-2">Active categories</p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default QuestionDashboard;