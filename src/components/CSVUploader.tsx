"use client";

import React, { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface CSVUploaderProps {
  onDataUpdate: (data: any) => void;
  initialData?: { Test: string; Date: string; Result: number }[];
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onDataUpdate, initialData = [] }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [uploadedData, setUploadedData] = useState(initialData); // State to hold uploaded data

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      const file = event.target.files?.[0];

      if (!file) {
        setLoading(false);
        toast({
          title: "Error",
          description: "No file selected",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        try {
          const parsedData = await parseCSV(text);
          // Combine initial data with newly parsed data
          const combinedData: { Test: string; Date: string; Result: number }[] = [];
          let hasDuplicates = false;
          let newRecords = 0;

          for (const newItem of parsedData) {
            const isDuplicate = initialData.some(
              (existingItem) =>
                existingItem.Test === newItem.Test &&
                existingItem.Date === newItem.Date
            );

            if (!isDuplicate) {
              combinedData.push(newItem);
              newRecords++;
            } else {
              hasDuplicates = true;
            }
          }

          if (hasDuplicates) {
            toast({
              title: "Warning",
              description:
                "Some records were not uploaded as they are duplicates of existing data.",
              variant: "warning",
            });
          }

          const finalData = [...initialData, ...combinedData];
          onDataUpdate(finalData);
          setUploadedData(finalData); // Update state with combined data

          toast({
            title: "Success",
            description: `CSV data uploaded and parsed successfully! ${newRecords} new records uploaded.`,
          });
        } catch (error: any) {
          console.error("CSV Parsing Error:", error.message);
          toast({
            title: "CSV Parsing Error",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to read the file.",
          variant: "destructive",
        });
      };
      reader.readAsText(file);
    },
    [onDataUpdate, toast, initialData]
  );

  const parseCSV = async (text: string) => {
    return new Promise((resolve, reject) => {
      const lines = text.split("\n");
      if (lines.length <= 1) {
        reject(new Error("CSV file is empty or has only headers."));
        return;
      }

      const headers = lines[0].split(",").map((header) => header.trim());
      if (
        !headers.includes("Test") ||
        !headers.includes("Date") ||
        !headers.includes("Result")
      ) {
        reject(
          new Error(
            "CSV file must contain 'Test', 'Date', and 'Result' columns."
          )
        );
        return;
      }

      const results = [];
      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(",").map((item) => item.trim());
        if (data.length !== headers.length) {
          console.warn(`Skipping line ${i + 1} due to mismatched columns.`);
          continue;
        }

        const row: any = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = data[j];
        }

        if (row.Test && row.Date && row.Result) {
          const parsedResult = Number(row.Result);
          if (isNaN(parsedResult)) {
            reject(new Error(`Invalid number format in Result column.`));
            return;
          }

          // Parse date in DD/MM/YYYY format
          const dateParts = row.Date.split("/");
          if (dateParts.length === 3) {
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
            const year = parseInt(dateParts[2], 10);
            const parsedDate = new Date(year, month, day);

            if (
              isNaN(parsedDate.getTime()) ||
              parsedDate.getDate() !== day ||
              parsedDate.getMonth() !== month ||
              parsedDate.getFullYear() !== year
            ) {
              reject(new Error(`Invalid date format in Date column.`));
              return;
            }

            results.push({
              Test: row.Test,
              Date: parsedDate.toISOString(),
              Result: parsedResult,
            });
          } else {
            reject(new Error(`Invalid date format in Date column.`));
            return;
          }
        }
      }
      resolve(results);
    });
  };

  return (
    <div>
      <input
        type="file"
        id="csvUpload"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <label htmlFor="csvUpload">
        <Button disabled={loading} asChild>
          <span>
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default CSVUploader;
