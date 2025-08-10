import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { parentsData } from "@/lib/data";

const ParentsListPage = () => {
  return (
    <GenericListClient
      title="Parents"
      rows={parentsData}
      rowIdKey="id"
      viewBasePath="/list/parents"
      editBasePath="/list/parents"
      columns={[
        { key: "name", header: "Name" },
        { key: "students", header: "Students" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
        { key: "address", header: "Address" },
      ]}
    />
  );
};

export default ParentsListPage;
