"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { teachersData } from "@/lib/data";

export default function DeleteTeacherPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  const teacher = useMemo(() => teachersData.find((t) => t.id === id), [id]);

  function handleConfirm() {
    // In a real app, call a server action or API to delete, then redirect
    router.push("/list/teachers");
  }

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Delete Teacher</h1>
      {teacher ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
          <p className="text-sm">
            Are you sure you want to delete <strong>{teacher.name}</strong>?
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-red-600">Teacher not found.</div>
      )}
    </div>
  );
}
