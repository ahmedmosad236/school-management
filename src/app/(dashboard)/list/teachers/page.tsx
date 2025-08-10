import React from "react";
import TeachersListClient from "./TeachersListClient";
import { type Teacher } from "@/components/TeacherForm";
import { teachersData } from "@/lib/data";

type TeacherRow = Teacher & { id: number };

const TeachersPage = () => {
  const rows: TeacherRow[] = teachersData.map((t) => ({ ...t }));

  return <TeachersListClient rows={rows} />;
};

export default TeachersPage;
