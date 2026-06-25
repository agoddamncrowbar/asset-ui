import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { fetchUsers, type User } from "../../api/users";
import type { Asset } from "../../api/assets";
import { useAuth } from "../../auth/useAuth";
import { createAssignment } from "../../api/assignments";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
}

export default function AssignAssetModal({ isOpen, onClose, asset }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (!isOpen) return;

    async function loadUsers() {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [isOpen]);
  async function handleAssign() {
    if (!asset || !selectedUserId || !user) return;

    setSubmitting(true);

    try {
      await createAssignment({
        asset_id: asset.id,
        assigned_to: selectedUserId,
        assigned_by: user.id,
        expected_return_date: expectedReturnDate,
        notes,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Asset"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={submitting}
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded disabled:opacity-50"
          >
            {submitting ? "Assigning..." : "Assign"}
          </button>
        </>
      }
    >
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-gray-500">Asset</p>
        <p className="font-medium text-blue-700">
          {asset?.item_name}
        </p>
      </div>

      {/* USER SELECT */}
      <div>
        <p className="text-gray-500 mb-1">Select User</p>

        <select
          className="w-full border p-2 rounded"
          value={selectedUserId ?? ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
        >
          <option value="">Select user</option>

          {users
            .filter((u) => u.role !== "admin")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.first_name} {u.last_name} ({u.university_id})
              </option>
            ))}
        </select>
      </div>

      {/* RETURN DATE */}
      <div>
        <p className="text-gray-500 mb-1">Expected Return Date</p>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={expectedReturnDate}
          onChange={(e) => setExpectedReturnDate(e.target.value)}
        />
      </div>

      {/* NOTES */}
      <div>
        <p className="text-gray-500 mb-1">Notes</p>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
    </Modal>
  );
}

