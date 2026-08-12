import {
  getMostBorrowedAssets,
  getAssetsUnderMaintenance,
  getMaintenanceBacklogSummary,
  getAverageRepairTime,
  getOverdueAssignments,
  getFrequentBorrowers,
  getAssetValueByCategory,
  getAssetValueByDepartment,
  getAssetCountByLocation,
  getAssetStatusBreakdown,
  getDepreciationReport,
  getNeverAssignedAssets,
  getNeverInspectedAssets,
  getInspectionCompletionRate,
  getAssetsFlaggedByInspection,
  getPendingRequestsSummary,
  getAverageRequestFulfillmentTime,
} from "../../api/reportsService";
import type { ReportDefinition, ReportRow } from "./types";

// Report service calls return specific typed shapes (MostBorrowedAsset[],
// OverdueAssignment[], etc). This page renders any report generically, so
// we intentionally erase that to ReportRow here rather than threading 16
// distinct types through the table/stat renderer.
function toRows<T>(promise: Promise<T>): Promise<ReportRow | ReportRow[]> {
  return promise as unknown as Promise<ReportRow | ReportRow[]>;
}

export const REPORTS: ReportDefinition[] = [
  {
    id: "most-borrowed",
    label: "Most borrowed assets",
    group: "Usage",
    kind: "table",
    supportsLimit: true,
    supportsDateRange: true,
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "times_borrowed", label: "Times borrowed" },
    ],
    fetcher: (token, params) => toRows(getMostBorrowedAssets(token, params)),
  },
  {
    id: "overdue",
    label: "Overdue assignments",
    group: "Usage",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "first_name", label: "First name" },
      { key: "last_name", label: "Last name" },
      { key: "expected_return_date", label: "Due date" },
      { key: "days_overdue", label: "Days overdue" },
    ],
    fetcher: (token) => toRows(getOverdueAssignments(token)),
  },
  {
    id: "frequent-borrowers",
    label: "Frequent borrowers",
    group: "Usage",
    kind: "table",
    supportsLimit: true,
    columns: [
      { key: "first_name", label: "First name" },
      { key: "last_name", label: "Last name" },
      { key: "role", label: "Role" },
      { key: "active_assignments", label: "Active assignments" },
    ],
    fetcher: (token, params) => toRows(getFrequentBorrowers(token, params)),
  },
  {
    id: "never-assigned",
    label: "Never assigned assets",
    group: "Usage",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "purchase_date", label: "Purchase date" },
      { key: "purchase_cost", label: "Cost" },
    ],
    fetcher: (token) => toRows(getNeverAssignedAssets(token)),
  },
  {
    id: "maintenance-active",
    label: "Assets under maintenance",
    group: "Maintenance",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "status", label: "Status" },
      { key: "priority", label: "Priority" },
      { key: "issue_report", label: "Issue" },
    ],
    fetcher: (token) => toRows(getAssetsUnderMaintenance(token)),
  },
  {
    id: "maintenance-backlog",
    label: "Maintenance backlog",
    group: "Maintenance",
    kind: "table",
    columns: [
      { key: "status", label: "Status" },
      { key: "priority", label: "Priority" },
      { key: "total", label: "Total" },
    ],
    fetcher: (token) => toRows(getMaintenanceBacklogSummary(token)),
  },
  {
    id: "avg-repair-time",
    label: "Average repair time",
    group: "Maintenance",
    kind: "stat",
    fetcher: (token) => toRows(getAverageRepairTime(token)),
  },
  {
    id: "value-by-category",
    label: "Asset value by category",
    group: "Inventory & value",
    kind: "table",
    columns: [
      { key: "name", label: "Category" },
      { key: "asset_count", label: "Assets" },
      { key: "total_value", label: "Total value" },
    ],
    fetcher: (token) => toRows(getAssetValueByCategory(token)),
  },
  {
    id: "value-by-department",
    label: "Asset value by department",
    group: "Inventory & value",
    kind: "table",
    columns: [
      { key: "name", label: "Department" },
      { key: "asset_count", label: "Assets" },
      { key: "total_value", label: "Total value" },
    ],
    fetcher: (token) => toRows(getAssetValueByDepartment(token)),
  },
  {
    id: "count-by-location",
    label: "Asset count by location",
    group: "Inventory & value",
    kind: "table",
    columns: [
      { key: "name", label: "Location" },
      { key: "building", label: "Building" },
      { key: "room_number", label: "Room" },
      { key: "asset_count", label: "Assets" },
    ],
    fetcher: (token) => toRows(getAssetCountByLocation(token)),
  },
  {
    id: "status-breakdown",
    label: "Asset status breakdown",
    group: "Inventory & value",
    kind: "table",
    columns: [
      { key: "asset_status", label: "Status" },
      { key: "total", label: "Total" },
    ],
    fetcher: (token) => toRows(getAssetStatusBreakdown(token)),
  },
  {
    id: "depreciation",
    label: "Depreciation report",
    group: "Inventory & value",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "category_name", label: "Category" },
      { key: "age_months", label: "Age (months)" },
      { key: "depreciation_period", label: "Depreciation period" },
    ],
    fetcher: (token) => toRows(getDepreciationReport(token)),
  },
  {
    id: "never-inspected",
    label: "Never inspected assets",
    group: "Inspections",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "condition_status", label: "Condition" },
    ],
    fetcher: (token) => toRows(getNeverInspectedAssets(token)),
  },
  {
    id: "inspection-completion-rate",
    label: "Inspection completion rate",
    group: "Inspections",
    kind: "stat",
    supportsDateRange: true,
    fetcher: (token, params) =>
      toRows(getInspectionCompletionRate(token, params)),
  },
  {
    id: "inspections-flagged",
    label: "Flagged by inspection",
    group: "Inspections",
    kind: "table",
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "result", label: "Result" },
      { key: "condition_after", label: "Condition after" },
      { key: "inspection_code", label: "Inspection" },
    ],
    fetcher: (token) => toRows(getAssetsFlaggedByInspection(token)),
  },
  {
    id: "requests-pending",
    label: "Pending requests",
    group: "Requests",
    kind: "table",
    supportsLimit: true,
    columns: [
      { key: "asset_tag", label: "Asset tag" },
      { key: "item_name", label: "Item" },
      { key: "pending_requests", label: "Pending requests" },
    ],
    fetcher: (token, params) => toRows(getPendingRequestsSummary(token, params)),
  },
  {
    id: "requests-avg-fulfillment",
    label: "Average fulfillment time",
    group: "Requests",
    kind: "stat",
    fetcher: (token) => toRows(getAverageRequestFulfillmentTime(token)),
  },
];

export const REPORT_GROUPS = Array.from(new Set(REPORTS.map((r) => r.group)));