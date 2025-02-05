import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
  Accordion,
  AccordionItem,
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
  ListChecks,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: JSX.Element;
  items: {
    label: string;
    href: string;
    icon: JSX.Element;
  }[];
}

const adminNavItems: NavItem[] = [
  {
    label: "Projects",
    icon: <BarChart2 size={22} />,
    items: [
      {
        label: "Dashboard",
        href: "/admin/projects/dashboard",
        icon: <LayoutDashboard size={18} />
      },
      {
        label: "Manage",
        href: "/admin/projects/manage",
        icon: <ClipboardList size={18} />
      }
    ]
  },
  {
    label: "Questions",
    icon: <MessageSquare size={22} />,
    items: [
      {
        label: "Dashboard",
        href: "/admin/questions/dashboard",
        icon: <LayoutDashboard size={18} />
      },
      {
        label: "Manage",
        href: "/admin/questions/manage",
        icon: <ListChecks size={18} />
      }
    ]
  },
  {
    label: "Feedback",
    icon: <MessageCircle size={22} />,
    items: [
      {
        label: "Dashboard",
        href: "/admin/feedback/dashboard",
        icon: <LayoutDashboard size={18} />
      },
      {
        label: "Manage",
        href: "/admin/feedback/manage",
        icon: <ClipboardList size={18} />
      }
    ]
  }
];

export const AppSidebar: FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

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
      <div className="flex-1 px-4 py-2 flex flex-col gap-1 overflow-y-auto">
        {!isCollapsed ? (
          <Accordion 
            selectionMode="multiple" 
            className="px-0"
            defaultExpandedKeys={["0", "1", "2"]}
            itemClasses={{
              base: "py-0 w-full",
              title: "font-normal text-base",
              trigger: "px-2 py-2 data-[hover=true]:bg-default-100 rounded-lg h-12",
              indicator: "text-medium",
              content: "pt-1 pb-2 px-2"
            }}
          >
            {adminNavItems.map((section, index) => (
              <AccordionItem
                key={index}
                aria-label={section.label}
                title={
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span>{section.label}</span>
                  </div>
                }
                indicator={<ChevronDown size={18} />}
              >
                <div className="flex flex-col gap-1 pl-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, translateX: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className={`w-full justify-start gap-2 h-10 ${
                            isActive(item.href)
                              ? 'bg-primary text-white'
                              : 'bg-transparent hover:bg-default-100'
                          }`}
                          variant={isActive(item.href) ? "solid" : "light"}
                          startContent={item.icon}
                          size="sm"
                        >
                          {item.label}
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          // Collapsed view
          <div className="flex flex-col items-center gap-2">
            {adminNavItems.map((section, index) => (
              <Tooltip
                key={index}
                content={section.label}
                placement="right"
                delay={200}
              >
                <Button
                  isIconOnly
                  variant="light"
                  className="w-12 h-12"
                >
                  {section.icon}
                </Button>
              </Tooltip>
            ))}
          </div>
        )}
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