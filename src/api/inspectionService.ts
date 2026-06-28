import type {
  AssetCondition,
  Inspection,
  InspectionResult,
  InspectionResultRecord,
} from "./inspection";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreateInspectionPayload {
  scheduled_date: string;
  notes: string;
  created_by: number;
  asset_ids: number[];
}

export interface CompleteInspectionPayload {
  user_id: number;
}

export interface RecordInspectionResultPayload {
  result: InspectionResult;
  condition_after: AssetCondition;
  remarks: string;
}

/**
 * Get All Inspections
 */
export async function getInspections(
  token: string
): Promise<Inspection[]> {
  const res = await fetch(
    `${API_URL}/inspections`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to fetch inspections"
    );
  }

  return json.data ?? [];
}

/**
 * Get Single Inspection
 */
export async function getInspection(
  inspectionId: number,
  token: string
): Promise<Inspection | null> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to fetch inspection"
    );
  }

  return json.data ?? null;
}
/**
 * Create Inspection
 */
export async function createInspection(
  data: CreateInspectionPayload,
  token: string
): Promise<Inspection> {
  const res = await fetch(
    `${API_URL}/inspections`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to create inspection"
    );
  }

  return json.data;
}

/**
 * Start Inspection
 */
export async function startInspection(
  inspectionId: number,
  token: string
): Promise<Inspection> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}/start`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to start inspection"
    );
  }

  return json.data;
}

/**
 * Complete Inspection
 */
export async function completeInspection(
  inspectionId: number,
  data: CompleteInspectionPayload,
  token: string
): Promise<Inspection> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to complete inspection"
    );
  }

  return json.data;
}

/**
 * Record Result For One Asset
 */
export async function recordInspectionResult(
  inspectionId: number,
  assetId: number,
  data: RecordInspectionResultPayload,
  token: string
): Promise<InspectionResultRecord> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}/assets/${assetId}/result`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to record inspection result"
    );
  }

  return json.data;
}

/**
 * 
 * cancel inspections
 */
export async function cancelInspection(
  inspectionId: number,
  userId: number,
  token: string
): Promise<Inspection> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to cancel inspection"
    );
  }

  return json.data;
}


/**
 * Get assets from inspection id
 */
export async function getInspectionAssets(
  inspectionId: number,
  token: string
): Promise<number[]> {
  const res = await fetch(
    `${API_URL}/inspections/${inspectionId}/assets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message || "Failed to fetch inspection assets"
    );
  }

  return json.data ?? [];
}