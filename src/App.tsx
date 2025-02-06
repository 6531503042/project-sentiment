
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/admin/project/Projects";
import ProjectDashboard from "./pages/admin/ProjectDashboard";
import Questions from "./pages/admin/Questions";
import QuestionDashboard from "./pages/admin/QuestionDashboard";
import Feedback from "./pages/admin/Feedback";
import FeedbackDashboard from "./pages/admin/FeedbackDashboard";
import EmployeeFeedback from "./pages/employee/EmployeeFeedback";
import FeedbackForm from "./pages/employee/FeedbackForm";
import { AppSidebar } from "./components/layout/AppSidebar";
import { Header } from "./components/layout/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <div className="relative flex h-screen overflow-hidden">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-h-0">
                <Header />
                <main className="flex-1 overflow-auto">
                  <div className="container mx-auto p-6">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/admin/projects" element={<Projects />} />
                      <Route path="/admin/projects/dashboard" element={<ProjectDashboard />} />
                      <Route path="/admin/questions" element={<Questions />} />
                      <Route path="/admin/questions/dashboard" element={<QuestionDashboard />} />
                      <Route path="/admin/feedback" element={<Feedback />} />
                      <Route path="/admin/feedback/dashboard" element={<FeedbackDashboard />} />
                      <Route path="/employee/feedback" element={<EmployeeFeedback />} />
                      <Route path="/employee/feedback/:id" element={<FeedbackForm />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  </QueryClientProvider>
);

export default App;
