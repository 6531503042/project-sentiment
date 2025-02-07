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
  ChatBubbleLeftRightIcon,
  StarIcon,
  ListBulletIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Import specific emotion icons
import { FaceSmileIcon as HappyIcon } from "@heroicons/react/24/solid";
import { FaceFrownIcon as SadIcon } from "@heroicons/react/24/solid";
import { NoSymbolIcon as NeutralIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";

const feedbackTypes = [
  {
    id: "rating",
    name: "Rating Scale",
    description: "Collect numerical ratings from users",
    icon: StarIcon,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "sentiment",
    name: "Sentiment",
    description: "Gather emotional responses",
    icon: ChatBubbleLeftRightIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
  },
  {
    id: "text",
    name: "Text Response",
    description: "Collect detailed written feedback",
    icon: DocumentTextIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
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

export const CreateFeedbackDialog = () => {
  const [feedbackType, setFeedbackType] = React.useState("");
  const [selectedSentiments, setSelectedSentiments] = React.useState<string[]>([]);
  const [ratingScale, setRatingScale] = React.useState(5);

  const toggleSentiment = (sentimentId: string) => {
    setSelectedSentiments((prev) =>
      prev.includes(sentimentId)
        ? prev.filter((id) => id !== sentimentId)
        : [...prev, sentimentId]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircleIcon className="h-5 w-5" />
          Create Feedback Form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Feedback Form</DialogTitle>
          <DialogDescription>
            Design your feedback form to collect valuable insights
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Feedback Type Selection */}
          <div className="grid grid-cols-3 gap-4">
            {feedbackTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFeedbackType(type.id)}
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50",
                  feedbackType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200"
                )}
              >
                <type.icon
                  className={cn(
                    "h-8 w-8 mb-2",
                    feedbackType === type.id ? "text-primary" : type.color
                  )}
                />
                <h4 className="text-sm font-medium">{type.name}</h4>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {type.description}
                </p>
              </button>
            ))}
          </div>

          {/* Feedback Form Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Form Title</Label>
              <Input
                id="title"
                placeholder="e.g., Customer Satisfaction Survey"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide context about this feedback form"
                className="h-20"
              />
            </div>

            {feedbackType === "sentiment" && (
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

            {feedbackType === "rating" && (
              <div className="space-y-2">
                <Label>Rating Scale</Label>
                <div className="flex items-center gap-4">
                  <Select
                    value={ratingScale.toString()}
                    onValueChange={(value) => setRatingScale(Number(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select scale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">1-5 Stars</SelectItem>
                      <SelectItem value="10">1-10 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    {[...Array(ratingScale)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-5 w-5 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product Feedback</SelectItem>
                  <SelectItem value="service">Customer Service</SelectItem>
                  <SelectItem value="usability">Usability</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full sm:w-auto">
            Create Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
