"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableProps {
  data: { Test: string; Date: string; Result: number }[];
  onDataUpdate: (data: any) => void;
}

const unitMap: { [key: string]: string } = {
  "HbA1c": "mmol/mol",
  "Total Cholesterol": "mmol/L",
  "HDL Cholesterol": "mmol/L",
  "Non-HDL Cholesterol": "mmol/L",
  "LDL Cholesterol": "mmol/L",
  "Total Cholesterol:HDL Ratio": "(none)",
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

const DataTable: React.FC<DataTableProps> = ({ data, onDataUpdate }) => {
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [editedData, setEditedData] = useState<{ Test: string; Date: string; Result: number } | null>(null);

    const handleEdit = (index: number, row: { Test: string; Date: string; Result: number }) => {
        setEditingRow(index);
        setEditedData({ ...row });
    };

    const handleSave = (index: number) => {
        if (!editedData) return;

        const newData = [...data];
        newData[index] = editedData;
        onDataUpdate(newData);
        setEditingRow(null);
        setEditedData(null);
    };

    const handleDelete = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        onDataUpdate(newData);
        setEditingRow(null);
        setEditedData(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: e.target.value });
        }
    };


  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Test</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const unit = unitMap[row.Test] || "N/A";

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {editingRow === index ? (
                    <Input
                      type="text"
                      value={editedData?.Test || ""}
                      onChange={(e) => handleInputChange(e, "Test")}
                    />
                  ) : (
                    row.Test
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <Input
                      type="text"
                      value={editedData?.Date ? format(new Date(editedData.Date), "dd/MM/yyyy") : ""}
                      onChange={(e) => handleInputChange(e, "Date")}
                    />
                  ) : (
                    format(new Date(row.Date), "dd/MM/yyyy")
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <Input
                      type="text"
                      value={editedData?.Result.toString() || ""}
                      onChange={(e) => handleInputChange(e, "Result")}
                    />
                  ) : (
                    row.Result
                  )}
                </TableCell>
                <TableCell>{unit}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  {editingRow === index ? (
                    <>
                      <Button size="sm" onClick={() => handleSave(index)}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingRow(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" onClick={() => handleEdit(index, row)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(index)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
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
