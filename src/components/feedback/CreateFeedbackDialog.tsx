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
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  StarIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DatePicker } from "@/components/ui/date-picker";

const feedbackTypes = [
  {
    id: "satisfaction",
    name: "Satisfaction Survey",
    description: "Measure user satisfaction and happiness",
    icon: StarIcon,
    gradient: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
  {
    id: "feature",
    name: "Feature Feedback",
    description: "Gather feedback on specific features",
    icon: ClipboardDocumentListIcon,
    gradient: "from-blue-50 to-sky-50",
    iconColor: "text-blue-600",
  },
  {
    id: "general",
    name: "General Feedback",
    description: "Collect open-ended user feedback",
    icon: ChatBubbleBottomCenterTextIcon,
    gradient: "from-purple-50 to-violet-50",
    iconColor: "text-purple-600",
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

export function CreateFeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircleIcon className="h-4 w-4" />
          New Feedback Form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Feedback Form</DialogTitle>
          <DialogDescription>
            Design a feedback form to gather valuable user insights.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-4">
          {/* Feedback Type Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Feedback Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    feedbackType === type.id
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

          {/* Feedback Form Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Form Title</Label>
              <Input
                id="title"
                placeholder="e.g., Product Satisfaction Survey"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide context about this feedback form"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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

              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker />
              </div>
            </div>

            {/* Satisfaction Survey Specific */}
            {feedbackType === "satisfaction" && (
              <div className="space-y-4">
                <Label>Rating Scale</Label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="p-4 rounded-xl border-2 border-transparent hover:border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100/50 space-y-2"
                    >
                      <div className="h-8 w-8 mx-auto rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-amber-600">
                        <StarIcon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-medium text-center">{rating}</div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Users will rate on a scale of 1-5 stars</p>
              </div>
            )}

            {/* Feature Feedback Specific */}
            {feedbackType === "feature" && (
              <div className="space-y-4">
                <Label>Feature Selection</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border-2 border-transparent hover:border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-blue-600">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Specific Feature</div>
                        <p className="text-xs text-gray-500">Focus on one feature</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-transparent hover:border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-blue-600">
                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Multiple Features</div>
                        <p className="text-xs text-gray-500">Gather broader feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={() => setOpen(false)}>
            <PlusCircleIcon className="h-4 w-4" />
            Create Form
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
