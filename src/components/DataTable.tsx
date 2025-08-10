import React from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  addLabel?: string;
  title?: string;
  // Optional link-based actions for use from server components
  addHref?: string;
  actionHrefKeys?: {
    view?: keyof T | string;
    edit?: keyof T | string;
    delete?: keyof T | string;
  };
  extraActionsRender?: (row: T) => React.ReactNode;
  // Optional pagination controls
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export default function DataTable<T extends object>(props: DataTableProps<T>) {
  const {
    columns,
    rows,
    getRowId,
    addLabel = "Add",
    title,
    addHref,
    actionHrefKeys,
    extraActionsRender,
    page,
    pageSize,
    total,
    onPageChange,
    onPageSizeChange,
  } = props;

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title ?? "Items"}
        </h2>
        {addHref && (
          <Link
            href={addHref}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2"
          >
            <span>+</span>
            <span>{addLabel}</span>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-fixed w-full divide-y divide-gray-100 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-2 sm:px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 ${
                    col.className ?? ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {(actionHrefKeys || extraActionsRender) && (
                <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.length === 0 && (
              <tr>
                <td
                  className="px-2 sm:px-3 py-4 text-center text-sm text-gray-600 dark:text-gray-300"
                  colSpan={columns.length + 1}
                >
                  No data
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={String(getRowId(row))}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-2 sm:px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 text-center align-middle ${
                      col.className ?? ""
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key as keyof typeof row]}
                  </td>
                ))}
                {(actionHrefKeys || extraActionsRender) && (
                  <td className="px-2 sm:px-3 py-1.5 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      {actionHrefKeys?.view && (
                        <Link
                          href={String((row as any)[actionHrefKeys.view])}
                          className="rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          View
                        </Link>
                      )}
                      {actionHrefKeys?.edit && (
                        <Link
                          href={String((row as any)[actionHrefKeys.edit])}
                          className="rounded-lg border border-amber-200 dark:border-amber-700 px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        >
                          Edit
                        </Link>
                      )}
                      {actionHrefKeys?.delete && (
                        <Link
                          href={String((row as any)[actionHrefKeys.delete])}
                          className="rounded-lg border border-red-200 dark:border-red-700 px-2.5 py-1.5 text-xs text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Delete
                        </Link>
                      )}
                      {extraActionsRender && extraActionsRender(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {page && pageSize && typeof total === "number" && onPageChange && (
        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 dark:border-gray-800">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
