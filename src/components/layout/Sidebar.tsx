import React from 'react';
import Link from 'next/link';

export const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 shadow-md">
        <span className="text-xl font-semibold">Mae Orchestrator</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link href="/" className="block hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/agents" className="block hover:bg-gray-700 p-2 rounded">
          Agents
        </Link>
        <Link href="/knowledge-bases" className="block hover:bg-gray-700 p-2 rounded">
          Knowledge Bases
        </Link>
        <Link href="/profiles" className="block hover:bg-gray-700 p-2 rounded">
          Dynamic Profiles
        </Link>
        <Link href="/settings" className="block hover:bg-gray-700 p-2 rounded">
          Settings
        </Link>
      </nav>
    </div>
  );
};
