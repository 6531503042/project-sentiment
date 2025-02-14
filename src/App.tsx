
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/theme-provider";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/admin/project/Projects";
import ProjectDashboard from "./pages/admin/project/ProjectDashboard";
import Questions from "./pages/admin/question/Questions";
import QuestionDashboard from "./pages/admin/question/QuestionDashboard";
import Feedback from "./pages/admin/feedback/Feedback";
import FeedbackDashboard from "./pages/admin/feedback/FeedbackDashboard";
import ScoreManage from "./pages/admin/scores/ScoreManage";
import ScoreDashboard from "./pages/admin/scores/ScoreDashboard";
import EmployeeFeedback from "./pages/employee/EmployeeFeedback";
import FeedbackForm from "./pages/employee/FeedbackForm";

const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route element={<DashboardLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin/projects" element={<Projects />} />
                  <Route path="/admin/projects/dashboard" element={<ProjectDashboard />} />
                  <Route path="/admin/questions" element={<Questions />} />
                  <Route path="/admin/questions/dashboard" element={<QuestionDashboard />} />
                  <Route path="/admin/feedback" element={<Feedback />} />
                  <Route path="/admin/feedback/dashboard" element={<FeedbackDashboard />} />
                  <Route path="/admin/scores" element={<ScoreManage />} />
                  <Route path="/admin/scores/dashboard" element={<ScoreDashboard />} />
                  <Route path="/employee/feedback" element={<EmployeeFeedback />} />
                  <Route path="/employee/feedback/:id" element={<FeedbackForm />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default App;
