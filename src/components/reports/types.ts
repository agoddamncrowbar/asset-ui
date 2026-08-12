export type ReportRow = Record<string, unknown>;

export type ReportKind = "table" | "stat";

export interface ReportColumn {
  key: string;
  label: string;
}

export interface ReportFetcherParams {
  limit?: number;
  from?: string;
  to?: string;
}

export interface ReportDefinition {
  id: string;
  label: string;
  group: string;
  kind: ReportKind;
  columns?: ReportColumn[];
  supportsLimit?: boolean;
  supportsDateRange?: boolean;
  fetcher: (
    token: string,
    params: ReportFetcherParams
  ) => Promise<ReportRow | ReportRow[]>;
}