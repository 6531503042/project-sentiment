import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
  Avatar,
  AvatarGroup,
  Tooltip,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Textarea,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FileText,
  Settings,
  Bell,
  ClipboardList,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  team: TeamMember[];
  responses: number;
  sentiment: number;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const ManageProjects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planning",
    team: [] as TeamMember[],
  });

  const stats = [
    { title: "Total Projects", value: "24", icon: <ClipboardList className="w-5 h-5" />, change: "+12%", trend: "up" },
    { title: "Active Projects", value: "18", icon: <TrendingUp className="w-5 h-5" />, change: "+8%", trend: "up" },
    { title: "Team Members", value: "45", icon: <Users className="w-5 h-5" />, change: "+15%", trend: "up" },
    { title: "Feedback Rate", value: "92%", icon: <MessageSquare className="w-5 h-5" />, change: "+5%", trend: "up" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: formData.team.length + 1,
      name: "",
      role: "Member",
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
    };
    setFormData((prev) => ({
      ...prev,
      team: [...prev.team, newMember],
    }));
  };

  const handleRemoveTeamMember = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((member) => member.id !== id),
    }));
  };

  const handleUpdateTeamMember = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the project
    console.log("Saving project:", formData);
    onClose();
    // Reset form after saving
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "planning",
      team: [],
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "planning",
      team: [],
    });
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "planning":
        return "primary";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  const projectData: Project[] = [
    {
      id: 1,
      name: "Employee Satisfaction Survey 2024",
      description: "Annual employee satisfaction and engagement survey",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "Active",
      progress: 45,
      team: [
        { id: 1, name: "John Doe", role: "Lead", avatar: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Jane Smith", role: "Analyst", avatar: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Mike Johnson", role: "Member", avatar: "https://i.pravatar.cc/150?u=3" },
      ],
      responses: 156,
      sentiment: 0,
    },
    {
      id: 2,
      name: "Customer Feedback Analysis",
      description: "Quarterly customer satisfaction analysis",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "Planning",
      progress: 0,
      team: [
        { id: 4, name: "Sarah Wilson", role: "Lead", avatar: "https://i.pravatar.cc/150?u=4" },
        { id: 5, name: "Tom Brown", role: "Member", avatar: "https://i.pravatar.cc/150?u=5" },
      ],
      responses: 0,
      sentiment: 0,
    },
    {
      id: 3,
      name: "Product Development Feedback",
      description: "Continuous product improvement feedback collection",
      startDate: "2023-10-01",
      endDate: "2024-01-31",
      status: "Completed",
      progress: 100,
      team: [
        { id: 6, name: "Emily Davis", role: "Lead", avatar: "https://i.pravatar.cc/150?u=6" },
        { id: 7, name: "Alex Turner", role: "Analyst", avatar: "https://i.pravatar.cc/150?u=7" },
      ],
      responses: 342,
      sentiment: 0,
    },
  ];

  const filteredProjects = projectData
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case "progress":
          return b.progress - a.progress;
        case "responses":
          return b.responses - a.responses;
        default:
          return 0;
      }
    });

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Project Management</h1>
            <Breadcrumbs className="mt-1">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Projects</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <Button 
            color="primary" 
            startContent={<Plus size={20} />}
            onPress={onOpen}
            size="lg"
          >
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <CardBody className="p-0">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {stat.icon}
                  </div>
                  <Chip
                    variant="flat"
                    color={stat.trend === "up" ? "success" : "danger"}
                    size="sm"
                    startContent={stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  >
                    {stat.change}
                  </Chip>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-default-500">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <CardBody className="p-0">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 flex-1">
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search size={18} />}
                  className="max-w-xs"
                />
                <Select
                  placeholder="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="max-w-[150px]"
                >
                  <SelectItem key="all" value="all">All Status</SelectItem>
                  <SelectItem key="planning" value="planning">Planning</SelectItem>
                  <SelectItem key="in-progress" value="in-progress">In Progress</SelectItem>
                  <SelectItem key="completed" value="completed">Completed</SelectItem>
                </Select>
              </div>
              <div className="flex gap-2">
                <Select
                  placeholder="Sort by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="max-w-[150px]"
                >
                  <SelectItem key="name" value="name">Name</SelectItem>
                  <SelectItem key="date" value="date">Date</SelectItem>
                  <SelectItem key="status" value="status">Status</SelectItem>
                  <SelectItem key="progress" value="progress">Progress</SelectItem>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Project Table */}
        <Card>
          <Table aria-label="Projects table" className="mt-4">
            <TableHeader>
              <TableColumn>PROJECT</TableColumn>
              <TableColumn>TEAM</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PROGRESS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {/* Example row */}
              <TableRow key="1">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Website Redesign</span>
                    <span className="text-xs text-default-500">Due in 2 weeks</span>
                  </div>
                </TableCell>
                <TableCell>
                  <AvatarGroup max={3}>
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=1" />
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=2" />
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=3" />
                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=4" />
                  </AvatarGroup>
                </TableCell>
                <TableCell>
                  <Chip color="warning" variant="flat" size="sm">
                    In Progress
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Progress
                      size="sm"
                      value={75}
                      color="primary"
                      className="max-w-md"
                    />
                    <span className="text-xs text-default-500">75%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="View Details">
                      <Button isIconOnly variant="light" size="sm" onPress={() => console.log("View details")}>
                        <Eye size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit Project">
                      <Button isIconOnly variant="light" size="sm" onPress={() => {
                        setSelectedProject(projectData[0]);
                        onOpen();
                      }}>
                        <Edit3 size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete Project">
                      <Button 
                        isIconOnly 
                        variant="light" 
                        size="sm" 
                        color="danger"
                        onPress={() => console.log("Delete project")}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Project Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedProject ? "Edit Project" : "Create New Project"}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                isRequired
              />
              <Select
                label="Status"
                placeholder="Select status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                isRequired
              >
                <SelectItem key="planning" value="planning">Planning</SelectItem>
                <SelectItem key="in-progress" value="in-progress">In Progress</SelectItem>
                <SelectItem key="completed" value="completed">Completed</SelectItem>
              </Select>
              <Input
                type="date"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="col-span-1"
                isRequired
              />
              <Input
                type="date"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="col-span-1"
                isRequired
              />
              <Textarea
                label="Description"
                placeholder="Enter project description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="col-span-2"
                isRequired
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Plus size={16} />}
                  onPress={handleAddTeamMember}
                >
                  Add Member
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.team.map((member, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveTeamMember(member.id)}
                    variant="flat"
                    avatar={<Avatar size="sm" src={member.avatar} />}
                  >
                    {member.name || "New Member"} • {member.role}
                  </Chip>
                ))}
                {formData.team.length === 0 && (
                  <div className="text-center w-full py-4 text-default-400">
                    No team members added yet
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => {
              onClose();
              setSelectedProject(null);
              setFormData({
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "planning",
                team: []
              });
            }}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSave}
              isDisabled={!formData.name || !formData.description || !formData.startDate || !formData.endDate}
            >
              {selectedProject ? "Save Changes" : "Create Project"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default ManageProjects;
