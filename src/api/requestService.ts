import type {
  AssetRequest,
  CreateRequestPayload,
  ApproveRequestPayload,
} from "./requests";


const API_URL = import.meta.env.VITE_API_URL;
export async function createRequest(
  data: CreateRequestPayload,
  token: string
): Promise<AssetRequest> {
  const res = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create request");
  }

  const json = await res.json();

  return json.data;
}

export async function approveRequest(
  requestId: number,
  data: ApproveRequestPayload,
  token: string
): Promise<AssetRequest> {
  const res = await fetch(
    `${API_URL}/requests/${requestId}/approve`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to approve request");
  }

  const json = await res.json();

  return json.data;
}

export async function getAssetRequestQueue(
  assetId: number,
  token: string
): Promise<AssetRequest[]> {
  const res = await fetch(
    `${API_URL}/requests/asset/${assetId}/queue`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch request queue");
  }

  const json = await res.json();

  return json.data;
}

export async function getNextAssetRequest(
  assetId: number,
  token: string
): Promise<AssetRequest | null> {
  const res = await fetch(
    `${API_URL}/requests/asset/${assetId}/next`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch next request");
  }

  const json = await res.json();

  return json.data;
}
