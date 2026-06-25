import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
const modules = [
  {
    name: "Assets",
    path: "/assets",
    description: "Manage all system assets",
    adminOnly: false,
  },
  {
    name: "Categories",
    path: "/categories",
    description: "Asset classification and grouping",
    adminOnly: true,
  },
  {
    name: "Requests",
    path: "/requests",
    description: "View and process asset requests",
    adminOnly: false,
  },
  {
    name: "Departments",
    path: "/departments",
    description: "Organizational structure",
    adminOnly: true,
  },
  {
    name: "Assignments",
    path: "/assignments",
    description: "Track asset allocations",
    adminOnly: false,
  },
  {
    name: "Users",
    path: "/users",
    description: "User management and roles",
    adminOnly: true,
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const visibleModules = modules.filter((mod) => {
    if (!mod.adminOnly) return true;
    return user?.role?.toLowerCase() === "admin";
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-blue-700">
            Asset Management Dashboard
          </h1>

          <div className="text-sm text-slate-500">Overview</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleModules.map((mod) => (
            <Link
              key={mod.name}
              to={mod.path}
              className="
                group rounded-xl border border-slate-200 bg-white p-6
                hover:border-blue-500 hover:shadow-md transition
              "
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-slate-900 group-hover:text-blue-700">
                  {mod.name}
                </h2>

                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 mt-2" />
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {mod.description}
              </p>

              <div className="mt-4 text-sm text-blue-600 font-medium">
                Open →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}