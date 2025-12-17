import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCalendarStore } from '../useCalendarStore';

describe('useCalendarStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useCalendarStore.setState({
      events: {},
      viewMode: 'monthly',
      currentDate: new Date('2025-11-10'),
    });
  });

  it('should have initial state', () => {
    const state = useCalendarStore.getState();
    expect(state.events).toEqual({});
    expect(state.viewMode).toBe('monthly');
    expect(state.currentDate).toBeInstanceOf(Date);
  });

  it('should switch view mode', () => {
    useCalendarStore.getState().setViewMode('weekly');
    expect(useCalendarStore.getState().viewMode).toBe('weekly');

    useCalendarStore.getState().setViewMode('monthly');
    expect(useCalendarStore.getState().viewMode).toBe('monthly');
  });

  it('should set current date', () => {
    const newDate = new Date('2025-12-25');
    useCalendarStore.getState().setCurrentDate(newDate);

    const state = useCalendarStore.getState();
    expect(state.currentDate).toEqual(newDate);
  });

  it('should add an event', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Team Meeting');

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15']).toBeDefined();
    expect(state.events['2025-11-15'].length).toBe(1);
    expect(state.events['2025-11-15'][0].title).toBe('Team Meeting');
    expect(state.events['2025-11-15'][0].id).toBeDefined();
  });

  it('should add multiple events to same day', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Meeting 1');
    useCalendarStore.getState().addEvent('2025-11-15', 'Meeting 2');
    useCalendarStore.getState().addEvent('2025-11-15', 'Meeting 3');

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15'].length).toBe(3);
    expect(state.events['2025-11-15'][0].title).toBe('Meeting 1');
    expect(state.events['2025-11-15'][1].title).toBe('Meeting 2');
    expect(state.events['2025-11-15'][2].title).toBe('Meeting 3');
  });

  it('should update an event', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Original Title');
    const eventId = useCalendarStore.getState().events['2025-11-15'][0].id;

    useCalendarStore.getState().updateEvent('2025-11-15', eventId, 'Updated Title');

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15'][0].title).toBe('Updated Title');
  });

  it('should delete a specific event', () => {
    // Use fake timers to ensure unique IDs (Date.now() based)
    vi.useFakeTimers();

    useCalendarStore.getState().addEvent('2025-11-15', 'Event 1');
    vi.advanceTimersByTime(10); // Advance time to get different ID
    useCalendarStore.getState().addEvent('2025-11-15', 'Event 2');

    const eventId = useCalendarStore.getState().events['2025-11-15'][0].id;

    useCalendarStore.getState().deleteEvent('2025-11-15', eventId);

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15'].length).toBe(1);
    expect(state.events['2025-11-15'][0].title).toBe('Event 2');

    vi.useRealTimers();
  });

  it('should remove date key when last event is deleted', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Only Event');
    const eventId = useCalendarStore.getState().events['2025-11-15'][0].id;

    useCalendarStore.getState().deleteEvent('2025-11-15', eventId);

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15']).toBeUndefined();
    expect(Object.keys(state.events)).toHaveLength(0);
  });

  it('should remove all events for a date', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Event 1');
    useCalendarStore.getState().addEvent('2025-11-15', 'Event 2');

    useCalendarStore.getState().removeAllEvents('2025-11-15');

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15']).toBeUndefined();
  });

  it('should navigate to next month in monthly view', () => {
    useCalendarStore.setState({
      currentDate: new Date('2025-11-10'),
      viewMode: 'monthly',
      events: {},
    });

    useCalendarStore.getState().nextPeriod();

    const state = useCalendarStore.getState();
    expect(state.currentDate.getMonth()).toBe(11); // December (0-indexed)
    expect(state.currentDate.getFullYear()).toBe(2025);
  });

  it('should navigate to previous month in monthly view', () => {
    useCalendarStore.setState({
      currentDate: new Date('2025-11-10'),
      viewMode: 'monthly',
      events: {},
    });

    useCalendarStore.getState().prevPeriod();

    const state = useCalendarStore.getState();
    expect(state.currentDate.getMonth()).toBe(9); // October (0-indexed)
    expect(state.currentDate.getFullYear()).toBe(2025);
  });

  it('should navigate to next week in weekly view', () => {
    // Use explicit local date to avoid timezone issues
    const startDate = new Date(2025, 10, 10); // Nov 10, 2025 (month is 0-indexed)
    useCalendarStore.setState({
      currentDate: startDate,
      viewMode: 'weekly',
      events: {},
    });

    useCalendarStore.getState().nextPeriod();

    const state = useCalendarStore.getState();
    expect(state.currentDate.getDate()).toBe(17); // 7 days later
  });

  it('should navigate to previous week in weekly view', () => {
    // Use explicit local date to avoid timezone issues
    const startDate = new Date(2025, 10, 10); // Nov 10, 2025 (month is 0-indexed)
    useCalendarStore.setState({
      currentDate: startDate,
      viewMode: 'weekly',
      events: {},
    });

    useCalendarStore.getState().prevPeriod();

    const state = useCalendarStore.getState();
    expect(state.currentDate.getDate()).toBe(3); // 7 days earlier
  });

  it('should handle year boundary when navigating months', () => {
    useCalendarStore.setState({
      currentDate: new Date('2025-12-15'),
      viewMode: 'monthly',
      events: {},
    });

    useCalendarStore.getState().nextPeriod();

    const state = useCalendarStore.getState();
    expect(state.currentDate.getMonth()).toBe(0); // January (0-indexed)
    expect(state.currentDate.getFullYear()).toBe(2026);
  });

  it('should store events and view mode in state', () => {
    useCalendarStore.getState().addEvent('2025-11-15', 'Persistent Event');
    useCalendarStore.getState().setViewMode('weekly');

    const state = useCalendarStore.getState();
    expect(state.events['2025-11-15'][0].title).toBe('Persistent Event');
    expect(state.viewMode).toBe('weekly');
  });

  it('should have currentDate as dynamic (not from persisted storage)', () => {
    // currentDate is initialized fresh on each load, not persisted
    // This is by design - users want to see "today" not last session's date
    const state = useCalendarStore.getState();
    expect(state.currentDate).toBeInstanceOf(Date);

    // Setting a date works for the session
    useCalendarStore.getState().setCurrentDate(new Date(2025, 11, 25));
    expect(useCalendarStore.getState().currentDate.getMonth()).toBe(11);
  });
});
