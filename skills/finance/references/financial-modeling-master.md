# Financial Modeling Master Skill

## Description

Expert-level financial modeling for Fortune 50 companies and investment banking. Provides best practices, templates, and methodologies for building robust, flexible, and error-free financial models including 3-statement models, DCF, LBO, M&A, scenario analysis, and sensitivity testing. This skill delivers institutional-quality modeling standards with proper structure, documentation, and audit trails.

## When to Use This Skill

Use this skill when:

- Building or auditing financial models
- Creating 3-statement operating models
- Developing DCF valuation models
- Building LBO or M&A models
- Conducting scenario and sensitivity analysis
- Establishing financial modeling standards for a team
- Training analysts on modeling best practices
- Troubleshooting model errors or circular references
- Improving model flexibility and scalability

## Core Modeling Principles

### The Golden Rules of Financial Modeling

1. **KISS (Keep It Simple, Structured)**
   - Simple beats complex (easier to understand, debug, and audit)
   - Consistent structure across all models
   - One input, one output, one calculation per cell

2. **Separation of Inputs, Calculations, and Outputs**
   - Inputs: Separate worksheet or clearly delineated section
   - Calculations: Hidden or separate worksheets
   - Outputs: Clean, presentation-ready

3. **Formatting for Clarity**
   - Blue font: Hard-coded inputs
   - Black font: Formulas and calculations
   - Green font: Links to other worksheets/files (use sparingly)
   - Color-coding: Use cell shading for input sections

4. **Documentation & Auditability**
   - Every assumption must have a source or rationale
   - Formula logic should be transparent (no complex nested formulas)
   - Include version control and change log
   - Add comments for non-obvious calculations

5. **Flexibility & Scalability**
   - Use named ranges or tables for key inputs
   - Build for easy scenario switching
   - Avoid hard-coded numbers in formulas
   - Design for future periods without restructuring

6. **Error Checks & Validation**
   - Balance sheet must balance (Assets = Liabilities + Equity)
   - Cash flow statement ties to balance sheet cash
   - Build-in error checks (e.g., =IF(ABS(Assets-Liab-Equity)>0.01,"ERROR","OK"))
   - Reconcile to source data

7. **Version Control**
   - File naming: [CompanyName]_[ModelType]_[Date]\_[Version].xlsx
   - Example: Acme_DCF_20231115_v3.xlsx
   - Track changes in a dedicated "Version History" worksheet

---

## Model Structure & Layout

### Standard Model Architecture

```
Financial Model Structure (Worksheet Tabs - Left to Right):

1. Cover Sheet
2. Executive Summary
3. Table of Contents / Instructions
4. Assumptions & Inputs
5. Historical Financials
6. Income Statement
7. Balance Sheet
8. Cash Flow Statement
9. Supporting Schedules (Debt, Working Capital, CAPEX, etc.)
10. Valuation / Returns Analysis
11. Sensitivity & Scenario Analysis
12. Charts & Graphs
13. Checks & Balances
14. Working / Scratch (hidden)
15. Version History
```

---

### 1. Cover Sheet Template

```markdown
[COMPANY LOGO]

Financial Model
[Company Name]
[Model Type: 3-Statement Operating Model / DCF Valuation / LBO Analysis]

Prepared by: [Name]
Date: [MM/DD/YYYY]
Version: [X.X]

Model Summary:

- Valuation Date: [Date]
- Forecast Period: [Years]
- [Key Output Metric]: [Value]

Disclaimer:
This model contains forward-looking estimates and assumptions. Actual results may differ materially. This model is for internal use only and should not be distributed without authorization.
```

---

### 2. Executive Summary Template

**Key Outputs (Dashboard Style):**

| Metric                     | Value        | Notes                         |
| -------------------------- | ------------ | ----------------------------- |
| **Valuation**              |              |                               |
| Enterprise Value           | $X.X billion | Mid-point of DCF range        |
| Equity Value               | $X.X billion | EV - Net Debt                 |
| Value per Share            | $XX.XX       | Based on X million shares     |
|                            |              |                               |
| **Returns (LBO models)**   |              |                               |
| Entry Multiple             | X.Xx         | EV/LTM EBITDA                 |
| Exit Multiple              | X.Xx         | EV/Year 5 EBITDA              |
| IRR                        | XX.X%        | 5-year hold                   |
| MoIC (Money-on-Money)      | X.Xx         | Total return / Initial equity |
|                            |              |                               |
| **Financials (Year 5)**    |              |                               |
| Revenue                    | $X.X billion | X% CAGR                       |
| EBITDA                     | $X.X million | X% margin                     |
| Free Cash Flow             | $X.X million | X% FCF margin                 |
| Leverage (Net Debt/EBITDA) | X.Xx         | Down from Y.Yy at entry       |

**Key Assumptions:**

- Revenue growth: [X% CAGR]
- EBITDA margin: [Expanding from X% to Y%]
- WACC: [X.X%]
- Terminal growth rate: [X%]

**Sensitivity Summary:**

- Valuation range: [$X - $Y per share]
- Most sensitive to: [Revenue growth, EBITDA margin, WACC]

---

### 3. Assumptions & Inputs Worksheet

**Layout Principles:**

- Clearly labeled sections
- Blue font for all inputs
- Source/rationale column for every assumption
- Units clearly stated (%, $M, days, etc.)

**Template:**

