"use client";

import React from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2),
  students: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default function AddParentPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Parent</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          onSubmit={() => router.push("/list/parents")}
          onCancel={() => router.back()}
          submitLabel="Create"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "students",
              label: "Students (comma separated)",
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
