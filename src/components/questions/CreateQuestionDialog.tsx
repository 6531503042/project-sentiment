import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusCircleIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FaceSmileIcon, FaceFrownIcon } from "@heroicons/react/24/solid";

const questionTypes = [
  {
    id: "text",
    name: "Text Response",
    description: "Allow users to provide detailed written feedback",
    icon: DocumentTextIcon,
    gradient: "from-blue-50 to-sky-50",
    iconColor: "text-blue-600",
  },
  {
    id: "multiple_choice",
    name: "Multiple Choice",
    description: "Let users choose from predefined options",
    icon: ClipboardDocumentCheckIcon,
    gradient: "from-purple-50 to-violet-50",
    iconColor: "text-purple-600",
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    description: "Gather emotional responses and feedback",
    icon: ChatBubbleBottomCenterTextIcon,
    gradient: "from-rose-50 to-pink-50",
    iconColor: "text-rose-600",
  },
];

const categories = [
  "Product",
  "Service",
  "User Experience",
  "Customer Support",
  "Performance",
  "Other",
];

interface CreateQuestionDialogProps {
  onQuestionCreate: (question: any) => void;
  questionsCount: number;
}

export function CreateQuestionDialog({ onQuestionCreate, questionsCount }: CreateQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
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
    };

    onQuestionCreate(newQuestion);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircleIcon className="h-4 w-4" />
          New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Question</DialogTitle>
          <DialogDescription>
            Design a question to gather meaningful feedback from your users.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-4">
          {/* Question Type Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Question Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {questionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setQuestionType(type.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    questionType === type.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${type.gradient} rounded-xl opacity-50`} />
                  <div className="relative space-y-3">
                    <div className={`h-10 w-10 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center ${type.iconColor}`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
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
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add additional context or instructions for the question"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Multiple Choice Options */}
          {questionType === "multiple_choice" && (
            <div className="space-y-4">
              <Label>Answer Options</Label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    {options.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {options.length < 6 && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={addOption}
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Add Option
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Sentiment Options */}
          {questionType === "sentiment" && (
            <div className="space-y-4">
              <Label>Sentiment Scale</Label>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 space-y-2">
                  <div className="h-10 w-10 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-green-600">
                    <FaceSmileIcon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Positive</div>
                </button>
                <button className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 space-y-2">
                  <div className="h-10 w-10 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-gray-600">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Neutral</div>
                </button>
                <button className="p-4 rounded-xl border-2 border-transparent hover:border-gray-200 bg-gradient-to-r from-red-50 to-rose-50 space-y-2">
                  <div className="h-10 w-10 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-red-600">
                    <FaceFrownIcon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Negative</div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={handleCreateQuestion}>
            <PlusCircleIcon className="h-4 w-4" />
            Create Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
