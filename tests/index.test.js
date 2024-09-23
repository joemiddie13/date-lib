const D = require('../src/index');

describe('D class', () => {
  test('should create a date with no parameters', () => {
    const d = new D();
    expect(d._date).toBeInstanceOf(Date);
  });

  test('should create a date from a string', () => {
    const d = new D('9/26/1965');
    expect(d._date).toBeInstanceOf(Date);
    expect(d._date.getFullYear()).toBe(1965);
    expect(d._date.getMonth()).toBe(8); // September is 8 (0-indexed)
    expect(d._date.getDate()).toBe(26);
  });

  test('should create a date from numbers', () => {
    const d = new D(1970, 0, 1, 0, 0, 0);
    expect(d._date).toBeInstanceOf(Date);
    expect(d._date.getFullYear()).toBe(1970);
    expect(d._date.getMonth()).toBe(0);
    expect(d._date.getDate()).toBe(1);
    expect(d._date.getHours()).toBe(0);
    expect(d._date.getMinutes()).toBe(0);
    expect(d._date.getSeconds()).toBe(0);
  });

  test('should create a date from another Date object', () => {
    const originalDate = new Date(2000, 0, 1);
    const d = new D(originalDate);
    expect(d._date).toBeInstanceOf(Date);
    expect(d._date.getTime()).toBe(originalDate.getTime());
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
  
});