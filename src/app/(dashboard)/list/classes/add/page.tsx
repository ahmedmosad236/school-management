"use client";

import React from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1),
  capacity: z.coerce.number().min(1),
  grade: z.coerce.number().min(1),
  supervisor: z.string().min(1),
});

export default function AddClassPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Class</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          onSubmit={() => router.push("/list/classes")}
          onCancel={() => router.back()}
          submitLabel="Create"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "capacity",
              label: "Capacity",
              type: "number",
              required: true,
            },
            { name: "grade", label: "Grade", type: "number", required: true },
            {
              name: "supervisor",
              label: "Supervisor",
              type: "text",
              required: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
