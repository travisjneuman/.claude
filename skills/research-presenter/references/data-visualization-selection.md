# research-presenter: Data Visualization Selection

Part of the `research-presenter` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Data Visualization Selection

### Chart Selection Guide

```
CHOOSING THE RIGHT CHART:

COMPARISON (between items):
  Few items (2-5)    → Bar chart (horizontal or vertical)
  Many items (5-15)  → Horizontal bar chart (sorted)
  Over time          → Line chart
  Two variables      → Scatter plot

COMPOSITION (parts of a whole):
  At a point in time   → Stacked bar or pie (max 5 slices)
  Over time            → Stacked area chart
  Hierarchical         → Treemap

DISTRIBUTION:
  Single variable      → Histogram or density plot
  Compare groups       → Box plot or violin plot
  Two variables        → Scatter plot with density

RELATIONSHIP:
  Two variables        → Scatter plot
  Three variables      → Bubble chart
  Correlation matrix   → Heat map

CHANGE OVER TIME:
  Single series        → Line chart
  Multiple series      → Small multiples (not spaghetti lines)
  Cumulative           → Area chart
```

### Visualization Do's and Don'ts

| Do | Don't |
| --- | --- |
| Label axes clearly with units | Assume the audience knows the units |
| Start bar chart y-axis at zero | Truncate axis to exaggerate differences |
| Use color meaningfully | Use color decoratively |
| Annotate key data points | Let the audience search for the insight |
| Simplify to the essential message | Show all the data you collected |
| Use consistent scales across comparisons | Change scales between related charts |
| Provide a descriptive chart title (assertion) | Use generic titles ("Figure 1") |
| Test for colorblind accessibility | Rely on red/green distinction |
