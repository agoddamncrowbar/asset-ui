import type {
  AssetCondition,
  InspectionResult,
} from "../../api/inspection";
import type { User } from "../../api/users";
export interface AssetInspectionForm {
  result: InspectionResult;
  condition_after: AssetCondition;
  remarks: string;
  maintenance_priority: "low" | "medium" | "high";
  assigned_to: number | null;
  search: string;
  searchResults: User[];
}