```
ASSUMPTIONS & INPUTS
[Company Name] - [Model Type]

================================================================================
SECTION 1: GENERAL ASSUMPTIONS
================================================================================

Model Date:                     [MM/DD/YYYY]          [Blue font]
Fiscal Year End:                [MM/DD]
Valuation Date:                 [MM/DD/YYYY]
Forecast Period:                [Years 1-5]

Currency:                       [USD]
Units:                          [Millions]            [Unless otherwise noted]

================================================================================
SECTION 2: REVENUE ASSUMPTIONS
================================================================================

                                    Historical ←        → Forecast                Source / Rationale
                                Yr-2  Yr-1  LTM | Yr1  Yr2  Yr3  Yr4  Yr5

Revenue Growth %                 X%    X%    X% | X%   X%   X%   X%   X%         [Industry growth + share gain]
  Organic Growth %               X%    X%    X% | X%   X%   X%   X%   X%         [Market research: X% CAGR]
  Acquisition Contribution       $X    $X    $X | $X   $X   $0   $0   $0         [Specific acquisition]
  Price Increase %                     X%    X% | X%   X%   X%   X%   X%         [Inflation pass-through]

Revenue by Segment:
  Segment A Growth %                             | X%   X%   X%   X%   X%         [Segment-specific drivers]
  Segment B Growth %                             | X%   X%   X%   X%   X%
  Segment C Growth %                             | X%   X%   X%   X%   X%

================================================================================
SECTION 3: MARGIN & OPEX ASSUMPTIONS
================================================================================

Gross Margin %                   X%    X%    X% | X%   X%   X%   X%   X%         [Scale + productivity]
  COGS as % Revenue              X%    X%    X% | X%   X%   X%   X%   X%

Operating Expenses:
  S&M as % Revenue               X%    X%    X% | X%   X%   X%   X%   X%         [Operating leverage]
  R&D as % Revenue               X%    X%    X% | X%   X%   X%   X%   X%         [Maintain at X%]
  G&A as % Revenue               X%    X%    X% | X%   X%   X%   X%   X%         [Operating leverage]

EBITDA Margin % (Calculated)     X%    X%    X% | X%   X%   X%   X%   X%

D&A as % Revenue                 X%    X%    X% | X%   X%   X%   X%   X%         [Historical average]

================================================================================
SECTION 4: WORKING CAPITAL ASSUMPTIONS
================================================================================

Days Sales Outstanding (DSO)     X     X     X  | X    X    X    X    X          [Target improvement]
Days Inventory Outstanding (DIO) X     X     X  | X    X    X    X    X          [JIT implementation]
Days Payable Outstanding (DPO)   X     X     X  | X    X    X    X    X          [Negotiate terms]

Cash Conversion Cycle (Days)     X     X     X  | X    X    X    X    X          [DSO+DIO-DPO]
Net WC as % Revenue              X%    X%    X% | X%   X%   X%   X%   X%

================================================================================
SECTION 5: CAPEX & DEPRECIATION
================================================================================

CAPEX as % Revenue               X%    X%    X% | X%   X%   X%   X%   X%         [Maintenance X%, Growth Y%]
  Maintenance CAPEX % Revenue                   | X%   X%   X%   X%   X%         [Industry norm]
  Growth CAPEX % Revenue                        | X%   X%   X%   X%   X%         [Expansion projects]

Depreciation Method                             | [Straight-line]                [X-year useful life]
Average Asset Life (Years)                      | X years

D&A as % Revenue (Calculated)    X%    X%    X% | X%   X%   X%   X%   X%

================================================================================
SECTION 6: TAX ASSUMPTIONS
================================================================================

Statutory Tax Rate               X%    X%    X% | X%   X%   X%   X%   X%         [Federal + State]
Effective Tax Rate (Historical)  X%    X%    X% |                                [As reported]
Effective Tax Rate (Forecast)                   | X%   X%   X%   X%   X%         [Normalize to X%]

Tax Credits (Annual)                            | $X   $X   $X   $X   $X         [R&D credits]
NOL Carryforward (if applicable)                | $X                             [Expires 20XX]

Cash Tax Rate                                   | X%   X%   X%   X%   X%         [ETR adjusted for timing]

================================================================================
SECTION 7: BALANCE SHEET ASSUMPTIONS
================================================================================

Minimum Cash Balance             | $X million                                    [X days operating expenses]

Debt:
  Revolver - Capacity              | $X million                                    [Undrawn at model date]
  Revolver - Interest Rate         | SOFR + X bps                                  [Credit agreement]
  Term Loan - Outstanding          | $X million                                    [As of model date]
  Term Loan - Interest Rate        | SOFR + X bps
  Term Loan - Amortization         | X% annually

Dividends:
  Dividend Payout Ratio            | X% of Net Income                              [Target policy]
  Dividend per Share               | $X.XX                                         [Historical / Target]

Share Buybacks:
  Annual Buyback Amount            | $X million                                    [Board authorization]

================================================================================
SECTION 8: VALUATION ASSUMPTIONS (DCF Models)
================================================================================

WACC Components:
  Risk-Free Rate                   | X.X%                                          [10-Year Treasury]
  Equity Risk Premium              | X.X%                                          [Historical average / Damodaran]
  Beta (Levered)                   | X.XX                                          [Bloomberg / Regression]
  Cost of Equity                   | X.X%                                          [CAPM]

  Cost of Debt (Pre-Tax)           | X.X%                                          [Blended rate]
  Tax Rate for Debt Shield         | X%
  Cost of Debt (After-Tax)         | X.X%

  Target Debt %                    | X%                                            [Capital structure]
  Target Equity %                  | X%

  WACC (Calculated)                | X.X%

Terminal Value:
  Perpetuity Growth Rate           | X.X%                                          [Long-term GDP growth]
  OR Exit Multiple (EV/EBITDA)     | X.Xx                                          [Industry median]

================================================================================
SECTION 9: SCENARIO SWITCHES
================================================================================

Select Scenario:                   | [Base Case]                                   [Dropdown: Base / Bull / Bear]

Scenario Summary:
                                    | Base       Bull       Bear
Revenue CAGR (Yr 1-5)               | X%         X%         X%
EBITDA Margin (Year 5)              | X%         X%         X%
Terminal Growth Rate                | X%         X%         X%
WACC                                | X%         X%         X%

================================================================================
END OF ASSUMPTIONS
================================================================================
```

**Best Practices for Assumptions:**

- Every input must have a source (management, industry reports, historical data, etc.)
- Use data validation for dropdowns (e.g., scenario selection)
- Group related assumptions together
- Use clear, descriptive labels
- Add units (%, $M, days) to every input

---

### 4. Historical Financials Worksheet

**Purpose:**

- Consolidate historical financial data
- Calculate historical trends and ratios
- Provide foundation for forecasts

**Template:**

```
HISTORICAL FINANCIALS
[Company Name]

Source: [Company 10-Ks, Management, etc.]

================================================================================
INCOME STATEMENT ($ Millions)
================================================================================

                                    Year -4   Year -3   Year -2   Year -1     LTM      CAGR
                                                                                      (Yr-4 to LTM)

Revenue                             $X        $X        $X        $X        $X        X%
  % Growth Y/Y                                X%        X%        X%        X%

Cost of Goods Sold                  ($X)      ($X)      ($X)      ($X)      ($X)      X%
Gross Profit                        $X        $X        $X        $X        $X        X%
  Gross Margin %                    X%        X%        X%        X%        X%

Operating Expenses:
  Sales & Marketing                 ($X)      ($X)      ($X)      ($X)      ($X)      X%
    % of Revenue                    X%        X%        X%        X%        X%
  Research & Development            ($X)      ($X)      ($X)      ($X)      ($X)      X%
    % of Revenue                    X%        X%        X%        X%        X%
  General & Administrative          ($X)      ($X)      ($X)      ($X)      ($X)      X%
    % of Revenue                    X%        X%        X%        X%        X%
Total Operating Expenses            ($X)      ($X)      ($X)      ($X)      ($X)      X%
  % of Revenue                      X%        X%        X%        X%        X%

EBITDA                              $X        $X        $X        $X        $X        X%
  EBITDA Margin %                   X%        X%        X%        X%        X%

Depreciation & Amortization         ($X)      ($X)      ($X)      ($X)      ($X)      X%
  % of Revenue                      X%        X%        X%        X%        X%

EBIT                                $X        $X        $X        $X        $X        X%
  EBIT Margin %                     X%        X%        X%        X%        X%

Interest Expense                    ($X)      ($X)      ($X)      ($X)      ($X)
Interest Income                     $X        $X        $X        $X        $X
Other Income/(Expense)              $X        $X        $X        $X        $X

Earnings Before Tax                 $X        $X        $X        $X        $X        X%

Income Tax Expense                  ($X)      ($X)      ($X)      ($X)      ($X)
  Effective Tax Rate                X%        X%        X%        X%        X%

Net Income                          $X        $X        $X        $X        $X        X%
  Net Margin %                      X%        X%        X%        X%        X%

Shares Outstanding (MM)             X         X         X         X         X
EPS (Diluted)                       $X.XX     $X.XX     $X.XX     $X.XX     $X.XX     X%

================================================================================
BALANCE SHEET ($ Millions)
================================================================================

                                    Year -4   Year -3   Year -2   Year -1     LTM

ASSETS
Current Assets:
  Cash & Cash Equivalents           $X        $X        $X        $X        $X
  Accounts Receivable               $X        $X        $X        $X        $X
  Inventory                         $X        $X        $X        $X        $X
  Prepaid Expenses & Other          $X        $X        $X        $X        $X
Total Current Assets                $X        $X        $X        $X        $X

Property, Plant & Equipment (Net)   $X        $X        $X        $X        $X
Goodwill                            $X        $X        $X        $X        $X
Intangible Assets (Net)             $X        $X        $X        $X        $X
Other Long-Term Assets              $X        $X        $X        $X        $X

TOTAL ASSETS                        $X        $X        $X        $X        $X

LIABILITIES & EQUITY
Current Liabilities:
  Accounts Payable                  $X        $X        $X        $X        $X
  Accrued Expenses                  $X        $X        $X        $X        $X
  Short-Term Debt                   $X        $X        $X        $X        $X
  Deferred Revenue                  $X        $X        $X        $X        $X
  Other Current Liabilities         $X        $X        $X        $X        $X
Total Current Liabilities           $X        $X        $X        $X        $X

Long-Term Debt                      $X        $X        $X        $X        $X
Deferred Tax Liabilities            $X        $X        $X        $X        $X
Other Long-Term Liabilities         $X        $X        $X        $X        $X
Total Liabilities                   $X        $X        $X        $X        $X

Shareholders' Equity:
  Common Stock                      $X        $X        $X        $X        $X
  Additional Paid-In Capital        $X        $X        $X        $X        $X
  Retained Earnings                 $X        $X        $X        $X        $X
  Treasury Stock                    ($X)      ($X)      ($X)      ($X)      ($X)
  Other Comprehensive Income        $X        $X        $X        $X        $X
Total Shareholders' Equity          $X        $X        $X        $X        $X

TOTAL LIABILITIES & EQUITY          $X        $X        $X        $X        $X

Check: Assets = Liabilities + Equity? [OK / ERROR]

================================================================================
CASH FLOW STATEMENT ($ Millions)
================================================================================

                                    Year -4   Year -3   Year -2   Year -1     LTM

OPERATING ACTIVITIES
Net Income                          $X        $X        $X        $X        $X
Adjustments:
  Depreciation & Amortization       $X        $X        $X        $X        $X
  Stock-Based Compensation          $X        $X        $X        $X        $X
  Deferred Taxes                    $X        $X        $X        $X        $X
  Other Non-Cash Items              $X        $X        $X        $X        $X
Changes in Working Capital:
  (Increase) / Decrease in A/R      $X        $X        $X        $X        $X
  (Increase) / Decrease in Inventory $X       $X        $X        $X        $X
  Increase / (Decrease) in A/P      $X        $X        $X        $X        $X
  Other Working Capital Changes     $X        $X        $X        $X        $X
Cash from Operating Activities      $X        $X        $X        $X        $X

INVESTING ACTIVITIES
Capital Expenditures                ($X)      ($X)      ($X)      ($X)      ($X)
Acquisitions                        ($X)      ($X)      ($X)      ($X)      ($X)
Proceeds from Asset Sales           $X        $X        $X        $X        $X
Other Investing Activities          $X        $X        $X        $X        $X
Cash from Investing Activities      ($X)      ($X)      ($X)      ($X)      ($X)

Free Cash Flow (CFO - CAPEX)        $X        $X        $X        $X        $X
  FCF Margin %                      X%        X%        X%        X%        X%

FINANCING ACTIVITIES
Proceeds from Debt                  $X        $X        $X        $X        $X
Repayment of Debt                   ($X)      ($X)      ($X)      ($X)      ($X)
Dividends Paid                      ($X)      ($X)      ($X)      ($X)      ($X)
Share Repurchases                   ($X)      ($X)      ($X)      ($X)      ($X)
Proceeds from Stock Issuance        $X        $X        $X        $X        $X
Other Financing Activities          $X        $X        $X        $X        $X
Cash from Financing Activities      $X        $X        $X        $X        $X

Net Change in Cash                  $X        $X        $X        $X        $X
Beginning Cash                      $X        $X        $X        $X        $X
Ending Cash                         $X        $X        $X        $X        $X

Check: Ending Cash = Balance Sheet Cash? [OK / ERROR]

================================================================================
KEY RATIOS & METRICS
================================================================================

                                    Year -4   Year -3   Year -2   Year -1     LTM

Profitability:
  Gross Margin %                    X%        X%        X%        X%        X%
  EBITDA Margin %                   X%        X%        X%        X%        X%
  EBIT Margin %                     X%        X%        X%        X%        X%
  Net Margin %                      X%        X%        X%        X%        X%
  FCF Margin %                      X%        X%        X%        X%        X%

Returns:
  ROIC (NOPAT / Invested Capital)   X%        X%        X%        X%        X%
  ROE (NI / Avg Equity)             X%        X%        X%        X%        X%
  ROA (NI / Avg Assets)             X%        X%        X%        X%        X%

Efficiency:
  Asset Turnover (Revenue / Avg Assets) X.Xx   X.Xx     X.Xx      X.Xx      X.Xx
  DSO (Days Sales Outstanding)      X         X         X         X         X
  DIO (Days Inventory Outstanding)  X         X         X         X         X
  DPO (Days Payable Outstanding)    X         X         X         X         X
  Cash Conversion Cycle             X         X         X         X         X

Leverage:
  Total Debt                        $X        $X        $X        $X        $X
  Net Debt (Debt - Cash)            $X        $X        $X        $X        $X
  Debt / EBITDA                     X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Net Debt / EBITDA                 X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Interest Coverage (EBITDA / Interest) X.Xx  X.Xx      X.Xx      X.Xx      X.Xx

Valuation (if public):
  Share Price (Year-End)            $X.XX     $X.XX     $X.XX     $X.XX     $X.XX
  Market Cap                        $X        $X        $X        $X        $X
  Enterprise Value                  $X        $X        $X        $X        $X
  P/E Ratio                         X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  EV / Revenue                      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  EV / EBITDA                       X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  EV / EBIT                         X.Xx      X.Xx      X.Xx      X.Xx      X.Xx

Capital Structure:
  Debt %                            X%        X%        X%        X%        X%
  Equity %                          X%        X%        X%        X%        X%

================================================================================
```

