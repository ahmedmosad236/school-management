import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { resultsData } from "@/lib/data";

const ResultsListPage = () => {
  return (
    <GenericListClient
      title="Results"
      rows={resultsData}
      rowIdKey="id"
      columns={[
        { key: "subject", header: "Subject" },
        { key: "class", header: "Class" },
        { key: "teacher", header: "Teacher" },
        { key: "student", header: "Student" },
        { key: "date", header: "Date" },
        { key: "type", header: "Type" },
        { key: "score", header: "Score" },
      ]}
    />
  );
};

export default ResultsListPage;
