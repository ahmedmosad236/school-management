"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, type SelectOption } from "@/components/form";

export type Teacher = {
  id?: number;
  teacherId: string;
  name: string;
  email: string;
  photo?: string;
  phone?: string;
  subjects?: string[];
  classes?: string[];
  address?: string;
};

const teacherSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  photo: z.string().url("Invalid URL").optional().or(z.literal("")),
  subjects: z.array(z.string()).optional(),
  classes: z.array(z.string()).optional(),
  address: z.string().optional(),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

type TeacherFormProps = {
  initialValue?: Teacher;
  onSubmit: (value: Teacher) => void;
  onCancel?: () => void;
  submitLabel?: string;
  readOnly?: boolean;
};

export default function TeacherForm({
  initialValue,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  readOnly = false,
}: TeacherFormProps) {
  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      teacherId: "",
      email: "",
      phone: "",
      photo: "",
      subjects: [],
      classes: [],
      address: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (initialValue) {
      form.reset({
        name: initialValue.name ?? "",
        teacherId: initialValue.teacherId ?? "",
        email: initialValue.email ?? "",
        phone: initialValue.phone ?? "",
        photo: initialValue.photo ?? "",
        subjects: initialValue.subjects ?? [],
        classes: initialValue.classes ?? [],
        address: initialValue.address ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const disabled = readOnly;

  const subjectOptions: SelectOption[] = (
    initialValue?.subjects ?? [
      "Math",
      "Geometry",
      "Chemistry",
      "Physics",
      "Biology",
      "History",
      "English",
    ]
  ).map((s) => ({ label: s, value: s }));

  const classOptions: SelectOption[] = (
    initialValue?.classes ?? ["1A", "1B", "2A", "3C", "4B", "5A"]
  ).map((s) => ({ label: s, value: s }));

  function submit(values: TeacherFormValues) {
    if (readOnly) return;
    onSubmit(values as Teacher);
  }

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        type="text"
        label="Name"
        required
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="teacherId"
        type="text"
        label="Teacher ID"
        required
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="email"
        type="text"
        label="Email"
        required
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="phone"
        type="text"
        label="Phone"
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="photo"
        type="text"
        label="Photo URL"
        className="sm:col-span-2"
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="subjects"
        type="select"
        label="Subjects"
        isMulti
        options={subjectOptions}
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="classes"
        type="select"
        label="Classes"
        isMulti
        options={classOptions}
        disabled={disabled}
      />

      <FormField
        control={form.control}
        name="address"
        type="textArea"
        label="Address"
        className="sm:col-span-2"
        disabled={disabled}
      />

      {!readOnly && (
        <div className="sm:col-span-2 flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2"
          >
            {submitLabel}
          </button>
        </div>
      )}
    </form>
  );
}
