import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ProjectDashboard = () => {
  const metrics = [
    {
      title: "Active Projects",
      value: "24",
      trend: "+3",
      description: "Projects currently in progress",
      icon: <RocketLaunchIcon className="w-6 h-6 text-indigo-500" />,
    },
    {
      title: "Team Members",
      value: "156",
      trend: "+12",
      description: "Total members across projects",
      icon: <UsersIcon className="w-6 h-6 text-cyan-500" />,
    },
    {
      title: "Completion Rate",
      value: "94%",
      trend: "+2.5%",
      description: "Project milestones achieved on time",
      icon: <ChartBarIcon className="w-6 h-6 text-emerald-500" />,
    },
  ];

  return (
    <div className="min-h-screen flex w-full bg-ata-gray">
      <div className="flex-1">
        <main className="p-6">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Project Analytics</h1>
                <p className="text-gray-500">
                  Track project performance and team engagement
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
                <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
                <div className="h-80 flex items-center justify-center text-gray-500">
                  Chart will be implemented here
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
                <div className="h-80 flex items-center justify-center text-gray-500">
                  Chart will be implemented here
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDashboard;
