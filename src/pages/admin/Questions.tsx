import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Questions = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-ata-blue">Questions</h1>
                <p className="text-ata-text mt-2">Manage your feedback questions</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Question
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm mb-4 inline-block">Rating</span>
                <h3 className="font-semibold text-lg mb-2">Work Environment Satisfaction</h3>
                <p className="text-sm text-ata-text mb-4">How satisfied are you with the work environment?</p>
                <div className="text-sm text-ata-text">Category: General</div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Questions;