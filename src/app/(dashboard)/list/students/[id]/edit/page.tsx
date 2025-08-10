"use client";

import React, { useMemo } from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useParams, useRouter } from "next/navigation";
import { studentsData } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2),
  studentId: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  grade: z.coerce.number(),
  class: z.string(),
  address: z.string().optional(),
});

export default function EditStudentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const student = useMemo(() => studentsData.find((s) => s.id === id), [id]);

  if (!student) return <div className="p-4">Student not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Student</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={student}
          onSubmit={() => router.push(`/list/students`)}
          onCancel={() => router.back()}
          submitLabel="Update"
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
