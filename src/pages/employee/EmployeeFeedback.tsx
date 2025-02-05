import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EmployeeFeedback = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">My Feedback</h1>
              <p className="text-ata-text mt-2">View and complete your feedback requests</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Pending Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Employee Satisfaction Survey 2024</h3>
                    <p className="text-sm text-ata-text mb-4">Share your thoughts about your work experience</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-ata-text">Due: Feb 28, 2024</span>
                      <Button className="flex items-center gap-2">
                        Start
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Completed Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 opacity-75">
                    <h3 className="font-semibold text-lg mb-2">Q4 2023 Project Review</h3>
                    <p className="text-sm text-ata-text mb-4">Project feedback and improvement suggestions</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-ata-text">Completed: Dec 15, 2023</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Submitted</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeFeedback;