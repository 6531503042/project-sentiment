import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { SidebarProvider } from "../../components/providers/SidebarProvider";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { useToast } from "../../components/ui/use-toast";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  department: string;
}

interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  teamMembers: TeamMember[];
  status: "active" | "completed" | "upcoming";
  progress: number;
}

const ManageProjects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);

  // Sample team members data
  const teamMembers: TeamMember[] = [
    { id: 1, name: "John Doe", email: "john@ata.ca", department: "Engineering" },
    { id: 2, name: "Jane Smith", email: "jane@ata.ca", department: "Design" },
    { id: 3, name: "Mike Johnson", email: "mike@ata.ca", department: "Product" },
  ];

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: Project = {
      id: projects.length + 1,
      name: formData.get("name") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
      teamMembers: teamMembers.filter(member => 
        selectedTeamMembers.includes(member.id.toString())
      ),
      status: "upcoming",
      progress: 0,
    };

    setProjects([...projects, newProject]);
    setSelectedTeamMembers([]);
    onClose();
    toast({
      title: "Project Created",
      description: "Your project has been created successfully.",
    });
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "upcoming":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Manage Projects</h1>
                <p className="text-gray-600">Create and manage your projects</p>
              </div>
              <Button
                color="primary"
                variant="shadow"
                onPress={onOpen}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Project
              </Button>
            </div>

            <Card className="w-full">
              <CardBody>
                <Table aria-label="Projects table">
                  <TableHeader>
                    <TableColumn>PROJECT NAME</TableColumn>
                    <TableColumn>TEAM SIZE</TableColumn>
                    <TableColumn>START DATE</TableColumn>
                    <TableColumn>END DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>PROGRESS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-small text-default-500">
                              {project.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{project.teamMembers.length} members</TableCell>
                        <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            color={getStatusColor(project.status)}
                            variant="flat"
                            size="sm"
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Chip>
                        </TableCell>
                        <TableCell>{project.progress}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="3xl"
              scrollBehavior="inside"
            >
              <ModalContent>
                <form onSubmit={handleCreateProject}>
                  <ModalHeader>Create New Project</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Input
                        name="name"
                        label="Project Name"
                        placeholder="Enter project name"
                        required
                      />

                      <Textarea
                        name="description"
                        label="Project Description"
                        placeholder="Enter project description"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="startDate"
                          label="Start Date"
                          type="date"
                          required
                        />
                        <Input
                          name="endDate"
                          label="End Date"
                          type="date"
                          required
                        />
                      </div>

                      <Select
                        label="Team Members"
                        selectionMode="multiple"
                        placeholder="Select team members"
                        selectedKeys={selectedTeamMembers}
                        onChange={(e) => setSelectedTeamMembers(Array.from(e.target.value))}
                      >
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.department}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create Project
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ManageProjects;
