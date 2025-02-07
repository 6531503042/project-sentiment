import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { useState } from "react";
import { Question } from "@/types/question";
import { CreateQuestionDialog } from "@/components/questions/CreateQuestionDialog";
import { QuestionCard } from "@/components/questions/QuestionCard";

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "Work Environment Satisfaction",
      content: "How satisfied are you with the work environment?",
      required: true,
      type: "RATING",
      category: "WORK_ENVIRONMENT",
      answerType: "SATISFACTION_BASE",
      answers: [
        { text: "Positive", value: "3" },
        { text: "Neutral", value: "2" },
        { text: "Negative", value: "1" },
      ],
    },
  ]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ata-gray">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-ata-blue">Questions</h1>
                <p className="text-ata-text mt-2">Manage feedback questions</p>
              </div>
              <CreateQuestionDialog />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Questions;