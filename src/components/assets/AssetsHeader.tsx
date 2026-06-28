import type { Category } from "../../api/category";
import type { Department } from "../../api/department";
import type { Location } from "../../api/location";

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

        <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-700">
            Asset Inventory
        </h1>

        {isAdmin && (
            <button
            onClick={onCreate}
            className="
                px-4 py-2 rounded
                bg-blue-600 text-white
                hover:bg-blue-700
            "
            >
            Create Asset
            </button>
        )}
        </div>

        {/* ---------- Search & Filters ---------- */}

        <div className="flex flex-wrap gap-3">
        <input
            type="text"
            value={search}
            placeholder="Search assets..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="
            min-w-62.5
            flex-1
            border rounded px-3 py-2
            "
        />

        <select
            value={categoryId ?? ""}
            onChange={(e) =>
            onCategoryChange(
                e.target.value
                ? Number(e.target.value)
                : undefined
            )
            }
            className="border rounded px-3 py-2"
        >
            <option value="">All Categories</option>

            {categories.map((category) => (
            <option
                key={category.id}
                value={category.id}
            >
                {category.name}
            </option>
            ))}
        </select>

        <select
            value={departmentId ?? ""}
            onChange={(e) =>
            onDepartmentChange(
                e.target.value
                ? Number(e.target.value)
                : undefined
            )
            }
            className="border rounded px-3 py-2"
        >
            <option value="">All Departments</option>

            {departments.map((department) => (
            <option
                key={department.id}
                value={department.id}
            >
                {department.name}
            </option>
            ))}
        </select>

        <select
            value={locationId ?? ""}
            onChange={(e) =>
            onLocationChange(
                e.target.value
                ? Number(e.target.value)
                : undefined
            )
            }
            className="border rounded px-3 py-2"
        >
            <option value="">All Locations</option>

            {locations.map((location) => (
            <option
                key={location.id}
                value={location.id}
            >
                {location.name}
            </option>
            ))}
        </select>

        <select
            value={conditionStatus}
            onChange={(e) =>
            onConditionChange(e.target.value)
            }
            className="border rounded px-3 py-2"
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
            onChange={(e) =>
            onAssetStatusChange(e.target.value)
            }
            className="border rounded px-3 py-2"
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