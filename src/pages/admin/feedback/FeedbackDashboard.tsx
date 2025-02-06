import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Download, Calendar, Users, BarChart as BarChartIcon } from "lucide-react";
import { useState } from "react";

const FeedbackDashboard = () => {
  // Sample data - replace with real data
  const responseRateData = [
    { month: "Jan", rate: 75 },
    { month: "Feb", rate: 82 },
    { month: "Mar", rate: 78 },
    { month: "Apr", rate: 85 },
    { month: "May", rate: 90 },
  ];

  const sentimentTrendData = [
    { month: "Jan", positive: 45, neutral: 35, negative: 20 },
    { month: "Feb", positive: 50, neutral: 30, negative: 20 },
    { month: "Mar", positive: 55, neutral: 30, negative: 15 },
    { month: "Apr", positive: 60, neutral: 25, negative: 15 },
    { month: "May", positive: 65, neutral: 25, negative: 10 },
  ];

  const departmentResponseData = [
    { department: "Engineering", responses: 95 },
    { department: "Marketing", responses: 85 },
    { department: "Sales", responses: 78 },
    { department: "HR", responses: 92 },
    { department: "Finance", responses: 88 },
  ];

  const feedbackTypeData = [
    { name: "Work Environment", value: 35 },
    { name: "Management", value: 25 },
    { name: "Career Growth", value: 20 },
    { name: "Team Collaboration", value: 20 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#EF5350", "#2196F3"];

  const handleExportData = () => {
    // Implement CSV export functionality
    console.log("Exporting data...");
  };

  return (
    <div className="min-h-screen flex w-full bg-ata-gray">
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-ata-blue">Feedback Analytics</h1>
              <p className="text-ata-text mt-2">Comprehensive feedback analysis and insights</p>
            </div>
            <Button onClick={handleExportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Total Responses</h3>
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChartIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Response Rate</h3>
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Active Feedbacks</h3>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Response Rate Trend */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Response Rate Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#2196F3"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Sentiment Trend */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Sentiment Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke="#4CAF50"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      stroke="#FFC107"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke="#EF5350"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Department Response Rates */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Department Response Rates</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="responses" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Feedback Type Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Feedback Type Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feedbackTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {feedbackTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
