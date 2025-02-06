import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/admin/Projects";
import ProjectDashboard from "./pages/admin/ProjectDashboard";
import Questions from "./pages/admin/Questions";
import QuestionDashboard from "./pages/admin/QuestionDashboard";
import Feedback from "./pages/admin/Feedback";
import FeedbackDashboard from "./pages/admin/FeedbackDashboard";
import EmployeeFeedback from "./pages/employee/EmployeeFeedback";
import FeedbackForm from "./pages/employee/FeedbackForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;