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
} from "recharts";

const FeedbackDashboard = () => {
  const responseData = [
    { project: "Employee Satisfaction", responses: 156 },
    { project: "Team Performance", responses: 142 },
    { project: "Work Environment", responses: 128 },
    { project: "Management Review", responses: 97 },
  ];

  const sentimentData = [
    { name: "Positive", value: 58 },
    { name: "Neutral", value: 32 },
    { name: "Negative", value: 10 },
  ];

  const completionTrendData = [
    { week: "Week 1", rate: 75 },
    { week: "Week 2", rate: 82 },
    { week: "Week 3", rate: 88 },
    { week: "Week 4", rate: 95 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#EF5350"];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Feedback Analytics</h1>
              <p className="text-ata-text mt-2">View feedback performance and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Active Campaigns</h3>
                <p className="text-3xl font-bold text-ata-blue">3</p>
                <p className="text-sm text-ata-text mt-2">Currently running</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Response Rate</h3>
                <p className="text-3xl font-bold text-green-600">78%</p>
                <p className="text-sm text-ata-text mt-2">Average across campaigns</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Total Responses</h3>
                <p className="text-3xl font-bold text-yellow-600">523</p>
                <p className="text-sm text-ata-text mt-2">Last 30 days</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Response Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={responseData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="project" type="category" />
                      <Tooltip />
                      <Bar dataKey="responses" fill="#003087" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Overall Sentiment</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
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
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-6">Completion Rate Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={completionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#003087"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FeedbackDashboard;