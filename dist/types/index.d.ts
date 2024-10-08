declare class D {
    private _date;
    constructor(...args: any[]);
    get year(): number;
    get yr(): number;
    get month(): string;
    get mon(): string;
    get day(): string;
    get dy(): string;
    get date(): number;
    get hours(): number;
    get mins(): number;
    get secs(): number;
    /**
     * Formats the date based on the provided mask.
     * @param {string} mask - The mask to format the date.
     * @returns {string} - The formatted date.
     */
    format(mask?: string): string;
    /**
     * Returns the date with ordinal suffix.
     * @returns {string} - Date with ordinal suffix (e.g., 1st, 2nd).
     * @private
     */
    private _getOrdinal;
    /**
     * Returns a human-readable description of when the date will occur relative to now.
     * @returns {string} A string describing when the date will occur.
     */
    when(): string;
}
export default D;
