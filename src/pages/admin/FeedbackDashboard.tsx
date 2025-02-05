import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
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
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { MessageSquare, TrendingUp, Users } from "lucide-react";

const FeedbackDashboard = () => {
  const sentimentData = [
    { name: "Positive", value: 85.2, icon: "😊" },
    { name: "Neutral", value: 8.6, icon: "😐" },
    { name: "Negative", value: 6.2, icon: "😞" },
  ];

  const trendData = [
    { month: "Jan", positive: 82, neutral: 10, negative: 8 },
    { month: "Feb", positive: 84, neutral: 9, negative: 7 },
    { month: "Mar", positive: 85.2, neutral: 8.6, negative: 6.2 },
  ];

  const categoryData = [
    { category: "Work Environment", responses: 156, satisfaction: 92 },
    { category: "Team Collaboration", responses: 142, satisfaction: 88 },
    { category: "Management Support", responses: 128, satisfaction: 85 },
    { category: "Career Growth", responses: 97, satisfaction: 82 },
  ];

  const recentFeedback = [
    {
      id: 1,
      project: "Employee Satisfaction 2024",
      sentiment: "positive",
      category: "Work Environment",
      date: "2024-02-05",
    },
    {
      id: 2,
      project: "Team Performance Review",
      sentiment: "neutral",
      category: "Team Collaboration",
      date: "2024-02-04",
    },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#EF5350"];

  const insights = [
    {
      title: "Performance Insights",
      confidence: 85,
      risk: "Medium",
      details: "Implement daily stand-ups to improve team coordination.",
    },
    {
      title: "Engagement Analysis",
      confidence: 92,
      risk: "Low",
      details: "Team building activities show positive impact on morale.",
    },
    {
      title: "Improvement Opportunities",
      confidence: 78,
      risk: "High",
      details: "Consider more learning and development opportunities.",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Feedback Analytics</h1>
              <p className="text-ata-text mt-2">Comprehensive feedback analysis and insights</p>
            </div>

            {/* AI Insights Banner */}
            <Card className="bg-gradient-to-r from-purple-100 to-purple-50 mb-8 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-purple-900">AI-Powered Insights</h2>
                  <p className="text-sm text-purple-700">Leveraging advanced ML algorithms for data-driven recommendations</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {insights.map((insight, index) => (
                  <Card key={index} className="p-4 bg-white">
                    <h3 className="font-semibold mb-2">{insight.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            insight.risk === "Low" ? "bg-green-500" :
                            insight.risk === "Medium" ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{insight.confidence}%</span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.details}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Satisfaction Rate</h3>
                    <p className="text-3xl font-bold text-green-600">87%</p>
                    <p className="text-sm text-green-600">+2.0% from last month</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Total Responses</h3>
                    <p className="text-3xl font-bold text-blue-600">523</p>
                    <p className="text-sm text-blue-600">Last 30 days</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Active Campaigns</h3>
                    <p className="text-3xl font-bold text-purple-600">3</p>
                    <p className="text-sm text-purple-600">Currently running</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Sentiment Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Sentiment Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#FFC107" fill="#FFC107" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF5350" fill="#EF5350" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-6">Category Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="responses" fill="#8884d8" name="Responses" />
                    <Bar yAxisId="right" dataKey="satisfaction" fill="#82ca9d" name="Satisfaction %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Feedback */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-6">Recent Feedback</h3>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{feedback.project}</h4>
                      <p className="text-sm text-gray-600">{feedback.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        feedback.sentiment === "positive" ? "bg-green-100 text-green-800" :
                        feedback.sentiment === "neutral" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {feedback.sentiment}
                      </span>
                      <span className="text-sm text-gray-600">{feedback.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FeedbackDashboard;