"use client";

import React from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useRouter } from "next/navigation";

const schema = z.object({
  subject: z.string().min(1),
  class: z.string().min(1),
  teacher: z.string().min(1),
  dueDate: z.string().min(1),
});

export default function AddAssignmentPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Assignment</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          onSubmit={() => router.push("/list/assignments")}
          onCancel={() => router.back()}
          submitLabel="Create"
          fields={[
            { name: "subject", label: "Subject", type: "text", required: true },
            { name: "class", label: "Class", type: "text", required: true },
            { name: "teacher", label: "Teacher", type: "text", required: true },
            {
              name: "dueDate",
              label: "Due Date",
              type: "date",
              required: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