---

### 5-7. Forecast Period: Income Statement, Balance Sheet, Cash Flow

**Integrated 3-Statement Model Structure:**

The forecast period integrates all three financial statements with proper linkages:

- Income Statement drives Revenue → EBITDA → Net Income
- Net Income flows to Cash Flow Statement and Balance Sheet (Retained Earnings)
- Balance Sheet drives Working Capital changes in Cash Flow
- Cash Flow Statement calculates ending Cash, which returns to Balance Sheet

**Critical Linkages to Maintain:**

```
Income Statement → Balance Sheet:
- Net Income → Retained Earnings (cumulative)
- D&A → Accumulated Depreciation (reduces PP&E)
- Stock-Based Comp → Additional Paid-In Capital

Income Statement → Cash Flow:
- Net Income → Starting point of Operating Activities
- D&A → Add back (non-cash)

Balance Sheet → Cash Flow:
- Change in A/R → Operating Activities (Working Capital section)
- Change in Inventory → Operating Activities
- Change in A/P → Operating Activities
- PP&E change → CAPEX in Investing Activities
- Debt change → Financing Activities

Cash Flow → Balance Sheet:
- Ending Cash (from CF statement) → Cash & Equivalents on Balance Sheet
```

---

**Income Statement Forecast Template:**

```
INCOME STATEMENT - FORECAST ($ Millions)
[Company Name]

                                    LTM       Year 1    Year 2    Year 3    Year 4    Year 5
                                   (Actual)  (Forecast)(Forecast)(Forecast)(Forecast)(Forecast)

Revenue                             $X        $X        $X        $X        $X        $X
  % Growth Y/Y                      X%        X%        X%        X%        X%        X%

  [Formula Example for Year 1 Revenue]:
  = LTM Revenue × (1 + Assumptions!Year1_Revenue_Growth%)

Cost of Goods Sold                  ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Formula: = Revenue × Assumptions!COGS_as_%_Revenue]

Gross Profit                        $X        $X        $X        $X        $X        $X
  Gross Margin %                    X%        X%        X%        X%        X%        X%

Operating Expenses:
  Sales & Marketing                 ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    % of Revenue                    X%        X%        X%        X%        X%        X%
    [Formula: = Revenue × Assumptions!SGA_as_%_Revenue]

  Research & Development            ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    % of Revenue                    X%        X%        X%        X%        X%        X%

  General & Administrative          ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    % of Revenue                    X%        X%        X%        X%        X%        X%

Total Operating Expenses            ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  % of Revenue                      X%        X%        X%        X%        X%        X%

EBITDA                              $X        $X        $X        $X        $X        $X
  EBITDA Margin %                   X%        X%        X%        X%        X%        X%

Depreciation & Amortization         ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Formula: = Revenue × Assumptions!DA_as_%_Revenue]
  [Alternative: Link to PP&E schedule based on asset lives]

EBIT                                $X        $X        $X        $X        $X        $X
  EBIT Margin %                     X%        X%        X%        X%        X%        X%

Interest Expense                    ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Formula: = Avg Debt Balance (from Debt Schedule) × Interest Rate]

Interest Income                     $X        $X        $X        $X        $X        $X
  [Formula: = Avg Cash Balance × Interest Rate on Cash]

Earnings Before Tax                 $X        $X        $X        $X        $X        $X

Income Tax Expense                  ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Formula: = EBT × Assumptions!Effective_Tax_Rate]

  Effective Tax Rate                X%        X%        X%        X%        X%        X%

Net Income                          $X        $X        $X        $X        $X        $X
  Net Margin %                      X%        X%        X%        X%        X%        X%

Shares Outstanding (MM)             X         X         X         X         X         X
  [Formula: = Prior Year Shares + New Issuance - Buybacks/Treasury]

EPS (Diluted)                       $X.XX     $X.XX     $X.XX     $X.XX     $X.XX     $X.XX
  [Formula: = Net Income / Shares Outstanding]
  % Growth Y/Y                                X%        X%        X%        X%        X%

Dividends per Share                 $X.XX     $X.XX     $X.XX     $X.XX     $X.XX     $X.XX
  [Formula: = Assumptions!Dividend_per_Share OR EPS × Payout Ratio]

Total Dividends Paid                $X        $X        $X        $X        $X        $X
  [Formula: = DPS × Shares Outstanding]
```

