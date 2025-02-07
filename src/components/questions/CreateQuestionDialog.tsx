import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmilePlus, Frown, Meh, Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Question } from "@/types/question";

interface Answer {
  text: string;
  value: string;
  icon?: React.ReactNode;
}

const defaultSentimentAnswers: Answer[] = [
  { text: "Positive", value: "3", icon: <SmilePlus className="h-5 w-5 text-green-500" /> },
  { text: "Neutral", value: "2", icon: <Meh className="h-5 w-5 text-yellow-500" /> },
  { text: "Negative", value: "1", icon: <Frown className="h-5 w-5 text-red-500" /> },
];

export function CreateQuestionDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    content: "",
    type: "RATING",
    required: true,
    category: "WORK_ENVIRONMENT",
    answerType: "SATISFACTION_BASE",
    answers: [],
  });

  const handleCreateQuestion = () => {
    if (!newQuestion.text) {
      toast({
        title: "Error",
        description: "Question text is required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Question created successfully",
    });
    
    setIsOpen(false);
    setNewQuestion({
      text: "",
      content: "",
      type: "RATING",
      required: true,
      category: "WORK_ENVIRONMENT",
      answerType: "SATISFACTION_BASE",
      answers: [],
    });
  };

  const handleAddAnswer = () => {
    setNewQuestion(prev => ({
      ...prev,
      answers: [...(prev.answers || []), { text: "", value: String(prev.answers?.length || 0) }]
    }));
  };

  const handleAnswerChange = (index: number, field: keyof Answer, value: string) => {
    setNewQuestion(prev => {
      const newAnswers = [...(prev.answers || [])];
      newAnswers[index] = { ...newAnswers[index], [field]: value };
      return { ...prev, answers: newAnswers };
    });
  };

  const handleRemoveAnswer = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      answers: prev.answers?.filter((_, i) => i !== index) || []
    }));
  };

  const renderAnswerFields = () => {
    if (newQuestion.type === "TEXT") {
      return null;
    }

    if (newQuestion.type === "RATING") {
      return (
        <div className="space-y-4">
          <Label>Sentiment Options</Label>
          <div className="grid grid-cols-3 gap-4">
            {defaultSentimentAnswers.map((answer, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border bg-gradient-to-b from-gray-50 to-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {answer.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{answer.text}</p>
                    <p className="text-xs text-gray-500">Value: {answer.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Multiple Choice Options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddAnswer}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </div>
        {newQuestion.answers?.map((answer, index) => (
          <div key={index} className="flex items-center gap-4">
            <Input
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveAnswer(index)}
            >
              <Minus className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
          <DialogDescription>
            Add a new question for feedback collection
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label>Question Text</Label>
              <Input
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, text: e.target.value })
                }
                placeholder="Enter your question"
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={newQuestion.content}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, content: e.target.value })
                }
                placeholder="Add additional context"
              />
            </div>

            <div>
              <Label>Question Type</Label>
              <Select
                value={newQuestion.type}
                onValueChange={(value: Question['type']) => 
                  setNewQuestion({ ...newQuestion, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RATING">Rating</SelectItem>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                  <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateQuestion}>
            Create Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}