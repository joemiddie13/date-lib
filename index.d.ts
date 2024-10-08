declare module '@joemiddie13/date-lib' {
  class DateLib {
    constructor(...args: any[]);
    format(mask?: string): string;
    when(): string;
  }
  export = DateLib;
}