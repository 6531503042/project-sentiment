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
import { Plus, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
}

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Employee Satisfaction 2024",
      description: "Annual feedback collection for employee satisfaction and engagement",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      status: "active",
    },
  ]);

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      id: projects.length + 1,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      status: "upcoming" as const,
    };
    
    setProjects([...projects, newProject]);
    toast({
      title: "Project created",
      description: "Your project has been created successfully.",
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
                <h1 className="text-2xl font-semibold text-ata-blue">Projects</h1>
                <p className="text-ata-text mt-2">Manage your feedback projects</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <form onSubmit={handleCreateProject}>
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Create a new feedback project for your team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Project Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter project name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Enter project description"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="startDate" className="text-sm font-medium">
                            Start Date
                          </label>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="endDate" className="text-sm font-medium">
                            End Date
                          </label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Project</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-ata-blue mb-2">{project.name}</h3>
                      <p className="text-sm text-ata-text line-clamp-2">{project.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-ata-text">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-ata-text" />
                        <span className="text-sm text-ata-text">12 members</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${project.status === 'active' ? 'bg-green-100 text-green-800' : 
                          project.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
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

export default Projects;