import { FC, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  Select,
  SelectItem,
  Textarea,
  Badge,
} from "@nextui-org/react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Filter,
  BarChart2,
  ListChecks,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  type: string;
  category: string;
  required: boolean;
  projects: string[];
  usage: number;
  responses: number;
  lastUsed: string;
  options?: string[];
}

const questionData: Question[] = [
  {
    id: 1,
    text: "How satisfied are you with our product?",
    type: "Rating",
    category: "Satisfaction",
    required: true,
    projects: ["Employee Survey 2024", "Customer Feedback"],
    usage: 15,
    responses: 342,
    lastUsed: "2024-02-01",
  },
  {
    id: 2,
    text: "What improvements would you suggest?",
    type: "Text",
    category: "Feedback",
    required: false,
    projects: ["Product Development"],
    usage: 8,
    responses: 156,
    lastUsed: "2024-01-15",
  },
  {
    id: 3,
    text: "Which features do you use most often?",
    type: "MultiChoice",
    category: "Usage",
    required: true,
    projects: ["Product Development", "Customer Feedback"],
    usage: 12,
    responses: 289,
    lastUsed: "2024-02-03",
    options: ["Dashboard", "Reports", "Analytics", "Settings"],
  },
];

const questionTypes = [
  { value: "all", label: "All Types" },
  { value: "rating", label: "Rating" },
  { value: "text", label: "Text" },
  { value: "multichoice", label: "Multiple Choice" },
  { value: "singlechoice", label: "Single Choice" },
];

const questionCategories = [
  { value: "all", label: "All Categories" },
  { value: "satisfaction", label: "Satisfaction" },
  { value: "feedback", label: "Feedback" },
  { value: "usage", label: "Usage" },
  { value: "demographic", label: "Demographic" },
];

