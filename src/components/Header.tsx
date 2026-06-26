import { TfiBell } from 'react-icons/tfi';
import { TfiHelpAlt } from 'react-icons/tfi';
import { TfiMenu } from 'react-icons/tfi';
import { TfiClose } from 'react-icons/tfi';
import { TfiSearch } from 'react-icons/tfi';
import { useState, useRef, useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import { useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    userEmail,
    logout,
  } = useUIStore();
  const location = useLocation();
  const isTasksPage = location.pathname === '/tasks';
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const notifications = [
    {
      id: 1,
      text: 'Task "Design Dashboard" is overdue',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      text: 'New task assigned to you',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      text: 'Project "Website" was updated',
      time: '3 hours ago',
      unread: false,
    },
  ];
  const notificationsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setIsContactsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-row w-full justify-between h-12 items-center px-4 bg-gray-900  text-white border-b border-gray-700">
      <div className="flex items-center">
        <button
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
          onClick={() => {
            toggleSidebar();
          }}
        >
          {isSidebarOpen ? <TfiClose size={20} /> : <TfiMenu size={20} />}
        </button>
      </div>
      {isTasksPage ? (
        <div className="flex flex-row gap-2 items-center bg-gray-700 px-3 py-1 rounded-lg border border-gray-600 focus-within:border-orange-400">
          <TfiSearch />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search tasks..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-48 md:w-64 placeholder-gray-400 text-white"
          />

          {searchQuery && (
            <button
              onClick={clearSearchQuery}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <TfiClose size={12} />
            </button>
          )}
        </div>
      ) : (
        <div />
      )}
      <div className="flex flex-row gap-6 items-center">
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative text-gray-300 hover:text-white transition-colors"
          >
            <TfiBell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 top-8 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-white font-medium">Notifications</span>
                <span className="text-xs text-orange-400">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-gray-700">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-gray-700 transition-colors ${n.unread ? 'bg-gray-700/40' : ''}`}
                  >
                    <p className="text-sm text-gray-200">{n.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={helpRef}>
          <button
            className="relative text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsContactsOpen(!isContactsOpen)}
          >
            <TfiHelpAlt size={20} />
          </button>
          {isContactsOpen && (
            <div className="absolute right-0 top-8 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-white font-medium">Help & Shortcuts</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Keyboard Shortcuts
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">New task</span>
                      <div className="flex gap-1">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          Ctrl
                        </span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          M
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">
                        Toggle sidebar
                      </span>
                      <div className="flex gap-1">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          Ctrl
                        </span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          B
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    What's New
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-300">
                        Task filters added
                      </p>
                      <p className="text-xs text-gray-500">June 2, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        Dashboard charts improved
                      </p>
                      <p className="text-xs text-gray-500">May 28, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Dark mode support</p>
                      <p className="text-xs text-gray-500">May 20, 2026</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Support
                  </p>

                  <a
                    href="mailto:support@taskflow.com"
                    className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Contact support →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative border-l border-gray-700 pl-4"
          ref={profileRef}
        >
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex flex-row gap-3 items-center hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-sm font-bold text-gray-900">
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-10 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-white text-sm font-medium truncate">
                  {userEmail}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-700 py-1">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
