# UI/Visual Changes Checklist

**When to use:** Any task involving visual changes, styling, animations, or UI modifications.

---

## Pre-Change Requirements

- [ ] **Screenshot current state** before making ANY changes
- [ ] **Identify baseline** - what should remain unchanged?
- [ ] **Check design tokens** - are CSS variables defined for colors/spacing?

---

## During Implementation

### Golden Rule: ONE Change at a Time

Never batch multiple visual changes. Make one change, verify, then proceed.

```
WRONG: Change color, font, AND spacing → then test
RIGHT: Change color → test → Change font → test → Change spacing → test
```

### Change Verification Loop

1. Make single change
2. Screenshot after
3. Compare to baseline
4. Verify no unintended side effects
5. Get user approval if significant
6. Proceed to next change

---

## Browser Testing Matrix

| Browser | Status |
|---------|--------|
| Chrome (latest) | [ ] |
| Firefox (latest) | [ ] |
| Safari (latest) | [ ] |
| Edge (latest) | [ ] |

---

## Responsive Testing

| Breakpoint | Device | Status |
|------------|--------|--------|
| 375px | Mobile (iPhone SE) | [ ] |
| 768px | Tablet (iPad) | [ ] |
| 1024px | Small Desktop | [ ] |
| 1440px+ | Large Desktop | [ ] |

### Test at each breakpoint:
- [ ] Layout doesn't break
- [ ] Text remains readable
- [ ] Touch targets >= 44x44px (mobile)
- [ ] No horizontal scroll
- [ ] Images scale correctly

---

## Animation Checklist

- [ ] Animations run at **60fps** (use DevTools Performance tab)
- [ ] Use GPU-accelerated properties only: `transform`, `opacity`
- [ ] Avoid animating: `width`, `height`, `top`, `left`, `margin`, `padding`
- [ ] `prefers-reduced-motion` respected
- [ ] Duration appropriate (150-300ms for micro-interactions)

---

## Visual Diff Verification

Before committing:

1. [ ] Side-by-side comparison: before vs after
2. [ ] Only intended changes visible
3. [ ] No unexpected color shifts
4. [ ] No layout drift in unrelated areas
5. [ ] Hover/focus/active states still work

---

## Accessibility (Visual)

- [ ] Color contrast >= 4.5:1 (text) / 3:1 (large text)
- [ ] Focus indicators visible and clear
- [ ] No information conveyed by color alone
- [ ] Icons have labels or aria-labels

---

## Frontend Aesthetics & Design Quality

**Critical:** Avoid generic "AI slop" aesthetic. Create distinctive, creative frontends that surprise and delight.

### Typography

**DO:**
- [ ] Choose beautiful, unique, and interesting fonts
- [ ] Select fonts that elevate the aesthetic and match the context
- [ ] Vary font choices across different projects
- [ ] Consider context-specific character (e.g., monospace for dev tools, serif for editorial)
- [ ] Use font pairing thoughtfully (display + body, etc.)

**AVOID:**
- [ ] ❌ Generic fonts: Arial, Inter, Roboto, system fonts
- [ ] ❌ Overused "AI default" fonts: Space Grotesk, Inter everywhere
- [ ] ❌ Converging on same fonts across projects
- [ ] ❌ Safe, boring typography choices

**Font Inspiration Sources:**
- Google Fonts: Playfair Display, Crimson Text, Merriweather (editorial)
- Display fonts: Bebas Neue, Righteous, Bungee
- Modern: DM Sans, Plus Jakarta Sans, Outfit
- Code/technical: JetBrains Mono, Fira Code, Source Code Pro

---

### Color & Theme

**DO:**
- [ ] Commit to a cohesive aesthetic with clear theme identity
- [ ] Use CSS variables for consistency throughout
- [ ] Create dominant colors with sharp, intentional accents
- [ ] Draw inspiration from IDE themes and cultural aesthetics
- [ ] Vary between light and dark themes across projects
- [ ] Make unexpected color choices that feel genuinely designed

