import type { Location } from "../../api/types/location";

interface Props {
  location: Location | null;
  onDelete: (id: number) => void;
}

export default function LocationDetails({
  location,
  onDelete,
}: Props) {
  if (!location) {
    return (
      <div className="border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
        Select a location.
      </div>
    );
  }

  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Location Details
        </h2>
      </div>

      <div className="px-4 py-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name
          </span>
          <span className="font-medium text-slate-900">
            {location.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Building
          </span>
          <span className="text-slate-600">
            {location.building}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Room
          </span>
          <span className="text-slate-600">
            {location.room_number}
          </span>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Description
          </p>
          <p className="text-slate-600">
            {location.description}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <button
          onClick={() =>
            onDelete(location.id)
          }
          className="
            px-3 py-1.5 border border-red-200
            text-xs font-semibold uppercase tracking-wide
            text-red-600
            transition-colors
            hover:bg-red-50 hover:border-red-300
          "
        >
          Delete Location
        </button>
      </div>
    </div>
  );
}