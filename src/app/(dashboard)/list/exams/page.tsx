import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { examsData } from "@/lib/data";

const ExamsListPage = () => {
  return (
    <GenericListClient
      title="Exams"
      rows={examsData}
      rowIdKey="id"
      viewBasePath="/list/exams"
      editBasePath="/list/exams"
      deleteBasePath="/list/exams"
      addHref="/list/exams/add"
      columns={[
        { key: "subject", header: "Subject" },
        { key: "class", header: "Class" },
        { key: "teacher", header: "Teacher" },
        { key: "date", header: "Date" },
      ]}
    />
  );
};

export default ExamsListPage;
