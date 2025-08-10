import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { subjectsData } from "@/lib/data";

const SubjectsListPage = () => {
  return (
    <GenericListClient
      title="Subjects"
      rows={subjectsData}
      rowIdKey="id"
      viewBasePath="/list/subjects"
      editBasePath="/list/subjects"
      addHref="/list/subjects/add"
      columns={[
        { key: "name", header: "Name" },
        { key: "teachers", header: "Teachers" },
      ]}
    />
  );
};

export default SubjectsListPage;
