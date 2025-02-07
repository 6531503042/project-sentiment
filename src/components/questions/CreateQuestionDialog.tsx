import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  PlusCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Import specific emotion icons
import { FaceSmileIcon as HappyIcon } from "@heroicons/react/24/solid";
import { FaceFrownIcon as SadIcon } from "@heroicons/react/24/solid";
import { NoSymbolIcon as NeutralIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";

const questionTypes = [
  {
    id: "text",
    name: "Text Response",
    description: "Allow users to provide detailed written feedback",
    icon: DocumentTextIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "multiple_choice",
    name: "Multiple Choice",
    description: "Present users with predefined options",
    icon: ClipboardDocumentCheckIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    description: "Gather emotional responses and feelings",
    icon: ChatBubbleBottomCenterTextIcon,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
];

const sentimentOptions = [
  {
    id: "positive",
    name: "Positive",
    icon: HappyIcon,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "neutral",
    name: "Neutral",
    icon: NeutralIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    id: "negative",
    name: "Negative",
    icon: SadIcon,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

interface CreateQuestionDialogProps {
  onQuestionCreate: (question: any) => void;
  questionsCount: number;
}

export const CreateQuestionDialog = ({ onQuestionCreate, questionsCount }: CreateQuestionDialogProps) => {
  const [questionType, setQuestionType] = React.useState("");
  const [selectedSentiments, setSelectedSentiments] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<string[]>(["", "", ""]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");

  const toggleSentiment = (sentimentId: string) => {
    setSelectedSentiments((prev) =>
      prev.includes(sentimentId)
        ? prev.filter((id) => id !== sentimentId)
        : [...prev, sentimentId]
    );
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleCreateQuestion = () => {
    const newQuestion = {
      id: questionsCount + 1,
      type: questionType,
      title,
      description,
      category,
      options,
      sentiments: selectedSentiments,
    };

    onQuestionCreate(newQuestion);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircleIcon className="h-5 w-5" />
          Create Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
          <DialogDescription>
            Design your question to gather meaningful feedback
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Question Type Selection */}
          <div className="grid grid-cols-3 gap-4">
            {questionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setQuestionType(type.id)}
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50",
                  questionType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200"
                )}
              >
                <type.icon
                  className={cn(
                    "h-8 w-8 mb-2",
                    questionType === type.id ? "text-primary" : type.color
                  )}
                />
                <h4 className="text-sm font-medium">{type.name}</h4>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {type.description}
                </p>
              </button>
            ))}
          </div>

          {/* Question Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Question Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., How satisfied are you with our service?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add additional context or instructions for the question"
                className="h-20"
              />
            </div>

            {questionType === "sentiment" && (
              <div className="space-y-2">
                <Label>Sentiment Options</Label>
                <div className="grid grid-cols-3 gap-3">
                  {sentimentOptions.map((sentiment) => (
                    <button
                      key={sentiment.id}
                      onClick={() => toggleSentiment(sentiment.id)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200",
                        selectedSentiments.includes(sentiment.id)
                          ? cn("ring-2 ring-primary", sentiment.bgColor)
                          : "bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      <sentiment.icon
                        className={cn("h-6 w-6", sentiment.color)}
                      />
                      <span className="text-sm font-medium">{sentiment.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {questionType === "multiple_choice" && (
              <div className="space-y-2">
                <Label>Answer Options</Label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="w-8 h-10 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1"
                      />
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    className="mt-2 w-full"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="product">Product Experience</SelectItem>
                  <SelectItem value="service">Customer Service</SelectItem>
                  <SelectItem value="usability">Usability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCreateQuestion} className="w-full sm:w-auto">
            Create Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
