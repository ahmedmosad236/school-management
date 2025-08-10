"use client";

import React, { useMemo, useState } from "react";
import DataTable, { type TableColumn } from "@/components/DataTable";

type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
};

type GenericListClientProps<T extends object> = {
  title: string;
  rows: T[];
  columns: ColumnDef<T>[];
  rowIdKey?: keyof T | string;
  addHref?: string;
  editBasePath?: string; // e.g., "/list/students"
  viewBasePath?: string;
  deleteBasePath?: string; // if provided, show delete link
};

export default function GenericListClient<T extends object>({
  title,
  rows,
  columns,
  rowIdKey,
  addHref,
  editBasePath,
  viewBasePath,
  deleteBasePath,
}: GenericListClientProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tableColumns: TableColumn<T>[] = useMemo(
    () =>
      columns.map((c) => ({
        key: c.key,
        header: c.header,
        className: c.className,
        render: (row: T) => {
          const value = (row as any)[c.key as any];
          if (Array.isArray(value)) return value.join(", ");
          if (value === undefined || value === null) return "";
          return String(value);
        },
      })),
    [columns]
  );

  const withActionLinks = rows.map((row) => {
    const id = (row as any)[(rowIdKey as any) ?? "id"];
    return {
      ...row,
      ...(viewBasePath ? { __viewHref: `${viewBasePath}/${id}` } : {}),
      ...(editBasePath ? { __editHref: `${editBasePath}/${id}/edit` } : {}),
      ...(deleteBasePath ? { __deleteHref: `${deleteBasePath}/${id}` } : {}),
    } as T & { __viewHref?: string; __editHref?: string };
  });

  const total = withActionLinks.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedRows = withActionLinks.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <DataTable<T>
        title={title}
        columns={tableColumns}
        rows={paginatedRows}
        getRowId={(row) => (row as any)[(rowIdKey as any) ?? "id"]}
        addHref={addHref}
        actionHrefKeys={(() => {
          const keys: any = {};
          if (viewBasePath) keys.view = "__viewHref";
          if (editBasePath) keys.edit = "__editHref";
          if (deleteBasePath) keys.delete = "__deleteHref";
          return Object.keys(keys).length ? keys : undefined;
        })()}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}
