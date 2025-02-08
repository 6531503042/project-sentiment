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
import { Plus, Edit, Trash2, PlusCircle, MinusCircle, Search, SlidersHorizontal, BookOpen, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Answer {
  text: string;
  value: string;
}

type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "SENTIMENT";

interface Question {
  id: number;
  text: string;
  description: string;
  required: boolean;
  type: QuestionType;
  answers: Answer[];
}

const Questions = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    description: "",
    type: "TEXT",
    required: true,
    answers: [],
  });

  const handleAddAnswer = () => {
    setNewQuestion({
      ...newQuestion,
      answers: [...(newQuestion.answers || []), { text: "", value: "" }],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      answers: (newQuestion.answers || []).filter((_, i) => i !== index),
    });
  };

  const handleAnswerChange = (index: number, field: keyof Answer, value: string) => {
    setNewQuestion({
      ...newQuestion,
      answers: (newQuestion.answers || []).map((answer, i) =>
        i === index ? { ...answer, [field]: value } : answer
      ),
    });
  };

  const handleTypeChange = (value: QuestionType) => {
    setNewQuestion({
      ...newQuestion,
      type: value,
      answers: value === "SENTIMENT" ? [{ text: "Positive", value: "" }, { text: "Neutral", value: "" }, { text: "Negative", value: "" }] : [],
    });
  };

  const handleCreateQuestion = () => {
    const question: Question = {
      id: questions.length + 1,
      text: newQuestion.text || "",
      description: newQuestion.description || "",
      type: newQuestion.type as QuestionType,
      required: newQuestion.required || false,
      answers: newQuestion.answers || [],
    };

    setQuestions([...questions, question]);
    setIsNewQuestionDialogOpen(false);
    setNewQuestion({
      text: "",
      description: "",
      type: "TEXT",
      required: true,
      answers: [],
    });

    toast({
      title: "Question Created",
      description: "New question has been successfully created.",
    });
  };

  const renderAnswerFields = () => {
    if (newQuestion.type === "TEXT") {
      return null;
    }

    if (newQuestion.type === "SENTIMENT") {
      return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Sentiment questions have predefined answers: Positive, Neutral, Negative
          </p>
          {newQuestion.answers?.map((answer, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                placeholder={`Answer ${index + 1}`}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Answers</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddAnswer}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Answer
          </Button>
        </div>
        {newQuestion.answers?.map((answer, index) => (
          <div key={index} className="flex items-center gap-4">
            <Input
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              placeholder={`Answer ${index + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveAnswer(index)}
            >
              <MinusCircle className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white/90">
      <div className="max-w-[1600px] mx-auto p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Question Bank
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Create and manage questions for your feedback forms.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsNewQuestionDialogOpen(true)}
              className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              New Question
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-600">Total Questions</h3>
                  <div className="text-2xl font-bold">{questions.length}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-violet-600" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search questions..."
              className="pl-10 pr-4 w-full"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="group hover:shadow-lg transition-all">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-lg line-clamp-2">{question.text}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{question.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                    {question.type}
                  </span>
                  {question.required && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Required
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isNewQuestionDialogOpen} onOpenChange={setIsNewQuestionDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Question
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Question</DialogTitle>
            <DialogDescription>
              Add a new question for feedback collection
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Question Text</label>
              <Input
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, text: e.target.value })
                }
                placeholder="Enter question text"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newQuestion.description}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, description: e.target.value })
                }
                placeholder="Enter question description"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Question Type</label>
              <Select
                value={newQuestion.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                  <SelectItem value="SENTIMENT">Sentiment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderAnswerFields()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewQuestionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQuestion}>Create Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Questions;
