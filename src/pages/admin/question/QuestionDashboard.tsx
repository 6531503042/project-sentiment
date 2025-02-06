import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricsCard";
import { ResponseTrends } from "@/components/dashboard/ResponseTrends";
import { QuestionTypePerformance } from "@/components/dashboard/QuestionTypePerformance";
import { SentimentAnalysis } from "@/components/dashboard/SentimentAnalysis";
import { motion } from "framer-motion";

const QuestionDashboard = () => {
  // Sample data - replace with real data
  const responseData = [
    { month: "Jan", responses: 245, completion: 92 },
    { month: "Feb", responses: 356, completion: 94 },
    { month: "Mar", responses: 478, completion: 96 },
    { month: "Apr", responses: 512, completion: 95 },
    { month: "May", responses: 489, completion: 97 },
  ];

  const questionTypeData = [
    { type: "Sentiment Analysis", count: 45, engagement: 92 },
    { type: "Multiple Choice", count: 32, engagement: 88 },
    { type: "Text Response", count: 23, engagement: 76 },
  ];

  const sentimentTrends = [
    { department: "Engineering", positive: 75, neutral: 15, negative: 10 },
    { department: "Marketing", positive: 82, neutral: 12, negative: 6 },
    { department: "Sales", positive: 68, neutral: 22, negative: 10 },
    { department: "HR", positive: 88, neutral: 8, negative: 4 },
    { department: "Finance", positive: 72, neutral: 18, negative: 10 },
  ];

  const insightMetrics = [
    {
      title: "Response Quality",
      value: "92%",
      trend: "+5%",
      description: "High-quality responses with detailed feedback",
      icon: <SparklesIcon className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Engagement Rate",
      value: "88%",
      trend: "+3%",
      description: "Active participation across departments",
      icon: <ArrowUpTrendingIcon className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Sentiment Score",
      value: "4.2/5",
      trend: "+0.3",
      description: "Overall positive sentiment trend",
      icon: <SparklesIcon className="w-6 h-6 text-emerald-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <Header />
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Question Analytics
                </h1>
                <p className="mt-2 text-gray-600">
                  Comprehensive analysis of feedback questions and responses
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-white hover:bg-gray-50"
                >
                  <FunnelIcon className="w-4 h-4" />
                  Filters
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h2>
                  <p className="text-sm text-gray-600">Real-time analysis and recommendations</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Response Trends */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ResponseTrends data={responseData} />
              </motion.div>

              {/* Question Type Performance */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <QuestionTypePerformance data={questionTypeData} />
              </motion.div>

              {/* Sentiment Analysis */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SentimentAnalysis data={sentimentTrends} />
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default QuestionDashboard;