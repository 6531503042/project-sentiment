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
  UserGroupIcon,
  CalendarIcon,
  TagIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const projectTypes = [
  {
    id: "development",
    name: "Development",
    description: "Software development and engineering projects",
    icon: RocketLaunchIcon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX and graphic design projects",
    icon: TagIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketing and promotional campaigns",
    icon: UserGroupIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
];

export const CreateProjectDialog = () => {
  const [projectType, setProjectType] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircleIcon className="h-5 w-5" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project and assign team members
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Project Type Selection */}
          <div className="grid grid-cols-3 gap-4">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setProjectType(type.id)}
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50",
                  projectType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200"
                )}
              >
                <type.icon
                  className={cn(
                    "h-8 w-8 mb-2",
                    projectType === type.id ? "text-primary" : type.color
                  )}
                />
                <h4 className="text-sm font-medium">{type.name}</h4>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {type.description}
                </p>
              </button>
            ))}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="e.g., Website Redesign 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project objectives and goals"
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="dueDate"
                    type="date"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team Members</Label>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add team members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="bob">Bob Johnson</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon">
                  <PlusCircleIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">
                  John Doe
                  <button className="ml-1 hover:text-red-500">×</button>
                </Badge>
                <Badge variant="secondary">
                  Jane Smith
                  <button className="ml-1 hover:text-red-500">×</button>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full sm:w-auto">
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