---

**Balance Sheet Forecast Template:**

```
BALANCE SHEET - FORECAST ($ Millions)
[Company Name]

                                    LTM       Year 1    Year 2    Year 3    Year 4    Year 5
                                   (Actual)  (Forecast)(Forecast)(Forecast)(Forecast)(Forecast)

ASSETS

Current Assets:
  Cash & Cash Equivalents           $X        $X        $X        $X        $X        $X
    [Formula: = Prior Year Cash + Net Change in Cash (from CF Statement)]
    [OR: Plug to balance sheet if using revolver draw/paydown as balancing item]

  Accounts Receivable               $X        $X        $X        $X        $X        $X
    [Formula: = Revenue × (Assumptions!DSO / 365)]

  Inventory                         $X        $X        $X        $X        $X        $X
    [Formula: = COGS × (Assumptions!DIO / 365)]

  Prepaid Expenses & Other          $X        $X        $X        $X        $X        $X
    [Formula: = % of Revenue OR grow with revenue]

Total Current Assets                $X        $X        $X        $X        $X        $X

Property, Plant & Equipment (Gross) $X        $X        $X        $X        $X        $X
  [Formula: = Prior Year PP&E Gross + CAPEX]

  Less: Accumulated Depreciation    ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    [Formula: = Prior Year Acc. Depr. + D&A]

Property, Plant & Equipment (Net)   $X        $X        $X        $X        $X        $X

Goodwill                            $X        $X        $X        $X        $X        $X
  [Typically constant unless acquisition or impairment]

Intangible Assets (Net)             $X        $X        $X        $X        $X        $X
  [Amortize over useful life]

Other Long-Term Assets              $X        $X        $X        $X        $X        $X

TOTAL ASSETS                        $X        $X        $X        $X        $X        $X

================================================================================

LIABILITIES & EQUITY

Current Liabilities:
  Accounts Payable                  $X        $X        $X        $X        $X        $X
    [Formula: = COGS × (Assumptions!DPO / 365)]

  Accrued Expenses                  $X        $X        $X        $X        $X        $X
    [Formula: = % of Revenue OR % of OpEx]

  Short-Term Debt / Current Portion of LT Debt $X $X   $X        $X        $X        $X
    [Formula: Link to Debt Schedule - current year mandatory amortization]

  Deferred Revenue                  $X        $X        $X        $X        $X        $X
    [Formula: = % of Revenue for subscription businesses OR specific contracts]

  Other Current Liabilities         $X        $X        $X        $X        $X        $X

Total Current Liabilities           $X        $X        $X        $X        $X        $X

Long-Term Debt                      $X        $X        $X        $X        $X        $X
  [Formula: Link to Debt Schedule - exclude current portion]

Deferred Tax Liabilities            $X        $X        $X        $X        $X        $X
  [Based on temporary differences, complex - often % of PP&E or flat]

Other Long-Term Liabilities         $X        $X        $X        $X        $X        $X

Total Liabilities                   $X        $X        $X        $X        $X        $X

================================================================================

Shareholders' Equity:
  Common Stock (Par Value)          $X        $X        $X        $X        $X        $X
    [Typically flat unless equity issuance]

  Additional Paid-In Capital        $X        $X        $X        $X        $X        $X
    [Increases with equity issuance, stock-based comp]

  Retained Earnings                 $X        $X        $X        $X        $X        $X
    [Formula: = Prior Year RE + Net Income - Dividends]

  Treasury Stock                    ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    [Increases with buybacks]

  Other Comprehensive Income        $X        $X        $X        $X        $X        $X
    [FX translation, unrealized gains - often assumed flat]

Total Shareholders' Equity          $X        $X        $X        $X        $X        $X

TOTAL LIABILITIES & EQUITY          $X        $X        $X        $X        $X        $X

================================================================================
BALANCE SHEET CHECK
================================================================================

Total Assets                        $X        $X        $X        $X        $X        $X
Total Liabilities & Equity          $X        $X        $X        $X        $X        $X
Difference                          $0.0      $0.0      $0.0      $0.0      $0.0      $0.0
Check                               OK        OK        OK        OK        OK        OK

[Formula for Check: =IF(ABS(Assets - Liab - Equity) > 0.01, "ERROR", "OK")]
```

---

**Cash Flow Statement Forecast Template:**

```
CASH FLOW STATEMENT - FORECAST ($ Millions)
[Company Name]

                                    LTM       Year 1    Year 2    Year 3    Year 4    Year 5
                                   (Actual)  (Forecast)(Forecast)(Forecast)(Forecast)(Forecast)

OPERATING ACTIVITIES

Net Income                          $X        $X        $X        $X        $X        $X
  [Link to Income Statement]

Adjustments to Reconcile NI to Cash from Operations:
  Depreciation & Amortization       $X        $X        $X        $X        $X        $X
    [Link to Income Statement]

  Stock-Based Compensation          $X        $X        $X        $X        $X        $X
    [Assumption or % of OpEx]

  Deferred Taxes                    $X        $X        $X        $X        $X        $X
    [Change in Deferred Tax Liabilities from Balance Sheet]

  Other Non-Cash Items              $X        $X        $X        $X        $X        $X

Changes in Working Capital:
  (Increase) / Decrease in Accounts Receivable ($X)   ($X)      ($X)      ($X)      ($X)      ($X)
    [Formula: = Prior Year A/R - Current Year A/R]
    [Negative = increase in A/R = use of cash]

  (Increase) / Decrease in Inventory         ($X)     ($X)      ($X)      ($X)      ($X)      ($X)
    [Formula: = Prior Year Inventory - Current Year Inventory]

  (Increase) / Decrease in Prepaid & Other   ($X)     ($X)      ($X)      ($X)      ($X)      ($X)

  Increase / (Decrease) in Accounts Payable  $X       $X        $X        $X        $X        $X
    [Formula: = Current Year A/P - Prior Year A/P]
    [Positive = increase in A/P = source of cash]

  Increase / (Decrease) in Accrued Expenses  $X       $X        $X        $X        $X        $X

  Increase / (Decrease) in Deferred Revenue  $X       $X        $X        $X        $X        $X

Cash from Operating Activities      $X        $X        $X        $X        $X        $X

================================================================================

INVESTING ACTIVITIES

Capital Expenditures                ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Formula: = Revenue × Assumptions!CAPEX_as_%_Revenue]
  [OR: Detailed build-up by project]
  [Negative = use of cash]

Acquisitions                        ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [From Assumptions if planned acquisitions]

Proceeds from Asset Sales           $X        $X        $X        $X        $X        $X

Other Investing Activities          $X        $X        $X        $X        $X        $X

Cash from Investing Activities      ($X)      ($X)      ($X)      ($X)      ($X)      ($X)

================================================================================

Free Cash Flow (before Financing)   $X        $X        $X        $X        $X        $X
  [Formula: = Cash from Ops + Cash from Investing (excluding acquisitions)]
  [OR: = Cash from Ops - CAPEX for simpler definition]

  FCF Margin %                      X%        X%        X%        X%        X%        X%

================================================================================

FINANCING ACTIVITIES

Proceeds from Debt Issuance         $X        $X        $X        $X        $X        $X
  [From Debt Schedule or Assumptions]

Repayment of Debt                   ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [From Debt Schedule - mandatory + optional paydown]

Dividends Paid                      ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [Link to Income Statement or = DPS × Shares]

Share Repurchases                   ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  [From Assumptions]

Proceeds from Stock Issuance        $X        $X        $X        $X        $X        $X
  [If equity raises planned]

Revolver Draw / (Paydown)           $X        ($X)      $X        ($X)      $X        ($X)
  [Plug to maintain minimum cash balance OR specific use/paydown]

Other Financing Activities          $X        $X        $X        $X        $X        $X

Cash from Financing Activities      $X        $X        $X        $X        $X        $X

================================================================================

Net Change in Cash                  $X        $X        $X        $X        $X        $X
  [Formula: = Cash from Ops + Cash from Investing + Cash from Financing]

Beginning Cash Balance              $X        $X        $X        $X        $X        $X
  [Formula: = Prior Period Ending Cash]

Ending Cash Balance                 $X        $X        $X        $X        $X        $X
  [Formula: = Beginning Cash + Net Change in Cash]

================================================================================
CASH FLOW CHECK
================================================================================

Ending Cash (from CF Statement)     $X        $X        $X        $X        $X        $X
Cash on Balance Sheet               $X        $X        $X        $X        $X        $X
Difference                          $0.0      $0.0      $0.0      $0.0      $0.0      $0.0
Check                               OK        OK        OK        OK        OK        OK

[Formula: =IF(ABS(CF_Ending_Cash - BS_Cash) > 0.01, "ERROR", "OK")]
```

