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
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const chartData = [
  { name: 'Jan', responses: 65, sentiment: 75 },
  { name: 'Feb', responses: 78, sentiment: 82 },
  { name: 'Mar', responses: 82, sentiment: 78 },
  { name: 'Apr', responses: 95, sentiment: 85 },
  { name: 'May', responses: 88, sentiment: 90 },
  { name: 'Jun', responses: 102, sentiment: 88 },
];

const ProjectDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  const projectStats = {
    totalProjects: 12,
    activeProjects: 8,
    totalResponses: 456,
    averageSentiment: 78,
    trending: {
      responses: { value: 15, trend: 'up' },
      sentiment: { value: 8, trend: 'up' },
      engagement: { value: 12, trend: 'down' },
    }
  };

  const recentActivities = [
    { id: 1, type: 'feedback', project: 'Mobile App', message: 'New feedback received', time: '2h ago' },
    { id: 2, type: 'milestone', project: 'Web Platform', message: 'Milestone completed', time: '4h ago' },
    { id: 3, type: 'alert', project: 'Desktop App', message: 'Critical feedback alert', time: '6h ago' },
  ];

  const topProjects = [
    {
      id: 1,
      name: 'Mobile App Redesign',
      progress: 75,
      sentiment: 85,
      responses: 124,
      team: [
        { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
        { name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
      ],
      status: 'active',
    },
    {
      id: 2,
      name: 'Web Platform Update',
      progress: 60,
      sentiment: 92,
      responses: 89,
      team: [
        { name: 'David', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026724d' },
        { name: 'Eve', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026724f' },
      ],
      status: 'active',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1 text-success">
          <ArrowUpRight className="w-4 h-4" />
          <span>+{value}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-danger">
        <ArrowDownRight className="w-4 h-4" />
        <span>-{value}%</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-8">
        <Breadcrumbs>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Projects</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-default-900">Project Dashboard</h1>
            <p className="text-default-600">Monitor your projects and team performance</p>
          </div>
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={<Plus className="w-4 h-4" />}
              onPress={onOpen}
              size="lg"
            >
              New Project
            </Button>
            <Button isIconOnly variant="light" size="lg">
              <Bell className="w-5 h-5" />
            </Button>
            <Button isIconOnly variant="light" size="lg">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key.toString())}
        className="mb-6"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-2 h-12",
          tabContent: "group-data-[selected=true]:text-primary"
        }}
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </div>
          }
        />
        <Tab
          key="projects"
          title={
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Projects
            </div>
          }
        />
        <Tab
          key="team"
          title={
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </div>
          }
        />
      </Tabs>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              {getTrendIcon(projectStats.trending.responses.trend, projectStats.trending.responses.value)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-default-600">Total Projects</p>
              <p className="text-2xl font-semibold">{projectStats.totalProjects}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              {getTrendIcon(projectStats.trending.sentiment.trend, projectStats.trending.sentiment.value)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-default-600">Active Projects</p>
              <p className="text-2xl font-semibold">{projectStats.activeProjects}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <MessageSquare className="w-6 h-6 text-warning" />
              </div>
              {getTrendIcon(projectStats.trending.engagement.trend, projectStats.trending.engagement.value)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-default-600">Total Responses</p>
              <p className="text-2xl font-semibold">{projectStats.totalResponses}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex justify-between mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              {getTrendIcon('up', 5)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-default-600">Avg. Sentiment</p>
              <p className="text-2xl font-semibold">{projectStats.averageSentiment}%</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart Section */}
        <Card className="lg:col-span-2 bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Performance Overview</h3>
                <p className="text-default-600">Response and sentiment trends</p>
              </div>
              <Select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                size="sm"
                variant="bordered"
                className="w-32"
              >
                <SelectItem key="7d" value="7d">Last 7 days</SelectItem>
                <SelectItem key="30d" value="30d">Last 30 days</SelectItem>
                <SelectItem key="90d" value="90d">Last 90 days</SelectItem>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="responses" stroke="#006FEE" strokeWidth={2} />
                  <Line type="monotone" dataKey="sentiment" stroke="#17C964" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-default-50 shadow-none">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="light" size="sm">View All</Button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'feedback' ? 'bg-primary/10' :
                    activity.type === 'milestone' ? 'bg-success/10' : 'bg-danger/10'
                  }`}>
                    {activity.type === 'feedback' ? (
                      <MessageSquare className="w-4 h-4 text-primary" />
                    ) : activity.type === 'milestone' ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-danger" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 text-small text-default-400">
                      <span>{activity.project}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <Button isIconOnly variant="light" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Top Projects */}
      <Card className="bg-default-50 shadow-none">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Top Projects</h3>
              <p className="text-default-600">Your best performing projects</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="flat"
                color="primary"
                startContent={<Filter className="w-4 h-4" />}
              >
                Filter
              </Button>
              <Button
                variant="flat"
                color="primary"
                startContent={<Search className="w-4 h-4" />}
              >
                Search
              </Button>
            </div>
          </div>
          <Table
            aria-label="Top projects table"
            classNames={{
              wrapper: "shadow-none",
            }}
          >
            <TableHeader>
              <TableColumn>PROJECT</TableColumn>
              <TableColumn>TEAM</TableColumn>
              <TableColumn>PROGRESS</TableColumn>
              <TableColumn>SENTIMENT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {topProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-small text-default-400">{project.responses} responses</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup max={3} size="sm">
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          src={member.avatar}
                          name={member.name}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <p className="text-small">{project.progress}%</p>
                      <Progress
                        value={project.progress}
                        size="sm"
                        color="primary"
                        className="max-w-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={project.sentiment >= 80 ? "success" : "warning"}
                      size="sm"
                      variant="flat"
                    >
                      {project.sentiment}% positive
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={getStatusColor(project.status)}
                      size="sm"
                      variant="flat"
                    >
                      {project.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content="View Details">
                        <Button isIconOnly size="sm" variant="light">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Edit Project">
                        <Button isIconOnly size="sm" variant="light">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="More Actions">
                        <Button isIconOnly size="sm" variant="light">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
};

export default ProjectDashboard;