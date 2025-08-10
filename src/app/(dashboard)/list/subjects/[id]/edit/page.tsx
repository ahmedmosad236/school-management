"use client";

import React, { useMemo } from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useParams, useRouter } from "next/navigation";
import { subjectsData } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2),
  teachers: z.array(z.string()).optional(),
});

export default function EditSubjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => subjectsData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Subject not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Subject</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={item}
          onSubmit={() => router.push(`/list/subjects`)}
          onCancel={() => router.back()}
          submitLabel="Update"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "teachers",
              label: "Teachers",
              type: "textArea",
              className: "sm:col-span-2",
            },
          ]}
        />
      </div>
    </div>
  );
}
