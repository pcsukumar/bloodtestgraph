"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import BloodTestGraph from "@/components/BloodTestGraph";
import CSVUploader from "@/components/CSVUploader";
import DataTable from "@/components/DataTable";
import { bloodTestRanges } from "@/lib/constants";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testCategories = [
  {
    category: "Glucose",
    tests: ["HbA1c"],
  },
  {
    category: "Lipid Profile",
    tests: [
      "Total Cholesterol",
      "HDL Cholesterol",
      "Non-HDL Cholesterol",
      "LDL Cholesterol",
      "Total Cholesterol:HDL Ratio",
      "Triglyceride",
    ],
  },
  {
    category: "Kidney",
    tests: [
      "Urea",
      "Sodium",
      "Potassium",
      "Creatinine",
      "Albumin",
      "eGFR",
      "Urinary Creatinine",
      "Microalbumin",
      "Microalbumin Creatinine Ratio",
    ],
  },
  {
    category: "Liver",
    tests: [
      "Total Protein",
      "Total Bilirubin",
      "Alkaline Phosphatase",
      "Gamma GT",
      "AST",
      "Alanine Transaminase",
    ],
  },
  {
    category: "Urate",
    tests: ["Urate"],
  },
];

export default function Home() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<
    { Test: string; Date: string; Result: number }[]
  >([]);
  const [showCSVUploader, setShowCSVUploader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleTestSelect = (test: string) => {
    setSelectedTest(test);
    setSelectedCategory(null);
    setShowCSVUploader(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedTest(null);
    setShowCSVUploader(false);
  };

  const handleDataManagementClick = () => {
    setSelectedTest(null);
    setSelectedCategory(null);
    setShowCSVUploader(true);
  };

  const handleCSVDataUpdate = (data: any) => {
    setCsvData(data);
  };

  const getTestRange = (testName: string) => {
    return bloodTestRanges.find((test) => test.test === testName);
  };

  const getTestsInCategory = (category: string) => {
    const cat = testCategories.find((c) => c.category === category);
    return cat ? cat.tests : [];
  };

  return (
    <SidebarProvider>
      <Toaster />
      <Sidebar>
        <SidebarHeader>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea>
            {testCategories.map((category) => (
              <Accordion
                type="single"
                collapsible
                key={category.category}
              >
                <AccordionItem value={category.category}>
                  <AccordionTrigger onClick={() => handleCategorySelect(category.category)}>
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <SidebarMenu>
                      {category.tests.map((test) => (
                        <SidebarMenuItem key={test}>
                          <SidebarMenuButton
                            onClick={() => handleTestSelect(test)}
                            variant="ghost"
                            className="font-normal text-base text-foreground" // Added styles
                          >
                            {test}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleDataManagementClick} variant="ghost">
                  <Upload className="mr-2 h-4 w-4" />
                  Data Management
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground">
            Bloodlines &copy; {new Date().getFullYear()}
          </p>
        </SidebarFooter>
      </Sidebar>

      <SidebarContent className="flex flex-col">
        {showCSVUploader ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <CSVUploader onDataUpdate={handleCSVDataUpdate} />
              {csvData.length > 0 && (
                <DataTable data={csvData} testRanges={bloodTestRanges} />
              )}
            </CardContent>
          </Card>
        ) : selectedTest ? (
          <BloodTestGraph
            testName={selectedTest}
            testRange={getTestRange(selectedTest)}
            csvData={csvData}
          />
        ) : selectedCategory ? (
          <div className="flex flex-col gap-4 w-full">
            {getTestsInCategory(selectedCategory).map((test) => (
              <BloodTestGraph
                key={test}
                testName={test}
                testRange={getTestRange(test)}
                csvData={csvData}
              />
            ))}
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="flex h-full items-center justify-center">
              <p className="text-lg text-muted-foreground">
                Select a test category or individual test from the sidebar to
                view its graph.
              </p>
            </CardContent>
          </Card>
        )}
      </SidebarContent>
    </SidebarProvider>
  );
}
