/**
 * Automation Store
 * Manages automation rules and execution logs
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AutomationRule,
  AutomationExecutionLog,
  AutomationTriggerType,
} from '../types/automation';
import { logger } from '../services/logger';

const log = logger.module('AutomationStore');

interface AutomationStore {
  // State
  rules: AutomationRule[];
  executionLogs: AutomationExecutionLog[];
  maxLogsToKeep: number;

  // Actions
  addRule: (rule: Omit<AutomationRule, 'id' | 'created' | 'runCount' | 'enabled'>) => void;
  updateRule: (ruleId: string, updates: Partial<AutomationRule>) => void;
  deleteRule: (ruleId: string) => void;
  toggleRule: (ruleId: string) => void;
  getRule: (ruleId: string) => AutomationRule | undefined;
  getRulesByTrigger: (triggerType: AutomationTriggerType) => AutomationRule[];

  // Execution logging
  addExecutionLog: (log: AutomationExecutionLog) => void;
  getExecutionLogs: (ruleId?: string, taskId?: string) => AutomationExecutionLog[];
  clearExecutionLogs: () => void;

  // Utilities
  incrementRunCount: (ruleId: string) => void;
  updateLastRun: (ruleId: string) => void;
}

export const useAutomationStore = create<AutomationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      rules: [],
      executionLogs: [],
      maxLogsToKeep: 1000, // Keep last 1000 execution logs

      // ==================== RULE MANAGEMENT ====================

      addRule: (rule) => {
        const newRule: AutomationRule = {
          ...rule,
          id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          enabled: true,
          created: new Date().toISOString(),
          runCount: 0,
        };

        set((state) => ({
          rules: [...state.rules, newRule],
        }));

        log.info('Automation rule created', {
          ruleId: newRule.id,
          ruleName: newRule.name,
          triggerType: newRule.trigger.type,
        });
      },

      updateRule: (ruleId, updates) => {
        set((state) => ({
          rules: state.rules.map((rule) =>
            rule.id === ruleId ? { ...rule, ...updates } : rule
          ),
        }));

        log.info('Automation rule updated', { ruleId, updates });
      },

      deleteRule: (ruleId) => {
        set((state) => ({
          rules: state.rules.filter((rule) => rule.id !== ruleId),
        }));

        log.info('Automation rule deleted', { ruleId });
      },

      toggleRule: (ruleId) => {
        const rule = get().rules.find((r) => r.id === ruleId);
        if (!rule) {
          log.warn('Rule not found for toggle', { ruleId });
          return;
        }

        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === ruleId ? { ...r, enabled: !r.enabled } : r
          ),
        }));

        log.info('Automation rule toggled', {
          ruleId,
          enabled: !rule.enabled,
        });
      },

      getRule: (ruleId) => {
        return get().rules.find((rule) => rule.id === ruleId);
      },

      getRulesByTrigger: (triggerType) => {
        return get().rules.filter(
          (rule) => rule.enabled && rule.trigger.type === triggerType
        );
      },

      // ==================== EXECUTION LOGGING ====================

      addExecutionLog: (executionLog) => {
        set((state) => {
          const logs = [...state.executionLogs, executionLog];

          // Keep only the most recent logs (prevent unbounded growth)
          if (logs.length > state.maxLogsToKeep) {
            logs.splice(0, logs.length - state.maxLogsToKeep);
          }

          return { executionLogs: logs };
        });

        // Update rule metadata if execution was successful
        if (executionLog.success && executionLog.actionsExecuted > 0) {
          get().incrementRunCount(executionLog.ruleId);
          get().updateLastRun(executionLog.ruleId);
        }

        log.debug('Execution log added', {
          ruleId: executionLog.ruleId,
          taskId: executionLog.taskId,
          success: executionLog.success,
        });
      },

      getExecutionLogs: (ruleId?, taskId?) => {
        let logs = get().executionLogs;

        if (ruleId) {
          logs = logs.filter((log) => log.ruleId === ruleId);
        }

        if (taskId) {
          logs = logs.filter((log) => log.taskId === taskId);
        }

        // Return most recent first
        return logs.slice().reverse();
      },

      clearExecutionLogs: () => {
        set({ executionLogs: [] });
        log.info('Execution logs cleared');
      },

      // ==================== UTILITIES ====================

      incrementRunCount: (ruleId) => {
        set((state) => ({
          rules: state.rules.map((rule) =>
            rule.id === ruleId ? { ...rule, runCount: rule.runCount + 1 } : rule
          ),
        }));
      },

      updateLastRun: (ruleId) => {
        set((state) => ({
          rules: state.rules.map((rule) =>
            rule.id === ruleId ? { ...rule, lastRun: new Date().toISOString() } : rule
          ),
        }));
      },
    }),
    {
      name: 'automation-store',
      partialize: (state) => ({
        rules: state.rules,
        // Don't persist execution logs (they'll grow too large)
      }),
    }
  )
);
