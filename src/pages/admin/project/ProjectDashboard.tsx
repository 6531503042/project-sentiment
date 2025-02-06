
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MessageSquare } from "lucide-react";

const ProjectDashboard = () => {
  const responseData = [
    { name: "Week 1", responses: 45 },
    { name: "Week 2", responses: 52 },
    { name: "Week 3", responses: 38 },
    { name: "Week 4", responses: 71 },
  ];

  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#EF5350"];

  return (
      <div className="min-h-screen flex w-full bg-ata-gray">
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-ata-blue">Project Dashboard</h1>
              <p className="text-ata-text mt-2">View project analytics and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Total Responses</h3>
                <p className="text-3xl font-bold text-ata-blue">206</p>
                <p className="text-sm text-ata-text mt-2">+12% from last month</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Completion Rate</h3>
                <p className="text-3xl font-bold text-green-600">87%</p>
                <p className="text-sm text-ata-text mt-2">+5% from last month</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Average Score</h3>
                <p className="text-3xl font-bold text-yellow-600">4.2/5</p>
                <p className="text-sm text-ata-text mt-2">+0.3 from last month</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Response Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="responses" fill="#003087" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

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
          </main>
        </div>
      </div>
  );
};

export default ProjectDashboard;