---

### 8. Supporting Schedules

#### Debt Schedule Template

```
DEBT SCHEDULE ($ Millions)

                                    Year 0    Year 1    Year 2    Year 3    Year 4    Year 5

REVOLVER
  Beginning Balance                 $X        $X        $X        $X        $X        $X
  Draws                             $X        $X        $X        $X        $X        $X
  Paydowns                          ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  Ending Balance                    $X        $X        $X        $X        $X        $X

  Interest Rate                     L+Xbps    X.X%      X.X%      X.X%      X.X%      X.X%
  Interest Expense                  $X        $X        $X        $X        $X        $X

  [Formula: = Average Balance × Interest Rate]
  [Average Balance = (Beginning + Ending) / 2]

---

TERM LOAN
  Beginning Balance                 $X        $X        $X        $X        $X        $X
  Mandatory Amortization            ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
    [% of original principal per year]
  Optional Paydown (from Excess FCF) ($X)     ($X)      ($X)      ($X)      ($X)      ($X)
  Ending Balance                    $X        $X        $X        $X        $X        $X

  Interest Rate                     L+Xbps    X.X%      X.X%      X.X%      X.X%      X.X%
  Interest Expense                  $X        $X        $X        $X        $X        $X

---

SENIOR NOTES
  Beginning Balance                 $X        $X        $X        $X        $X        $X
  Issuance                          $X        $X        $X        $X        $X        $X
  Repayment at Maturity             ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  Ending Balance                    $X        $X        $X        $X        $X        $X

  Interest Rate (Fixed)             X.X%      X.X%      X.X%      X.X%      X.X%      X.X%
  Interest Expense                  $X        $X        $X        $X        $X        $X

  [Formula: = Balance × Interest Rate]

---

TOTAL DEBT
  Total Debt Outstanding            $X        $X        $X        $X        $X        $X
  Less: Cash                        ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  Net Debt                          $X        $X        $X        $X        $X        $X

CREDIT METRICS
  EBITDA                            $X        $X        $X        $X        $X        $X
  Total Debt / EBITDA               X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Net Debt / EBITDA                 X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Interest Coverage (EBITDA / Int)  X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx

COVENANT COMPLIANCE
  Covenant: Debt/EBITDA < X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Headroom                          X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      X.Xx
  Compliance Status                 OK        OK        OK        OK        OK        OK

---

TOTAL INTEREST EXPENSE (TO INCOME STATEMENT)
  Revolver Interest                 $X        $X        $X        $X        $X        $X
  Term Loan Interest                $X        $X        $X        $X        $X        $X
  Senior Notes Interest             $X        $X        $X        $X        $X        $X
  Total Interest Expense            $X        $X        $X        $X        $X        $X

---

DEBT FOR BALANCE SHEET
  Short-Term Debt (Current Portion)        $X        $X        $X        $X        $X
    [= Revolver + Mandatory amortization due within 12 months]
  Long-Term Debt                           $X        $X        $X        $X        $X
    [= All debt - Short-term portion]
```

---

#### Working Capital Schedule Template

```
WORKING CAPITAL SCHEDULE ($ Millions)

                                    Year 0    Year 1    Year 2    Year 3    Year 4    Year 5

OPERATING ASSETS
  Accounts Receivable               $X        $X        $X        $X        $X        $X
    Revenue                         $X        $X        $X        $X        $X        $X
    DSO (Days)                      X         X         X         X         X         X
    [Formula: A/R = Revenue × (DSO / 365)]

  Inventory                         $X        $X        $X        $X        $X        $X
    COGS                            $X        $X        $X        $X        $X        $X
    DIO (Days)                      X         X         X         X         X         X
    [Formula: Inventory = COGS × (DIO / 365)]

  Prepaid Expenses                  $X        $X        $X        $X        $X        $X
    % of Revenue                    X%        X%        X%        X%        X%        X%

Total Operating Assets              $X        $X        $X        $X        $X        $X

---

OPERATING LIABILITIES
  Accounts Payable                  $X        $X        $X        $X        $X        $X
    COGS                            $X        $X        $X        $X        $X        $X
    DPO (Days)                      X         X         X         X         X         X
    [Formula: A/P = COGS × (DPO / 365)]

  Accrued Expenses                  $X        $X        $X        $X        $X        $X
    % of OpEx                       X%        X%        X%        X%        X%        X%

  Deferred Revenue                  $X        $X        $X        $X        $X        $X
    % of Revenue (subscription model) X%     X%        X%        X%        X%        X%

Total Operating Liabilities         $X        $X        $X        $X        $X        $X

---

NET WORKING CAPITAL
  Operating Assets                  $X        $X        $X        $X        $X        $X
  Less: Operating Liabilities       ($X)      ($X)      ($X)      ($X)      ($X)      ($X)
  Net Working Capital               $X        $X        $X        $X        $X        $X

  NWC as % of Revenue               X%        X%        X%        X%        X%        X%

---

CHANGE IN NET WORKING CAPITAL (for Cash Flow)
  Current Period NWC                          $X        $X        $X        $X        $X
  Prior Period NWC                  $X        $X        $X        $X        $X        $X
  Change in NWC                               ($X)      ($X)      ($X)      ($X)      ($X)

  [Negative = increase in NWC = use of cash]
  [Positive = decrease in NWC = source of cash]

---

CASH CONVERSION CYCLE
  DSO                               X         X         X         X         X         X
  Plus: DIO                         X         X         X         X         X         X
  Less: DPO                         (X)       (X)       (X)       (X)       (X)       (X)
  Cash Conversion Cycle (Days)      X         X         X         X         X         X
```

---

### 9. Valuation / Returns Analysis

**DCF Valuation Template:**

```
DCF VALUATION ($ Millions except per share data)

UNLEVERED FREE CASH FLOW                Year 1    Year 2    Year 3    Year 4    Year 5

Revenue                                   $X        $X        $X        $X        $X
EBITDA                                    $X        $X        $X        $X        $X
  Margin %                                X%        X%        X%        X%        X%
Less: D&A                                 ($X)      ($X)      ($X)      ($X)      ($X)
EBIT                                      $X        $X        $X        $X        $X
Less: Taxes @ X%                          ($X)      ($X)      ($X)      ($X)      ($X)
NOPAT (Net Operating Profit After Tax)    $X        $X        $X        $X        $X

Plus: D&A                                 $X        $X        $X        $X        $X
Less: CAPEX                               ($X)      ($X)      ($X)      ($X)      ($X)
Less: Change in NWC                       ($X)      ($X)      ($X)      ($X)      ($X)

Unlevered Free Cash Flow (FCF)            $X        $X        $X        $X        $X

---

TERMINAL VALUE CALCULATION

Method 1: Perpetuity Growth
  Year 6 FCF = Year 5 FCF × (1 + g)        $X        [g = X.X% perpetuity growth]
  Terminal Value = Year 6 FCF / (WACC - g) $X        [WACC = X.X%, g = X.X%]

Method 2: Exit Multiple
  Year 5 EBITDA                            $X
  Exit Multiple (EV/EBITDA)                X.Xx      [Industry median]
  Terminal Value = EBITDA × Multiple       $X

Selected Terminal Value (Weighted Avg):    $X        [X% Perpetuity, Y% Exit Multiple]

---

DISCOUNT FACTORS

WACC                                       X.X%      [From Assumptions]

Year                                      1         2         3         4         5
Mid-Year Convention Factor                0.5       1.5       2.5       3.5       4.5
Discount Factor                           0.XXX     0.XXX     0.XXX     0.XXX     0.XXX

[Formula: = 1 / (1 + WACC) ^ Mid-Year Factor]
[Use mid-year convention: cash flows occur mid-year on average]

---

PRESENT VALUE CALCULATION

                                          Year 1    Year 2    Year 3    Year 4    Year 5    Terminal

Unlevered FCF                             $X        $X        $X        $X        $X
Terminal Value                                                                              $X

Discount Factor                           0.XXX     0.XXX     0.XXX     0.XXX     0.XXX     0.XXX

Present Value of FCF                      $X        $X        $X        $X        $X        $X

---

ENTERPRISE VALUE BUILD-UP

PV of Forecast Period FCF (Years 1-5)     $X
PV of Terminal Value                      $X
Enterprise Value                          $X

Less: Net Debt                            ($X)      [As of valuation date]
  Total Debt                              ($X)
  Plus: Cash                              $X

Add / (Less): Other Adjustments
  Minority Interest                       ($X)
  Equity Investments                      $X
  Pension Liabilities                     ($X)

Equity Value                              $X

Shares Outstanding (MM)                   X.X       [Fully diluted]

Value per Share                           $XX.XX

---

REFERENCE: CURRENT MARKET PRICE           $XX.XX    [As of valuation date]
Implied Upside / (Downside)               X%

---

VALUATION SUMMARY (Football Field)

                                          Low       Mid       High

DCF - Perpetuity Growth Method            $XX       $XX       $XX
DCF - Exit Multiple Method                $XX       $XX       $XX
Comparable Companies (EV/EBITDA)          $XX       $XX       $XX
Precedent Transactions (EV/EBITDA)        $XX       $XX       $XX

Weighted Average Valuation                          $XX.XX
```

