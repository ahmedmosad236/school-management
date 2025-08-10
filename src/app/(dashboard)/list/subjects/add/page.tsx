"use client";

import React from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2),
  teachers: z.string().optional(),
});

export default function AddSubjectPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Subject</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          onSubmit={() => router.push("/list/subjects")}
          onCancel={() => router.back()}
          submitLabel="Create"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "teachers",
              label: "Teachers (comma separated)",
              type: "textArea",
              className: "sm:col-span-2",
            },
          ]}
        />
      </div>
    </div>
  );
}
