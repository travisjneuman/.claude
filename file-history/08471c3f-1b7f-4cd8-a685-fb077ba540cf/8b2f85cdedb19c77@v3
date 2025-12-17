/**
 * Personal Analytics Widget
 * Productivity metrics and insights dashboard
 */

import { useMemo } from 'react';
import { BaseWidget } from './BaseWidget';
import { AnalyticsPeriodSelector } from '../../components/Analytics/AnalyticsPeriodSelector';
import { MetricCard } from '../../components/Analytics/MetricCard';
import { CompletionRateChart } from '../../components/Analytics/CompletionRateChart';
import { PriorityDistribution } from '../../components/Analytics/PriorityDistribution';
import { StatusBreakdown } from '../../components/Analytics/StatusBreakdown';
import { TimeByProjectChart } from '../../components/Analytics/TimeByProjectChart';
import { HourlyHeatmap } from '../../components/Analytics/HourlyHeatmap';
import { SessionDurationChart } from '../../components/Analytics/SessionDurationChart';
import { MeetingVsFocusChart } from '../../components/Analytics/MeetingVsFocusChart';
import { TagFrequencyChart } from '../../components/Analytics/TagFrequencyChart';
import { useKanbanStore } from '../../stores/useKanbanStore';
import { useTimeTrackingStore } from '../../stores/useTimeTrackingStore';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { useNotesStore } from '../../stores/useNotesStore';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
  FileText,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  calculateCompletionRate,
  getOverdueTaskCount,
  calculateTotalTimeTracked,
  getEventCount,
  getNotesCreatedCount,
} from '../../utils/analyticsCalculations';

export default function AnalyticsWidget() {
  // Get data from stores
  const tasks = useKanbanStore((state) => state.tasks);
  const timeEntries = useTimeTrackingStore((state) => state.entries);
  const calendarEvents = useCalendarStore((state) => state.events);
  const notes = useNotesStore((state) => state.notes);

  // Get analytics period
  const getDateRange = useAnalyticsStore((state) => state.getDateRange);
  const dateRange = useMemo(() => getDateRange(), [getDateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const completionRate = calculateCompletionRate(tasks, dateRange);
    const overdueCount = getOverdueTaskCount(tasks);
    const totalTimeSeconds = calculateTotalTimeTracked(timeEntries, dateRange);
    const totalTimeHours = Math.round(totalTimeSeconds / 3600);
    const eventCount = getEventCount(calendarEvents, dateRange);
    const notesCount = getNotesCreatedCount(notes, dateRange);

    return {
      completionRate: Math.round(completionRate),
      overdueCount,
      totalTimeHours,
      eventCount,
      notesCount,
    };
  }, [tasks, timeEntries, calendarEvents, notes, dateRange]);

  return (
    <BaseWidget title="Personal Analytics" icon="📊">
      <div className="flex flex-col h-full">
        {/* Period Selector */}
        <div className="mb-4">
          <AnalyticsPeriodSelector />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <MetricCard
            title="Completion Rate"
            value={`${metrics.completionRate}%`}
            icon={CheckCircle2}
            color="success"
            subtitle="Tasks completed"
          />

          <MetricCard
            title="Time Tracked"
            value={`${metrics.totalTimeHours}h`}
            icon={Clock}
            color="info"
            subtitle="Total hours"
          />

          <MetricCard
            title="Events"
            value={metrics.eventCount}
            icon={CalendarIcon}
            color="cyan"
            subtitle="Calendar events"
          />

          <MetricCard
            title="Notes Created"
            value={metrics.notesCount}
            icon={FileText}
            color="magenta"
            subtitle="New notes"
          />

          <MetricCard
            title="Overdue Tasks"
            value={metrics.overdueCount}
            icon={AlertCircle}
            color="warning"
            subtitle="Need attention"
          />

          <MetricCard
            title="Productivity"
            value="--"
            icon={TrendingUp}
            color="success"
            subtitle="Coming soon"
          />
        </div>

        {/* Task Analytics Charts */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary mb-4">
            Task Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Completion Rate Trend */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Completion Rate Trend
              </h4>
              <CompletionRateChart tasks={tasks} dateRange={dateRange} />
            </div>

            {/* Priority Distribution */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Priority Distribution
              </h4>
              <PriorityDistribution tasks={tasks} dateRange={dateRange} />
            </div>

            {/* Status Breakdown */}
            <div className="bento-card p-4 lg:col-span-2">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Status Breakdown
              </h4>
              <StatusBreakdown tasks={tasks} dateRange={dateRange} />
            </div>
          </div>
        </div>

        {/* Time Tracking Analytics Charts */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary mb-4">
            Time Tracking Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Time by Project */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Time by Project
              </h4>
              <TimeByProjectChart entries={timeEntries} dateRange={dateRange} />
            </div>

            {/* Hourly Distribution Heatmap */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Hourly Distribution
              </h4>
              <HourlyHeatmap entries={timeEntries} dateRange={dateRange} />
            </div>

            {/* Session Duration Trend */}
            <div className="bento-card p-4 lg:col-span-2">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Average Session Duration Trend
              </h4>
              <SessionDurationChart entries={timeEntries} dateRange={dateRange} />
            </div>
          </div>
        </div>

        {/* Calendar & Notes Analytics Charts */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary mb-4">
            Calendar & Notes Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Meeting vs Focus Time */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Meeting vs Focus Time
              </h4>
              <MeetingVsFocusChart events={calendarEvents} dateRange={dateRange} />
            </div>

            {/* Tag Frequency */}
            <div className="bento-card p-4">
              <h4 className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wide mb-3">
                Most Used Tags
              </h4>
              <TagFrequencyChart notes={notes} dateRange={dateRange} limit={10} />
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}
