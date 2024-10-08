import D from '../src/index';

describe('D class', () => {
  test('should create a date with no parameters', () => {
    const d = new D();
    const now = new Date();
    expect(d.format('Y')).toBe(now.getFullYear().toString());
    expect(d.format('M')).toBe(d.month);
    expect(parseInt(d.format('D'))).toBe(now.getDate());
  });

  test('should create a date from a string', () => {
    const d = new D('9/26/1965');
    expect(d.format('Y-M-D')).toBe('1965-September-26');
  });

  test('should create a date from numbers', () => {
    const d = new D(1970, 0, 1, 0, 0, 0);
    expect(d.format('Y-M-D H:I:S')).toBe('1970-January-01 00:00:00');
  });

  test('should create a date from another Date object', () => {
    const originalDate = new Date(2000, 0, 1);
    const d = new D(originalDate);
    expect(d.format('Y-M-D')).toBe('2000-January-01');
  });
  
  describe('format()', () => {
    test('should return default format when no mask is provided', () => {
      const d = new D(2017, 0, 2);
      expect(d.format()).toBe('2017 January 02');
    });

    test('should format using y/m/d', () => {
      const d = new D('9/26/1965');
      expect(d.format('y/m/d')).toBe('65/Sep/26');
    });

    test('should format using H:I:S', () => {
      const d = new D(2017, 0, 2, 3, 4, 5);
      expect(d.format('H:I:S')).toBe('03:04:05');
    });

    test('should format using h:i:s', () => {
      const d = new D(2017, 0, 2, 13, 14, 15);
      expect(d.format('h:i:s')).toBe('13:14:15');
    });

    test('should format using Y-M-D h:I:S', () => {
      const d = new D(2017, 0, 2, 3, 4, 5);
      expect(d.format('Y-M-D h:I:S')).toBe('2017-January-02 3:04:05');
    });

    test('should handle unrecognized characters', () => {
      const d = new D(2021, 11, 25, 10, 30, 45);
      expect(d.format('\\T\\o\\d\\a\\y \\i\\s D-M-Y')).toBe('Today is 25-December-2021');
    });

    test('should handle ordinal suffix with #', () => {
      const d1 = new D(2021, 0, 1);
      const d2 = new D(2021, 0, 2);
      const d3 = new D(2021, 0, 3);
      const d4 = new D(2021, 0, 4);
      expect(d1.format('#')).toBe('1st');
      expect(d2.format('#')).toBe('2nd');
      expect(d3.format('#')).toBe('3rd');
      expect(d4.format('#')).toBe('4th');
    });
  });
  
  describe('when()', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2023, 5, 15));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test('should return "today" for current date', () => {
      const d = new D(2023, 5, 15);
      expect(d.when()).toBe('today');
    });

    test('should return "tomorrow" for next day', () => {
      const d = new D(2023, 5, 16);
      expect(d.when()).toBe('tomorrow');
    });

    test('should return "yesterday" for previous day', () => {
      const d = new D(2023, 5, 14);
      expect(d.when()).toBe('yesterday');
    });

    test('should return "X days from now" for near future', () => {
      const d = new D(2023, 5, 20);
      expect(d.when()).toBe('5 days from now');
    });

    test('should return "X days ago" for near past', () => {
      const d = new D(2023, 5, 10);
      expect(d.when()).toBe('5 days ago');
    });

    test('should return "X months from now" for future months', () => {
      const d = new D(2023, 8, 15);
      expect(d.when()).toBe('3 months from now');
    });

    test('should return "X months ago" for past months', () => {
      const d = new D(2023, 2, 15);
      expect(d.when()).toBe('3 months ago');
    });

    test('should return "X years from now" for future years', () => {
      const d = new D(2025, 5, 15);
      expect(d.when()).toBe('2 years from now');
    });

    test('should return "X years ago" for past years', () => {
      const d = new D(2021, 5, 15);
      expect(d.when()).toBe('2 years ago');
    });
  });
});