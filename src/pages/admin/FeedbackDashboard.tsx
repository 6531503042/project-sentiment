import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
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
  AreaChart,
  Area,
} from "recharts";

const FeedbackDashboard = () => {
  // Sample data for visualizations
  const sentimentTrend = [
    { month: "Jan", positive: 65, neutral: 25, negative: 10 },
    { month: "Feb", positive: 70, neutral: 20, negative: 10 },
    { month: "Mar", positive: 75, neutral: 15, negative: 10 },
    { month: "Apr", positive: 80, neutral: 15, negative: 5 },
  ];

  const feedbackVolume = [
    { project: "Digital Transformation", volume: 45 },
    { project: "Cloud Migration", volume: 32 },
    { project: "Security Enhancement", volume: 28 },
    { project: "UI Redesign", volume: 25 },
  ];

  const sentimentDistribution = [
    { name: "Positive", value: 65, color: "#22c55e" },
    { name: "Neutral", value: 25, color: "#f59e0b" },
    { name: "Negative", value: 10, color: "#ef4444" },
  ];

  const responseRate = [
    { date: "Week 1", rate: 75 },
    { date: "Week 2", rate: 82 },
    { date: "Week 3", rate: 88 },
    { date: "Week 4", rate: 95 },
  ];

  const categoryAnalysis = [
    { category: "Work Environment", positive: 70, neutral: 20, negative: 10 },
    { category: "Team Collaboration", positive: 65, neutral: 25, negative: 10 },
    { category: "Management", positive: 60, neutral: 30, negative: 10 },
    { category: "Career Growth", positive: 55, neutral: 35, negative: 10 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Feedback Analytics</h1>
              <p className="text-gray-600">Analyze feedback trends and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="w-full">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-small text-default-500">Total Responses</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">1,284</span>
                    <span className="text-success text-small">+12.5%</span>
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-small text-default-500">Response Rate</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">85%</span>
                    <span className="text-success text-small">+5.2%</span>
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full">
                <CardBody className="flex flex-col gap-1">
                  <p className="text-small text-default-500">Avg. Sentiment Score</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">4.2/5</span>
                    <span className="text-success text-small">+0.3</span>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Sentiment Trend</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sentimentTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="positive"
                          stackId="1"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="neutral"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="negative"
                          stackId="1"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Feedback Volume by Project</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={feedbackVolume} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="project" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="volume" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Category Analysis</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="positive" stackId="a" fill="#22c55e" />
                        <Bar dataKey="neutral" stackId="a" fill="#f59e0b" />
                        <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Response Rate Trend</h3>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={responseRate}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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

export default FeedbackDashboard;