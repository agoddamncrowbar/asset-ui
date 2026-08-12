import type { Category } from "../../api/types/category";
import type { Department } from "../../api/types/department";
import type { Location } from "../../api/types/location";

/* ---------- Props ---------- */

interface Props {
  isAdmin: boolean;
  onCreate: () => void;

  /* Search */
  search: string;
  onSearchChange: (value: string) => void;

  /* Filter data */
  categories: Category[];
  departments: Department[];
  locations: Location[];

  /* Selected filters */
  categoryId?: number;
  departmentId?: number;
  locationId?: number;
  conditionStatus: string;
  assetStatus: string;

  /* Filter handlers */
  onCategoryChange: (value: number | undefined) => void;
  onDepartmentChange: (value: number | undefined) => void;
  onLocationChange: (value: number | undefined) => void;
  onConditionChange: (value: string) => void;
  onAssetStatusChange: (value: string) => void;
}

const fieldClasses = `
  border border-slate-200 px-3 py-2
  text-sm text-slate-900
  focus:outline-none focus:ring-1 focus:ring-slate-300
`;

export default function AssetsHeader({
  isAdmin,
  onCreate,

  search,
  onSearchChange,

  categories,
  departments,
  locations,

  categoryId,
  departmentId,
  locationId,

  conditionStatus,
  assetStatus,

  onCategoryChange,
  onDepartmentChange,
  onLocationChange,
  onConditionChange,
  onAssetStatusChange,
}: Props) {
  return (
    <div className="mb-6">
      {/* ---------- Top Row ---------- */}

      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Asset Inventory
        </h1>

        {isAdmin && (
          <button
            onClick={onCreate}
            className="
              w-full px-4 py-2 text-sm font-medium
              bg-slate-900 text-white
              hover:bg-slate-800
              transition-colors
              sm:w-auto
            "
          >
            Create Asset
          </button>
        )}
      </div>

      {/* ---------- Search & Filters ---------- */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
        <input
          type="text"
          value={search}
          placeholder="Search assets..."
          onChange={(e) => onSearchChange(e.target.value)}
          className={`
            ${fieldClasses}
            placeholder:text-slate-400
            sm:col-span-2
            lg:min-w-62.5 lg:flex-1
          `}
        />

        <select
          value={categoryId ?? ""}
          onChange={(e) =>
            onCategoryChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className={fieldClasses}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={departmentId ?? ""}
          onChange={(e) =>
            onDepartmentChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className={fieldClasses}
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          value={locationId ?? ""}
          onChange={(e) =>
            onLocationChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className={fieldClasses}
        >
          <option value="">All Locations</option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <select
          value={conditionStatus}
          onChange={(e) => onConditionChange(e.target.value)}
          className={fieldClasses}
        >
          <option value="">All Conditions</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
          <option value="damaged">Damaged</option>
        </select>

        <select
          value={assetStatus}
          onChange={(e) => onAssetStatusChange(e.target.value)}
          className={fieldClasses}
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="maintenance">Maintenance</option>
          <option value="retired">Retired</option>
        </select>
      </div>
    </div>
  );
}