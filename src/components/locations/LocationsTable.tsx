import type { Location } from "../../api/types/location";

interface Props {
  locations: Location[];
  loading: boolean;
  onSelect: (id: number) => void;
}

export default function LocationsTable({
  locations,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Locations
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {locations.length} total
        </span>
      </div>

      {loading ? (
        <div className="p-6 text-sm text-slate-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Building
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Room
                </th>
              </tr>
            </thead>

            <tbody>
              {locations.map((location) => (
                <tr
                  key={location.id}
                  onClick={() =>
                    onSelect(location.id)
                  }
                  className="
                    cursor-pointer border-t border-slate-100
                    hover:bg-blue-50
                    transition-colors
                  "
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {location.name}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {location.building}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {location.room_number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}