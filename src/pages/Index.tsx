
import React from 'react';
import { Card } from "@/components/ui/card";
import {
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend }: { title: string; value: string; icon: any; trend?: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-transparent hover:border-purple-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {value}
          </h3>
          {trend && (
            <p className="text-sm mt-2">
              <span className={trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {trend}
              </span>
              {' vs last month'}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </Card>
  </motion.div>
);

const Index = () => {
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back, John 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Projects"
            value="12"
            icon={ChartBarIcon}
            trend="+2.5%"
          />
          <StatCard
            title="Active Employees"
            value="486"
            icon={UserGroupIcon}
            trend="+3.2%"
          />
          <StatCard
            title="Average Rating"
            value="4.8"
            icon={StarIcon}
            trend="+0.3"
          />
          <StatCard
            title="Monthly Growth"
            value="18.2%"
            icon={ArrowTrendingUpIcon}
            trend="+4.1%"
          />
          <StatCard
            title="Response Time"
            value="2.4h"
            icon={ClockIcon}
            trend="-12.5%"
          />
          <StatCard
            title="Completion Rate"
            value="94.2%"
            icon={CheckCircleIcon}
            trend="+1.2%"
          />
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="p-2 rounded-lg bg-blue-50">
                    <UserGroupIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">New feedback submitted</h3>
                    <p className="text-sm text-gray-500">John Doe submitted feedback for Project X</p>
                  </div>
                  <span className="text-sm text-gray-400">2h ago</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
