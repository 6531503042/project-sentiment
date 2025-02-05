import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calendar, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Feedback {
  id: number;
  name: string;
  projectId: number;
  description: string;
  feedbackStartDate: string;
  feedbackEndDate: string;
  status: "active" | "completed" | "upcoming";
  questionCount: number;
  responseCount: number;
}

const Feedback = () => {
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "Employee Satisfaction Survey 2025",
      projectId: 1,
      description: "Annual feedback collection for employee satisfaction and engagement",
      feedbackStartDate: "2025-02-01T00:00:00+07:00",
      feedbackEndDate: "2025-02-28T23:59:59+07:00",
      status: "upcoming",
      questionCount: 10,
      responseCount: 0,
    },
  ]);

  const handleCreateFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFeedback = {
      id: feedbacks.length + 1,
      name: formData.get("name") as string,
      projectId: Number(formData.get("projectId")),
      description: formData.get("description") as string,
      feedbackStartDate: formData.get("feedbackStartDate") as string,
      feedbackEndDate: formData.get("feedbackEndDate") as string,
      status: "upcoming" as const,
      questionCount: 0,
      responseCount: 0,
    };
    
    setFeedbacks([...feedbacks, newFeedback]);
    toast({
      title: "Feedback created",
      description: "Your feedback has been created successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-ata-blue">Feedback</h1>
                <p className="text-ata-text mt-2">Manage feedback campaigns</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleCreateFeedback}>
                    <DialogHeader>
                      <DialogTitle>Create New Feedback</DialogTitle>
                      <DialogDescription>
                        Create a new feedback campaign for your project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Feedback Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter feedback name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="projectId" className="text-sm font-medium">
                          Project
                        </label>
                        <Select name="projectId">
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Employee Satisfaction 2024</SelectItem>
                            <SelectItem value="2">Team Performance Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Enter feedback description"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="feedbackStartDate" className="text-sm font-medium">
                            Start Date
                          </label>
                          <Input
                            id="feedbackStartDate"
                            name="feedbackStartDate"
                            type="datetime-local"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="feedbackEndDate" className="text-sm font-medium">
                            End Date
                          </label>
                          <Input
                            id="feedbackEndDate"
                            name="feedbackEndDate"
                            type="datetime-local"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="questions" className="text-sm font-medium">
                          Questions
                        </label>
                        <Select name="questions">
                          <SelectTrigger>
                            <SelectValue placeholder="Select questions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Work Environment Satisfaction</SelectItem>
                            <SelectItem value="2">Management Effectiveness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Feedback</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-ata-blue mb-2">{feedback.name}</h3>
                      <p className="text-sm text-ata-text line-clamp-2">{feedback.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-ata-text">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(feedback.feedbackStartDate).toLocaleDateString()} - 
                        {new Date(feedback.feedbackEndDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-ata-text" />
                        <span className="text-sm text-ata-text">{feedback.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-ata-text" />
                        <span className="text-sm text-ata-text">{feedback.responseCount} responses</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${feedback.status === 'active' ? 'bg-green-100 text-green-800' : 
                          feedback.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                      </span>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Feedback;