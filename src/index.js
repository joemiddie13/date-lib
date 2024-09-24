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
    return days[this._date.getDay()];
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

  /**
   * Formats the date based on the provided mask.
   * @param {String} mask - The mask to format the date.
   * @returns {String} - The formatted date.
   */
  format(mask = 'Y M D') { // Default format
    const formatMap = {
      'Y': this.year.toString(),
      'y': this.yr.toString().padStart(2, '0'),
      'M': this.month,
      'm': this.mon,
      'D': this.date.toString().padStart(2, '0'),
      'd': this.date.toString(),
      'L': this.day,
      'l': this.dy,
      '#': this._getOrdinal(),
      'H': this.hours.toString().padStart(2, '0'),
      'h': this.hours.toString(),
      'I': this.mins.toString().padStart(2, '0'),
      'i': this.mins.toString(),
      'S': this.secs.toString().padStart(2, '0'),
      's': this.secs.toString(),
    };

    let formatted = '';
    let escapeNext = false;

    for (let char of mask) {
      if (escapeNext) {
        formatted += char;
        escapeNext = false;
        continue;
      }

      if (char === '\\') {
        escapeNext = true;
        continue;
      }

      if (formatMap[char] !== undefined) {
        formatted += formatMap[char];
      } else {
        formatted += char;
      }
    }

    return formatted;
  }

  /**
   * Returns the date with ordinal suffix.
   * @returns {String} - Date with ordinal suffix (e.g., 1st, 2nd).
   * @private
   */
  _getOrdinal() {
    const date = this.date;
    if (date > 3 && date < 21) return `${date}th`;
    switch (date % 10) {
      case 1: return `${date}st`;
      case 2: return `${date}nd`;
      case 3: return `${date}rd`;
      default: return `${date}th`;
    }
  }

  /**
   * Returns a human-readable description of when the date will occur relative to now.
   * @returns {string} A string describing when the date will occur.
   */
  when() {
    const now = new Date();
    const diff = this._date.getTime() - now.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffMonths = (this._date.getFullYear() - now.getFullYear()) * 12 + (this._date.getMonth() - now.getMonth());
    const diffYears = this._date.getFullYear() - now.getFullYear();

    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'tomorrow';
    } else if (diffDays === -1) {
      return 'yesterday';
    } else if (diffDays > 1 && diffDays < 7) {
      return `${diffDays} days from now`;
    } else if (diffDays < -1 && diffDays > -7) {
      return `${-diffDays} days ago`;
    } else if (diffMonths === 1) {
      return '1 month from now';
    } else if (diffMonths === -1) {
      return '1 month ago';
    } else if (diffMonths > 1 && diffMonths < 12) {
      return `${diffMonths} months from now`;
    } else if (diffMonths < -1 && diffMonths > -12) {
      return `${-diffMonths} months ago`;
    } else if (diffYears === 1) {
      return '1 year from now';
    } else if (diffYears === -1) {
      return '1 year ago';
    } else if (diffYears > 1) {
      return `${diffYears} years from now`;
    } else if (diffYears < -1) {
      return `${-diffYears} years ago`;
    }
  }
}

module.exports = D;