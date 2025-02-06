import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
}

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
