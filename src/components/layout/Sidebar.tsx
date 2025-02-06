import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChartPieIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    path: "/admin/dashboard",
    name: "Overview",
    icon: ChartPieIcon,
  },
  {
    path: "/admin/question",
    name: "Questions",
    icon: QuestionMarkCircleIcon,
  },
  {
    path: "/admin/feedback",
    name: "Feedback",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    path: "/admin/project",
    name: "Projects",
    icon: FolderIcon,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
        "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Sentiment
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            {collapsed ? (
              <ChevronDoubleRightIcon className="w-5 h-5" />
            ) : (
              <ChevronDoubleLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = router.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                      "hover:bg-gray-700/50",
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    {!collapsed && (
                      <span className="ml-3 text-sm font-medium">{item.name}</span>
                    )}
                    {isActive && (
                      <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <ul className="space-y-1">
            <li>
              <button
                className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <Cog6ToothIcon className="w-6 h-6" />
                {!collapsed && <span className="ml-3 text-sm">Settings</span>}
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                {!collapsed && <span className="ml-3 text-sm">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
