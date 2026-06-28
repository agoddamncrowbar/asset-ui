import type { Location } from "../../api/location";

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
      <div className="rounded-lg border bg-white p-5">
        Select a location.
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="mb-4 font-medium">
        Location Details
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <strong>Name:</strong>{" "}
          {location.name}
        </div>

        <div>
          <strong>Building:</strong>{" "}
          {location.building}
        </div>

        <div>
          <strong>Room:</strong>{" "}
          {location.room_number}
        </div>

        <div>
          <strong>Description:</strong>{" "}
          {location.description}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <button
          onClick={() =>
            onDelete(location.id)
          }
          className="
            rounded-lg bg-red-600
            px-4 py-2 text-white
            hover:bg-red-700
          "
        >
          Delete Location
        </button>
      </div>
    </div>
  );
}