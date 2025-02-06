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
import { Plus, Edit, Trash2, PlusCircle, MinusCircle } from "lucide-react";
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
    <div className="min-h-screen flex w-full bg-ata-gray">
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-ata-blue">Questions</h1>
              <p className="text-ata-text mt-2">Manage your feedback questions</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question) => (
              <Card key={question.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{question.text}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {question.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <span className="text-sm">{question.type}</span>
                  </div>
                  {question.type !== "TEXT" && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Answers:</span>
                      <div className="space-y-1">
                        {question.type === "SENTIMENT" ? (
                          <div className="text-sm">
                            Positive, Neutral, Negative
                          </div>
                        ) : (
                          question.answers.map((answer, index) => (
                            <div key={index} className="text-sm">
                              {index + 1}. {answer.text}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Questions;
