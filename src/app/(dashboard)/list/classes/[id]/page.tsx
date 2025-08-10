"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { classesData } from "@/lib/data";
import ZodForm from "@/components/form/ZodForm";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  capacity: z.number(),
  grade: z.number(),
  supervisor: z.string(),
});

export default function ViewClassPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => classesData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Class not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Class: {item.name}</h1>
        <button
          className="rounded-lg border px-3 py-2 text-sm"
          onClick={() => router.push(`/list/classes/${id}/edit`)}
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
            { name: "name", label: "Name", type: "text" },
            { name: "capacity", label: "Capacity", type: "number" },
            { name: "grade", label: "Grade", type: "number" },
            { name: "supervisor", label: "Supervisor", type: "text" },
          ]}
        />
      </div>
    </div>
  );
}
