"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import TeacherForm, { type Teacher } from "@/components/TeacherForm";
import { teachersData } from "@/lib/data";

const EditTeacherPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  const teacher = useMemo(() => teachersData.find((t) => t.id === id), [id]);

  function handleSubmit(values: Teacher) {
    // In a real app, PUT to API then redirect
    router.push(`/list/teachers/${id}`);
  }

  if (!teacher) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-sm text-red-600">Teacher not found.</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Teacher</h1>
        <button
          className="rounded-lg border px-3 py-2 text-sm"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <TeacherForm
          initialValue={teacher}
          onSubmit={handleSubmit}
          submitLabel="Update"
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
};

export default EditTeacherPage;
