"use client";

import React, { useMemo } from "react";
import { z } from "zod";
import ZodForm from "@/components/form/ZodForm";
import { useParams, useRouter } from "next/navigation";
import { examsData } from "@/lib/data";

const schema = z.object({
  subject: z.string().min(1),
  class: z.string().min(1),
  teacher: z.string().min(1),
  date: z.string().min(1),
});

export default function EditExamPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const item = useMemo(() => examsData.find((s) => s.id === id), [id]);

  if (!item) return <div className="p-4">Exam not found</div>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Edit Exam</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <ZodForm
          schema={schema}
          initialValue={item}
          onSubmit={() => router.push(`/list/exams`)}
          onCancel={() => router.back()}
          submitLabel="Update"
          fields={[
            { name: "subject", label: "Subject", type: "text", required: true },
            { name: "class", label: "Class", type: "text", required: true },
            { name: "teacher", label: "Teacher", type: "text", required: true },
            { name: "date", label: "Date", type: "date", required: true },
          ]}
        />
      </div>
    </div>
  );
}
