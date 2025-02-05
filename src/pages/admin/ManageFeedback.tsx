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
  Textarea,
  Select,
  SelectItem,
  CardBody,
  Card,
} from "@nextui-org/react";
import { Search, MoreVertical, Eye, MessageSquare, Tag, AlertTriangle, Clock } from "lucide-react";

interface Feedback {
  id: number;
  message: string;
  sentiment: string;
  category: string;
  project: string;
  date: string;
  status: string;
  priority: string;
  tags: string[];
}

const feedbackData: Feedback[] = [
  {
    id: 1,
    message: "The new dashboard layout is much more intuitive and user-friendly. Great improvement!",
    sentiment: "Positive",
    category: "UI/UX",
    project: "Project A",
    date: "2024-02-05",
    status: "Reviewed",
    priority: "Low",
    tags: ["UI", "Dashboard", "Positive"],
  },
  {
    id: 2,
    message: "System response time has significantly improved after the recent update",
    sentiment: "Positive",
    category: "Performance",
    project: "Project B",
    date: "2024-02-04",
    status: "Pending",
    priority: "Medium",
    tags: ["Performance", "System", "Improvement"],
  },
  {
    id: 3,
    message: "Critical bug found in the export functionality - data is not being saved correctly",
    sentiment: "Negative",
    category: "Bugs",
    project: "Project C",
    date: "2024-02-03",
    status: "In Progress",
    priority: "High",
    tags: ["Bug", "Export", "Critical"],
  },
];

const categories = [
  { value: "ui_ux", label: "UI/UX" },
  { value: "performance", label: "Performance" },
  { value: "bugs", label: "Bugs" },
  { value: "features", label: "Features" },
  { value: "other", label: "Other" },
];

