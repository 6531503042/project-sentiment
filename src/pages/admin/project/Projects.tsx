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
import { Plus, Edit, Trash2, Users, PlusCircle, MinusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
  members: Member[];
}

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    members: [],
  });

  const handleAddMember = () => {
    setNewProject({
      ...newProject,
      members: [
        ...(newProject.members || []),
        { id: Date.now(), name: "", email: "", role: "member" },
      ],
    });
  };

  const handleRemoveMember = (index: number) => {
    setNewProject({
      ...newProject,
      members: (newProject.members || []).filter((_, i) => i !== index),
    });
  };

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    setNewProject({
      ...newProject,
      members: (newProject.members || []).map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    });
  };

  const handleCreateProject = () => {
    const project: Project = {
      id: projects.length + 1,
      name: newProject.name || "",
      description: newProject.description || "",
      startDate: newProject.startDate || "",
      endDate: newProject.endDate || "",
      status: newProject.status as "active" | "completed" | "upcoming",
      members: newProject.members || [],
    };

    setProjects([...projects, project]);
    setIsNewProjectDialogOpen(false);
    setNewProject({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
      members: [],
    });

    toast({
      title: "Project Created",
      description: "New project has been successfully created.",
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-ata-gray">
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-ata-blue">Projects</h1>
              <p className="text-ata-text mt-2">Manage your feedback projects</p>
            </div>
            <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new project for feedback collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <Input
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      placeholder="Enter project description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) =>
                          setNewProject({ ...newProject, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) =>
                          setNewProject({ ...newProject, endDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value: any) =>
                        setNewProject({ ...newProject, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Team Members</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddMember}
                        className="flex items-center gap-2"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add Member
                      </Button>
                    </div>
                    {newProject.members?.map((member, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Input
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(index, "name", e.target.value)
                            }
                            placeholder="Member name"
                          />
                          <Input
                            value={member.email}
                            onChange={(e) =>
                              handleMemberChange(index, "email", e.target.value)
                            }
                            placeholder="Email"
                          />
                          <Select
                            value={member.role}
                            onValueChange={(value) =>
                              handleMemberChange(index, "role", value)
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(index)}
                          >
                            <MinusCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "active"
                          ? "bg-green-100 text-green-800"
                          : project.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{project.members.length} Members</span>
                  </div>
                  <div className="text-sm">
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;