"use client";

import React, { useMemo } from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useParams, useRouter } from "next/navigation";
import { classesData } from "@/lib/data";

const schema = z.object({
  name: z.string().min(1),
  capacity: z.coerce.number().min(1),
  grade: z.coerce.number().min(1),
  supervisor: z.string().min(1),
});

export default function EditClassPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => classesData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Class not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Class</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={item}
          onSubmit={() => router.push(`/list/classes`)}
          onCancel={() => router.back()}
          submitLabel="Update"
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
