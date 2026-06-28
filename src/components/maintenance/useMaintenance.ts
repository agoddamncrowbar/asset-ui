import { useCallback, useEffect, useState } from "react";
import type { MaintenanceJob } from "../../api/maintenance";
import { getMaintenanceJobs } from "../../api/maintenanceService";

interface Props {
  token: string;
}

export function useMaintenance({ token }: Props) {
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [loading, setLoading] = useState(false);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMaintenanceJobs(token);

      setJobs(data);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to load maintenance jobs."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    loadJobs();
  }, [loadJobs, token]);

  return {
    jobs,
    loading,
    refreshJobs: loadJobs,
  };
}