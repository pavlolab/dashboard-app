import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useUIStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    login(email);
    navigate('/dashboards');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <IoCheckmarkDoneCircleOutline color="#f97316" size={40} />
          <span className="text-white font-extrabold text-2xl drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
            TaskFlow
          </span>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h1 className="text-white text-xl font-semibold mb-6 text-center">
            Sign in to your account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded py-2 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-6">
            Demo mode — use any email and a password with 4+ characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
