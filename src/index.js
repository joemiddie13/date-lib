class D {
  constructor(...args) {
    this._date = new Date(...args);
  }

  // Year Getters
  get year() {
    return this._date.getFullYear();
  }

  get yr() {
    return this._date.getFullYear() % 100;
  }

  // Month Getters
  get month() {
    const months = [
      'January', 
      'February', 
      'March', 
      'April', 
      'May', 
      'June', 
      'July', 
      'August', 
      'September',
      'October',
      'November',
      'December'
    ];
    return months[this._date.getMonth()];
  }

  get mon() {
    return this.month.substring(0, 3);
  }

  // Day Getters
  get day() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
  }

  get dy() {
    return this.day.substring(0, 3);
  }

  // Date Getter
  get date() {
    return this._date.getDate();
  }

  // Time Getters
  get hours() {
    return this._date.getHours();
  }

  get mins() {
    return this._date.getMinutes();
  }

  get secs() {
    return this._date.getSeconds();
  }
}

// Test different instantiation methods
console.log('No parameters:', new D());
console.log('With string:', new D('January 1, 1970'));
console.log('With numbers:', new D(2010, 6, 13, 25, 50));
console.log('With another Date object:', new D(new Date()));

module.exports = D;