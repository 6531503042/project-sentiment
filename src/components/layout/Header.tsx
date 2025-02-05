import { FC } from "react";
import {
  Avatar,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tooltip,
} from "@nextui-org/react";
import {
  Bell,
  Search,
  Sun,
  Moon,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";

export const Header: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex-1 flex items-center gap-4">
          <div className="w-72 max-w-full">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-10",
                input: "text-small",
                inputWrapper: "h-10 bg-default-100",
              }}
              placeholder="Search anything..."
              size="sm"
              startContent={<Search size={18} className="text-default-400" />}
              type="search"
              variant="bordered"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip content={theme === "light" ? "Dark mode" : "Light mode"}>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </Tooltip>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                radius="full"
              >
                <Badge
                  content="3"
                  size="sm"
                  color="danger"
                  shape="circle"
                  placement="top-right"
                >
                  <Bell size={20} />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notifications" className="w-80">
              <DropdownItem
                key="new_project"
                description="A new project has been created"
                startContent={
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                }
              >
                <span className="font-semibold">New Project Added</span>
                <p className="text-xs text-default-500 mt-1">2 minutes ago</p>
              </DropdownItem>
              <DropdownItem
                key="feedback"
                description="John Doe submitted feedback"
                startContent={
                  <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                }
              >
                <span className="font-semibold">New Feedback</span>
                <p className="text-xs text-default-500 mt-1">1 hour ago</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Tooltip content="Help">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              radius="full"
            >
              <HelpCircle size={20} />
            </Button>
          </Tooltip>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name="John Doe"
                size="sm"
                src="https://i.pravatar.cc/150?img=3"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-default-500">john.doe@example.com</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Settings size={16} />}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                startContent={<HelpCircle size={16} />}
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogOut size={16} />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};