import Modal from "../ui/Modal";
import type { AuditLog } from "../../api/types/audit";

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
          className="
            px-3 py-1.5 text-xs font-medium
            text-slate-600
            border border-slate-200
            hover:bg-slate-50
            transition-colors
          "
        >
          Close
        </button>
      }
    >
      {!audit ? (
        <p className="text-sm text-slate-500">No audit selected.</p>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Audit Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Timestamp
              </p>
              <p className="mt-1 text-slate-900">{audit.timestamp}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </p>
              <p className="mt-1 text-slate-900">{audit.action}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Entity
              </p>
              <p className="mt-1 text-slate-900">
                {audit.entity_type} #{audit.entity_id}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                User ID
              </p>
              <p className="mt-1 text-slate-900">
                {audit.user_id ?? "System"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Message
              </p>
              <p className="mt-1 text-slate-900">{audit.message}</p>
            </div>
          </div>

          {/* Changes */}
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 mb-2">
              Changes
            </h3>

            {audit.changes.length === 0 ? (
              <p className="text-sm text-slate-500">
                No recorded changes.
              </p>
            ) : (
              <div className="border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Field
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Old Value
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          New Value
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {audit.changes.map((change, index) => (
                        <tr
                          key={index}
                          className="border-t border-slate-100"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {change.field}
                          </td>

                          <td className="px-4 py-3 text-slate-500">
                            {change.old ?? "—"}
                          </td>

                          <td className="px-4 py-3 text-slate-500">
                            {change.new ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}