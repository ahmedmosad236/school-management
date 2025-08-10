"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TeacherForm, { type Teacher } from "@/components/TeacherForm";

const AddTeacherPage = () => {
  const router = useRouter();

  function handleSubmit(value: Teacher) {
    // In a real app, post to API then redirect
    router.push("/list/teachers");
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Add Teacher</h1>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <TeacherForm
          submitLabel="Create"
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
};

export default AddTeacherPage;
