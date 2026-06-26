import { useUIStore } from '../store/uiStore';
const SettingsPage = () => {
  const { theme, toggleTheme, language, setLanguage } = useUIStore();
  return (
    <div className="p-6 ">
      <h1 className="text-white text-2xl font-semibold mb-6 text-left">
        Settings
      </h1>
      <div className="max-w-2xl mx-auto">
        {' '}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-4">
          <h2 className="text-white font-medium mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center text-xl font-bold text-gray-900">
              A
            </div>
            <div>
              <p className="text-white font-medium">Alex Johnson</p>
              <p className="text-gray-400 text-sm">alex@example.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Alex Johnson"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              />
            </div>
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors text-sm">
              Save Changes
            </button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-4">
          <h2 className="text-white font-medium mb-4">Appearance</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Theme</p>
              <p className="text-gray-400 text-xs mt-1">
                Dark mode only · Light mode coming soon
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-orange-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-1' : '-translate-x-5'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white font-medium mb-4">Language</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                language === 'en'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('uk')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                language === 'uk'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Українська
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3">Coming soon</p>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
