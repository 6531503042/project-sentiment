import React from "react";
import {
  ChartBarIcon,
  ClockIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
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

const ProjectDashboard = () => {
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

  const recentProjects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesigning the company website with modern UI/UX",
      status: "active",
      progress: 65,
      dueDate: "2024-03-15",
      team: ["Alice", "Bob", "Charlie"],
      tasks: { completed: 24, total: 36 },
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Creating a new mobile app for customer engagement",
      status: "delayed",
      progress: 25,
      dueDate: "2024-04-30",
      team: ["David", "Eve", "Frank"],
      tasks: { completed: 12, total: 48 },
    },
  ];

  const activityFeed = [
    {
      id: 1,
      type: "task_completed",
      user: "Alice",
      project: "Website Redesign",
      time: "2 hours ago",
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      type: "project_created",
      user: "Bob",
      project: "Mobile App Development",
      time: "4 hours ago",
      icon: RocketLaunchIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      type: "comment_added",
      user: "Charlie",
      project: "Website Redesign",
      time: "5 hours ago",
      icon: ChatBubbleBottomCenterTextIcon,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-[1600px] mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
            <p className="text-gray-500 max-w-2xl">
              Get a comprehensive overview of your projects, teams, and activities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <ArrowPathIcon className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="gap-2">
              <RocketLaunchIcon className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/20 pointer-events-none" />
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your most recently updated projects</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        project.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {project.team.map((member, i) => (
                            <div
                              key={i}
                              className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium"
                              title={member}
                            >
                              {member[0]}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          {project.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/20 pointer-events-none" />
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent activity across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`mt-1 h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        {activity.type === "task_completed" && " completed a task in "}
                        {activity.type === "project_created" && " created a new project "}
                        {activity.type === "comment_added" && " commented on "}
                        <span className="font-medium text-gray-900">{activity.project}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
