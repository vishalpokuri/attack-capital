"use client";

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MainContent from '@/components/dashboard/MainContent';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('logs');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MainContent activeSection={activeSection} />
    </div>
  );
}