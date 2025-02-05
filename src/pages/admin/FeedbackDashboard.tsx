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
  MessageSquare,
  ThumbsUp,
  Clock,
  AlertTriangle,
} from "lucide-react";

const feedbackStats = [
  {
    title: "Total Feedback",
    value: "1,284",
    change: "+124",
    increasing: true,
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Positive Rate",
    value: "76%",
    change: "+5%",
    increasing: true,
    icon: <ThumbsUp className="w-5 h-5" />,
  },
  {
    title: "Avg. Response Time",
    value: "2.4h",
    change: "-30m",
    increasing: false,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    title: "Critical Issues",
    value: "12",
    change: "-3",
    increasing: false,
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

const sentimentTrend = [
  { month: "Jan", positive: 65, neutral: 25, negative: 10 },
  { month: "Feb", positive: 70, neutral: 20, negative: 10 },
  { month: "Mar", positive: 75, neutral: 15, negative: 10 },
  { month: "Apr", positive: 72, neutral: 18, negative: 10 },
  { month: "May", positive: 78, neutral: 12, negative: 10 },
  { month: "Jun", positive: 80, neutral: 15, negative: 5 },
];

const feedbackCategories = [
  { name: "UI/UX", value: 35, color: "#17C964" },
  { name: "Performance", value: 25, color: "#7828C8" },
  { name: "Features", value: 20, color: "#F5A524" },
  { name: "Bugs", value: 15, color: "#F31260" },
  { name: "Other", value: 5, color: "#006FEE" },
];

const recentFeedback = [
  {
    id: 1,
    message: "The new dashboard layout is much more intuitive",
    sentiment: "Positive",
    category: "UI/UX",
    project: "Project A",
    date: "2024-02-05",
    status: "Reviewed",
  },
  {
    id: 2,
    message: "System response time has improved significantly",
    sentiment: "Positive",
    category: "Performance",
    project: "Project B",
    date: "2024-02-04",
    status: "Pending",
  },
  {
    id: 3,
    message: "Found a bug in the export functionality",
    sentiment: "Negative",
    category: "Bugs",
    project: "Project C",
    date: "2024-02-03",
    status: "In Progress",
  },
];

const FeedbackDashboard: FC = () => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "success";
      case "neutral":
        return "warning";
      case "negative":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "reviewed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout
      title="Feedback Dashboard"
      subtitle="Monitor and analyze user feedback and sentiment"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {feedbackStats.map((stat, index) => (
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
        {/* Sentiment Trend */}
        <DashboardCard
          title="Sentiment Trend"
          subtitle="Monthly sentiment distribution"
          className="lg:col-span-2"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#17C964"
                  strokeWidth={2}
                  name="Positive"
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="#F5A524"
                  strokeWidth={2}
                  name="Neutral"
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#F31260"
                  strokeWidth={2}
                  name="Negative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* Feedback Categories */}
        <DashboardCard
          title="Feedback Categories"
          subtitle="Distribution by category"
        >
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feedbackCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feedbackCategories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {feedbackCategories.map((item, index) => (
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

      {/* Recent Feedback */}
      <DashboardCard
        title="Recent Feedback"
        subtitle="Latest user feedback and status"
        className="mt-6"
      >
        <Table aria-label="Recent feedback table">
          <TableHeader>
            <TableColumn>MESSAGE</TableColumn>
            <TableColumn>SENTIMENT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>PROJECT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {recentFeedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <span className="font-medium truncate block">
                      {item.message}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={getSentimentColor(item.sentiment)}
                    variant="flat"
                  >
                    {item.sentiment}
                  </Chip>
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.category}</span>
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.project}</span>
                </TableCell>
                <TableCell>
                  <span className="text-small">{item.date}</span>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={getStatusColor(item.status)}
                    variant="flat"
                  >
                    {item.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="flat">View</Button>
                    <Button size="sm" variant="flat" color="danger">Archive</Button>
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

export default FeedbackDashboard;
