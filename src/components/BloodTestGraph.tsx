"use client";

import React from "react";
import {
  Area,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface BloodTestGraphProps {
  testName: string;
  csvData: { Test: string; Date: string; Result: number }[];
}

const BloodTestGraph: React.FC<BloodTestGraphProps> = ({
  testName,
  csvData,
}) => {
  const testData = csvData.filter((item) => item.Test === testName);

  const data = testData.map((item) => ({
    date: new Date(item.Date),
    result: item.Result,
  }));

  const renderTooltipContent = (o: any) => {
    const { active, payload, label } = o;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-md p-2 shadow-md">
          <p className="font-bold">{testName}</p>
          <p>{`Date: ${format(new Date(data.date), "dd/MM/yyyy")}`}</p>
          <p>{`Result: ${data.result}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{testName}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="date"
                name="Date"
                tickFormatter={(date) => format(new Date(date), "dd/MM/yyyy")}
                angle={-30}
                textAnchor="end"
                height={80}
                className="text-xs"
              />
              <YAxis
                dataKey="result"
                name="Result"
                domain={["dataMin", "dataMax"]}
              />
              <Tooltip content={renderTooltipContent} />
              <Area
                type="monotone"
                dataKey="result"
                fill="rgba(0, 128, 128, 0.1)"
                strokeWidth={0}
              />
              <Line type="monotone" dataKey="result" stroke="#008080" />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              No data available for {testName}. Please upload CSV data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BloodTestGraph;
