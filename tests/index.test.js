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
});