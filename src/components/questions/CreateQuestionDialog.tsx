
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { Question } from "@/types/question";
import { useToast } from "@/components/ui/use-toast";

interface CreateQuestionDialogProps {
  onQuestionCreate: (question: Question) => void;
  questionsCount: number;
}

export const CreateQuestionDialog = ({ onQuestionCreate, questionsCount }: CreateQuestionDialogProps) => {
  const { toast } = useToast();

  const handleCreateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuestion = {
      id: questionsCount + 1,
      text: formData.get("text") as string,
      content: formData.get("content") as string,
      required: formData.get("required") === "true",
      type: formData.get("type") as Question["type"],
      category: formData.get("category") as Question["category"],
      answerType: formData.get("answerType") as Question["answerType"],
      answers: [],
    };
    
    onQuestionCreate(newQuestion);
    toast({
      title: "Question created",
      description: "Your question has been created successfully.",
    });
  };

  return (
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
  );
};
