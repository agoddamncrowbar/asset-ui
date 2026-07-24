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
    name:"Inspection",
    path:"/inspections",
    description:"Asset Inspection Lifecycle",
    adminOnly:true,
  },
  {
    name: "Categories",
    path: "/categories",
    description: "Asset classification",
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
    adminOnly: true,
  },
  {
    name: "Users",
    path: "/users",
    description: "User management and roles",
    adminOnly: true,
  },
  {
    name: "Locations",
    path: "/locations",
    description: "Manage asset locations",
    adminOnly: true,
  },
  {
    name: "Maintenance",
    path: "/maintenance",
    description: "Asset Maintenance",
    adminOnly: true,
  }
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

          <Link
            to={"/audits"}
            className="text-sm font-medium text-slate-600 hover:text-blue-700 px-4 py-2 border border-slate-300 hover:border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Audits
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-px bg-slate-200 border border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {visibleModules.map((mod) => (
            <Link
              key={mod.name}
              to={mod.path}
              className="
                group relative bg-white p-6
                hover:bg-blue-50 transition-colors duration-150
              "
            >
              <div className="flex items-start justify-between">
                <h2 className="text-base font-semibold tracking-tight text-slate-900 group-hover:text-blue-700">
                  {mod.name}
                </h2>

                <span className="h-1.5 w-1.5 mt-2 bg-yellow-400" />
              </div>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {mod.description}
              </p>

              <div className="mt-5 flex items-center text-xs font-medium uppercase tracking-wide text-slate-400 group-hover:text-blue-700">
                Open
                <span className="ml-1 transition-transform duration-150 group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}