(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MyLibrary = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var D = /** @class */ (function () {
        function D() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length === 0) {
                this._date = new Date();
            }
            else if (args.length === 1 && args[0] instanceof Date) {
                this._date = new Date(args[0].getTime());
            }
            else if (args.length === 1 && typeof args[0] === 'string') {
                this._date = new Date(args[0]);
            }
            else {
                this._date = new (Date.bind.apply(Date, __spreadArray([void 0, args[0], args[1]], args.slice(2), false)))();
            }
        }
        Object.defineProperty(D.prototype, "year", {
            // Year Getters
            get: function () {
                return this._date.getFullYear();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "yr", {
            get: function () {
                return this._date.getFullYear() % 100;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "month", {
            // Month Getters
            get: function () {
                var months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return months[this._date.getMonth()];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "mon", {
            get: function () {
                return this.month.substring(0, 3);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "day", {
            // Day Getters
            get: function () {
                var days = [
                    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday'
                ];
                return days[this._date.getDay()];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "dy", {
            get: function () {
                return this.day.substring(0, 3);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "date", {
            // Date Getter
            get: function () {
                return this._date.getDate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "hours", {
            // Time Getters
            get: function () {
                return this._date.getHours();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "mins", {
            get: function () {
                return this._date.getMinutes();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(D.prototype, "secs", {
            get: function () {
                return this._date.getSeconds();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Formats the date based on the provided mask.
         * @param {string} mask - The mask to format the date.
         * @returns {string} - The formatted date.
         */
        D.prototype.format = function (mask) {
            if (mask === void 0) { mask = 'Y M D'; }
            var formatMap = {
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
            var formatted = '';
            var escapeNext = false;
            for (var _i = 0, mask_1 = mask; _i < mask_1.length; _i++) {
                var char = mask_1[_i];
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
                }
                else {
                    formatted += char;
                }
            }
            return formatted;
        };
        /**
         * Returns the date with ordinal suffix.
         * @returns {string} - Date with ordinal suffix (e.g., 1st, 2nd).
         * @private
         */
        D.prototype._getOrdinal = function () {
            var date = this.date;
            if (date > 3 && date < 21)
                return "".concat(date, "th");
            switch (date % 10) {
                case 1: return "".concat(date, "st");
                case 2: return "".concat(date, "nd");
                case 3: return "".concat(date, "rd");
                default: return "".concat(date, "th");
            }
        };
        /**
         * Returns a human-readable description of when the date will occur relative to now.
         * @returns {string} A string describing when the date will occur.
         */
        D.prototype.when = function () {
            var now = new Date();
            var diff = this._date.getTime() - now.getTime();
            var diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            var diffMonths = (this._date.getFullYear() - now.getFullYear()) * 12 + (this._date.getMonth() - now.getMonth());
            var diffYears = this._date.getFullYear() - now.getFullYear();
            if (diffDays === 0) {
                return 'today';
            }
            else if (diffDays === 1) {
                return 'tomorrow';
            }
            else if (diffDays === -1) {
                return 'yesterday';
            }
            else if (diffDays > 1 && diffDays < 7) {
                return "".concat(diffDays, " days from now");
            }
            else if (diffDays < -1 && diffDays > -7) {
                return "".concat(-diffDays, " days ago");
            }
            else if (diffMonths === 1) {
                return '1 month from now';
            }
            else if (diffMonths === -1) {
                return '1 month ago';
            }
            else if (diffMonths > 1 && diffMonths < 12) {
                return "".concat(diffMonths, " months from now");
            }
            else if (diffMonths < -1 && diffMonths > -12) {
                return "".concat(-diffMonths, " months ago");
            }
            else if (diffYears === 1) {
                return '1 year from now';
            }
            else if (diffYears === -1) {
                return '1 year ago';
            }
            else if (diffYears > 1) {
                return "".concat(diffYears, " years from now");
            }
            else if (diffYears < -1) {
                return "".concat(-diffYears, " years ago");
            }
            return '';
        };
        return D;
    }());

    return D;

}));
//# sourceMappingURL=bundle.umd.js.map
