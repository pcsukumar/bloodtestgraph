# **App Name**: Bloodlines

## Core Features:

- Sidebar Menu: Implement a collapsable left sidebar menu for test categories and individual tests.
- Graph Display: Display a line graph for the selected test, plotting results over time with a shaded normal range band. Display normal range values for each test in the respective graph.
- CSV Upload: Enable uploading a CSV file for managing test results with columns for Test, Date, and Result.
- Data Table: Display uploaded CSV data as a table below the upload option for easy viewing and management.
- Hard-coded data: Store the units, and normal ranges of each blood test as hardcoded constants in JSON format.

## Style Guidelines:

- Primary color: White or light gray for the background to ensure a clean look.
- Secondary color: Dark gray for text and borders to provide contrast.
- Accent color: Teal (#008080) for interactive elements and highlights.
- Two-panel layout: Left sidebar for navigation, right panel for content display.
- Collapsible sidebar menu for categories and individual tests.
- Use simple, clear icons for test categories in the sidebar.
- Subtle transitions for menu collapsing and graph loading.

## Original User Request:
Create a web application to display blood test results. the specifications are following:

Use minimal color theme. App Structure and Layout:

Implement a two-panel layout with a left sidebar and a main wide right panel. The left sidebar contains a menu with: A list of blood test of parent categories: Glucose, Lipid Profile, Kidney, Liver, Urate.

Use the modern style font and collapsable menu for lefte menu bar. In the left menu bar, each category is expandable to show individual tests under that category like the below: -Glucose: HbA1c. -Lipid Profile: Total Cholesterol, HDL Cholesterol, Non-HDL Cholesterol, LDL Cholesterol, Total Cholesterol:HDL Ratio, Triglyceride. -Kidney: Urea, Sodium, Potassium, Creatinine, Albumin, eGFR, Urinary Creatinine, Microalbumin, Microalbumin Creatinine Ratio. -Liver: Total Protein, Total Bilirubin, Alkaline Phosphatase, Gamma GT, AST, Alanine Transaminase. -Urate: Urate.

Clicking an individual test (e.g., Total Cholesterol) displays a single line graph for that test in the right panel.

Hard-Coded Normal Ranges and Units:

Predefine units and normal ranges for each test are given in JOSN format below:

[ { "test": "HbA1c", "unit": "mmol/mol", "minimum": 20, "maximum": 42 }, { "test": "Total Cholesterol", "unit": "mmol/L", "minimum": 2.50, "maximum": 5.00 }, { "test": "HDL Cholesterol", "unit": "mmol/L", "minimum": 1.00, "maximum": 2.00 }, { "test": "Non-HDL Cholesterol", "unit": "mmol/L", "minimum": 1.80, "maximum": 3.80 }, { "test": "LDL Cholesterol", "unit": "mmol/L", "minimum": 1.00, "maximum": 3.00 }, { "test": "Total Cholesterol:HDL Ratio", "unit": null, "minimum": 2.0, "maximum": 5.0 }, { "test": "Triglyceride", "unit": "mmol/L", "minimum": 0.50, "maximum": 1.70 }, { "test": "Urea", "unit": "mmol/L", "minimum": 2.8, "maximum": 8.1 }, { "test": "Sodium", "unit": "mmol/L", "minimum": 136, "maximum": 145 }, { "test": "Potassium", "unit": "mmol/L", "minimum": 3.5, "maximum": 5.0 }, { "test": "Creatinine", "unit": "µmol/L", "minimum": 59, "maximum": 104 }, { "test": "Albumin", "unit": "g/L", "minimum": 35, "maximum": 50 }, { "test": "eGFR", "unit": "mL/min/1.73m²", "minimum": 90, "maximum": null }, { "test": "Urinary Creatinine", "unit": "mg/dL", "minimum": 20, "maximum": 370 }, { "test": "Microalbumin", "unit": "mg/L", "minimum": null, "maximum": 30 }, { "test": "Microalbumin Creatinine Ratio", "unit": "mg/g", "minimum": null, "maximum": 30 }, { "test": "Total Protein", "unit": "g/L", "minimum": 66, "maximum": 87 }, { "test": "Total Bilirubin", "unit": "µmol/L", "minimum": 0, "maximum": 21 }, { "test": "Alkaline Phosphatase", "unit": "IU/L", "minimum": 40, "maximum": 129 }, { "test": "Gamma GT", "unit": "IU/L", "minimum": 10, "maximum": 71 }, { "test": "AST", "unit": "IU/L", "minimum": 0, "maximum": 40 }, { "test": "Alanine Transaminase", "unit": "IU/L", "minimum": 0, "maximum": 41 }, { "test": "Urate", "unit": "µmol/L", "minimum": 200, "maximum": 430 } ]

Data Input:

A separate "Data management" section on the left pane to manage results (add/edit/update). When click on the "Data management" menu, an option to ploaded a CSV file should show on the righ pane. Allow uploading a CSV file with columns: Test, Date, Result. CSV format: Test (matches predefined test names), Date (dd/mm/yyyy), Result (numeric). Below the upload option, the uploded data should show as a table once the data from CSV file uploded.

Graph Display: In the right panel:

Clicking on a parent category (e.g., Lipid Profile) displays a page in the right panel with line graphs for all tests under that category (i.e graphs of Total Cholesterol, HDL Cholesterol, Non-HDL Cholesterol, LDL Cholesterol, Total Cholesterol:HDL Ratio, Triglyceride). Clicking on a individual test (e.g Total Cholesterol) should disply the graph of that test on the right pane.

For all tests, display a line graph plotting result values over time.

Graph specifications (use full width of the righ pane):

X-axis: Test date (sorted chronologically).

Y-axis: Result value (scaled to the test’s unit).

On the graphs create shaded normal range band using minimum and maximum values given for each test above.
Include tooltips showing date, value, and the normal range. Ensure graphs are responsive and support at least 10 data points.
  