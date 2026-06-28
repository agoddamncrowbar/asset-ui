import type {
  CompleteMaintenanceJob,
  CreateMaintenanceJob,
  MaintenanceJob,
  UpdateMaintenanceJob,
} from "./maintenance";

const API = import.meta.env.VITE_API_URL;

/**
 * Custom API error that preserves the HTTP status code.
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Handles API responses consistently.
 */
async function handleResponse<T>(
  res: Response
): Promise<T> {
  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.message ?? "An unexpected error occurred.",
      res.status
    );
  }

  return json.data;
}

/**
 * Create a maintenance job.
 */
export async function createMaintenanceJob(
  data: CreateMaintenanceJob,
  token: string
): Promise<MaintenanceJob> {
  const res = await fetch(`${API}/maintenance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse<MaintenanceJob>(res);
}

/**
 * Fetch all maintenance jobs.
 */
export async function getMaintenanceJobs(
  token: string
): Promise<MaintenanceJob[]> {
  const res = await fetch(`${API}/maintenance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<MaintenanceJob[]>(res);
}

/**
 * Fetch a single maintenance job.
 */
export async function getMaintenanceJob(
  id: number,
  token: string
): Promise<MaintenanceJob> {
  const res = await fetch(
    `${API}/maintenance/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse<MaintenanceJob>(res);
}

/**
 * Start a maintenance job.
 */
export async function startMaintenanceJob(
  id: number,
  token: string
): Promise<MaintenanceJob> {
  const res = await fetch(
    `${API}/maintenance/${id}/start`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse<MaintenanceJob>(res);
}

/**
 * Update a maintenance job.
 */
export async function updateMaintenanceJob(
  id: number,
  data: UpdateMaintenanceJob,
  token: string
): Promise<MaintenanceJob> {
  const res = await fetch(
    `${API}/maintenance/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse<MaintenanceJob>(res);
}

/**
 * Complete a maintenance job.
 */
export async function completeMaintenanceJob(
  id: number,
  data: CompleteMaintenanceJob,
  token: string
): Promise<MaintenanceJob> {
  const res = await fetch(
    `${API}/maintenance/${id}/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse<MaintenanceJob>(res);
}