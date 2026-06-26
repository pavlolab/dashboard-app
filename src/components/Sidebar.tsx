import { NavLink } from 'react-router-dom';
import type { NavItem } from '../types/navigation';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { useUIStore } from '../store/uiStore';

const navItems: NavItem[] = [
  {
    id: 1,
    label: 'Dashboards',
    path: '/dashboards',
  },
  {
    id: 2,
    label: 'Projects',
    path: '/projects',
  },
  {
    id: 3,
    label: 'Tasks',
    path: '/tasks',
  },
  {
    id: 6,
    label: 'Board',
    path: '/board',
  },
  {
    id: 4,
    label: 'Calendar',
    path: '/calendar',
  },
  {
    id: 5,
    label: 'Settings',
    path: '/settings',
  },
];
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, userEmail } = useUIStore();
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <nav
        className={`
    fixed z-50
    flex flex-col w-64 h-full bg-gray-900 border-r border-gray-700
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
      >
        <div className="flex flex-row gap-9 my-4 mx-4">
          <IoCheckmarkDoneCircleOutline color="#f97316" size={40} />
          <span className="text-white font-extrabold text-2xl drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] ">
            TaskFlow
          </span>
        </div>
        <div className="flex-1">
          {navItems.map((nav) => (
            <NavLink
              to={nav.path}
              key={nav.id}
              onClick={() => {
                if (window.innerWidth < 1024) closeSidebar();
              }}
              className={({ isActive }) =>
                `block px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto text-white py-4 px-5 flex flex-row gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-sm font-bold text-gray-900">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="truncate">
            <p className="text-sm text-gray-400">{userEmail}</p>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Sidebar;
