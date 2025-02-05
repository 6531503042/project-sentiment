import { FC, ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-default-50">
          <div className="container mx-auto max-w-7xl p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
