"use client";

import React, { useEffect } from "react";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, type ZodTypeAny } from "zod";
import {
  FormField,
  type FormFieldType,
  type SelectOption,
} from "@/components/form";

export type ZodFormField = {
  name: string;
  label: string;
  type: FormFieldType;
  className?: string;
  helperText?: string;
  required?: boolean;
  options?: SelectOption[];
  isMulti?: boolean;
};

type ZodFormProps = {
  schema: z.ZodType<any>;
  fields: ZodFormField[];
  initialValue?: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  submitLabel?: string;
  readOnly?: boolean;
  mode?: "onSubmit" | "onChange" | "onBlur" | "onTouched" | "all";
};

export default function ZodForm({
  schema,
  fields,
  initialValue,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  readOnly = false,
  mode = "onTouched",
}: ZodFormProps) {
  const resolver = (zodResolver as any)(schema as any) as Resolver<FieldValues>;
  const form = useForm<any>({
    resolver,
    defaultValues: initialValue as any,
    mode,
  });

  useEffect(() => {
    if (initialValue) form.reset(initialValue as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const disabled = readOnly;

  return (
    <form
      onSubmit={form.handleSubmit((v) => !readOnly && onSubmit(v))}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {fields.map((f) => (
        <FormField
          key={f.name}
          control={form.control as any}
          name={f.name}
          type={f.type}
          label={f.label}
          required={f.required}
          className={f.className}
          helperText={f.helperText}
          disabled={disabled}
          options={f.options}
          isMulti={f.isMulti}
        />
      ))}

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
