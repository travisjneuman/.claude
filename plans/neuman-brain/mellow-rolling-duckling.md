# Plan: Merge Onboarding Modals into Cohesive First-Visit Experience

## Overview
Integrate backup setup into the final step of OnboardingModal, detecting browser compatibility upfront and offering clear skip options with reminder preferences.

## Current State
- **OnboardingModal** (4 steps): Welcome → Features → Setup → Completion
- **BackupOnboardingModal** (5 steps): Why Backup → Provider → Instructions → Folder Picker → Reminder
- They show sequentially in App.tsx (onboarding first, then backup)

## Design Approach
**Keep backup as separate modal, triggered from OnboardingModal Step 4**
- Avoids overwhelming 9-step flow
- Preserves BackupOnboardingModal's existing logic
- Step 4 becomes the decision point with clear options

## Key Changes

### 1. OnboardingModal Step 4 Redesign
Add backup section with FSA browser detection:
- **If FSA supported** (Chrome/Edge/Brave): Show "Setup Auto-Save Now" button
- **If NOT supported** (Firefox/Safari): Show info message only

Skip options (when user clicks "Maybe later"):
- "Remind in 7 Days"
- "Remind Monthly" (1st of month) ← NEW
- "Never remind"

### 2. Add Monthly Reminder Option
Update `ReminderPreference` type to include `'monthly'`

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/OnboardingModal.tsx` | Refactor Step 4: add FSA check, backup section, skip options, launch BackupOnboardingModal |
| `src/hooks/useBackupOnboarding.ts` | Add monthly reminder date calculation |
| `src/components/BackupOnboardingModal.tsx` | Add 'monthly' option to Step 5 reminder UI |
| `src/stores/useThemeStore.ts` | Update `BackupPreferences.reminderPreference` type |

## Implementation Checklist

### Step 1: Update Type Definition
**File:** `src/stores/useThemeStore.ts`
- Add `'monthly'` to `reminderPreference` union type

### Step 2: Update useBackupOnboarding Hook
**File:** `src/hooks/useBackupOnboarding.ts`
- Add monthly date calculation:
```ts
const getFirstOfNextMonth = (): string => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
};
```
- Add monthly check in `checkShouldShow()`:
```ts
if (reminderPreference === 'monthly' && nextReminderDate) {
  const now = new Date();
  const reminderDate = new Date(nextReminderDate);
  if (now >= reminderDate) {
    markAsChecked();
    return true;
  }
}
```

### Step 3: Update BackupOnboardingModal
**File:** `src/components/BackupOnboardingModal.tsx`
- Add 'monthly' to reminder options in Step 5:
```ts
{ id: 'monthly', label: 'Monthly', description: 'Remind me on the 1st of each month' }
```

### Step 4: Refactor OnboardingModal Step 4 (Main Work)
**File:** `src/components/OnboardingModal.tsx`

Add imports:
```ts
import { isFileSystemAccessSupported } from '../services/brainBackup';
import { useThemeStore } from '../stores/useThemeStore';
import { BackupOnboardingModal } from './BackupOnboardingModal';
```

Add state:
```ts
const [showSkipOptions, setShowSkipOptions] = useState(false);
const [selectedReminder, setSelectedReminder] = useState<'in-7-days' | 'monthly' | null>(null);
const [showBackupModal, setShowBackupModal] = useState(false);
const updateBackupPreferences = useThemeStore((state) => state.updateBackupPreferences);
const isFSASupported = isFileSystemAccessSupported();
```

New Step 4 structure:
1. Header: "You're All Set!" (existing)
2. **Backup Section** (only if `isFSASupported`):
   - Shield icon + "Protect Your Data" explanation
   - "Setup Auto-Save Now" button → opens BackupOnboardingModal
   - "Maybe later..." link → reveals skip options
   - Skip options: 7 days / Monthly / Never
3. **Info message** (only if NOT `isFSASupported`):
   - "Auto-save requires Chrome, Edge, or Brave browser"
4. Get Started section (existing CTA buttons)

Handlers:
```ts
const handleSetupBackup = () => setShowBackupModal(true);

const handleSkipWithReminder = () => {
  if (selectedReminder) {
    const nextReminderDate = selectedReminder === 'in-7-days'
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString();
    updateBackupPreferences({
      reminderPreference: selectedReminder,
      nextReminderDate,
    });
  }
  handleComplete();
};

const handleSkipForever = () => {
  updateBackupPreferences({ reminderPreference: 'never', nextReminderDate: null });
  handleComplete();
};
```

### Step 5: App.tsx (Minor)
**File:** `src/App.tsx`
- Keep existing BackupOnboardingModal rendering for **returning users** who skipped during onboarding
- No changes needed - the existing `onboardingComplete && shouldShowModal` logic handles reminders

## Flow Summary

**New User (Chrome/Edge):**
1. OnboardingModal Steps 1-3
2. Step 4: See backup option → click "Setup Auto-Save Now"
3. BackupOnboardingModal opens inline
4. Complete backup setup → OnboardingModal closes

**New User (Firefox/Safari):**
1. OnboardingModal Steps 1-4
2. Step 4: See info message about browser compatibility
3. Click CTA to start using app

**New User (Skips backup):**
1. OnboardingModal Steps 1-4
2. Step 4: Click "Maybe later" → select reminder preference
3. Reminder stored → app starts
4. Returns later → BackupOnboardingModal shows based on preference

## Testing
- [ ] Chrome user sees backup option on Step 4
- [ ] Firefox user sees info message (no backup button)
- [ ] "Setup Auto-Save Now" opens BackupOnboardingModal
- [ ] Skip with "7 days" stores correct reminder date
- [ ] Skip with "Monthly" stores 1st of next month
- [ ] "Never remind" sets preference correctly
- [ ] Returning user with expired reminder sees BackupOnboardingModal
