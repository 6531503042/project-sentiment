import { FC } from "react";
import { DashboardLayout, DashboardCard } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Progress,
  Avatar,
} from "@nextui-org/react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react";

const questionStats = [
  {
    title: "Total Questions",
    value: "156",
    change: "+23",
    increasing: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Response Rate",
    value: "89%",
    change: "+5%",
    increasing: true,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    title: "Avg. Completion",
    value: "4.2min",
    change: "-30s",
    increasing: true,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    title: "Clarity Score",
    value: "4.8/5",
    change: "+0.2",
    increasing: true,
    icon: <Star className="w-5 h-5" />,
  },
];

const responseData = [
  { month: "Jan", responses: 850, completion: 92 },
  { month: "Feb", responses: 920, completion: 89 },
  { month: "Mar", responses: 880, completion: 94 },
  { month: "Apr", responses: 950, completion: 91 },
  { month: "May", responses: 1020, completion: 93 },
  { month: "Jun", responses: 980, completion: 95 },
];

const questionTypes = [
  { name: "Multiple Choice", value: 45, color: "#17C964" },
  { name: "Rating Scale", value: 30, color: "#7828C8" },
  { name: "Open Ended", value: 15, color: "#F5A524" },
  { name: "Yes/No", value: 10, color: "#006FEE" },
];

const recentQuestions = [
  {
    id: 1,
    question: "How satisfied are you with the work environment?",
    type: "Rating Scale",
    category: "Work Environment",
    responses: 245,
    avgScore: 4.2,
    lastUpdated: "2024-02-01",
  },
  {
    id: 2,
    question: "What improvements would you suggest for team collaboration?",
    type: "Open Ended",
    category: "Team Dynamics",
    responses: 198,
    avgScore: null,
    lastUpdated: "2024-02-03",
  },
  {
    id: 3,
    question: "Do you feel supported by your team leader?",
    type: "Multiple Choice",
    category: "Leadership",
    responses: 256,
    avgScore: 4.5,
    lastUpdated: "2024-02-04",
  },
];

const QuestionDashboard: FC = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Rating Scale":
        return "success";
      case "Multiple Choice":
        return "primary";
      case "Open Ended":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout
      title="Question Dashboard"
      subtitle="Monitor and analyze survey questions performance"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {questionStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <CardBody className="flex flex-row items-center justify-between p-0">
              <div>
                <p className="text-small text-default-500">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.increasing ? "text-success" : "text-danger"
                  }`}>
                    {stat.increasing ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.increasing ? "bg-success-50" : "bg-danger-50"
              }`}>
                {stat.icon}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response Trends */}
        <DashboardCard
          title="Response Trends"
          subtitle="Monthly response and completion rates"
          className="lg:col-span-2"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="responses"
                  stroke="#7828C8"
                  name="Responses"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="completion"
                  stroke="#17C964"
                  name="Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* Question Types */}
        <DashboardCard
          title="Question Types"
          subtitle="Distribution of question formats"
        >
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={questionTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {questionTypes.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {questionTypes.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-small">{item.name}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Recent Questions */}
      <DashboardCard
        title="Recent Questions"
        subtitle="Latest questions and their performance"
        className="mt-6"
      >
        <Table aria-label="Recent questions table">
          <TableHeader>
            <TableColumn>QUESTION</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>RESPONSES</TableColumn>
            <TableColumn>AVG. SCORE</TableColumn>
            <TableColumn>LAST UPDATED</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {recentQuestions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <span className="font-medium truncate block">
                      {item.question}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={getTypeColor(item.type)}
                    variant="flat"
                  >
                    {item.type}
                  </Chip>
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.category}</span>
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.responses}</span>
                </TableCell>
                <TableCell>
                  {item.avgScore ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning" fill="currentColor" />
                      <span>{item.avgScore}</span>
                    </div>
                  ) : (
                    <span className="text-small text-default-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.lastUpdated}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="flat">Edit</Button>
                    <Button size="sm" variant="flat" color="danger">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardCard>
    </DashboardLayout>
  );
};

export default QuestionDashboard;