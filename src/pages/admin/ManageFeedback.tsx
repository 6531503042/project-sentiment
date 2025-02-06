import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Select,
  SelectItem,
  Textarea,
  Progress,
} from "@nextui-org/react";
import { SidebarProvider } from "../../components/providers/SidebarProvider";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { useToast } from "../../components/ui/use-toast";

interface Project {
  id: number;
  name: string;
  teamMembers: { id: number; name: string }[];
}

interface Question {
  id: number;
  text: string;
  type: string;
  category: string;
}

interface Feedback {
  id: number;
  name: string;
  projectId: number;
  description: string;
  feedbackStartDate: string;
  feedbackEndDate: string;
  questions: number[];
  status: "draft" | "active" | "completed";
  responseCount: number;
  totalResponses: number;
}

const ManageFeedback: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  // Sample data
  const projects: Project[] = [
    {
      id: 1,
      name: "Digital Transformation",
      teamMembers: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
    },
    {
      id: 2,
      name: "Cloud Migration",
      teamMembers: [
        { id: 3, name: "Mike Johnson" },
        { id: 4, name: "Sarah Williams" },
      ],
    },
  ];

  const questions: Question[] = [
    {
      id: 1,
      text: "How satisfied are you with the work environment?",
      type: "RATING",
      category: "WORK_ENVIRONMENT",
    },
    {
      id: 2,
      text: "How well does the team collaborate?",
      type: "RATING",
      category: "TEAM_COLLABORATION",
    },
    {
      id: 3,
      text: "What improvements would you suggest?",
      type: "TEXT",
      category: "GENERAL",
    },
  ];

  const handleCreateFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      name: formData.get("name") as string,
      projectId: parseInt(selectedProject),
      description: formData.get("description") as string,
      feedbackStartDate: formData.get("startDate") as string,
      feedbackEndDate: formData.get("endDate") as string,
      questions: selectedQuestions.map(q => parseInt(q)),
      status: "draft",
      responseCount: 0,
      totalResponses: projects.find(p => p.id === parseInt(selectedProject))?.teamMembers.length || 0,
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setSelectedProject("");
    setSelectedQuestions([]);
    onClose();
    toast({
      title: "Feedback Created",
      description: "Your feedback form has been created successfully.",
    });
  };

  const getStatusColor = (status: Feedback["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const getResponseProgress = (feedback: Feedback) => {
    return (feedback.responseCount / feedback.totalResponses) * 100;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Manage Feedback</h1>
                <p className="text-gray-600">Create and manage feedback forms</p>
              </div>
              <Button
                color="primary"
                variant="shadow"
                onPress={onOpen}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Feedback
              </Button>
            </div>

            <Card className="w-full">
              <CardBody>
                <Table aria-label="Feedback forms table">
                  <TableHeader>
                    <TableColumn>FEEDBACK NAME</TableColumn>
                    <TableColumn>PROJECT</TableColumn>
                    <TableColumn>DURATION</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>RESPONSES</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {feedbacks.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{feedback.name}</p>
                            <p className="text-small text-default-500">
                              {feedback.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {projects.find(p => p.id === feedback.projectId)?.name}
                        </TableCell>
                        <TableCell>
                          <div className="text-small">
                            <p>Start: {new Date(feedback.feedbackStartDate).toLocaleDateString()}</p>
                            <p>End: {new Date(feedback.feedbackEndDate).toLocaleDateString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={getStatusColor(feedback.status)}
                            variant="flat"
                            size="sm"
                          >
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="w-full">
                            <div className="flex justify-between text-small mb-1">
                              <span>{feedback.responseCount} responses</span>
                              <span>{Math.round(getResponseProgress(feedback))}%</span>
                            </div>
                            <Progress
                              value={getResponseProgress(feedback)}
                              color="primary"
                              size="sm"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="3xl"
              scrollBehavior="inside"
            >
              <ModalContent>
                <form onSubmit={handleCreateFeedback}>
                  <ModalHeader>Create New Feedback</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Input
                        name="name"
                        label="Feedback Name"
                        placeholder="Enter feedback name"
                        required
                      />

                      <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter feedback description"
                        required
                      />

                      <Select
                        label="Project"
                        placeholder="Select a project"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        required
                      >
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </Select>

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="startDate"
                          label="Start Date"
                          type="datetime-local"
                          required
                        />
                        <Input
                          name="endDate"
                          label="End Date"
                          type="datetime-local"
                          required
                        />
                      </div>

                      <Select
                        label="Questions"
                        selectionMode="multiple"
                        placeholder="Select questions"
                        selectedKeys={selectedQuestions}
                        onChange={(e) => setSelectedQuestions(Array.from(e.target.value))}
                        required
                      >
                        {questions.map((question) => (
                          <SelectItem key={question.id} value={question.id}>
                            {question.text} ({question.category})
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create Feedback
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ManageFeedback;
