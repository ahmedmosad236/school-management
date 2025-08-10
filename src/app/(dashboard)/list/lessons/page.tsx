import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { lessonsData } from "@/lib/data";

const LessonsListPage = () => {
  return (
    <GenericListClient
      title="Lessons"
      rows={lessonsData}
      rowIdKey="id"
      viewBasePath="/list/lessons"
      editBasePath="/list/lessons"
      addHref="/list/lessons/add"
      columns={[
        { key: "subject", header: "Subject" },
        { key: "class", header: "Class" },
        { key: "teacher", header: "Teacher" },
      ]}
    />
  );
};

export default LessonsListPage;
