import { useEffect, useState } from "react";
import AssignmentsTable from "../components/assignments/AssignmentsTable";
import Pagination from "../components/assignments/Pagination";
import { fetchAssignments, returnAssignment } from "../api/assignmentService";
import type { Assignment, Pagination as PaginationType, } from "../api/assignments";
import ReturnAssignmentModal from "../components/assignments/ReturnAssignmentModal";
import { useAuth } from "../auth/useAuth";
import type { User } from "../api/users";

import UserAssignmentSearch from "../components/assignments/UserAssignmentSearch";
import { fetchUserAssignments } from "../api/assignmentService";
import AppLoader from "../components/loading/AppLoader";

export default function AssignmentsPage() {
  const { token, user } = useAuth();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [pagination, setPagination] = useState<PaginationType | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    if (!token) return;

    loadAssignments(page);
  }, [token, page]);

  async function loadAssignments(
    pageNumber: number
  ) {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const result =
        await fetchAssignments(
          token,
          pageNumber,
          10
        );

      setAssignments(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load assignments"
      );
    } finally {
      setLoading(false);
    }
  }

    async function handleUserSelect(
    user: User
    ) {
    if (!token) return;

    try {
        setLoading(true);

        // setSelectedUser(user);

        const assignments =
        await fetchUserAssignments(
            user.id,
            token
        );

        setAssignments(assignments);

        setPagination(null);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    }
  async function handleReturnAssignment(
    assignmentId: number,
    returnNotes: string,
    conditionStatus: string
    ) {
    if (!token) return;

    await returnAssignment(
        assignmentId,
        { return_notes: returnNotes, condition_status: conditionStatus, processed_by: user!.id, },
        token
    );

    await loadAssignments(page);
    }
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Asset Assignments
        </h1>
        {token && (
          <UserAssignmentSearch
            token={token}
            onUserSelect={handleUserSelect}
          />
          )}
        <button
          onClick={() =>
            loadAssignments(page)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
        
      {/* Loading */}
      {loading && (
        <AppLoader />
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        assignments.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 text-gray-500">
            No assignments found.
          </div>
        )}

      {/* Table */}
      {!loading &&
        !error &&
        assignments.length > 0 && (
          <>
            <AssignmentsTable
              assignments={assignments}
              onReturn={(assignment) => {setSelectedAssignment(assignment); setShowReturnModal(true); }}
            />

            <Pagination
              currentPage={page}
              totalPages={
                pagination?.total_pages ?? 1
              }
              onPageChange={setPage}
            />
          </>
        )}
        <ReturnAssignmentModal
            isOpen={showReturnModal}
            assignment={selectedAssignment}
            onClose={() => {
                setShowReturnModal(false);
                setSelectedAssignment(null);
            }}
            onSubmit={handleReturnAssignment}
            />
    </div>
  );
}