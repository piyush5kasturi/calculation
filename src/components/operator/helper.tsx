import React from "react";
export const columns = (data = []) => {
  if (data.length === 0) return []; // Return empty array if data is empty

  return data.map((key: any) => {
    return {
      accessorFn: (row) => (
        <span className="capitalize">{row[key?.mapValue]}</span>
      ),
      id: key?.mapValue,
      cell: (info) => info.getValue(),
      header: () => <span>{key?.colName}</span>, // Use key as header
      footer: (props) => props.column.id,
    };
  });
};