**AVOID:**
- [ ] ❌ Clichéd color schemes (especially purple gradients on white backgrounds)
- [ ] ❌ Timid, evenly-distributed palettes without visual hierarchy
- [ ] ❌ Generic "startup blue" (#3b82f6) as default
- [ ] ❌ Safe, predictable color combinations
- [ ] ❌ Converging on same color schemes across projects

**Color Approach:**
```css
/* GOOD - Dominant color with sharp accents */
:root {
  --primary: #d946ef;      /* Bold magenta */
  --accent: #facc15;       /* Sharp yellow accent */
  --background: #0a0a0a;   /* Deep dark */
  --surface: #171717;
  --text: #fafafa;
}

/* BAD - Timid, even distribution */
:root {
  --primary: #6366f1;      /* Generic indigo */
  --secondary: #8b5cf6;    /* Similar purple */
  --accent: #a78bfa;       /* More purple */
  --background: #ffffff;   /* Plain white */
}
```

**Theme Inspiration Sources:**
- IDE themes: Dracula, Nord, Tokyo Night, Catppuccin, Gruvbox
- Cultural: Vaporwave, Y2K, Brutalism, Swiss design, Japanese minimalism
- Nature: Deep ocean, sunset, forest, desert, aurora

---

### Motion & Animation

**DO:**
- [ ] Use animations for effects and meaningful micro-interactions
- [ ] Prioritize CSS-only solutions for HTML (use Motion library for React)
- [ ] Focus on high-impact moments: page load choreography, reveals, transitions
- [ ] Use staggered reveals with `animation-delay` for dramatic effect
- [ ] Ensure all animations are GPU-accelerated (transform, opacity only)

**AVOID:**
- [ ] ❌ Scattered micro-interactions without purpose
- [ ] ❌ Over-animation (every element bouncing/fading)
- [ ] ❌ Under-animation (completely static interfaces)
- [ ] ❌ Non-GPU-accelerated animations (width, height, top, left, etc.)

**Animation Patterns:**
```css
/* GOOD - Orchestrated page load */
.hero-title {
  animation: fadeSlideUp 0.6s ease-out;
}

.hero-subtitle {
  animation: fadeSlideUp 0.6s ease-out;
  animation-delay: 0.1s;
}

.hero-cta {
  animation: fadeSlideUp 0.6s ease-out;
  animation-delay: 0.2s;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Backgrounds & Atmosphere

**DO:**
- [ ] Create atmosphere and depth instead of solid colors
- [ ] Layer CSS gradients for visual interest
- [ ] Use geometric patterns or contextual effects
- [ ] Match background aesthetic to overall theme
- [ ] Consider mesh gradients, noise textures, subtle patterns

**AVOID:**
- [ ] ❌ Plain white or solid color backgrounds everywhere
- [ ] ❌ Generic gradient backgrounds without thought
- [ ] ❌ No visual depth or atmosphere

**Background Examples:**
```css
/* GOOD - Layered gradient with depth */
background:
  linear-gradient(135deg, rgba(217, 70, 239, 0.1) 0%, transparent 50%),
  linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
  radial-gradient(ellipse at top, rgba(147, 51, 234, 0.15), transparent),
  #0a0a0a;

/* GOOD - Geometric pattern */
background-image:
  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px);

/* GOOD - Mesh gradient feel */
background: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.2) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.2) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.2) 0px, transparent 50%);
```

---

### Layout & Composition

**DO:**
- [ ] Create unexpected, creative layouts
- [ ] Use whitespace intentionally and generously
- [ ] Break grid systems when appropriate for visual interest
- [ ] Consider asymmetric layouts
- [ ] Make layout choices that match content and context

**AVOID:**
- [ ] ❌ Cookie-cutter centered-card layouts
- [ ] ❌ Predictable grid patterns without variation
- [ ] ❌ "Bootstrap default" aesthetic
- [ ] ❌ Every section having same padding/spacing

---

### Critical Anti-Patterns Checklist

Before finalizing frontend work, verify you're NOT doing these:

**Typography:**
- [ ] ❌ Using Inter, Roboto, or Arial as primary font
- [ ] ❌ Same font choice as last 3 projects

**Color:**
- [ ] ❌ Purple gradient on white background
- [ ] ❌ Generic startup blue (#3b82f6)
- [ ] ❌ Timid, evenly-distributed palette

**Layout:**
- [ ] ❌ Centered card with rounded corners (unless genuinely appropriate)
- [ ] ❌ Predictable hero section pattern
- [ ] ❌ Same layout structure as every other AI-generated site

**Overall:**
- [ ] ❌ Converging toward "on distribution" generic outputs
- [ ] ❌ Playing it safe instead of thinking outside the box
- [ ] ❌ Forgetting to vary aesthetics across different projects

---

### Design Evaluation Rubric

Rate your frontend on these dimensions:

| Aspect | Generic (1-3) | Decent (4-6) | Distinctive (7-10) |
|--------|---------------|--------------|-------------------|
| **Typography** | Arial/Inter/Roboto | Common but nice fonts | Unexpected, beautiful choices |
| **Color** | Blue/purple gradients | Solid palette | Bold, cohesive theme |
| **Motion** | No animation or scattered | Some micro-interactions | Orchestrated moments |
| **Background** | Solid colors | Simple gradient | Layered, atmospheric |
| **Layout** | Bootstrap default | Clean, standard | Creative, surprising |
| **Overall Feel** | "AI generated" | Professional | Memorable, delightful |

**Target:** 7+ on at least 3 dimensions, 5+ on all others.

---

### Context-Specific Aesthetics

Tailor design to the project type:

| Project Type | Aesthetic Direction |
|--------------|-------------------|
| **Developer Tools** | Monospace fonts, code editor themes (Dracula, Nord), terminal-inspired |
| **Editorial/Blog** | Serif fonts, generous whitespace, reading-focused hierarchy |
| **Portfolio** | Bold, distinctive, showcase personality and creativity |
| **SaaS Product** | Clean but not boring, professional with flair |
| **Landing Page** | High-impact, conversion-focused, strong visual hierarchy |
| **Dashboard** | Information density, clear hierarchy, functional beauty |

---



## Related Skills

Use these skills for UI work:

| Skill | When to Use |
|-------|-------------|
| `generic-design-system` | Color choices, spacing, typography |
| `generic-ux-designer` | User flow, interaction patterns |
| `generic-react-design-system` | React-specific patterns |
| `generic-static-design-system` | Static site patterns |
| `generic-fullstack-design-system` | Full-stack app patterns |
| `frontend-enhancer` | Modern UI enhancements |

### Invoke with:
```
Skill(generic-design-system)
Skill(frontend-enhancer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules (Performance Targets, Accessibility)
- `~/.claude/templates/task-template.md` - Task planning

---

## Common Anti-Patterns

- [ ] Making multiple changes before testing
- [ ] Not taking before screenshots
- [ ] Testing only in Chrome
- [ ] Hardcoded colors instead of CSS variables
- [ ] Animating layout properties (causes jank)
- [ ] Ignoring mobile breakpoints

---

*Reference this checklist for ANY visual change, no matter how small.*
