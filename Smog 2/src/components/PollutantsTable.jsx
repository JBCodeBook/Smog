import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  { key: "code", label: "Pollutant" },
  { key: "value", label: "Value" },
];

export default function PollutantsTable({ pollutants }) {
  const rows = pollutants.map((pollutant) => ({
    key: pollutant.code,
    code: pollutant.code,
    value: pollutant.concentration.value
  }));

  return (
    <Table
    isStriped 
    color="primary"
    aria-label="Pollutants table"
      
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {(columnKey) => (
              <TableCell>{row[columnKey]}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
