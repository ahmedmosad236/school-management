"use client";

import React from "react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import Select, {
  type Props as ReactSelectProps,
  type GroupBase,
} from "react-select";
import AsyncSelect, { type AsyncProps } from "react-select/async";

export type SelectOption = { label: string; value: string | number };

export type FormFieldType =
  | "text"
  | "password"
  | "number"
  | "date"
  | "checkbox"
  | "toggle"
  | "textArea"
  | "select"
  | "asyncSelect"
  | "asyncMultiSelect";

export type BaseFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export type FormFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps & {
    control: Control<TFieldValues>;
    type: FormFieldType;
    // select props
    options?: SelectOption[];
    isMulti?: boolean;
    // async select props
    loadOptions?: AsyncProps<
      SelectOption,
      boolean,
      GroupBase<SelectOption>
    >["loadOptions"];
  };

export default function FormField<TFieldValues extends FieldValues>(
  props: FormFieldProps<TFieldValues>
) {
  const {
    control,
    name,
    label,
    placeholder,
    helperText,
    disabled,
    required,
    className,
    type,
    options,
    isMulti,
    loadOptions,
  } = props;

  const labelNode = label ? (
    <label className="block text-sm font-medium mb-1" htmlFor={name}>
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>
  ) : null;

  return (
    <Controller
      control={control}
      name={name as any}
      render={({
        field,
        fieldState,
      }: {
        field: any;
        fieldState: { error?: { message?: string } };
      }) => {
        const errorMsg = fieldState.error?.message;

        const inputBaseClass =
          "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

        let inputNode: React.ReactNode = null;

        switch (type) {
          case "text":
          case "password":
            inputNode = (
              <input
                id={name}
                type={type}
                className={inputBaseClass}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            );
            break;

          case "date":
            inputNode = (
              <input
                id={name}
                type="date"
                className={inputBaseClass}
                placeholder={placeholder}
                disabled={disabled}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
            break;

          case "number":
            inputNode = (
              <input
                id={name}
                type="number"
                className={inputBaseClass}
                placeholder={placeholder}
                disabled={disabled}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
              />
            );
            break;

          case "checkbox":
            inputNode = (
              <div className="flex items-center gap-2">
                <input
                  id={name}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={disabled}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                {label && (
                  <label
                    htmlFor={name}
                    className="text-sm text-gray-800 dark:text-gray-100"
                  >
                    {label}
                  </label>
                )}
              </div>
            );
            break;

          case "toggle":
            inputNode = (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                  field.value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-pressed={!!field.value}
                disabled={disabled}
              >
                <span
                  className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    field.value ? "translate-x-5" : "translate-x-0"
                  }`}
                />
                {label && (
                  <span className="ml-2 text-sm text-gray-800 dark:text-gray-100">
                    {label}
                  </span>
                )}
              </button>
            );
            break;

          case "textArea":
            inputNode = (
              <textarea
                id={name}
                className={inputBaseClass}
                placeholder={placeholder}
                disabled={disabled}
                rows={4}
                {...field}
              />
            );
            break;

          case "select": {
            const selectProps: ReactSelectProps<
              SelectOption,
              boolean,
              GroupBase<SelectOption>
            > = {
              inputId: name,
              isMulti: !!isMulti,
              isDisabled: disabled,
              options: options ?? [],
              placeholder,
              classNamePrefix: "rs",
              value: isMulti
                ? Array.isArray(field.value)
                  ? (field.value as (string | number)[])
                      .map((v) => (options ?? []).find((o) => o.value === v))
                      .filter((o): o is SelectOption => Boolean(o))
                  : []
                : (options ?? []).find((o) => o.value === field.value) ?? null,
              onChange: (val: unknown) => {
                if (isMulti) {
                  const v =
                    (val as SelectOption[] | null)?.map((o) => o.value) ?? [];
                  field.onChange(v);
                } else {
                  field.onChange(
                    (val as SelectOption | null)?.value ?? undefined
                  );
                }
              },
            };
            inputNode = <Select {...selectProps} />;
            break;
          }

          case "asyncSelect": {
            const asyncProps: AsyncProps<
              SelectOption,
              boolean,
              GroupBase<SelectOption>
            > = {
              cacheOptions: true,
              defaultOptions: options ?? [],
              loadOptions: loadOptions!,
              isMulti: !!isMulti,
              isDisabled: disabled,
              placeholder,
              classNamePrefix: "rs",
              value: isMulti
                ? Array.isArray(field.value)
                  ? (field.value as (string | number)[])
                      .map((v) => (options ?? []).find((o) => o.value === v))
                      .filter((o): o is SelectOption => Boolean(o))
                  : []
                : (options ?? []).find((o) => o.value === field.value) ?? null,
              onChange: (val: unknown) => {
                if (isMulti) {
                  const v =
                    (val as SelectOption[] | null)?.map((o) => o.value) ?? [];
                  field.onChange(v);
                } else {
                  field.onChange(
                    (val as SelectOption | null)?.value ?? undefined
                  );
                }
              },
            } as any;
            inputNode = <AsyncSelect {...asyncProps} />;
            break;
          }

          case "asyncMultiSelect": {
            const asyncProps: AsyncProps<
              SelectOption,
              true,
              GroupBase<SelectOption>
            > = {
              cacheOptions: true,
              defaultOptions: options ?? [],
              loadOptions: loadOptions!,
              isMulti: true,
              isDisabled: disabled,
              placeholder,
              classNamePrefix: "rs",
              value: Array.isArray(field.value)
                ? (field.value as (string | number)[])
                    .map((v) => (options ?? []).find((o) => o.value === v))
                    .filter((o): o is SelectOption => Boolean(o))
                : [],
              onChange: (val: unknown) => {
                const v =
                  (val as SelectOption[] | null)?.map((o) => o.value) ?? [];
                field.onChange(v);
              },
            } as any;
            inputNode = <AsyncSelect {...asyncProps} />;
            break;
          }

          default:
            inputNode = null;
        }

        return (
          <div className={className}>
            {type !== "checkbox" && type !== "toggle" && labelNode}
            {inputNode}
            {helperText && !errorMsg && (
              <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}
            {errorMsg && (
              <p className="mt-1 text-xs text-red-600">{errorMsg}</p>
            )}
          </div>
        );
      }}
    />
  );
}
