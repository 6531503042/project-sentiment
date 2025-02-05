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
  LineChart,
  Line,
} from "recharts";

const QuestionDashboard = () => {
  const questionUsageData = [
    { question: "Work Environment", usage: 85 },
    { question: "Team Collaboration", usage: 72 },
    { question: "Management Support", usage: 68 },
    { question: "Career Growth", usage: 63 },
    { question: "Work-Life Balance", usage: 58 },
  ];

  const sentimentTrendData = [
    { month: "Jan", positive: 65, neutral: 25, negative: 10 },
    { month: "Feb", positive: 68, neutral: 22, negative: 10 },
    { month: "Mar", positive: 72, neutral: 20, negative: 8 },
    { month: "Apr", positive: 70, neutral: 23, negative: 7 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Question Analytics</h1>
              <p className="text-ata-text mt-2">View question performance and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Most Used Questions</h3>
                <p className="text-3xl font-bold text-ata-blue">15</p>
                <p className="text-sm text-ata-text mt-2">Questions used in 3+ projects</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Average Response Rate</h3>
                <p className="text-3xl font-bold text-green-600">92%</p>
                <p className="text-sm text-ata-text mt-2">Across all questions</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Question Categories</h3>
                <p className="text-3xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-ata-text mt-2">Active categories</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Most Used Questions</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={questionUsageData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="question" type="category" />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#003087" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Sentiment Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default QuestionDashboard;