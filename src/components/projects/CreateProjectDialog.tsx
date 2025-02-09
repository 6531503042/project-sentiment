import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  RocketLaunchIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  FlagIcon,
  PlusCircleIcon,
  XMarkIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { DatePicker } from "@/components/ui/date-picker";

const priorities = [
  {
    id: "high",
    name: "High Priority",
    description: "Urgent and important tasks",
    icon: RocketLaunchIcon,
    gradient: "from-red-50 to-rose-50",
    iconColor: "text-red-600",
  },
  {
    id: "medium",
    name: "Medium Priority",
    description: "Important but not urgent",
    icon: FlagIcon,
    gradient: "from-yellow-50 to-amber-50",
    iconColor: "text-yellow-600",
  },
  {
    id: "low",
    name: "Low Priority",
    description: "Can be completed later",
    icon: ChartBarIcon,
    gradient: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
  },
];

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [teamMembers, setTeamMembers] = useState([""]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
          <PlusCircleIcon className="h-5 w-5" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <RocketLaunchIcon className="h-6 w-6 text-primary" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Launch a new project and set it up for success
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Project Priority Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Project Priority</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priorities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    priority === p.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${p.gradient} rounded-xl opacity-50`} />
                  <div className="relative space-y-3">
                    <div className={`h-10 w-10 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center ${p.iconColor}`}>
                      <p.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Name</Label>
              <Input
                id="title"
                placeholder="e.g., Website Redesign"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project goals and objectives"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker />
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Team Members</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTeamMember}
                className="gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add Member
              </Button>
            </div>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center">
                    <UserGroupIcon className="h-4 w-4 text-violet-600" />
                  </div>
                  <Input
                    value={member}
                    onChange={(e) => updateTeamMember(index, e.target.value)}
                    placeholder="Enter team member name"
                    className="flex-1"
                  />
                  {teamMembers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-primary/90"
            onClick={() => setOpen(false)}
          >
            <RocketLaunchIcon className="h-4 w-4" />
            Launch Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
