import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Department } from "../api/department";

import {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  type CreateDepartmentPayload,
} from "../api/departmentService";

import DepartmentsTable from "../components/departments/DepartmentsTable";
import DepartmentDetails from "../components/departments/DepartmentDetails";
import CreateDepartmentModal from "../components/departments/CreateDepartmentModal";

export default function DepartmentsPage() {
  const { token } = useAuth();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      setLoading(true);

      const data = await getDepartments(token!);

      setDepartments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectDepartment(id: number) {
    try {
      const department = await getDepartment(
        id,
        token!
      );

      setSelectedDepartment(department);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateDepartment(
    data: CreateDepartmentPayload
  ) {
    try {
      setCreating(true);

      await createDepartment(data, token!);

      setCreateModalOpen(false);

      await loadDepartments();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create department"
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteDepartment(
    id: number
  ) {
    const confirmed = window.confirm(
      "Delete this department?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDepartment(id, token!);

      setDepartments((current) =>
        current.filter(
          (department) => department.id !== id
        )
      );

      if (selectedDepartment?.id === id) {
        setSelectedDepartment(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete department"
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Departments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage departments and schools.
            </p>
          </div>

          <button
            onClick={() =>
              setCreateModalOpen(true)
            }
            className="
              rounded-lg bg-blue-600
              px-4 py-2 text-white
              hover:bg-blue-700
            "
          >
            Create Department
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <DepartmentsTable
            departments={departments}
            loading={loading}
            onSelect={
              handleSelectDepartment
            }
          />

          <DepartmentDetails
            department={selectedDepartment}
            onDelete={
              handleDeleteDepartment
            }
          />
        </div>
      </div>

      <CreateDepartmentModal
        open={createModalOpen}
        loading={creating}
        onClose={() =>
          setCreateModalOpen(false)
        }
        onSubmit={
          handleCreateDepartment
        }
      />
    </div>
  );
}