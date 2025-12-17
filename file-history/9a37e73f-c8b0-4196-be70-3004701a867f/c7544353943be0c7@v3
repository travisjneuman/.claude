/**
 * Countdown Timer Widget
 *
 * Track countdowns to important events
 */

import React, { useState, useEffect } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWidgetStore } from '../../stores/useWidgetStore';

interface CountdownEvent {
  id: string;
  name: string;
  date: string;
}

export const CountdownWidget: React.FC = () => {
  const widgetSettings = useWidgetStore((state) => state.widgetSettings.countdown);
  const updateWidgetSettings = useWidgetStore((state) => state.updateWidgetSettings);
  const events: CountdownEvent[] = widgetSettings?.events || [];

  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [now, setNow] = useState(Date.now());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTimeLeft = (targetDate: string) => {
    const diff = new Date(targetDate).getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  };

  const addEvent = () => {
    if (!newEventName.trim() || !newEventDate) return;

    const newEvent: CountdownEvent = {
      id: Date.now().toString(),
      name: newEventName.trim(),
      date: newEventDate,
    };

    updateWidgetSettings('countdown', {
      events: [...events, newEvent],
    });

    setNewEventName('');
    setNewEventDate('');
  };

  const deleteEvent = (id: string) => {
    updateWidgetSettings('countdown', {
      events: events.filter((e) => e.id !== id),
    });
  };

  return (
    <BaseWidget title="Countdown" icon="⏳">
      <div className="space-y-3">
        {/* Add New Event */}
        <div className="space-y-2">
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Event name"
            className="w-full px-3 py-2 rounded-button transition-all duration-standard ease-smooth bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary text-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent"
          />
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              className="flex-1 px-3 py-2 rounded-button transition-all duration-standard ease-smooth bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary text-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            />
            <button
              onClick={addEvent}
              className="px-4 py-2 bg-accent-blue text-white rounded-button hover:bg-accent-blue-hover transition-all duration-standard ease-smooth text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-8 text-text-light-secondary dark:text-text-dark-secondary text-sm">
            No countdowns yet. Add one above!
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {events.map((event) => {
              const timeLeft = calculateTimeLeft(event.date);
              return (
                <div
                  key={event.id}
                  className="p-3 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-text-light-primary dark:text-text-dark-primary text-sm">
                      {event.name}
                    </h4>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-status-error hover:text-status-error-hover text-sm"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                  {timeLeft.expired ? (
                    <p className="text-status-error text-xs">Event passed!</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-accent-blue">{timeLeft.days}</div>
                        <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Days</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent-blue">{timeLeft.hours}</div>
                        <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Hours</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent-blue">{timeLeft.minutes}</div>
                        <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Mins</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent-blue">{timeLeft.seconds}</div>
                        <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Secs</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </BaseWidget>
  );
};