---

**LBO Returns Analysis Template:**

```
LBO RETURNS ANALYSIS ($ Millions except per share and return metrics)

ENTRY VALUATION (Year 0)

LTM EBITDA                                $X
Entry Multiple (EV / LTM EBITDA)          X.Xx
Enterprise Value                          $X

Plus: Cash Acquired                       $X
Less: Debt Repaid/Refinanced              ($X)
Less: Transaction Fees                    ($X)
Total Uses of Funds                       $X

Sources of Funds:
  Debt Financing                          $X        X% of Total
  Equity Financing (Sponsor)              $X        X% of Total
  Total Sources                           $X        100%

Entry Leverage (Debt / EBITDA)            X.Xx

---

EXIT VALUATION (Year 5)

Year 5 EBITDA                             $X        [From projections]
Exit Multiple (EV / EBITDA)               X.Xx      [Assumption: same as entry or market median]
Enterprise Value                          $X

Less: Net Debt at Exit                    ($X)      [From projections]
  Total Debt                              ($X)
  Plus: Cash                              $X

Equity Value at Exit                      $X

Less: Transaction Fees @ X%               ($X)
Net Proceeds to Equity                    $X

---

RETURNS CALCULATION

Initial Equity Investment (Year 0)        $X
Equity Proceeds at Exit (Year 5)          $X
Cumulative Distributions (Years 1-5)      $X        [If any dividends/recaps]

Total Equity Returned                     $X

Cash-on-Cash Multiple (MoIC)              X.Xx      [= Total Returned / Initial Investment]

Internal Rate of Return (IRR)             XX.X%     [Solve for rate where NPV = 0]

[IRR Calculation in Excel: =IRR(Year0_to_Year5_Cash_Flows)]

---

VALUE CREATION BRIDGE (Entry EV to Exit EV)

Entry Enterprise Value                    $X

Value Creation:
  EBITDA Growth (Entry EBITDA to Exit EBITDA × Entry Multiple) $X        X%
  Multiple Expansion (Exit Multiple - Entry Multiple × Exit EBITDA) $X   X%
  Deleveraging (Debt Paydown)             $X        X%

Exit Enterprise Value                     $X

Total Value Created                       $X        100%

---

DOWNSIDE / SENSITIVITY ANALYSIS

                                          Base      Downside  Upside

Revenue CAGR                              X%        X%        X%
EBITDA Margin (Year 5)                    X%        X%        X%
Exit Multiple                             X.Xx      X.Xx      X.Xx

Exit EBITDA                               $X        $X        $X
Exit EV                                   $X        $X        $X
Exit Equity Value                         $X        $X        $X

IRR                                       XX%       XX%       XX%
MoIC                                      X.Xx      X.Xx      X.Xx
```

---

### 10. Sensitivity & Scenario Analysis

**Two-Way Sensitivity Table Template:**

```
SENSITIVITY ANALYSIS: Enterprise Value ($M)
DCF Model

                                    Terminal Growth Rate →
                                    1.5%      2.0%      2.5%      3.0%      3.5%

WACC ↓
7.0%                                $XXX      $XXX      $XXX      $XXX      $XXX
7.5%                                $XXX      $XXX      $XXX      $XXX      $XXX
8.0%                                $XXX      $XXX      $XXX      $XXX      $XXX
8.5%                                $XXX      $XXX      $XXX      $XXX      $XXX
9.0%                                $XXX      $XXX      $XXX      $XXX      $XXX
9.5%                                $XXX      $XXX      $XXX      $XXX      $XXX
10.0%                               $XXX      $XXX      $XXX      $XXX      $XXX

[Base Case: WACC = X.X%, Terminal Growth = X.X% → EV = $XXX]

---

SENSITIVITY ANALYSIS: Value per Share ($)

                                    Terminal Growth Rate →
                                    1.5%      2.0%      2.5%      3.0%      3.5%

WACC ↓
7.0%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
7.5%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
8.0%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
8.5%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
9.0%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
9.5%                                $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX
10.0%                               $XX.XX    $XX.XX    $XX.XX    $XX.XX    $XX.XX

Current Market Price: $XX.XX

---

SENSITIVITY ANALYSIS: LBO IRR (%)

                                    Exit Multiple (EV/EBITDA) →
                                    7.0x      7.5x      8.0x      8.5x      9.0x

Exit EBITDA ↓
$XX0M                               X.X%      X.X%      X.X%      X.X%      X.X%
$XX5M                               X.X%      X.X%      X.X%      X.X%      X.X%
$X00M                               X.X%      X.X%      X.X%      X.X%      X.X%
$X05M                               X.X%      X.X%      X.X%      X.X%      X.X%
$X10M                               X.X%      X.X%      X.X%      X.X%      X.X%

Hurdle IRR: 20%
```

**Excel Formulas for Sensitivity Tables:**

For a two-way sensitivity table:

1. Set up table with row input (e.g., WACC) in left column
2. Set up column input (e.g., Terminal Growth) in top row
3. Reference to output cell (e.g., Value per Share) in top-left corner
4. Select entire table
5. Data → What-If Analysis → Data Table
6. Row input cell: Terminal Growth assumption cell
7. Column input cell: WACC assumption cell
8. Click OK

---

**Scenario Analysis Template:**

```
SCENARIO ANALYSIS

Select Scenario: [Base Case]     [Dropdown: Base / Bull / Bear / Custom]

---

SCENARIO ASSUMPTIONS

                                    Base Case Bull Case  Bear Case

Revenue CAGR (Yr 1-5)               X%        X%        X%
EBITDA Margin (Year 5)              X%        X%        X%
CAPEX as % Revenue                  X%        X%        X%
Terminal Growth Rate                X%        X%        X%
Exit Multiple (LBO)                 X.Xx      X.Xx      X.Xx

---

SCENARIO OUTPUTS

                                    Base Case Bull Case  Bear Case

FINANCIAL PROJECTIONS:
  Year 5 Revenue                    $X        $X        $X
  Year 5 EBITDA                     $X        $X        $X
  Year 5 FCF                        $X        $X        $X

VALUATION (DCF):
  Enterprise Value                  $X        $X        $X
  Equity Value                      $X        $X        $X
  Value per Share                   $XX.XX    $XX.XX    $XX.XX
  Upside / (Downside) vs. Market    X%        X%        X%

RETURNS (LBO):
  Exit EV                           $X        $X        $X
  Exit Equity Value                 $X        $X        $X
  IRR                               XX%       XX%       XX%
  MoIC                              X.Xx      X.Xx      X.Xx

---

PROBABILITY-WEIGHTED VALUATION

Scenario                            Probability Value/Share Wtd. Value

Base Case                           60%       $XX.XX    $XX.XX
Bull Case                           25%       $XX.XX    $XX.XX
Bear Case                           15%       $XX.XX    $XX.XX

Probability-Weighted Value                              $XX.XX
```

**Implementation Tips:**

- Use named ranges for scenario inputs (e.g., "Revenue_Growth_Scenario")
- Use CHOOSE or INDEX/MATCH formulas to pull scenario-specific assumptions
- Example: `=INDEX(Revenue_Growth_Range, MATCH(Scenario_Selection, Scenario_List, 0))`

