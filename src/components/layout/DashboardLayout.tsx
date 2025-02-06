
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
