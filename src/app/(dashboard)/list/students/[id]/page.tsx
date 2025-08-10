"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { studentsData } from "@/lib/data";
import BigCalender from "@/components/BigCalender";

const ViewStudentPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  const student = useMemo(() => studentsData.find((s) => s.id === id), [id]);

  if (!student) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-sm text-red-600">Student not found.</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header: Profile card + quick stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6 flex items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={student.photo || "/avatar.png"}
            alt={student.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{student.email}</p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                <span>Phone: {student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                <span>Student ID: {student.studentId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>Grade: {student.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500" />
                <span>Class: {student.class}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 text-gray-600 dark:text-gray-300">
                Address: {student.address}
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <button
              className="rounded-lg border px-3 py-2 text-sm"
              onClick={() => router.push(`/list/students/${id}/edit`)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 text-center">
            <div className="text-xs uppercase text-gray-500">Attendance</div>
            <div className="text-2xl font-bold mt-1">95%</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 text-center">
            <div className="text-xs uppercase text-gray-500">Assignments</div>
            <div className="text-2xl font-bold mt-1">12</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 text-center">
            <div className="text-xs uppercase text-gray-500">Average</div>
            <div className="text-2xl font-bold mt-1">A-</div>
          </div>
        </div>
      </div>

      {/* Schedule + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 min-h-[580px]">
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Student&apos;s Schedule</h3>
          </div>
          <div className="h-[520px]">
            <BigCalender
              events={[
                {
                  title: "Math",
                  start: new Date(2025, 7, 4, 8, 0),
                  end: new Date(2025, 7, 4, 8, 45),
                },
                {
                  title: "English",
                  start: new Date(2025, 7, 4, 9, 0),
                  end: new Date(2025, 7, 4, 9, 45),
                },
                {
                  title: "Science",
                  start: new Date(2025, 7, 4, 10, 0),
                  end: new Date(2025, 7, 4, 10, 45),
                },
                {
                  title: "History",
                  start: new Date(2025, 7, 4, 11, 0),
                  end: new Date(2025, 7, 4, 11, 45),
                },
                {
                  title: "Art",
                  start: new Date(2025, 7, 4, 13, 0),
                  end: new Date(2025, 7, 4, 13, 45),
                },
                {
                  title: "Physical Education",
                  start: new Date(2025, 7, 4, 14, 0),
                  end: new Date(2025, 7, 4, 14, 45),
                },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4">
            <h3 className="text-lg font-semibold">Shortcuts</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Student's Classes",
                "Student's Assignments",
                "Student's Exams",
                "Student's Results",
                "Student's Attendance",
              ].map((s) => (
                <span
                  key={s}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4">
            <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
            <div className="flex items-center justify-center text-3xl font-bold">
              8.7
            </div>
            <p className="text-center text-xs text-gray-500">of 10 max GPA</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4">
            <h3 className="text-lg font-semibold">Announcements</h3>
            <div className="mt-3 space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-md p-3 bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">
                      Math Quiz Next Week
                    </div>
                    <span className="text-xs text-gray-400">2025-01-01</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Prepare for the upcoming math quiz on algebra...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentPage;