---

### 11. Checks & Balances Worksheet

```
MODEL CHECKS & BALANCES
[Company Name] - [Model Type]

Purpose: This worksheet contains all error checks and validation tests.
Status: All checks must show "OK" before finalizing model.

================================================================================
FINANCIAL STATEMENT CHECKS
================================================================================

                                    Year 1    Year 2    Year 3    Year 4    Year 5    Status

1. Balance Sheet Balance
   Assets = Liabilities + Equity?   OK        OK        OK        OK        OK        ✓

2. Cash Flow Ties to Balance Sheet
   CF Ending Cash = BS Cash?        OK        OK        OK        OK        OK        ✓

3. Retained Earnings Tie
   BS RE = Prior RE + NI - Div?     OK        OK        OK        OK        OK        ✓

4. Debt Ties
   BS Debt = Debt Schedule Total?   OK        OK        OK        OK        OK        ✓

================================================================================
REASONABLENESS CHECKS
================================================================================

                                    Year 1    Year 2    Year 3    Year 4    Year 5    Pass/Fail

5. Revenue Growth
   Is Revenue Growth < 100%?        X%        X%        X%        X%        X%        ✓
   [Fail if >100% growth unless startup/high-growth justified]

6. Gross Margin Range
   Is Gross Margin 0% to 100%?      X%        X%        X%        X%        X%        ✓
   [Fail if negative or >100%]

7. EBITDA Margin Trend
   Is EBITDA Margin improving or stable? X%   X%        X%        X%        X%        ✓
   [Warning if declining without explanation]

8. Working Capital
   Is NWC as % Revenue reasonable?  X%        X%        X%        X%        X%        ✓
   [Fail if >50% of revenue or negative without justification]

9. CAPEX Range
   Is CAPEX 0% to 30% of Revenue?   X%        X%        X%        X%        X%        ✓
   [Fail if >30% unless major expansion justified]

10. Leverage
   Is Debt/EBITDA < 6.0x?           X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      ✓
   [Warning if >6.0x, typical for leveraged companies]

11. Interest Coverage
   Is EBITDA/Interest > 2.0x?       X.Xx      X.Xx      X.Xx      X.Xx      X.Xx      ✓
   [Fail if <1.5x, indicates debt service issues]

12. FCF Positive?
   Is Free Cash Flow > 0?           Yes       Yes       Yes       Yes       Yes       ✓
   [Warning if negative after Year 2]

================================================================================
VALUATION CHECKS (DCF)
================================================================================

13. Terminal Growth Rate
   Is Terminal g < WACC?            X% < X%                                           ✓
   [Fail if Terminal Growth >= WACC, creates infinite value]

14. Terminal Growth Reasonableness
   Is Terminal g <= Long-term GDP growth (3%)? X%                                     ✓
   [Fail if terminal growth >5%]

15. WACC Range
   Is WACC between 5% and 20%?      X.X%                                              ✓
   [Fail if outside range for typical companies]

16. Beta Range
   Is Beta between 0.5 and 2.5?     X.XX                                              ✓
   [Fail if outside range, likely input error]

================================================================================
LBO-SPECIFIC CHECKS
================================================================================

17. Entry Leverage
   Is Entry Debt/EBITDA < 7.0x?     X.Xx                                              ✓
   [Warning if >7.0x, aggressive leverage]

18. Deleveraging
   Is Exit Debt/EBITDA < Entry?     Entry X.Xx, Exit X.Xx                             ✓
   [Warning if not deleveraging]

19. IRR Hurdle
   Is IRR > 20%?                    XX.X%                                             ✓
   [Fail if <15%, below typical PE hurdle]

20. MoIC
   Is MoIC > 2.0x for 5-year hold?  X.Xx                                              ✓
   [Warning if <2.0x]

================================================================================
CIRCULAR REFERENCE CHECKS
================================================================================

21. Circular References
   Are there any circular references? [Enable Iterative Calculations if intentional]

   Status: None / Controlled                                                          ✓

   If Controlled, describe:
   - [e.g., Revolver draw/paydown based on cash balance, which affects interest, which affects cash]
   - Iteration Limit: 100
   - Maximum Change: 0.001

================================================================================
FORMULA AUDIT
================================================================================

22. Hard-Coded Numbers in Formulas
   Run Formula Auditing → Check for hard-coded numbers outside Assumptions sheet

   Status: Clean                                                                      ✓

23. External Links
   Are there any external links to other files?
   [Edit → Links → Check for external references]

   Status: None                                                                       ✓
   [If Yes, list and justify]

================================================================================
OVERALL MODEL STATUS
================================================================================

Total Checks:                       23
Passed:                             23
Failed:                             0
Warnings:                           0

MODEL STATUS:                       APPROVED FOR USE ✓

Last Reviewed By:                   [Name]
Last Review Date:                   [MM/DD/YYYY]
```

---

### 12. Version History Worksheet

```
VERSION HISTORY
[Company Name] - [Model Type]

================================================================================
File Naming Convention:
[CompanyName]_[ModelType]_[YYYYMMDD]_[vX].xlsx

Example: Acme_DCF_20231115_v3.xlsx

================================================================================

Version   Date        Author      Description of Changes
----------------------------------------------------------------------
v1.0      MM/DD/YYYY  [Name]      Initial model build
                                  - Historical financials (3 years)
                                  - Revenue and margin assumptions
                                  - 5-year forecast
                                  - Basic DCF valuation

v1.1      MM/DD/YYYY  [Name]      Updated assumptions based on management feedback
                                  - Revised revenue growth to X% (from Y%)
                                  - Added geographic segment detail
                                  - Updated WACC to X.X% (from Y.Y%)

v2.0      MM/DD/YYYY  [Name]      Major revision - Added LBO analysis
                                  - Built debt schedule
                                  - Added sources & uses
                                  - LBO returns calculation (IRR, MoIC)
                                  - Sensitivity analysis for LBO

v2.1      MM/DD/YYYY  [Name]      Bug fixes and QC
                                  - Fixed circular reference in cash sweep
                                  - Corrected debt amortization formula
                                  - Added balance sheet check
                                  - All checks passing

v3.0      MM/DD/YYYY  [Name]      Final version for presentation
                                  - Updated to LTM ending Q3 20XX
                                  - Incorporated latest market data (ERP, RFR)
                                  - Added scenario analysis (Bull/Base/Bear)
                                  - Executive summary dashboard
                                  - Model locked and protected

================================================================================

CURRENT VERSION: v3.0
APPROVED BY: [Name, Title]
APPROVAL DATE: [MM/DD/YYYY]

================================================================================
```

---

## Advanced Modeling Techniques

### Handling Circular References

**Common Circularity: Cash Sweep and Revolver**

Problem:

- Cash balance depends on interest expense
- Interest expense depends on average debt balance
- Debt balance (revolver) depends on cash balance (used to pay down revolver)

**Solution 1: Enable Iterative Calculations**

- File → Options → Formulas → Enable iterative calculation
- Set Maximum Iterations: 100
- Set Maximum Change: 0.001

**Solution 2: Use Beginning-of-Period Balances**

- Calculate interest based on beginning debt balance (not average)
- Avoids circularity but slightly less accurate

**Example:**

```
REVOLVER BALANCE (with Circular Reference)

Beginning Balance                   $X
Interest Expense                    = (Beginning Balance + Ending Balance) / 2 × Interest Rate
                                    [This creates circularity if Ending Balance depends on Interest]

Ending Balance                      = Beginning Balance + Draws - Paydowns
Paydowns                            = MAX(0, Cash Available - Minimum Cash)
Cash Available                      = Cash from Operations - CAPEX - Interest Expense

[Circular: Ending Balance → Paydowns → Cash Available → Interest → Ending Balance]

SOLUTION: Enable Iterative Calculation, model will converge to solution.
```

---

### Building Flexible Scenarios with Switches

**Scenario Selection Drop-Down:**

1. Create a list of scenarios in a hidden area or separate sheet:
   - Base Case
   - Bull Case
   - Bear Case
   - Custom

2. In Assumptions sheet, create a drop-down using Data Validation:
   - Cell: "Scenario_Selection"
   - Allow: List
   - Source: [Scenario list]

3. Use INDEX/MATCH or CHOOSE to pull scenario-specific assumptions:

