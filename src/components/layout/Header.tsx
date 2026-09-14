import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        {/* Future: Search bar or other header elements */}
      </div>
      <div className="flex items-center">
        {/* Future: User dropdown, notifications etc. */}
        <span className="mr-2 text-gray-600">Admin User</span>
        {/* <img className="h-8 w-8 rounded-full object-cover" src="https://via.placeholder.com/150" alt="User avatar" /> */}
      </div>
    </header>
  );
};
