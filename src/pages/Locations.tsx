import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Location } from "../api/types/location";

import {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation,
  type CreateLocationPayload,
} from "../api/locationService";

import LocationsTable from "../components/locations/LocationsTable";
import LocationDetails from "../components/locations/LocationDetails";
import CreateLocationModal from "../components/locations/CreateLocationModal";

export default function LocationsPage() {
  const { token } = useAuth();

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    try {
      setLoading(true);

      const data = await getLocations(token!);

      setLocations(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectLocation(
    id: number
  ) {
    const location = await getLocation(
      id,
      token!
    );

    setSelectedLocation(location);
  }

  async function handleCreateLocation(
    data: CreateLocationPayload
  ) {
    try {
      setCreating(true);

      await createLocation(data, token!);

      setCreateModalOpen(false);

      await loadLocations();
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteLocation(
    id: number
  ) {
    const confirmed = window.confirm(
      "Delete this location?"
    );

    if (!confirmed) {
      return;
    }

    await deleteLocation(id, token!);

    setLocations((current) =>
      current.filter(
        (location) => location.id !== id
      )
    );

    if (selectedLocation?.id === id) {
      setSelectedLocation(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-slate-900">
              Locations
            </h1>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Manage asset locations.
            </p>
          </div>

          <button
            onClick={() =>
              setCreateModalOpen(true)
            }
            className="
              px-3 py-1.5 border border-slate-200
              text-xs font-semibold uppercase tracking-wide
              text-slate-600
              transition-colors
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200
            "
          >
            Create Location
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <LocationsTable
            locations={locations}
            loading={loading}
            onSelect={
              handleSelectLocation
            }
          />

          <LocationDetails
            location={selectedLocation}
            onDelete={
              handleDeleteLocation
            }
          />
        </div>
      </div>

      <CreateLocationModal
        open={createModalOpen}
        loading={creating}
        onClose={() =>
          setCreateModalOpen(false)
        }
        onSubmit={
          handleCreateLocation
        }
      />
    </div>
  );
}