import type {
  MostBorrowedAsset,
  AssetUnderMaintenance,
  MaintenanceBacklogEntry,
  AverageRepairTime,
  OverdueAssignment,
  FrequentBorrower,
  AssetValueByCategory,
  AssetValueByDepartment,
  AssetCountByLocation,
  AssetStatusBreakdown,
  DepreciationReportEntry,
  NeverAssignedAsset,
  NeverInspectedAsset,
  InspectionCompletionRate,
  FlaggedInspectionAsset,
  PendingRequestSummary,
  AverageRequestFulfillmentTime,
  ReportDateRangeParams,
  ReportLimitParams,
} from "./types/reports";

const API_URL = import.meta.env.VITE_API_URL;

type ReportQueryParams = ReportLimitParams & ReportDateRangeParams;

async function getReport<T>(
  path: string,
  token: string,
  params?: ReportQueryParams
): Promise<T> {
  const query = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params) as [
      string,
      string | number | undefined
    ][]) {
      if (value !== undefined && value !== "") {
        query.set(key, String(value));
      }
    }
  }

  const qs = query.toString();

  const res = await fetch(
    `${API_URL}/reports/${path}${qs ? `?${qs}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Failed to fetch report");
  }

  return json.data as T;
}

export async function getMostBorrowedAssets(
  token: string,
  params?: ReportLimitParams & ReportDateRangeParams
): Promise<MostBorrowedAsset[]> {
  return getReport("most-borrowed", token, params);
}

export async function getAssetsUnderMaintenance(
  token: string
): Promise<AssetUnderMaintenance[]> {
  return getReport("maintenance/active", token);
}

export async function getMaintenanceBacklogSummary(
  token: string
): Promise<MaintenanceBacklogEntry[]> {
  return getReport("maintenance/backlog", token);
}

export async function getAverageRepairTime(
  token: string
): Promise<AverageRepairTime> {
  return getReport("maintenance/avg-repair-time", token);
}

export async function getOverdueAssignments(
  token: string
): Promise<OverdueAssignment[]> {
  return getReport("overdue", token);
}

export async function getFrequentBorrowers(
  token: string,
  params?: ReportLimitParams
): Promise<FrequentBorrower[]> {
  return getReport("frequent-borrowers", token, params);
}

export async function getAssetValueByCategory(
  token: string
): Promise<AssetValueByCategory[]> {
  return getReport("value/by-category", token);
}

export async function getAssetValueByDepartment(
  token: string
): Promise<AssetValueByDepartment[]> {
  return getReport("value/by-department", token);
}

export async function getAssetCountByLocation(
  token: string
): Promise<AssetCountByLocation[]> {
  return getReport("count/by-location", token);
}

export async function getAssetStatusBreakdown(
  token: string
): Promise<AssetStatusBreakdown[]> {
  return getReport("status-breakdown", token);
}

export async function getDepreciationReport(
  token: string
): Promise<DepreciationReportEntry[]> {
  return getReport("depreciation", token);
}

export async function getNeverAssignedAssets(
  token: string
): Promise<NeverAssignedAsset[]> {
  return getReport("never-assigned", token);
}

export async function getNeverInspectedAssets(
  token: string
): Promise<NeverInspectedAsset[]> {
  return getReport("never-inspected", token);
}

export async function getInspectionCompletionRate(
  token: string,
  params?: ReportDateRangeParams
): Promise<InspectionCompletionRate> {
  return getReport("inspections/completion-rate", token, params);
}

export async function getAssetsFlaggedByInspection(
  token: string
): Promise<FlaggedInspectionAsset[]> {
  return getReport("inspections/flagged", token);
}

export async function getPendingRequestsSummary(
  token: string,
  params?: ReportLimitParams
): Promise<PendingRequestSummary[]> {
  return getReport("requests/pending", token, params);
}

export async function getAverageRequestFulfillmentTime(
  token: string
): Promise<AverageRequestFulfillmentTime> {
  return getReport("requests/avg-fulfillment-time", token);
}