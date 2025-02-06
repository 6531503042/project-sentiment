import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Answer {
  text: string;
  value: string;
}

interface Question {
  id: number;
  text: string;
  content: string;
  required: boolean;
  type: "RATING" | "TEXT" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";
  category: "GENERAL" | "WORK_ENVIRONMENT" | "MANAGEMENT" | "CAREER_GROWTH";
  answerType: "SATISFACTION_BASE" | "AGREEMENT_BASE" | "TEXT_BASE";
  answers: Answer[];
}

const Questions = () => {
  const { toast } = useToast();
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

  const handleCreateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuestion = {
      id: questions.length + 1,
      text: formData.get("text") as string,
      content: formData.get("content") as string,
      required: formData.get("required") === "true",
      type: formData.get("type") as Question["type"],
      category: formData.get("category") as Question["category"],
      answerType: formData.get("answerType") as Question["answerType"],
      answers: [],
    };
    
    setQuestions([...questions, newQuestion]);
    toast({
      title: "Question created",
      description: "Your question has been created successfully.",
    });
  };

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleCreateQuestion}>
                    <DialogHeader>
                      <DialogTitle>Create New Question</DialogTitle>
                      <DialogDescription>
                        Create a new question for feedback forms.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="text" className="text-sm font-medium">
                          Question Title
                        </label>
                        <Input
                          id="text"
                          name="text"
                          placeholder="Enter question title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                          Question Content
                        </label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="Enter question content"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="type" className="text-sm font-medium">
                            Question Type
                          </label>
                          <Select name="type" defaultValue="RATING">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="RATING">Rating</SelectItem>
                              <SelectItem value="TEXT">Text</SelectItem>
                              <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                              <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium">
                            Category
                          </label>
                          <Select name="category" defaultValue="GENERAL">
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GENERAL">General</SelectItem>
                              <SelectItem value="WORK_ENVIRONMENT">Work Environment</SelectItem>
                              <SelectItem value="MANAGEMENT">Management</SelectItem>
                              <SelectItem value="CAREER_GROWTH">Career Growth</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="answerType" className="text-sm font-medium">
                          Answer Type
                        </label>
                        <Select name="answerType" defaultValue="SATISFACTION_BASE">
                          <SelectTrigger>
                            <SelectValue placeholder="Select answer type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SATISFACTION_BASE">Satisfaction Based</SelectItem>
                            <SelectItem value="AGREEMENT_BASE">Agreement Based</SelectItem>
                            <SelectItem value="TEXT_BASE">Text Based</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          id="required"
                          name="required"
                          className="w-4 h-4"
                        />
                        <label htmlFor="required" className="text-sm font-medium">
                          Required
                        </label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Question</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
                <Card key={question.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-ata-blue" />
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {question.type}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {question.category}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-ata-blue mb-2">{question.text}</h3>
                      <p className="text-sm text-ata-text">{question.content}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {question.answers.map((answer, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {answer.text}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-ata-text">
                        {question.required ? "Required" : "Optional"}
                      </span>
                      <Button variant="ghost" size="sm">
                        Edit Question
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Questions;
