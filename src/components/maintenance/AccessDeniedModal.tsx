import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export default function AccessDeniedModal({
  isOpen,
  onClose,
  redirectTo = "/dashboard",
}: Props) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          navigate(redirectTo);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, navigate, onClose, redirectTo]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Access Denied"
    >
      <div className="space-y-4">
        <p className="text-slate-700">
          You are not authorized to perform this
          maintenance job.
        </p>

        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="font-semibold text-red-700">
            Redirecting to dashboard in{" "}
            {countdown}...
          </p>
        </div>
      </div>
    </Modal>
  );
}