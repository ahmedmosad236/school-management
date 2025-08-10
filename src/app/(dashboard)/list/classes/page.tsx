import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { classesData } from "@/lib/data";

const ClassesListPage = () => {
  return (
    <GenericListClient
      title="Classes"
      rows={classesData}
      rowIdKey="id"
      viewBasePath="/list/classes"
      editBasePath="/list/classes"
      deleteBasePath="/list/classes"
      addHref="/list/classes/add"
      columns={[
        { key: "name", header: "Name" },
        { key: "capacity", header: "Capacity" },
        { key: "grade", header: "Grade" },
        { key: "supervisor", header: "Supervisor" },
      ]}
    />
  );
};

export default ClassesListPage;
