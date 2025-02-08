import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
import {
  Plus,
  Edit,
  Trash2,
  Users,
  PlusCircle,
  MinusCircle,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Mail,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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
      title: "Success!",
      description: "New project has been successfully created.",
      className: "bg-green-50 border-green-200",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "completed":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <div className="flex-1">
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-2">Manage your feedback projects</p>
            </div>
            <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">Create New Project</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Fill in the details below to create a new feedback project
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Edit className="h-4 w-4 text-gray-500" />
                      Project Name
                    </label>
                    <Input
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      placeholder="Enter project name"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-gray-500" />
                      Description
                    </label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      placeholder="Enter project description"
                      className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) =>
                          setNewProject({ ...newProject, startDate: e.target.value })
                        }
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) =>
                          setNewProject({ ...newProject, endDate: e.target.value })
                        }
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-500" />
                      Status
                    </label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value: any) =>
                        setNewProject({ ...newProject, status: value })
                      }
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">
                          <span className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            Upcoming
                          </span>
                        </SelectItem>
                        <SelectItem value="active">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Active
                          </span>
                        </SelectItem>
                        <SelectItem value="completed">
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Completed
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        Team Members
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddMember}
                        className="flex items-center gap-2 hover:bg-blue-50"
                      >
                        <PlusCircle className="h-4 w-4 text-blue-500" />
                        Add Member
                      </Button>
                    </div>
                    <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                      {newProject.members?.map((member, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" />
                                Name
                              </label>
                              <Input
                                value={member.name}
                                onChange={(e) =>
                                  handleMemberChange(index, "name", e.target.value)
                                }
                                placeholder="Member name"
                                className="focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                Email
                              </label>
                              <Input
                                value={member.email}
                                onChange={(e) =>
                                  handleMemberChange(index, "email", e.target.value)
                                }
                                placeholder="Email"
                                className="focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                <UserCircle className="h-4 w-4 text-gray-500" />
                                Role
                              </label>
                              <Select
                                value={member.role}
                                onValueChange={(value) =>
                                  handleMemberChange(index, "role", value)
                                }
                              >
                                <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMember(index)}
                              className="mt-6"
                            >
                              <MinusCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsNewProjectDialogOpen(false)}
                    className="hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-6 bg-white border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium",
                          {
                            "bg-green-100 text-green-800": project.status === "active",
                            "bg-blue-100 text-blue-800": project.status === "completed",
                            "bg-yellow-100 text-yellow-800": project.status === "upcoming",
                          }
                        )}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-600">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{project.members.length} Members</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;