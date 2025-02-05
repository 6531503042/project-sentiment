import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart2,
  ClipboardList,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Users,
  Home,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: JSX.Element;
  href: string;
}

interface NavGroup {
  label: string;
  icon: JSX.Element;
  items: NavItem[];
}

const adminNavItems: NavGroup[] = [
  {
    label: "Projects",
    icon: <BarChart2 className="w-5 h-5" />,
    items: [
      {
        label: "Overview",
        href: "/admin/projects/dashboard",
        icon: <Home className="w-4 h-4" />
      },
      {
        label: "Projects",
        href: "/admin/projects/manage",
        icon: <ClipboardList className="w-4 h-4" />
      }
    ]
  },
  {
    label: "Feedback",
    icon: <MessageCircle className="w-5 h-5" />,
    items: [
      {
        label: "Overview",
        href: "/admin/feedback/dashboard",
        icon: <Home className="w-4 h-4" />
      },
      {
        label: "Feedback",
        href: "/admin/feedback/manage",
        icon: <MessageSquare className="w-4 h-4" />
      }
    ]
  },
  {
    label: "Team",
    icon: <Users className="w-5 h-5" />,
    items: [
      {
        label: "Members",
        href: "/admin/team/members",
        icon: <Users className="w-4 h-4" />
      }
    ]
  }
];

export const AppSidebar: FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      className="relative h-screen bg-content1 border-r border-divider flex flex-col"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo and Collapse Button */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-divider">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <span className="font-semibold text-xl">Sentiment</span>
          </div>
        )}
        <Button
          isIconOnly
          variant="light"
          onPress={() => setIsCollapsed(!isCollapsed)}
          className={isCollapsed ? "mx-auto" : ""}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {adminNavItems.map((group) => (
          <div key={group.label} className="mb-4">
            {!isCollapsed && (
              <div 
                className="px-4 mb-2 flex items-center gap-2 text-default-500 text-sm font-medium"
                onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)}
              >
                {group.icon}
                <span>{group.label}</span>
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isItemActive = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block"
                  >
                    <Tooltip
                      content={isCollapsed ? item.label : ""}
                      placement="right"
                      delay={0}
                      closeDelay={0}
                    >
                      <div
                        className={`
                          flex items-center gap-3 mx-2 px-3 py-2 rounded-lg cursor-pointer
                          ${isItemActive 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-default-100 text-default-500 hover:text-default-900"
                          }
                          transition-colors duration-150
                        `}
                      >
                        {item.icon}
                        {!isCollapsed && (
                          <span className="text-sm font-medium">{item.label}</span>
                        )}
                      </div>
                    </Tooltip>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-divider">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <Avatar
            src="https://i.pravatar.cc/150?u=1"
            size="sm"
            className="cursor-pointer"
          />
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-default-500">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-divider space-y-2">
        <Tooltip
          content={isCollapsed ? "Settings" : ""}
          placement="right"
        >
          <Button
            variant="light"
            className={`w-full justify-start gap-2 ${isCollapsed ? "px-0" : ""}`}
            startContent={!isCollapsed && <Settings className="w-4 h-4" />}
          >
            {isCollapsed ? (
              <Settings className="w-4 h-4 mx-auto" />
            ) : (
              "Settings"
            )}
          </Button>
        </Tooltip>
        <Tooltip
          content={isCollapsed ? "Logout" : ""}
          placement="right"
        >
          <Button
            variant="light"
            color="danger"
            className={`w-full justify-start gap-2 ${isCollapsed ? "px-0" : ""}`}
            startContent={!isCollapsed && <LogOut className="w-4 h-4" />}
          >
            {isCollapsed ? (
              <LogOut className="w-4 h-4 mx-auto" />
            ) : (
              "Logout"
            )}
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};