import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import { SidebarProvider } from "../../components/providers/SidebarProvider";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProjectDashboard = () => {
  // Sample data for visualizations
  const teamPerformanceData = [
    { name: "Team A", performance: 85 },
    { name: "Team B", performance: 72 },
    { name: "Team C", performance: 90 },
    { name: "Team D", performance: 68 },
  ];

  const projectTimelineData = [
    { month: "Jan", completed: 20, planned: 25 },
    { month: "Feb", completed: 45, planned: 50 },
    { month: "Mar", completed: 65, planned: 75 },
    { month: "Apr", completed: 90, planned: 100 },
  ];

  const sentimentData = [
    { name: "Positive", value: 65, color: "#22c55e" },
    { name: "Neutral", value: 25, color: "#f59e0b" },
    { name: "Negative", value: 10, color: "#ef4444" },
  ];

  const projectStats = [
    { title: "Active Projects", value: 12, change: "+2", color: "success" },
    { title: "Team Members", value: 48, change: "+5", color: "primary" },
    { title: "Completion Rate", value: "85%", change: "+3%", color: "success" },
    { title: "Pending Reviews", value: 8, change: "-2", color: "warning" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Project Dashboard</h1>
              <p className="text-gray-600">Overview of project performance and metrics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {projectStats.map((stat, index) => (
                <Card key={index} className="w-full">
                  <CardBody className="flex flex-col gap-1">
                    <p className="text-small text-default-500">{stat.title}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-semibold">{stat.value}</span>
                      <span className={`text-${stat.color} text-small`}>
                        {stat.change}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Performance Chart */}
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Team Performance</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="performance" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              {/* Project Timeline Chart */}
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Project Timeline</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectTimelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="planned"
                          stroke="#9ca3af"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              {/* Sentiment Analysis */}
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Sentiment Analysis</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              {/* Project Progress */}
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Project Progress</h3>
                </CardHeader>
                <CardBody className="gap-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Project A</span>
                        <span>75%</span>
                      </div>
                      <Progress
                        value={75}
                        color="success"
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Project B</span>
                        <span>45%</span>
                      </div>
                      <Progress
                        value={45}
                        color="warning"
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Project C</span>
                        <span>90%</span>
                      </div>
                      <Progress
                        value={90}
                        color="success"
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProjectDashboard;