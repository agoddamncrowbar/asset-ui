import {  useState } from "react";
import Modal from "../ui/Modal";
import type {  User } from "../../api/users";
import type { Asset } from "../../api/assets";
import { useAuth } from "../../auth/useAuth";
import { createAssignment } from "../../api/assignmentService";
import { searchUsers } from "../../api/userService";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onAssigned: () => Promise<void>;
}

export default function AssignAssetModal({ isOpen, onClose, asset, onAssigned }: Props) {
  const { user, token } = useAuth();
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);

  const [selectedUser, setSelectedUser] =
  useState<User | null>(null);
  async function handleSearch() {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);

    try {
      const results = await searchUsers(
        search,
        token!
      );

      setSearchResults(
        results.filter(
          (u) => u.role !== "admin"
        )
      );
    } finally {
      setSearching(false);
    }
  }
  async function handleAssign() {
    if (!asset || !selectedUser || !user) {
      return;
    }

    setSubmitting(true);

    try {
      await createAssignment({
        asset_id: asset.id,
        assigned_to: selectedUser.id,
        assigned_by: user.id,
        expected_return_date: expectedReturnDate,
        notes,
      });

      await onAssigned();

      setSelectedUser(null);
      setSearch("");
      setSearchResults([]);
      setExpectedReturnDate("");
      setNotes("");

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

      {/* USER SEARCH */}
      <div>
        <p className="text-gray-500 mb-1">
          Search User
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="University ID or Name"
            className="
              flex-1 border p-2 rounded
            "
          />

          <button
            onClick={handleSearch}
            disabled={searching}
            className="
              px-4 py-2 rounded
              bg-blue-600 text-white
            "
          >
            {searching
              ? "Searching..."
              : "Search"}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div
            className="
              mt-2 max-h-48 overflow-y-auto
              border rounded
            "
          >
            {searchResults.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  setSelectedUser(u);
                  setSearchResults([]);
                  setSearchResults([]);
                }}
                className="
                  w-full text-left
                  px-3 py-2 border-b
                  hover:bg-slate-50
                "
              >
                {u.first_name} {u.last_name}
                {" "}
                ({u.university_id})
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedUser && (
        <div className="rounded border bg-slate-50 p-3">
          <p className="font-medium">
            Selected User
          </p>

          <p>
            {selectedUser.first_name}
            {" "}
            {selectedUser.last_name}
          </p>

          <p className="text-sm text-slate-500">
            {selectedUser.university_id}
          </p>
        </div>
      )}

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

