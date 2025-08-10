import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { studentsData } from "@/lib/data";

const StudentsListPage = () => {
  return (
    <GenericListClient
      title="Students"
      rows={studentsData}
      rowIdKey="id"
      addHref="/list/students/add"
      viewBasePath="/list/students"
      editBasePath="/list/students"
      columns={[
        { key: "name", header: "Name" },
        { key: "studentId", header: "Student ID" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
        { key: "grade", header: "Grade" },
        { key: "class", header: "Class" },
        {
          key: "address",
          header: "Address",
          className: "hidden sm:table-cell",
        },
      ]}
    />
  );
};

export default StudentsListPage;
