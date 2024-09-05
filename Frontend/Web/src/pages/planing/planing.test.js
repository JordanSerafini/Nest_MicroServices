import { describe, expect, it } from '@jest/globals';
import Planing from './planing';

describe('Planing', () => {
  
  it('should return an empty array if no events in the week', () => {
    const events = [
      { id: 1, title: 'Event 1', date: '2021-09-30' },
      { id: 2, title: 'Event 2', date: '2021-10-08' },
    ];
    const planing = new Planing(events);
    const week = planing.getWeek('2021-10-01');
    expect(week).toEqual([]);
  });

  it('should handle events with invalid dates gracefully', () => {
    const events = [
      { id: 1, title: 'Event 1', date: 'invalid-date' },
      { id: 2, title: 'Event 2', date: '2021-10-02' },
    ];
    const planing = new Planing(events);
    const week = planing.getWeek('2021-10-01');
    expect(week).toEqual([
      { id: 2, title: 'Event 2', date: '2021-10-02' },
    ]);
  });

  it('should include events that exactly match the start date', () => {
    const events = [
      { id: 1, title: 'Event 1', date: '2021-10-01' },
      { id: 2, title: 'Event 2', date: '2021-10-07' },
    ];
    const planing = new Planing(events);
    const week = planing.getWeek('2021-10-01');
    expect(week).toEqual([
      { id: 1, title: 'Event 1', date: '2021-10-01' },
      { id: 2, title: 'Event 2', date: '2021-10-07' },
    ]);
  });

  it('should include events that exactly match the end date', () => {
    const events = [
      { id: 1, title: 'Event 1', date: '2021-10-01' },
      { id: 2, title: 'Event 2', date: '2021-10-07' },
    ];
    const planing = new Planing(events);
    const week = planing.getWeek('2021-10-01');
    expect(week).toEqual([
      { id: 1, title: 'Event 1', date: '2021-10-01' },
      { id: 2, title: 'Event 2', date: '2021-10-07' },
    ]);
  });
});