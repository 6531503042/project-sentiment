import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export const Header: FC = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-8 gap-8">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-lg">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-50 pl-10 pr-4 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <UserCircleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">John Doe</span>
          </Button>
        </div>
      </div>
    </header>
  );
};