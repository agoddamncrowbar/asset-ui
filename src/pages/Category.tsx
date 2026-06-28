import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

import type { Category } from "../api/category";

import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  type CreateCategoryPayload,
} from "../api/categoryService";

import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryDetails from "../components/categories/CategoryDetails";
import CreateCategoryModal from "../components/categories/CreateCategoryModal";

export default function CategoriesPage() {
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories(token!);

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectCategory(id: number) {
    try {
      const category = await getCategory(
        id,
        token!
      );

      setSelectedCategory(category);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateCategory(
    data: CreateCategoryPayload
  ) {
    try {
      setCreating(true);

      await createCategory(data, token!);

      setCreateModalOpen(false);

      await loadCategories();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create category"
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteCategory(
    id: number
  ) {
    const confirmed = window.confirm(
      "Delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id, token!);

      setCategories((current) =>
        current.filter(
          (category) => category.id !== id
        )
      );

      if (selectedCategory?.id === id) {
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete category"
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Categories
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage asset categories.
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
            Create Category
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <CategoriesTable
            categories={categories}
            loading={loading}
            onSelect={
              handleSelectCategory
            }
          />

          <CategoryDetails
            category={selectedCategory}
            onDelete={
              handleDeleteCategory
            }
          />
        </div>
      </div>

      <CreateCategoryModal
        open={createModalOpen}
        loading={creating}
        onClose={() =>
          setCreateModalOpen(false)
        }
        onSubmit={
          handleCreateCategory
        }
      />
    </div>
  );
}