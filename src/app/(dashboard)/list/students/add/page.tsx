"use client";

import React from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2),
  studentId: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  grade: z.coerce.number(),
  class: z.string(),
  address: z.string().optional(),
});

export default function AddStudentPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Student</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          onSubmit={() => router.push("/list/students")}
          onCancel={() => router.back()}
          submitLabel="Create"
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "studentId",
              label: "Student ID",
              type: "text",
              required: true,
            },
            { name: "email", label: "Email", type: "text", required: true },
            { name: "phone", label: "Phone", type: "text" },
            { name: "grade", label: "Grade", type: "number" },
            { name: "class", label: "Class", type: "text" },
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
