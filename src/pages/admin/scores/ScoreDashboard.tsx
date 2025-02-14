
import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  TrendingUp,
  Users,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ScoreDashboard = () => {
  const scoreSummary = [
    {
      category: "Technical Skills",
      averageScore: 4.5,
      totalResponses: 125,
      trend: "+0.3",
    },
    {
      category: "Communication",
      averageScore: 4.2,
      totalResponses: 118,
      trend: "+0.2",
    },
    {
      category: "Leadership",
      averageScore: 4.0,
      totalResponses: 95,
      trend: "+0.4",
    },
    {
      category: "Teamwork",
      averageScore: 4.7,
      totalResponses: 130,
      trend: "+0.5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white/90">
      <div className="max-w-[1600px] mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Score Analytics
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Track and analyze feedback scores across different categories
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px] bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Overall Score</h3>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-amber-600" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">4.3</span>
                <span className="text-sm text-green-600">+0.2</span>
              </div>
              <p className="text-sm text-gray-500">Average across all categories</p>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Total Responses</h3>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">468</span>
                <span className="text-sm text-green-600">+24</span>
              </div>
              <p className="text-sm text-gray-500">Feedback submissions</p>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">92%</span>
                <span className="text-sm text-green-600">+5%</span>
              </div>
              <p className="text-sm text-gray-500">Average completion rate</p>
            </div>
          </Card>

          <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Top Category</h3>
                <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-violet-600" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">Teamwork</span>
                <span className="text-sm text-green-600">4.7</span>
              </div>
              <p className="text-sm text-gray-500">Highest rated category</p>
            </div>
          </Card>
        </div>

        {/* Score Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoreSummary.map((category) => (
            <Card key={category.category} className="p-6 hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                    <p className="text-sm text-gray-500">
                      Based on {category.totalResponses} responses
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= category.averageScore
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">
                      {category.averageScore.toFixed(1)}
                    </span>
                    <span className="text-sm text-green-600">{category.trend}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all"
                    style={{ width: `${(category.averageScore / 5) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDashboard;
