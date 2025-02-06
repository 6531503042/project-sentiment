import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tabs,
  Tab,
  Progress,
  Radio,
  RadioGroup,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { SidebarProvider } from "../../components/providers/SidebarProvider";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";

interface FeedbackQuestion {
  id: number;
  text: string;
  content: string;
  required: boolean;
  type: string;
  category: string;
  answerType: string;
  answers?: { text: string; value: string }[];
}

interface Feedback {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "pending" | "completed";
  progress: number;
  questions: FeedbackQuestion[];
}

const EmployeeFeedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [privacySettings, setPrivacySettings] = useState({
    shareIdentity: false,
    shareDepartment: true,
    shareResponses: "anonymized",
  });

  // Sample data
  const feedbacks: Feedback[] = [
    {
      id: 1,
      name: "Q1 2025 Employee Satisfaction Survey",
      description: "Quarterly feedback collection for employee satisfaction and engagement",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      status: "pending",
      progress: 0,
      questions: [
        {
          id: 1,
          text: "Work Environment",
          content: "How satisfied are you with your current work environment?",
          required: true,
          type: "RATING",
          category: "WORK_ENVIRONMENT",
          answerType: "SATISFACTION_BASE",
          answers: [
            { text: "Very Satisfied", value: "5" },
            { text: "Satisfied", value: "4" },
            { text: "Neutral", value: "3" },
            { text: "Dissatisfied", value: "2" },
            { text: "Very Dissatisfied", value: "1" },
          ],
        },
        // Add more questions as needed
      ],
    },
    {
      id: 2,
      name: "Project Alpha Feedback",
      description: "Feedback for Project Alpha implementation phase",
      startDate: "2025-02-01",
      endDate: "2025-02-15",
      status: "completed",
      progress: 100,
      questions: [],
    },
  ];

  const handleStartFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    onOpen();
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission
    onClose();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Employee Feedback</h1>
              <p className="text-gray-600">View and submit your feedback</p>
            </div>

            <Tabs 
              aria-label="Feedback tabs" 
              color="primary"
              className="mb-6"
            >
              <Tab key="pending" title="Pending Feedback">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {feedbacks
                    .filter((f) => f.status === "pending")
                    .map((feedback) => (
                      <Card key={feedback.id} className="w-full">
                        <CardHeader className="flex gap-3">
                          <div className="flex flex-col">
                            <p className="text-md font-semibold">{feedback.name}</p>
                            <p className="text-small text-default-500">
                              Due: {new Date(feedback.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <p className="text-small text-default-600">
                            {feedback.description}
                          </p>
                          <div className="mt-4">
                            <Progress
                              value={feedback.progress}
                              color="primary"
                              className="h-2"
                              showValueLabel
                            />
                          </div>
                        </CardBody>
                        <CardFooter>
                          <Button 
                            color="primary" 
                            onPress={() => handleStartFeedback(feedback)}
                          >
                            Start Feedback
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </Tab>
              <Tab key="completed" title="Completed Feedback">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {feedbacks
                    .filter((f) => f.status === "completed")
                    .map((feedback) => (
                      <Card key={feedback.id} className="w-full">
                        <CardHeader className="flex gap-3">
                          <div className="flex flex-col">
                            <p className="text-md font-semibold">{feedback.name}</p>
                            <p className="text-small text-default-500">
                              Completed: {new Date(feedback.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <p className="text-small text-default-600">
                            {feedback.description}
                          </p>
                          <div className="mt-4">
                            <Progress
                              value={100}
                              color="success"
                              className="h-2"
                              showValueLabel
                            />
                          </div>
                        </CardBody>
                        <CardFooter>
                          <Button 
                            color="primary" 
                            variant="bordered"
                            onPress={() => handleStartFeedback(feedback)}
                          >
                            View Feedback
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </Tab>
            </Tabs>

            {/* Privacy Settings Card */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-xl font-semibold">Privacy Settings</h3>
              </CardHeader>
              <CardBody className="space-y-6">
                <div>
                  <RadioGroup
                    label="Share Identity"
                    value={privacySettings.shareIdentity.toString()}
                    onChange={(value) =>
                      setPrivacySettings({
                        ...privacySettings,
                        shareIdentity: value === "true",
                      })
                    }
                  >
                    <Radio value="true">Share my identity</Radio>
                    <Radio value="false">Keep anonymous</Radio>
                  </RadioGroup>
                </div>

                <div>
                  <RadioGroup
                    label="Share Department Information"
                    value={privacySettings.shareDepartment.toString()}
                    onChange={(value) =>
                      setPrivacySettings({
                        ...privacySettings,
                        shareDepartment: value === "true",
                      })
                    }
                  >
                    <Radio value="true">Share department info</Radio>
                    <Radio value="false">Keep department private</Radio>
                  </RadioGroup>
                </div>

                <div>
                  <Select
                    label="Response Visibility"
                    value={privacySettings.shareResponses}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        shareResponses: e.target.value,
                      })
                    }
                  >
                    <SelectItem value="public">Visible to all</SelectItem>
                    <SelectItem value="anonymized">Anonymized responses</SelectItem>
                    <SelectItem value="private">Private (management only)</SelectItem>
                  </Select>
                </div>
              </CardBody>
            </Card>

            {/* Feedback Modal */}
            <Modal 
              isOpen={isOpen} 
              onClose={onClose}
              size="3xl"
              scrollBehavior="inside"
            >
              <ModalContent>
                <ModalHeader>
                  {selectedFeedback?.name}
                </ModalHeader>
                <ModalBody>
                  {selectedFeedback?.questions.map((question) => (
                    <div key={question.id} className="mb-6">
                      <p className="font-medium mb-2">{question.content}</p>
                      {question.type === "RATING" && (
                        <RadioGroup orientation="horizontal">
                          {question.answers?.map((answer) => (
                            <Radio key={answer.value} value={answer.value}>
                              {answer.text}
                            </Radio>
                          ))}
                        </RadioGroup>
                      )}
                      {question.type === "TEXT" && (
                        <Textarea
                          placeholder="Enter your response"
                          minRows={3}
                        />
                      )}
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleSubmitFeedback}>
                    Submit Feedback
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeFeedback;