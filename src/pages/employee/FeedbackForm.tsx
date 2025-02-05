import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const FeedbackForm = () => {
  const { id } = useParams();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Employee Satisfaction Survey 2024</h1>
              <p className="text-ata-text mt-2">Share your thoughts about your work experience</p>
            </div>
            
            <Card className="p-6 max-w-3xl">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Work Environment Satisfaction</h3>
                  <p className="text-sm text-ata-text mb-4">How satisfied are you with the work environment?</p>
                  <div className="flex gap-4">
                    <Button variant="outline">Positive</Button>
                    <Button variant="outline">Neutral</Button>
                    <Button variant="outline">Negative</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <Button variant="outline">Save Draft</Button>
                    <Button>Submit Feedback</Button>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FeedbackForm;