const ManageFeedback: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "success";
      case "neutral":
        return "warning";
      case "negative":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "reviewed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const handleViewDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    onOpen();
  };

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || feedback.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === "all" || feedback.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSentiment = sentimentFilter === "all" || feedback.sentiment.toLowerCase() === sentimentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority && matchesSentiment;
  });

  return (
    <DashboardLayout
      title="Feedback Management"
      subtitle="Review and analyze employee feedback"
    >
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 mb-6 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-default-900 mb-2">
            Feedback Overview
          </h1>
          <p className="text-default-600 mb-6 max-w-lg">
            Monitor and analyze employee feedback across all projects. Identify trends and address concerns in real-time.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-10">
          <MessageSquare className="w-48 h-48" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-none bg-gradient-to-br from-primary-50/50 to-primary-100/50">
          <CardBody className="flex flex-row items-center justify-between p-0">
            <div>
              <p className="text-sm font-medium text-default-600">Total Feedback</p>
              <p className="text-2xl font-semibold text-default-900">{feedbackData.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </CardBody>
        </Card>
        <Card className="p-4 border-none bg-gradient-to-br from-warning-50/50 to-warning-100/50">
          <CardBody className="flex flex-row items-center justify-between p-0">
            <div>
              <p className="text-sm font-medium text-default-600">Pending Review</p>
              <p className="text-2xl font-semibold text-default-900">
                {feedbackData.filter(f => f.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-warning/10">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </CardBody>
        </Card>
        <Card className="p-4 border-none bg-gradient-to-br from-danger-50/50 to-danger-100/50">
          <CardBody className="flex flex-row items-center justify-between p-0">
            <div>
              <p className="text-sm font-medium text-default-600">Critical Issues</p>
              <p className="text-2xl font-semibold text-default-900">
                {feedbackData.filter(f => f.priority === 'high').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-danger/10">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>
          </CardBody>
        </Card>
        <Card className="p-4 border-none bg-gradient-to-br from-success-50/50 to-success-100/50">
          <CardBody className="flex flex-row items-center justify-between p-0">
            <div>
              <p className="text-sm font-medium text-default-600">Categories</p>
              <p className="text-2xl font-semibold text-default-900">
                {new Set(feedbackData.map(f => f.category)).size}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-success/10">
              <Tag className="w-6 h-6 text-success" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 p-4 bg-default-50 border-none">
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback..."
              startContent={<Search className="text-default-400" />}
              size="lg"
              variant="bordered"
              className="flex-grow md:max-w-md"
              classNames={{
                input: "bg-default-100",
                inputWrapper: "bg-default-100",
              }}
            />
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="lg"
                variant="bordered"
                placeholder="Filter by Status"
                className="w-full sm:w-48"
                classNames={{
                  trigger: "bg-default-100",
                }}
              >
                <SelectItem key="all" value="all">All Status</SelectItem>
                <SelectItem key="pending" value="pending">Pending</SelectItem>
                <SelectItem key="reviewed" value="reviewed">Reviewed</SelectItem>
                <SelectItem key="resolved" value="resolved">Resolved</SelectItem>
              </Select>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                size="lg"
                variant="bordered"
                placeholder="Filter by Priority"
                className="w-full sm:w-48"
                classNames={{
                  trigger: "bg-default-100",
                }}
              >
                <SelectItem key="all" value="all">All Priority</SelectItem>
                <SelectItem key="low" value="low">Low</SelectItem>
                <SelectItem key="medium" value="medium">Medium</SelectItem>
                <SelectItem key="high" value="high">High</SelectItem>
              </Select>
              <Select
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
                size="lg"
                variant="bordered"
                placeholder="Filter by Sentiment"
                className="w-full sm:w-48"
                classNames={{
                  trigger: "bg-default-100",
                }}
              >
                <SelectItem key="all" value="all">All Sentiment</SelectItem>
                <SelectItem key="positive" value="positive">Positive</SelectItem>
                <SelectItem key="neutral" value="neutral">Neutral</SelectItem>
                <SelectItem key="negative" value="negative">Negative</SelectItem>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Feedback Table */}
      <Card className="border-none bg-default-50">
        <div className="flex flex-col">
          <Table
            aria-label="Feedback table"
            selectionMode="single"
            className="border-none"
            classNames={{
              wrapper: "min-h-[400px] shadow-none",
              th: "bg-default-100 text-default-600",
              td: "py-4",
            }}
          >
            <TableHeader>
              <TableColumn>FEEDBACK</TableColumn>
              <TableColumn>SENTIMENT</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>PROJECT</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium truncate">{feedback.message}</p>
                      <p className="text-small text-default-400">{feedback.date}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={getSentimentColor(feedback.sentiment)}
                      variant="flat"
                    >
                      {feedback.sentiment}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-small">{feedback.category}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-small">{feedback.project}</span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={getPriorityColor(feedback.priority)}
                      variant="flat"
                    >
                      {feedback.priority}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={getStatusColor(feedback.status)}
                      variant="flat"
                    >
                      {feedback.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Feedback actions">
                        <DropdownItem
                          startContent={<Eye className="w-4 h-4" />}
                          onPress={() => handleViewDetails(feedback)} key={""}                    >
                          View Details
                        </DropdownItem>
                        <DropdownItem
                          startContent={<MessageSquare className="w-4 h-4" />}
                          onPress={() => console.log("Add response:",feedback.id)} key={""}                    >
                          Add Response
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Feedback Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
        backdrop="blur"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
        classNames={{
          base: "max-h-[90vh]",
          header: "border-b border-default-100 px-8",
          body: "px-8 py-6",
          footer: "border-t border-default-100 px-8",
          closeButton: "hover:bg-default-100",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Feedback Details</ModalHeader>
              <ModalBody>
                {selectedFeedback && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-small font-medium">Message</h3>
                      <p className="mt-1">{selectedFeedback.message}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-small font-medium">Project</h3>
                        <p className="mt-1">{selectedFeedback.project}</p>
                      </div>
                      <div>
                        <h3 className="text-small font-medium">Category</h3>
                        <p className="mt-1">{selectedFeedback.category}</p>
                      </div>
                      <div>
                        <h3 className="text-small font-medium">Date</h3>
                        <p className="mt-1">{selectedFeedback.date}</p>
                      </div>
                      <div>
                        <h3 className="text-small font-medium">Status</h3>
                        <Chip
                          size="sm"
                          color={getStatusColor(selectedFeedback.status)}
                          variant="flat"
                          className="mt-1"
                        >
                          {selectedFeedback.status}
                        </Chip>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-small font-medium">Tags</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedFeedback.tags.map((tag, index) => (
                          <Chip key={index} size="sm" variant="flat">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      label="Add Response"
                      placeholder="Type your response here..."
                      className="mt-4"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Response
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default ManageFeedback;
