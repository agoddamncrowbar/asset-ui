import { useEffect, useState } from "react";
import type { Asset } from "../../api/assets";
import type { Inspection } from "../../api/inspection";
import type { AssetInspectionForm } from "./types";

import {
  getInspectionAssets,
} from "../../api/inspectionService";

import { fetchAssetById } from "../../api/assetService";

interface Props {
  isOpen: boolean;
  inspection: Inspection | null;
  token: string;
}

export function useInspectionAssets({
  isOpen,
  inspection,
  token,
}: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [forms, setForms] = useState<
    Record<number, AssetInspectionForm>
  >({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !inspection) return;

    loadAssets();
  }, [isOpen, inspection]);

  async function loadAssets() {
    try {
      setLoading(true);

      const assetIds = await getInspectionAssets(
        inspection!.id,
        token
      );

      const fetchedAssets = await Promise.all(
        assetIds.map(fetchAssetById)
      );

      setAssets(fetchedAssets);

      const initialForms: Record<
        number,
        AssetInspectionForm
      > = {};

      fetchedAssets.forEach((asset) => {
        initialForms[asset.id] = {
          result: "ok",
          condition_after: "excellent",
          remarks: "",

          maintenance_priority: "medium",
          assigned_to: null,

          search: "",
          searchResults: [],
        };
      });

      setForms(initialForms);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to load inspection assets."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateForm<K extends keyof AssetInspectionForm>(
    assetId: number,
    field: K,
    value: AssetInspectionForm[K]
  ) {
    setForms((prev) => ({
      ...prev,
      [assetId]: {
        ...prev[assetId],
        [field]: value,
      },
    }));
  }

  return {
    assets,
    forms,
    loading,
    updateForm,
  };
}