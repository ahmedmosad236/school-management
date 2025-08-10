import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { assignmentsData } from "@/lib/data";

const AssignmentsListPage = () => {
  return (
    <GenericListClient
      title="Assignments"
      rows={assignmentsData}
      rowIdKey="id"
      viewBasePath="/list/assignments"
      editBasePath="/list/assignments"
      deleteBasePath="/list/assignments"
      addHref="/list/assignments/add"
      columns={[
        { key: "subject", header: "Subject" },
        { key: "class", header: "Class" },
        { key: "teacher", header: "Teacher" },
        { key: "dueDate", header: "Due Date" },
      ]}
    />
  );
};

export default AssignmentsListPage;
