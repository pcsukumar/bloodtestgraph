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
import { format } from "date-fns";

interface DataTableProps {
  data: { Test: string; Date: string; Result: number }[];
}

const unitMap: { [key: string]: string } = {
  "HbA1c": "mmol/mol",
  "Total Cholesterol": "mmol/L",
  "HDL Cholesterol": "mmol/L",
  "Non-HDL Cholesterol": "mmol/L",
  "LDL Cholesterol": "mmol/L",
  "Total Cholesterol:HDL Ratio": "",
  "Triglyceride": "mmol/L",
  "Urea": "mmol/L",
  "Sodium": "mmol/L",
  "Potassium": "mmol/L",
  "Creatinine": "µmol/L",
  "Albumin": "g/L",
  "eGFR": "mL/min/1.73m²",
  "Urinary Creatinine": "mg/dL",
  "Microalbumin": "mg/L",
  "Microalbumin Creatinine Ratio": "mg/g",
  "Total Protein": "g/L",
  "Total Bilirubin": "µmol/L",
  "Alkaline Phosphatase": "IU/L",
  "Gamma GT": "IU/L",
  "AST": "IU/L",
  "Alanine Transaminase": "IU/L",
  "Urate": "µmol/L",
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Test</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const unit = unitMap[row.Test] || "N/A";

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.Test}</TableCell>
                <TableCell>{format(new Date(row.Date), "dd/MM/yyyy")}</TableCell>
                <TableCell>{row.Result}</TableCell>
                <TableCell>{unit}</TableCell>
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
