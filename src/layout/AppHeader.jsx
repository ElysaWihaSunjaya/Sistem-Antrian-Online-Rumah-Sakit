import { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import ThemeToggleButton from "../components/common/ThemeToggleButton";

export default function AppHeader() {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            onClick={handleToggle}
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6.22 7.28a.75.75 0 011.06 0L12 12l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 01-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"
                />
              </svg>
            ) : (
              <svg width="16" height="12" fill="none" viewBox="0 0 16 12">
                <path
                  fill="currentColor"
                  d="M0.58 1a.75.75 0 01.75-.75h13.33a.75.75 0 110 1.5H1.33a.75.75 0 01-.75-.75zM0.58 11a.75.75 0 01.75-.75h13.33a.75.75 0 110 1.5H1.33a.75.75 0 01-.75-.75zM1.33 5.25a.75.75 0 100 1.5h6.67a.75.75 0 100-1.5H1.33z"
                />
              </svg>
            )}
          </button>

          <Link to="/" className="lg:hidden text-2xl font-bold">
            Antrian<span className="text-sky-400">RS</span>
          </Link>
        </div>

        <div className="flex items-center justify-end w-full gap-4 px-5 py-4 lg:px-0">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
