/**
 * TimelineScale Component
 * Renders the horizontal date axis at the top of the Gantt chart
 */

import { format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';
import { PIXELS_PER_DAY, HEADER_HEIGHT, type ZoomLevel } from './utils';

interface TimelineScaleProps {
  startDate: Date;
  endDate: Date;
  zoom: ZoomLevel;
  width: number;
}

export function TimelineScale({ startDate, endDate, zoom, width }: TimelineScaleProps) {
  // Generate scale marks based on zoom level
  const getScaleMarks = () => {
    switch (zoom) {
      case 'day':
        return eachDayOfInterval({ start: startDate, end: endDate });
      case 'week':
        return eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 0 });
      case 'month':
        return eachMonthOfInterval({ start: startDate, end: endDate });
    }
  };

  // Format label based on zoom level
  const formatLabel = (date: Date): string => {
    switch (zoom) {
      case 'day':
        return format(date, 'MMM d');
      case 'week':
        return format(date, 'MMM d');
      case 'month':
        return format(date, 'MMM yyyy');
    }
  };

  const marks = getScaleMarks();
  const pixelsPerDay = PIXELS_PER_DAY[zoom];

  return (
    <div
      className="relative border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
      style={{ height: HEADER_HEIGHT, width }}
    >
      {marks.map((date) => {
        // Calculate position from timeline start
        const dayOffset = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const x = dayOffset * pixelsPerDay;

        return (
          <div
            key={date.toISOString()}
            className="absolute top-0 bottom-0 flex flex-col justify-center border-l border-border-light dark:border-border-dark"
            style={{ left: x }}
          >
            <div className="px-2 text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">
              {formatLabel(date)}
            </div>
            {zoom === 'day' && (
              <div className="px-2 text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
                {format(date, 'EEE')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
