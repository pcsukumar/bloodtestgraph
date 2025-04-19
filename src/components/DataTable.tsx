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
import { Checkbox } from "@/components/ui/checkbox";
import { bloodTestRanges } from "@/lib/constants";

interface DataTableProps {
  data: { Test: string; Date: string; Result: number }[];
  onDataUpdate: (data: any) => void;
}

type EditedDataType = { Test: string; Date: string; Result: number } | null;

const DataTable: React.FC<DataTableProps> = ({ data, onDataUpdate }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<EditedDataType>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  const toggleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteSelected = () => {
    const newData = data.filter((_, index) => !selectedRows.includes(index));
    onDataUpdate(newData);
    setSelectedRows([]);
  };

  const isRowSelected = (index: number) => selectedRows.includes(index);

  return (
    <div className="w-full overflow-auto">
      {selectedRows.length > 0 && (
        <Button variant="destructive" onClick={handleDeleteSelected} className="mb-4">
          Delete Selected ({selectedRows.length})
        </Button>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead className="w-[100px]">Test</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const testRange = bloodTestRanges.find((range) => range.test === row.Test);
            const unit = testRange ? testRange.unit : "N/A";

            return (
              <TableRow key={index}>
                <TableCell className="p-0">
                  <Checkbox
                    checked={isRowSelected(index)}
                    onCheckedChange={() => toggleSelectRow(index)}
                  />
                </TableCell>
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
              <TableCell colSpan={6} className="text-center">
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

    