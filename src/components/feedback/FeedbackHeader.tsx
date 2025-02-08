
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackHeaderProps {
  onNewFeedback: () => void;
}

export const FeedbackHeader = ({ onNewFeedback }: FeedbackHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-ata-blue">Feedback Forms</h1>
        <p className="text-ata-text mt-2">Manage your feedback collection forms</p>
      </div>
      <Button onClick={onNewFeedback}>
        <Plus className="mr-2 h-4 w-4" />
        New Feedback
      </Button>
    </div>
  );
};