```
Revenue Growth Assumption:
= INDEX(Revenue_Growth_Table, MATCH(Scenario_Selection, Scenario_Names, 0))

Revenue_Growth_Table:
              Base    Bull    Bear    Custom
Year 1        10%     15%     5%      [Input]
Year 2        10%     15%     5%      [Input]
Year 3        10%     15%     5%      [Input]
```

4. All forecast formulas reference the assumption cells, which update based on scenario selection.

---

### Named Ranges for Clarity

**Benefits:**

- Formulas are readable: `=Revenue * Gross_Margin` instead of `=B15 * $C$5`
- Easier to audit and maintain
- Reduces errors from referencing wrong cells

**How to Create:**

1. Select cell or range
2. Formulas → Define Name
3. Name: [Descriptive name, no spaces, use underscores]
4. Scope: Workbook (accessible from all sheets)

**Best Practices:**

- Name all key inputs (Revenue_Growth, WACC, Terminal_Growth, etc.)
- Name all key outputs (Enterprise_Value, Equity_Value, IRR, etc.)
- Use consistent naming convention (e.g., all inputs end with "\_Input", all outputs end with "\_Output")

---

### Dynamic Arrays and Spill Ranges (Excel 365)

**Modern Excel Formulas:**

- `=UNIQUE()` - Extract unique values
- `=FILTER()` - Filter data based on criteria
- `=SORT()` - Sort data
- `=SEQUENCE()` - Generate sequences of numbers
- `=XLOOKUP()` - Modern replacement for VLOOKUP

**Example: Dynamic Year Headers**

Instead of manually typing Year 1, Year 2, Year 3...

```
Cell E5: =SEQUENCE(1, 5, 1, 1)
Returns: 1, 2, 3, 4, 5 (spills across E5:I5)

Cell E4: ="Year " & E5
Returns: Year 1, Year 2, Year 3, Year 4, Year 5
```

Now if you change SEQUENCE to 10 years, all formulas referencing those year headers update automatically.

---

### Protecting and Locking Models

**When to Lock:**

- Final version before distribution
- Prevent accidental changes to structure or formulas
- Allow inputs to remain editable

**How to Lock:**

1. Select all cells → Format Cells → Protection → Uncheck "Locked"
2. Select only cells that should be locked (formulas, structure) → Format Cells → Protection → Check "Locked"
3. Select input cells → Format Cells → Protection → Uncheck "Locked" (allow editing)
4. Review → Protect Sheet
   - Password (optional but recommended)
   - Allow: Select unlocked cells, Format cells (optional)
   - Disallow: Select locked cells (prevents viewing/changing formulas)

**Result:**

- Users can change inputs (blue font cells)
- Users cannot change formulas or structure
- Formulas remain hidden for IP protection

---

## Common Modeling Mistakes and How to Avoid Them

### 1. Hard-Coding Numbers in Formulas

**Bad:**

```
= B15 * 0.35
```

What is 0.35? Tax rate? Margin? Unknown.

**Good:**

```
= Revenue * Assumptions!Tax_Rate
```

Clear what the number represents, easy to change.

---

### 2. Inconsistent Time Periods

**Bad:**

- Revenue is annual
- CAPEX is quarterly
- Working Capital is monthly
  → Mixing time periods causes errors

**Good:**

- All projections in same units (annual or quarterly)
- Clearly label time period
- Convert as needed with proper formulas

---

### 3. Not Documenting Assumptions

**Bad:**

- Terminal growth: 2.5%
- No source, no rationale

**Good:**

- Terminal growth: 2.5%
- Source: Long-term GDP growth (World Bank forecast)
- Rationale: Conservative estimate, below historical 3% U.S. GDP growth

---

### 4. Forgetting to Update Linked Cells

**Bad:**

- Update assumption in one place
- Forget to update hard-coded reference elsewhere
- Model now inconsistent

**Good:**

- Use cell references or named ranges
- All references to an assumption link to ONE source cell
- Update in one place, propagates everywhere

---

### 5. Overly Complex Formulas

**Bad:**

```
=IF(AND(B15>0,B16<100),B15*0.25+B16*0.35-IF(B17>50,B17*0.1,0),IF(B18>0,B18*0.5,0))
```

Impossible to audit, high error risk.

**Good:**
Break into multiple steps:

```
Row 20: Condition 1 = IF(AND(B15>0, B16<100), TRUE, FALSE)
Row 21: Calculation A = B15 * 0.25 + B16 * 0.35
Row 22: Condition 2 = IF(B17 > 50, TRUE, FALSE)
Row 23: Calculation B = IF(Condition_2, B17 * 0.1, 0)
Row 24: Final = IF(Condition_1, Calculation_A - Calculation_B, IF(B18>0, B18*0.5, 0))
```

Each step is auditable. Can hide intermediate rows if needed.

---

### 6. Not Using Error Checks

**Bad:**

- Balance sheet doesn't balance
- Discover error weeks later during presentation

**Good:**

- Build error checks into model (Checks & Balances worksheet)
- Review error checks every time model is updated
- Never distribute a model with failing checks

---

### 7. Not Testing Extreme Scenarios

**Bad:**

- Model looks good with base case inputs
- Input 0% growth → model breaks (divide by zero, negative cash)

**Good:**

- Test extreme inputs:
  - 0% revenue growth
  - 100% revenue growth
  - 0% margins
  - 50% margins
- Model should handle gracefully (no errors, reasonable outputs or warning messages)

---

## Best Practices Checklist

Before finalizing any model, run through this checklist:

**Structure:**

- [ ] Consistent worksheet organization (Inputs → Calculations → Outputs)
- [ ] Clear formatting (blue inputs, black formulas, color-coded sections)
- [ ] Proper use of named ranges for key inputs/outputs
- [ ] No hard-coded numbers in formulas (except 0, 1, 12, 365)
- [ ] Consistent time periods throughout model

**Accuracy:**

- [ ] Balance sheet balances (Assets = Liab + Equity) all periods
- [ ] Cash flow ending cash ties to balance sheet cash
- [ ] Retained earnings tie (Prior RE + NI - Div = Current RE)
- [ ] Debt schedule ties to balance sheet debt
- [ ] All error checks pass (Checks & Balances worksheet)

**Assumptions:**

- [ ] Every assumption documented with source/rationale
- [ ] Assumptions are reasonable (benchmarked vs. history, industry, peers)
- [ ] Scenario switches work properly
- [ ] Sensitivity tables update correctly

**Auditability:**

- [ ] Formulas are simple and transparent
- [ ] Complex calculations broken into steps
- [ ] Comments added for non-obvious logic
- [ ] Version history maintained
- [ ] File naming convention followed

**Outputs:**

- [ ] Executive summary is clear and presentation-ready
- [ ] Charts and graphs are formatted and labeled
- [ ] Outputs answer the key question (valuation, returns, etc.)
- [ ] Sensitivity analysis shows range of outcomes

**Final Steps:**

- [ ] Spell check
- [ ] Print preview (if model will be printed)
- [ ] Lock/protect formulas
- [ ] Save final version with descriptive file name
- [ ] Get model reviewed by peer before distribution

---

## Resources & References

**Books:**

- "Financial Modeling" by Simon Benninga
- "Investment Banking: Valuation, Leveraged Buyouts, and Mergers & Acquisitions" by Rosenbaum & Pearl (Includes model examples)
- "Corporate Finance" by Berk & DeMarzo (Theory behind models)

**Online Courses:**

- Wall Street Prep: Financial Modeling courses
- Breaking Into Wall Street (BIWS): Excel & Modeling
- Corporate Finance Institute (CFI): Financial Modeling & Valuation Analyst (FMVA)

**Excel Resources:**

- Exceljet.net (formula reference and tips)
- Chandoo.org (Excel dashboards and modeling)
- Mr. Excel forums (troubleshooting)

**Data Sources:**

- Damodaran Online (NYU Stern): Beta, ERP, WACC data by industry
- FRED (Federal Reserve Economic Data): Risk-free rates, economic data
- Capital IQ / Bloomberg / FactSet: Company financials, market data

---

**Skill Maintenance:**

- Practice building models regularly (use case studies, practice companies)
- Stay updated on Excel new features (dynamic arrays, Power Query)
- Review models from investment banks and PE firms (when available)
- Participate in modeling competitions or case studies
- Update templates with lessons learned from each model built
