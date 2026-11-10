# ui-animation: JavaScript Animation Libraries

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## JavaScript Animation Libraries

### Comparison

| Library                | Best For             | Bundle Size |
| ---------------------- | -------------------- | ----------- |
| **CSS**                | Simple transitions   | 0kb         |
| **Web Animations API** | Native, performant   | 0kb         |
| **GSAP**               | Complex, precise     | ~60kb       |
| **Framer Motion**      | React ecosystem      | ~50kb       |
| **anime.js**           | Timeline, SVG        | ~17kb       |
| **Motion One**         | Modern, lightweight  | ~18kb       |
| **Lottie**             | After Effects export | ~50kb       |

### Framer Motion (React)

```jsx
import { motion, AnimatePresence } from "framer-motion";

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  Content
</motion.div>;

// Variants for complex animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>;
```

### GSAP

```javascript
import { gsap } from "gsap";

// Basic tween
gsap.to(".element", {
  x: 100,
  opacity: 1,
  duration: 0.3,
  ease: "power2.out",
});

// Timeline
const tl = gsap.timeline();
tl.from(".header", { y: -100, duration: 0.5 })
  .from(".content", { opacity: 0, duration: 0.3 }, "-=0.2")
  .from(".button", { scale: 0.8, duration: 0.2 });

// ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.to(".parallax", {
  y: -100,
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---
