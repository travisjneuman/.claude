import { useState } from 'react';
import { useSettingsStore } from '../stores/useSettingsStore';
import type { Member } from '../types';
import { toast } from '../stores/useToastStore';

/**
 * Member Settings Component
 *
 * Manages team member definitions for task assignment.
 * Users can create, edit, and delete team members.
 *
 * Features:
 * - Create new member with modal
 * - Edit member inline
 * - Delete member with confirmation
 * - Avatar color picker from predefined palette
 * - Auto-generate initials from name
 */

// Predefined avatar color palette (good contrast, accessible)
export const AVATAR_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Cyan
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA15E', // Orange
  '#BC6C25', // Brown
  '#A78BFA', // Purple
  '#F472B6', // Pink
  '#60A5FA', // Light Blue
];

interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<Member, 'id' | 'createdAt'>) => void;
}

/**
 * Generate initials from name
 * Rules:
 * - 1 word: first 2 letters (e.g., "John" → "JO")
 * - 2 words: first letter of each (e.g., "John Doe" → "JD")
 * - 3+ words: first letter of first and last word (e.g., "John Middle Doe" → "JD")
 */
function generateInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '';

  const words = trimmed.split(/\s+/).filter(Boolean);

  if (words.length === 0) return '';
  if (words.length === 1) {
    // Use first 2 letters
    return words[0].substring(0, 2).toUpperCase();
  }
  // Multiple words: first letter of first and last word
  const firstLetter = words[0][0];
  const lastLetter = words[words.length - 1][0];
  return (firstLetter + lastLetter).toUpperCase();
}

function CreateMemberModal({ isOpen, onClose, onSave }: CreateMemberModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setAvatarColor(AVATAR_COLORS[0]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.warning('Member name is required');
      return;
    }

    const initials = generateInitials(name);

    const member: Omit<Member, 'id' | 'createdAt'> = {
      name: name.trim(),
      email: email.trim() || undefined,
      initials,
      avatarColor,
    };

    onSave(member);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
              Add Team Member
            </h3>
            <button
              onClick={handleClose}
              className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Member Name */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              className="w-full px-3 py-2 bg-surface-light-elevated dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              autoFocus
            />
            {name.trim() && (
              <p className="mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                Initials: {generateInitials(name)}
              </p>
            )}
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 bg-surface-light-elevated dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          {/* Avatar Color Picker */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
              Avatar Color *
            </label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAvatarColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    avatarColor === color
                      ? 'border-accent-blue scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            {/* Preview */}
            {name.trim() && (
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: avatarColor }}
                >
                  {generateInitials(name)}
                </div>
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Avatar Preview
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-surface-light-elevated dark:bg-surface-dark-elevated text-text-light-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MemberSettings() {
  const members = useSettingsStore((state) => state.members);
  const addMember = useSettingsStore((state) => state.addMember);
  const deleteMember = useSettingsStore((state) => state.deleteMember);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddMember = (member: Omit<Member, 'id' | 'createdAt'>) => {
    addMember(member);
  };

  const handleDeleteMember = (id: string) => {
    deleteMember(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
            Team Members
          </h2>
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">
            Manage team members for task assignment. Members are local metadata, not authenticated users.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm font-medium"
        >
          + Add Member
        </button>
      </div>

      {/* Member List */}
      {members.length === 0 ? (
        <div className="text-center py-12 bg-surface-light-elevated dark:bg-surface-dark-elevated rounded-lg border border-border-light dark:border-border-dark">
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
            No team members yet
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors text-sm"
          >
            Add Your First Member
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-4 bg-surface-light-elevated dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: member.avatarColor }}
                title={member.name}
              >
                {member.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-light-primary dark:text-text-dark-primary truncate">
                  {member.name}
                </h4>
                {member.email && (
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary truncate">
                    {member.email}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteConfirmId(member.id)}
                className="px-3 py-1.5 text-sm text-status-error-text dark:text-status-error-text-dark hover:bg-status-error-bg dark:hover:bg-status-error-bg-dark rounded-lg transition-colors shrink-0"
                aria-label={`Delete ${member.name}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddMember}
      />

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2">
              Delete Team Member?
            </h3>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-6">
              This will remove this member from all assigned tasks. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2 bg-surface-light-elevated dark:bg-surface-dark-elevated text-text-light-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMember(deleteConfirmId)}
                className="flex-1 px-4 py-2 bg-accent-red/10 text-accent-red rounded-lg hover:bg-accent-red hover:text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
