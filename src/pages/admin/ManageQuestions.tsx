import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Switch,
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
} from "@nextui-org/react";
import { SidebarProvider } from "../../components/providers/SidebarProvider";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { useToast } from "../../components/ui/use-toast";

interface Answer {
  text: string;
  value: string;
}

interface Question {
  id: number;
  text: string;
  content: string;
  required: boolean;
  type: "RATING" | "TEXT" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";
  category: "GENERAL" | "WORK_ENVIRONMENT" | "MANAGEMENT" | "CAREER_GROWTH";
  answerType: "SATISFACTION_BASE" | "AGREEMENT_BASE" | "TEXT_BASE";
  answers: Answer[];
}

const ManageQuestions: React.FC = () => {
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleCreateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuestion: Question = {
      id: questions.length + 1,
      text: formData.get("text") as string,
      content: formData.get("content") as string,
      required: formData.get("required") === "true",
      type: formData.get("type") as Question["type"],
      category: formData.get("category") as Question["category"],
      answerType: formData.get("answerType") as Question["answerType"],
      answers: answers,
    };

    setQuestions([...questions, newQuestion]);
    setAnswers([]);
    onClose();
    toast({
      title: "Question Created",
      description: "Your question has been created successfully.",
    });
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: "", value: (answers.length + 1).toString() }]);
  };

  const handleUpdateAnswer = (index: number, field: keyof Answer, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setAnswers(newAnswers);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Manage Questions</h1>
              <Button 
                color="primary" 
                variant="shadow"
                onPress={onOpen}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Question
              </Button>
            </div>

            <Card className="w-full">
              <CardBody>
                <Table aria-label="Questions table">
                  <TableHeader>
                    <TableColumn>QUESTION</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>REQUIRED</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>{question.text}</TableCell>
                        <TableCell>{question.type}</TableCell>
                        <TableCell>{question.category}</TableCell>
                        <TableCell>{question.required ? "Yes" : "No"}</TableCell>
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
                <form onSubmit={handleCreateQuestion}>
                  <ModalHeader>Create New Question</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Input
                        name="text"
                        label="Question Title"
                        placeholder="Enter question title"
                        required
                      />
                      
                      <Textarea
                        name="content"
                        label="Question Content"
                        placeholder="Enter detailed question content"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          name="type"
                          label="Question Type"
                          required
                        >
                          <SelectItem value="RATING">Rating</SelectItem>
                          <SelectItem value="TEXT">Text</SelectItem>
                          <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                          <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                        </Select>

                        <Select
                          name="category"
                          label="Category"
                          required
                        >
                          <SelectItem value="GENERAL">General</SelectItem>
                          <SelectItem value="WORK_ENVIRONMENT">Work Environment</SelectItem>
                          <SelectItem value="MANAGEMENT">Management</SelectItem>
                          <SelectItem value="CAREER_GROWTH">Career Growth</SelectItem>
                        </Select>
                      </div>

                      <Select
                        name="answerType"
                        label="Answer Type"
                        required
                      >
                        <SelectItem value="SATISFACTION_BASE">Satisfaction Based</SelectItem>
                        <SelectItem value="AGREEMENT_BASE">Agreement Based</SelectItem>
                        <SelectItem value="TEXT_BASE">Text Based</SelectItem>
                      </Select>

                      <div className="flex items-center gap-2">
                        <Switch name="required" />
                        <span>Required Question</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Answers</h3>
                          <Button
                            type="button"
                            color="secondary"
                            variant="flat"
                            onClick={handleAddAnswer}
                          >
                            Add Answer
                          </Button>
                        </div>

                        {answers.map((answer, index) => (
                          <div key={index} className="grid grid-cols-2 gap-4">
                            <Input
                              value={answer.text}
                              onChange={(e) => handleUpdateAnswer(index, "text", e.target.value)}
                              placeholder="Answer text"
                              required
                            />
                            <Input
                              value={answer.value}
                              onChange={(e) => handleUpdateAnswer(index, "value", e.target.value)}
                              placeholder="Answer value"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create Question
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

export default ManageQuestions;
