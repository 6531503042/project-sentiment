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
import { Plus, Calendar, MessageSquare, BarChart, ArrowRight, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: number;
  name: string;
  members: { id: number; name: string; }[];
}

interface Question {
  id: number;
  text: string;
  type: string;
}

interface Feedback {
  id: number;
  name: string;
  projectId: number;
  description: string;
  feedbackStartDate: string;
  feedbackEndDate: string;
  status: "active" | "completed" | "upcoming";
  questionIds: number[];
  responseCount: number;
}

const Feedback = () => {
  const { toast } = useToast();
  // Sample data - replace with real data from your backend
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "Employee Satisfaction 2024",
      members: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
    },
    // Add more projects
  ]);

  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: "How satisfied are you with your work environment?",
      type: "SENTIMENT",
    },
    {
      id: 2,
      text: "What improvements would you suggest?",
      type: "TEXT",
    },
    // Add more questions
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isNewFeedbackDialogOpen, setIsNewFeedbackDialogOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState<Partial<Feedback>>({
    name: "",
    projectId: 0,
    description: "",
    feedbackStartDate: "",
    feedbackEndDate: "",
    status: "upcoming",
    questionIds: [],
    responseCount: 0,
  });

  const handleCreateFeedback = () => {
    const feedback: Feedback = {
      id: feedbacks.length + 1,
      name: newFeedback.name || "",
      projectId: newFeedback.projectId || 0,
      description: newFeedback.description || "",
      feedbackStartDate: newFeedback.feedbackStartDate || "",
      feedbackEndDate: newFeedback.feedbackEndDate || "",
      status: newFeedback.status as "active" | "completed" | "upcoming",
      questionIds: newFeedback.questionIds || [],
      responseCount: 0,
    };

    setFeedbacks([...feedbacks, feedback]);
    setIsNewFeedbackDialogOpen(false);
    setNewFeedback({
      name: "",
      projectId: 0,
      description: "",
      feedbackStartDate: "",
      feedbackEndDate: "",
      status: "upcoming",
      questionIds: [],
      responseCount: 0,
    });

    toast({
      title: "Feedback Created",
      description: "New feedback has been successfully created.",
    });
  };

  const getProjectName = (projectId: number) => {
    return projects.find((p) => p.id === projectId)?.name || "Unknown Project";
  };

  const getSelectedQuestions = (questionIds: number[]) => {
    return questions.filter((q) => questionIds.includes(q.id));
  };

  return (
    <div className="min-h-screen flex w-full bg-ata-gray">
      <div className="flex-1">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-ata-blue">Feedback Forms</h1>
              <p className="text-ata-text mt-2">Manage your feedback collection forms</p>
            </div>
            <Dialog open={isNewFeedbackDialogOpen} onOpenChange={setIsNewFeedbackDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Feedback</DialogTitle>
                  <DialogDescription>
                    Set up a new feedback collection form
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={newFeedback.name}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, name: e.target.value })
                      }
                      placeholder="Enter feedback name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project</label>
                    <Select
                      value={newFeedback.projectId?.toString()}
                      onValueChange={(value) =>
                        setNewFeedback({ ...newFeedback, projectId: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newFeedback.description}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, description: e.target.value })
                      }
                      placeholder="Enter feedback description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        type="date"
                        value={newFeedback.feedbackStartDate}
                        onChange={(e) =>
                          setNewFeedback({
                            ...newFeedback,
                            feedbackStartDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        type="date"
                        value={newFeedback.feedbackEndDate}
                        onChange={(e) =>
                          setNewFeedback({
                            ...newFeedback,
                            feedbackEndDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Questions</label>
                    <div className="space-y-2">
                      {questions.map((question) => (
                        <div
                          key={question.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`question-${question.id}`}
                            checked={(newFeedback.questionIds || []).includes(
                              question.id
                            )}
                            onChange={(e) => {
                              const questionIds = e.target.checked
                                ? [...(newFeedback.questionIds || []), question.id]
                                : (newFeedback.questionIds || []).filter(
                                    (id) => id !== question.id
                                  );
                              setNewFeedback({ ...newFeedback, questionIds });
                            }}
                          />
                          <label
                            htmlFor={`question-${question.id}`}
                            className="text-sm"
                          >
                            {question.text}
                          </label>
                          <span className="text-xs text-muted-foreground">
                            ({question.type})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewFeedbackDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFeedback}>Create Feedback</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{feedback.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        feedback.status === "active"
                          ? "bg-green-100 text-green-800"
                          : feedback.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {feedback.status.charAt(0).toUpperCase() +
                        feedback.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feedback.description}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Project: {getProjectName(feedback.projectId)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {new Date(feedback.feedbackStartDate).toLocaleDateString()} -{" "}
                      {new Date(feedback.feedbackEndDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>
                        {getSelectedQuestions(feedback.questionIds).length} questions
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      <span>
                        {
                          projects.find((p) => p.id === feedback.projectId)?.members
                            .length
                        }{" "}
                        members
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>{feedback.responseCount} responses</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="ghost" size="sm">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;