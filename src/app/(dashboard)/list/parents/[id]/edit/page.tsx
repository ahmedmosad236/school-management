"use client";

import React, { useMemo } from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useParams, useRouter } from "next/navigation";
import { parentsData } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2),
  students: z.array(z.string()).optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default function EditParentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => parentsData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Parent not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Parent</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={item}
          onSubmit={() => router.push(`/list/parents`)}
          onCancel={() => router.back()}
          submitLabel="Update"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "students",
              label: "Students",
              type: "textArea",
              className: "sm:col-span-2",
            },
            { name: "email", label: "Email", type: "text", required: true },
            { name: "phone", label: "Phone", type: "text" },
            {
              name: "address",
              label: "Address",
              type: "textArea",
              className: "sm:col-span-2",
            },
          ]}
        />
      </div>
    </div>
  );
}
