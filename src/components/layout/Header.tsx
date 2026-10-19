import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
export default function Header() {
  const { user, token, logout, refreshUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Assignments", href: "/assignments", isAdmin: true },
    { label: "Requests", href: "/requests" },
    { label: "Assets", href: "/assets" },
  ];

  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
  }, [token]);

  return (
    <header className="w-full bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            (item.isAdmin === undefined || item.isAdmin === isAdmin) && (
              <Link
                key={item.label}
                to={item.href}
                className="
                  relative px-3 py-2
                  text-slate-600
                hover:text-blue-700
                hover:bg-blue-50
                transition-colors
                after:content-['']
                after:absolute
                after:left-3
                after:right-3
                after:-bottom-px
                after:h-0.5
                after:bg-yellow-400
                after:scale-x-0
                hover:after:scale-x-100
                after:transition-transform
                after:origin-left
              "
            >
              {item.label}
            </Link>
          )))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 border-r border-slate-200 pr-3">
            {user ? user.first_name : "Loading..."}
          </span>

          <button
            onClick={logout}
            className="text-sm font-medium text-slate-600 hover:text-blue-700 px-3 py-1.5 border border-slate-300 hover:border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Logout
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-blue-700 text-2xl leading-none px-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 border-b border-slate-100 last:border-b-0 transition-colors"
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