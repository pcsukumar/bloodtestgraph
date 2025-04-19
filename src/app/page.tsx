"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import BloodTestGraph from "@/components/BloodTestGraph";
import CSVUploader from "@/components/CSVUploader";
import DataTable from "@/components/DataTable";
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

  const getTestsInCategory = (category: string) => {
    const cat = testCategories.find((c) => c.category === category);
    return cat ? cat.tests : [];
  };

  const renderGraphs = () => {
    if (showCSVUploader) {
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CSVUploader onDataUpdate={handleCSVDataUpdate} initialData={csvData}/>
            {csvData.length > 0 && (
              <DataTable data={csvData} onDataUpdate={handleCSVDataUpdate} />
            )}
          </CardContent>
        </Card>
      );
    } else if (selectedTest) {
      return (
        <BloodTestGraph
          testName={selectedTest}
          csvData={csvData}
        />
      );
    } else if (selectedCategory) {
      const tests = getTestsInCategory(selectedCategory);
      return (
        <div className="flex flex-col gap-4 w-full">
          {tests.map((test) => (
            <BloodTestGraph
              key={test}
              testName={test}
              csvData={csvData}
            />
          ))}
        </div>
      );
    } else {
      return (
        <Card className="w-full">
          <CardContent className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Select a test category or individual test from the sidebar to
              view its graph.
            </p>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <SidebarProvider>
      <Toaster />
      <Sidebar className="w-60">
        <SidebarHeader>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea>
          
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem className="hover:bg-secondary rounded-md">
                  <SidebarMenuButton onClick={handleDataManagementClick} variant="ghost" className="font-semibold text-base text-foreground sidebar-menu-item">
                    Data Management
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            {testCategories.map((category) => (
              <Accordion
                type="single"
                collapsible
                key={category.category}
              >
                <AccordionItem value={category.category}>
                  <AccordionTrigger onClick={() => handleCategorySelect(category.category)} className="font-semibold sidebar-menu-item hover:bg-secondary rounded-md pl-2">
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <SidebarMenu>
                      {category.tests.map((test) => (
                        <SidebarMenuItem key={test} className="ml-2 hover:bg-secondary rounded-md">
                          <SidebarMenuButton
                            onClick={() => handleTestSelect(test)}
                            variant="ghost"
                            className="font-semibold text-base text-foreground sidebar-menu-item"
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
           
          </ScrollArea>
        </SidebarContent>
       
      </Sidebar>

      <SidebarContent className="flex flex-col pl-0">
        {renderGraphs()}
      </SidebarContent>
    </SidebarProvider>
  );
}
