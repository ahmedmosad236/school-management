"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { assignmentsData } from "@/lib/data";
import ZodForm from "@/components/form/ZodForm";
import { z } from "zod";

const schema = z.object({
  subject: z.string(),
  class: z.string(),
  teacher: z.string(),
  dueDate: z.string(),
});

export default function ViewAssignmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => assignmentsData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Assignment not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assignment</h1>
        <button
          className="rounded-lg border px-3 py-2 text-sm"
          onClick={() => router.push(`/list/assignments/${id}/edit`)}
        >
          Edit
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={item}
          onSubmit={() => {}}
          readOnly
          fields={[
            { name: "subject", label: "Subject", type: "text" },
            { name: "class", label: "Class", type: "text" },
            { name: "teacher", label: "Teacher", type: "text" },
            { name: "dueDate", label: "Due Date", type: "text" },
          ]}
        />
      </div>
    </div>
  );
}
