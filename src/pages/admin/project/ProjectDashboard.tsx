import React from "react";
import {
  ChartBarIcon,
  ClockIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    description: "Currently in progress",
    icon: RocketLaunchIcon,
    gradient: "from-indigo-500/10 to-blue-500/10",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Team Members",
    value: "48",
    change: "+5",
    description: "Across all projects",
    icon: UserGroupIcon,
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Completed Tasks",
    value: "156",
    change: "+23",
    description: "This month",
    icon: CheckCircleIcon,
    gradient: "from-emerald-500/10 to-green-500/10",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Average Progress",
    value: "72%",
    change: "+8%",
    description: "Completion rate",
    icon: ChartBarIcon,
    gradient: "from-amber-500/10 to-yellow-500/10",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const ProjectDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-[1600px] mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Project Analytics</h1>
            <p className="text-gray-500 max-w-2xl">
              Monitor project performance and team productivity metrics
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <ArrowPathIcon className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full ${metric.iconBg} flex items-center justify-center`}>
                  <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <div className="text-sm text-green-600 font-medium">{metric.change}</div>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/20 pointer-events-none" />
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Overall completion status across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Chart will be implemented here
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/20 pointer-events-none" />
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent updates and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Chart will be implemented here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
