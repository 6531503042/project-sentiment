import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FeedbackDashboard = () => {
  const metrics = [
    {
      title: "Feedback Score",
      value: "8.7/10",
      trend: "+0.5",
      description: "Average satisfaction rating",
      icon: <HeartIcon className="w-6 h-6 text-rose-500" />,
    },
    {
      title: "Response Rate",
      value: "92%",
      trend: "+4%",
      description: "Feedback completion rate",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-violet-500" />,
    },
    {
      title: "Sentiment Score",
      value: "4.5/5",
      trend: "+0.2",
      description: "Overall feedback sentiment",
      icon: <SparklesIcon className="w-6 h-6 text-amber-500" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Feedback Analytics</h1>
          <p className="text-gray-500">
            Monitor feedback trends and sentiment analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowDownTrayIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-gray-50">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <h3 className="text-2xl font-bold">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                metric.trend.startsWith("+") 
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {metric.trend}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Feedback Trends</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
