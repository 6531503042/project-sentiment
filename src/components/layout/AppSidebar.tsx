import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
  Card,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
  description: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Projects",
    href: "/manage/dashboard",
    icon: <LayoutDashboard size={22} />,
    description: "Project Management",
    children: [
      {
        label: "Overview",
        href: "/manage/dashboard",
        icon: <LayoutDashboard size={20} />,
        description: "Project Overview"
      },
      {
        label: "Analytics",
        href: "/manage/dashboard/analytics",
        icon: <LayoutDashboard size={20} />,
        description: "Project Analytics"
      }
    ]
  },
  {
    label: "Feedback",
    href: "/manage/dashboard",
    icon: <ThumbsUp size={22} />,
    description: "Feedback Management",
    children: [
      {
        label: "All Feedback",
        href: "/manage/dashboard/feedback",
        icon: <ThumbsUp size={20} />,
        description: "View All Feedback"
      },
      {
        label: "Reports",
        href: "/manage/dashboard/feedback/reports",
        icon: <ThumbsUp size={20} />,
        description: "Feedback Reports"
      }
    ]
  },
  {
    label: "Questions",
    href: "/manage/dashboard",
    icon: <MessageSquare size={22} />,
    description: "Question Management",
    children: [
      {
        label: "Question Bank",
        href: "/manage/dashboard/questions",
        icon: <MessageSquare size={20} />,
        description: "Manage Questions"
      },
      {
        label: "Templates",
        href: "/manage/dashboard/questions/templates",
        icon: <MessageSquare size={20} />,
        description: "Question Templates"
      }
    ]
  },
];

export const AppSidebar: FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

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
        className="absolute -right-3 top-6 z-50 bg-background border shadow-md hover:bg-primary/10"
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
      <div className="flex-1 px-3 py-4 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.href} className="w-full">
            <Button
              variant="light"
              className={cn(
                "w-full justify-start gap-2 h-11 px-4 mb-1",
                activeGroup === item.label && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveGroup(activeGroup === item.label ? null : item.label)}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Button>
            
            {!isCollapsed && activeGroup === item.label && item.children && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 flex flex-col gap-1"
              >
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href}>
                    <Button
                      variant="light"
                      className={cn(
                        "w-full justify-start gap-2 h-9 px-4",
                        pathname === child.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {child.icon}
                      <span className="font-medium">{child.label}</span>
                    </Button>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Settings Section */}
      <Divider className="my-2" />
      <div className="p-4">
        <Button
          variant="light"
          className="w-full justify-start gap-2 h-11"
          href="/settings"
          as={Link}
        >
          <Settings size={22} />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </Button>
      </div>
    </motion.div>
  );
};