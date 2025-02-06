import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  Home,
  BarChart2,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
  description: string;
}

const adminNavItems: NavItem[] = [
  { 
    label: "Dashboard", 
    href: "/admin/projects", 
    icon: <Home size={22} />,
    description: "Overview and analytics"
  },
  { 
    label: "Projects", 
    href: "/admin/projects/dashboard", 
    icon: <BarChart2 size={22} />,
    description: "Manage projects"
  },
  { 
    label: "Questions", 
    href: "/admin/questions", 
    icon: <MessageSquare size={22} />,
    description: "Survey questions"
  },
  { 
    label: "Team", 
    href: "/admin/feedback", 
    icon: <Users size={22} />,
    description: "Team management"
  },
];

export const AppSidebar: FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      className="relative h-screen bg-background border-r flex flex-col"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Collapse Button */}
      <Button
        isIconOnly
        variant="light"
        className="absolute -right-3 top-6 z-50 bg-background border shadow-md"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>

      {/* Logo Section */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        {!isCollapsed && (
          <span className="ml-3 font-semibold text-xl">Sentiment</span>
        )}
      </div>

      <Divider className="my-2" />

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-2">
        {adminNavItems.map((item) => (
          <Tooltip
            key={item.href}
            content={isCollapsed ? item.label : item.description}
            placement="right"
            delay={200}
          >
            <Link to={item.href} className="w-full">
              <motion.div
                whileHover={{ scale: 1.02, translateX: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full h-12 ${
                    isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
                  } ${
                    location.pathname === item.href
                      ? 'bg-primary text-white'
                      : 'bg-transparent hover:bg-default-100'
                  }`}
                  variant={location.pathname === item.href ? "solid" : "light"}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </Button>
              </motion.div>
            </Link>
          </Tooltip>
        ))}
      </div>

      <Divider className="my-2" />

      {/* User Section */}
      <div className="p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3`}>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">John Doe</span>
              <span className="text-xs text-default-500">Administrator</span>
            </div>
          )}
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?img=3"
            className="cursor-pointer transition-transform hover:scale-105"
          />
        </div>
        
        <motion.div
          initial={false}
          animate={{ height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
          className="mt-4"
        >
          {!isCollapsed && (
            <Button
              className="w-full justify-start text-danger"
              color="danger"
              variant="light"
              startContent={<LogOut size={18} />}
            >
              Log Out
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};