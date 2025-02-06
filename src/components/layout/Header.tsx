import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/b7c0e55a-a6be-48d9-ace3-b9d27962760e.png" alt="ATA Logo" className="h-8" />
          <span className="font-semibold text-ata-blue">Feedback System</span>
        </div>
      </div>
    </header>
  );
}