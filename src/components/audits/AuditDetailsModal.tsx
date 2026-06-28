// components/audits/AuditDetailsModal.tsx

import Modal from "../ui/Modal";
import type { AuditLog } from "../../api/audit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  audit: AuditLog | null;
}

export default function AuditDetailsModal({
  isOpen,
  onClose,
  audit,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Details"
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Close
        </button>
      }
    >
      {!audit ? (
        <p className="text-gray-500">No audit selected.</p>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Audit Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Timestamp</p>
              <p>{audit.timestamp}</p>
            </div>

            <div>
              <p className="text-gray-500">Action</p>
              <p>{audit.action}</p>
            </div>

            <div>
              <p className="text-gray-500">Entity</p>
              <p>
                {audit.entity_type} #{audit.entity_id}
              </p>
            </div>

            <div>
              <p className="text-gray-500">User ID</p>
              <p>{audit.user_id ?? "System"}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Message</p>
              <p>{audit.message}</p>
            </div>
          </div>

          {/* Changes */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">
              Changes
            </h3>

            {audit.changes.length === 0 ? (
              <p className="text-sm text-gray-500">
                No recorded changes.
              </p>
            ) : (
              <div className="overflow-x-auto border border-blue-200 rounded">
                <table className="min-w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="p-3 text-left">Field</th>
                      <th className="p-3 text-left">Old Value</th>
                      <th className="p-3 text-left">New Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    {audit.changes.map((change, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }
                      >
                        <td className="p-3 font-medium">
                          {change.field}
                        </td>

                        <td className="p-3">
                          {change.old ?? "—"}
                        </td>

                        <td className="p-3">
                          {change.new ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}