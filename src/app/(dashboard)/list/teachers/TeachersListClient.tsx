"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { type Teacher } from "@/components/TeacherForm";

type TeacherRow = Teacher & { id: number };

type Props = {
  rows: TeacherRow[];
};

export default function TeachersListClient({ rows: initialRows }: Props) {
  const [openDeleteId, setOpenDeleteId] = useState<number | null>(null);
  const [rows, setRows] = useState(
    initialRows.map((t) => ({
      ...t,
      __viewHref: `/list/teachers/${t.id}`,
      __editHref: `/list/teachers/${t.id}/edit`,
    }))
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (r: TeacherRow) => (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.photo || "/avatar.png"}
              alt={r.name}
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-gray-500">{r.email}</div>
            </div>
          </div>
        ),
      },
      { key: "teacherId", header: "Teacher ID" },
      { key: "phone", header: "Phone" },
      {
        key: "subjects",
        header: "Subjects",
        render: (r: TeacherRow) => (r.subjects ?? []).join(", "),
      },
      {
        key: "classes",
        header: "Classes",
        render: (r: TeacherRow) => (r.classes ?? []).join(", "),
      },
    ],
    []
  );

  const total = rows.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <DataTable<TeacherRow>
        title="Teachers"
        addLabel="Add Teacher"
        columns={columns as any}
        rows={paginatedRows as any}
        getRowId={(r) => r.id}
        addHref="/list/teachers/add"
        actionHrefKeys={{
          view: "__viewHref",
          edit: "__editHref",
        }}
        extraActionsRender={(r) => (
          <button
            onClick={() => setOpenDeleteId((r as any).id)}
            className="rounded-lg border border-red-200 dark:border-red-700 px-2.5 py-1.5 text-xs text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete
          </button>
        )}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />

      <Modal
        open={openDeleteId !== null}
        title="Delete Teacher"
        onClose={() => setOpenDeleteId(null)}
      >
        <p className="text-sm">Are you sure you want to delete this teacher?</p>
        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={() => setOpenDeleteId(null)}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2"
            onClick={() => {
              setRows((prev) => prev.filter((x) => x.id !== openDeleteId));
              setOpenDeleteId(null);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
