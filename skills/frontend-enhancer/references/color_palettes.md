# Color Palettes for Frontend Enhancement

This reference contains professionally designed color palettes optimized for modern web applications.

## Modern Professional Palettes

### Palette 1: Corporate Blue
- **Primary**: `#2563EB` (Blue 600)
- **Primary Hover**: `#1D4ED8` (Blue 700)
- **Secondary**: `#64748B` (Slate 500)
- **Accent**: `#F59E0B` (Amber 500)
- **Background**: `#F8FAFC` (Slate 50)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#0F172A` (Slate 900)
- **Text Secondary**: `#475569` (Slate 600)
- **Success**: `#10B981` (Emerald 500)
- **Warning**: `#F59E0B` (Amber 500)
- **Error**: `#EF4444` (Red 500)
- **Border**: `#E2E8F0` (Slate 200)

### Palette 2: Vibrant Purple
- **Primary**: `#8B5CF6` (Violet 500)
- **Primary Hover**: `#7C3AED` (Violet 600)
- **Secondary**: `#EC4899` (Pink 500)
- **Accent**: `#14B8A6` (Teal 500)
- **Background**: `#FAFAF9` (Stone 50)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#1C1917` (Stone 900)
- **Text Secondary**: `#57534E` (Stone 600)
- **Success**: `#22C55E` (Green 500)
- **Warning**: `#F97316` (Orange 500)
- **Error**: `#F43F5E` (Rose 500)
- **Border**: `#E7E5E4` (Stone 200)

### Palette 3: Minimalist Gray
- **Primary**: `#18181B` (Zinc 900)
- **Primary Hover**: `#27272A` (Zinc 800)
- **Secondary**: `#71717A` (Zinc 500)
- **Accent**: `#06B6D4` (Cyan 500)
- **Background**: `#FAFAFA` (Zinc 50)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#18181B` (Zinc 900)
- **Text Secondary**: `#52525B` (Zinc 600)
- **Success**: `#84CC16` (Lime 500)
- **Warning**: `#EAB308` (Yellow 500)
- **Error**: `#DC2626` (Red 600)
- **Border**: `#E4E4E7` (Zinc 200)

### Palette 4: Warm Sunset
- **Primary**: `#EA580C` (Orange 600)
- **Primary Hover**: `#C2410C` (Orange 700)
- **Secondary**: `#F97316` (Orange 500)
- **Accent**: `#FBBF24` (Amber 400)
- **Background**: `#FFFBEB` (Amber 50)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#78350F` (Amber 900)
- **Text Secondary**: `#92400E` (Amber 800)
- **Success**: `#16A34A` (Green 600)
- **Warning**: `#D97706` (Amber 600)
- **Error**: `#DC2626` (Red 600)
- **Border**: `#FDE68A` (Amber 200)

### Palette 5: Ocean Fresh
- **Primary**: `#0891B2` (Cyan 600)
- **Primary Hover**: `#0E7490` (Cyan 700)
- **Secondary**: `#06B6D4` (Cyan 500)
- **Accent**: `#6366F1` (Indigo 500)
- **Background**: `#F0FDFA` (Teal 50)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#134E4A` (Teal 900)
- **Text Secondary**: `#0F766E` (Teal 700)
- **Success**: `#14B8A6` (Teal 500)
- **Warning**: `#F59E0B` (Amber 500)
- **Error**: `#E11D48` (Rose 600)
- **Border**: `#99F6E4` (Teal 200)

### Palette 6: Dark Mode
- **Primary**: `#3B82F6` (Blue 500)
- **Primary Hover**: `#2563EB` (Blue 600)
- **Secondary**: `#6366F1` (Indigo 500)
- **Accent**: `#A855F7` (Purple 500)
- **Background**: `#0F172A` (Slate 900)
- **Surface**: `#1E293B` (Slate 800)
- **Text Primary**: `#F8FAFC` (Slate 50)
- **Text Secondary**: `#CBD5E1` (Slate 300)
- **Success**: `#10B981` (Emerald 500)
- **Warning**: `#FBBF24` (Amber 400)
- **Error**: `#F87171` (Red 400)
- **Border**: `#334155` (Slate 700)

## Tailwind CSS Configuration

To use these palettes in Tailwind CSS, add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Choose one palette and customize as needed
        brand: {
          primary: '#2563EB',
          'primary-hover': '#1D4ED8',
          secondary: '#64748B',
          accent: '#F59E0B',
        },
      },
    },
  },
}
```

## CSS Variables Configuration

For vanilla CSS or CSS-in-JS, use CSS custom properties:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-secondary: #64748B;
  --color-accent: #F59E0B;
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-border: #E2E8F0;
}
```
