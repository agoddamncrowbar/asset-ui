import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import AppLoader from "../components/loading/AppLoader";

import AuditHeader from "../components/audits/AuditHeader";
import AuditSearch from "../components/audits/AuditSearch";
import AuditTable from "../components/audits/AuditTable";
import AuditDetailsModal from "../components/audits/AuditDetailsModal";

import {
    getAuditSummaries,
  searchAuditLogs,
  getAuditLog,
  exportAuditLogs,
} from "../api/auditService";

import type { AuditSummary, AuditLog } from "../api/audit";

export default function Audits() {
  const { user, token } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [audits, setAudits] = useState<AuditSummary[]>([]);
  const [selectedAudit, setSelectedAudit] =
    useState<AuditLog | null>(null);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 30,
    offset: 0,
  });

  const limit = pagination.limit;
  const offset = pagination.offset;

  if (!isAdmin) {
    return (
      <div className="p-6 text-red-600">
        Unauthorized
      </div>
    );
  }

  async function loadAudits() {
  try {
    setLoading(true);

    const res = await getAuditSummaries(
      token!,
      pagination.limit,
      pagination.offset
    );

    setAudits(res.data);
    setPagination(res.pagination);
  } finally {
    setLoading(false);
  }
}

  async function handleSearch() {
    try {
      setSearchLoading(true);

      const res = await searchAuditLogs(
        token!,
        search,
        limit,
        0
      );

      setAudits(res.data);
      setPagination(res.pagination);
    } finally {
      setSearchLoading(false);
    }
  }

  async function handleView(id: number) {
    const audit = await getAuditLog(id, token!);
    setSelectedAudit(audit);
  }

  async function handleExport() {
    try {
      setExporting(true);
      await exportAuditLogs(token!);
    } finally {
      setExporting(false);
    }
  }

  function nextPage() {
    const newOffset = offset + limit;

    if (newOffset >= pagination.total) return;

    setPagination((p) => ({
      ...p,
      offset: newOffset,
    }));
  }

  function prevPage() {
    const newOffset = offset - limit;

    if (newOffset < 0) return;

    setPagination((p) => ({
      ...p,
      offset: newOffset,
    }));
  }

  useEffect(() => {
    loadAudits();
  }, [offset]);

  if (loading) return <AppLoader />;

  return (
    <div className="p-6 bg-white min-h-screen">
      <AuditHeader
        onExport={handleExport}
        loading={exporting}
      />

      <AuditSearch
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        loading={searchLoading}
      />

      <AuditTable
        audits={audits}
        onView={handleView}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-600">
          Total: {pagination.total}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={offset === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {offset / limit + 1}
          </span>

          <button
            onClick={nextPage}
            disabled={
              offset + limit >= pagination.total
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <AuditDetailsModal
        isOpen={!!selectedAudit}
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
      />
    </div>
  );
}