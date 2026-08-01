import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Menu, User, LogOut, PlusSquare, LayoutDashboard, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
          NeedHub
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/marketplace" className="hover:text-primary-600 transition">Marketplace</Link>
          {user ? (
            <>
              <Link to="/chat" className="flex items-center gap-1 hover:text-primary-600 transition">
                <MessageSquare size={18} /> Chat
              </Link>
              <Link to="/create-requirement" className="flex items-center gap-1 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition">
                <PlusSquare size={18} /> Post Requirement
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img src={user.profilePicture || 'https://via.placeholder.com/40'} className="w-8 h-8 rounded-full border border-primary-500" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl hidden group-hover:block">
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to="/edit-profile" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;