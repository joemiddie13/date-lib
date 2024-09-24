# Date-Lib

Date-Lib is a lightweight and flexible JavaScript library for date manipulation and formatting. It provides an easy-to-use interface for working with dates in your JavaScript and TypeScript projects.

## Features

- Create date objects with various input formats
- Format dates using customizable masks
- Get relative time descriptions (e.g., "2 days from now", "3 months ago")
- Getter methods for various date components (year, month, day, etc.)

## Installation

You can install Date-Lib using npm:

```bash
npm install @joemiddie13/date-lib
```

## Usage

Here's a quick example to get you started:

```javascript
javascript
import D from 'date-lib';
// Create a new date object
const date = new D('2023-09-15');
// Format the date
console.log(date.format('Y-M-D')); // Output: 2023-September-15
// Get relative time description
console.log(date.when()); // Output depends on the current date
```

### Creating Date OBjects

You can create a date object with various input formats:

```javascript
const date1 = new D(); // Current date
const date2 = new D('2023-09-15'); // Specific date
const date3 = new D(new Date()); // Current date and time

### Formatting Dates

You can format dates using customizable masks:

```javascript
const formattedDate = date.format('Y-M-D'); // Custom format
```

### Getting Relative Time Descriptions

You can get relative time descriptions to indicate how long ago or how long from now a date is:

```javascript
const relativeTime = date.when(); // e.g., "2 days from now" or "3 months ago"
```

### TypeScript Support

Date-Lib is designed to work seamlessly with TypeScript. It includes TypeScript definitions, allowing you to use it in your TypeScript projects without any additional setup.

## Contributing

We welcome contributions to Date-Lib! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

