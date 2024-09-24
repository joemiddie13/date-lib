class D {
  private _date: Date;

  constructor(...args: any[]) {
    if (args.length === 0) {
      this._date = new Date();
    } else if (args.length === 1 && args[0] instanceof Date) {
      this._date = new Date(args[0].getTime());
    } else if (args.length === 1 && typeof args[0] === 'string') {
      this._date = new Date(args[0]);
    } else {
      this._date = new Date(args[0] as number, args[1] as number, ...(args.slice(2) as number[]));
    }
  }

  // Year Getters
  get year(): number {
    return this._date.getFullYear();
  }

  get yr(): number {
    return this._date.getFullYear() % 100;
  }

  // Month Getters
  get month(): string {
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[this._date.getMonth()];
  }

  get mon(): string {
    return this.month.substring(0, 3);
  }

  // Day Getters
  get day(): string {
    const days: string[] = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
    return days[this._date.getDay()];
  }

  get dy(): string {
    return this.day.substring(0, 3);
  }

  // Date Getter
  get date(): number {
    return this._date.getDate();
  }

  // Time Getters
  get hours(): number {
    return this._date.getHours();
  }

  get mins(): number {
    return this._date.getMinutes();
  }

  get secs(): number {
    return this._date.getSeconds();
  }

  /**
   * Formats the date based on the provided mask.
   * @param {string} mask - The mask to format the date.
   * @returns {string} - The formatted date.
   */
  format(mask: string = 'Y M D'): string {
    const formatMap: { [key: string]: string } = {
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
   * @returns {string} - Date with ordinal suffix (e.g., 1st, 2nd).
   * @private
   */
  private _getOrdinal(): string {
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
  when(): string {
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
    return '';
  }
}

export default D;