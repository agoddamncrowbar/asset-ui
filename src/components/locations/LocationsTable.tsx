import type { Location } from "../../api/location";

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
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="border-b px-4 py-3">
        <h2 className="font-medium">
          Locations ({locations.length})
        </h2>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Name
              </th>
              <th className="px-4 py-3 text-left">
                Building
              </th>
              <th className="px-4 py-3 text-left">
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
                  cursor-pointer border-t
                  hover:bg-slate-50
                "
              >
                <td className="px-4 py-3">
                  {location.name}
                </td>

                <td className="px-4 py-3">
                  {location.building}
                </td>

                <td className="px-4 py-3">
                  {location.room_number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}