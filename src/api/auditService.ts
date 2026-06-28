// api/auditService.ts

import type {
  AuditLog,
  AuditSummary,
  Pagination,
} from "./audit";

const API_URL = "http://localhost/asset_backend/api";

interface AuditSummaryResponse {
  success: boolean;
  data: AuditSummary[];
  pagination: Pagination;
}

interface AuditLogResponse {
  success: boolean;
  data: AuditLog[];
  pagination: Pagination;
}

interface SingleAuditResponse {
  success: boolean;
  data: AuditLog;
}

export async function getAuditSummaries(
  token: string,
  limit = 30,
  offset = 0
): Promise<AuditSummaryResponse> {
  const response = await fetch(
    `${API_URL}/audit-log-summaries?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch audit summaries");
  }

  return data;
}


export async function getAuditLogs(
  token: string,
  limit = 30,
  offset = 0
): Promise<AuditLogResponse> {
  const response = await fetch(
    `${API_URL}/audit-logs?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch audit logs");
  }

  return data;
}

export async function getAuditLog(
  id: number,
  token: string
): Promise<AuditLog> {
  const response = await fetch(
    `${API_URL}/audit-logs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: SingleAuditResponse = await response.json();

  if (!response.ok) {
    throw new Error(data["message"] || "Failed to fetch audit log");
  }

  return data.data;
}
export async function exportAuditLogs(token: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/audit-log-export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to export audit logs");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, "-");

  link.download = `audit-logs-${timestamp}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

// api/auditService.ts

export interface AuditSearchResponse {
  success: boolean;
  data: AuditSummary[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export async function searchAuditLogs(
  token: string,
  query: string,
  limit = 10,
  offset = 0
): Promise<AuditSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    offset: String(offset),
  });

  const response = await fetch(
    `${API_URL}/audit-search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to search audit logs"
    );
  }

  return data;
}