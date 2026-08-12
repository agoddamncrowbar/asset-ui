import type {
  AssetCondition,
  InspectionResult,
} from "../../api/types/inspection";
import type { User } from "../../api/types/users";

export interface AssetInspectionForm {
  result: InspectionResult;
  condition_after: AssetCondition;
  remarks: string;
  requires_maintenance: boolean;
  maintenance_priority: "low" | "medium" | "high";
  assigned_to: number | null;
  search: string;
  searchResults: User[];
}