import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
export default function Header() {
  const { user, token, logout, refreshUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Assignments", href: "/assignments" },
    { label: "Requests", href: "/requests" },
    { label: "Assets", href: "/assets" },
  ];
  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
  }, [token]);

  return (
    <header className="w-full bg-white text-gray-900 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/"><img
            src="/images/logo.png"
            alt="logo"
            className="h-19 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="
                relative
                text-blue-700
                hover:text-yellow-500
                transition
                after:content-['']
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-0.5
                after:w-0
                after:bg-yellow-400
                hover:after:w-full
                after:transition-all
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {user ? user.first_name : "Loading..."}
          </span>

          <button
            onClick={logout}
            className="text-sm text-yellow-300 hover:text-yellow-400"
          >
            Logout
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-blue-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1f2f73] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block text-blue-200 hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}