const ManageQuestions: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("usage");

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "rating":
        return "success";
      case "text":
        return "primary";
      case "multichoice":
        return "warning";
      case "singlechoice":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    onOpen();
  };

  const handleDelete = (questionId: number) => {
    // Implement delete functionality
    console.log("Delete question:", questionId);
  };

  const handleDuplicate = (question: Question) => {
    // Implement duplicate functionality
    console.log("Duplicate question:", question);
  };

  const filteredQuestions = questionData
    .filter((question) => {
      const matchesSearch = question.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter === "all" ||
        question.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesCategory =
        categoryFilter === "all" ||
        question.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "usage":
          return b.usage - a.usage;
        case "responses":
          return b.responses - a.responses;
        case "lastUsed":
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
        default:
          return 0;
      }
    });

  return (
    <DashboardLayout
      title="Manage Questions"
      subtitle="Create and manage survey questions for your projects"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/5">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-small text-default-500">Total Questions</p>
              <p className="text-xl font-semibold">{questionData.length}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-success/5">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <BarChart2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-small text-default-500">Total Responses</p>
              <p className="text-xl font-semibold">
                {questionData.reduce((sum, q) => sum + q.responses, 0)}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-warning/5">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-warning/10">
              <ListChecks className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-small text-default-500">Active in Projects</p>
              <p className="text-xl font-semibold">
                {new Set(questionData.flatMap((q) => q.projects)).size}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex flex-1 gap-4 max-w-full sm:max-w-3xl flex-wrap sm:flex-nowrap">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-default-400" />}
            className="flex-1 min-w-[200px]"
          />
          <Select
            className="w-40 min-w-[160px]"
            selectedKeys={[typeFilter]}
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Question Type"
          >
            {questionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            className="w-40 min-w-[160px]"
            selectedKeys={[categoryFilter]}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Category"
          >
            {questionCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" startContent={<Filter className="w-4 h-4" />}>
                Sort By
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={[sortBy]}
              onSelectionChange={(keys) =>
                setSortBy(Array.from(keys)[0] as string)
              }
              selectionMode="single"
            >
              <DropdownItem key="usage">Usage Count</DropdownItem>
              <DropdownItem key="responses">Response Count</DropdownItem>
              <DropdownItem key="lastUsed">Last Used</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => {
              setSelectedQuestion(null);
              onOpen();
            }}
          >
            New Question
          </Button>
        </div>
      </div>

      {/* Questions Table */}
      <Card>
        <Table aria-label="Questions table">
          <TableHeader>
            <TableColumn>QUESTION</TableColumn>
            <TableColumn>TYPE & CATEGORY</TableColumn>
            <TableColumn>PROJECTS</TableColumn>
            <TableColumn>USAGE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{question.text}</p>
                      {question.required && (
                        <Badge color="danger" variant="flat" size="sm">
                          Required
                        </Badge>
                      )}
                    </div>
                    {question.options && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {question.options.map((option, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            className="text-tiny"
                          >
                            {option}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Chip
                      size="sm"
                      color={getTypeColor(question.type)}
                      variant="flat"
                    >
                      {question.type}
                    </Chip>
                    <span className="text-small text-default-500">
                      {question.category}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {question.projects.map((project, index) => (
                      <Chip key={index} size="sm" variant="flat">
                        {project}
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-default-400" />
                      <span className="text-small">
                        {question.usage} times used
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-default-400" />
                      <span className="text-small">
                        {question.responses} responses
                      </span>
                    </div>
                    <div className="text-tiny text-default-400">
                      Last used: {question.lastUsed}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Question actions">
                      <DropdownItem
                        startContent={<Eye className="w-4 h-4" />}
                        onPress={() => console.log("View question:",question.id)} key={""}                      >
                        View Details
                      </DropdownItem>
                      <DropdownItem
                        startContent={<Edit2 className="w-4 h-4" />}
                        onPress={() => handleEdit(question)} key={""}                      >
                        Edit Question
                      </DropdownItem>
                      <DropdownItem
                        startContent={<Copy className="w-4 h-4" />}
                        onPress={() => handleDuplicate(question)} key={""}                      >
                        Duplicate
                      </DropdownItem>
                      <DropdownItem
                        startContent={<Trash2 className="w-4 h-4" />}
                        className="text-danger"
                        color="danger"
                        onPress={() => handleDelete(question.id)} key={""}                      >
                        Delete Question
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedQuestion ? "Edit Question" : "Create New Question"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Textarea
                      label="Question Text"
                      placeholder="Enter your question"
                      defaultValue={selectedQuestion?.text}
                      variant="bordered"
                      minRows={2}
                    />
                  </div>
                  <Select
                    label="Question Type"
                    placeholder="Select type"
                    defaultSelectedKeys={
                      selectedQuestion
                        ? [selectedQuestion.type.toLowerCase()]
                        : []
                    }
                    variant="bordered"
                  >
                    <SelectItem key="rating" value="rating">
                      Rating
                    </SelectItem>
                    <SelectItem key="text" value="text">
                      Text
                    </SelectItem>
                    <SelectItem key="multichoice" value="multichoice">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem key="singlechoice" value="singlechoice">
                      Single Choice
                    </SelectItem>
                  </Select>
                  <Select
                    label="Category"
                    placeholder="Select category"
                    defaultSelectedKeys={
                      selectedQuestion
                        ? [selectedQuestion.category.toLowerCase()]
                        : []
                    }
                    variant="bordered"
                  >
                    {questionCategories
                      .filter((cat) => cat.value !== "all")
                      .map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                  </Select>
                  {(selectedQuestion?.type === "MultiChoice" ||
                    selectedQuestion?.type === "SingleChoice") && (
                    <div className="col-span-2">
                      <Textarea
                        label="Options"
                        placeholder="Enter options (one per line)"
                        defaultValue={selectedQuestion?.options?.join("\n")}
                        variant="bordered"
                        minRows={3}
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  {selectedQuestion ? "Save Changes" : "Create Question"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default ManageQuestions;
