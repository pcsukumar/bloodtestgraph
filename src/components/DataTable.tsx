"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  data: { Test: string; Date: string; Result: number }[];
  testRanges: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data, testRanges }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Test</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Normal Range</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const testRange = testRanges.find((range) => range.test === row.Test);
            const unit = testRange ? testRange.unit : "N/A";
            const normalRange = testRange
              ? `${testRange.minimum} - ${testRange.maximum}`
              : "N/A";

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.Test}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell>{row.Result}</TableCell>
                <TableCell>{unit}</TableCell>
                <TableCell>{normalRange}</TableCell>
              </TableRow>
            );
          })}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data available. Please upload a CSV file.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
