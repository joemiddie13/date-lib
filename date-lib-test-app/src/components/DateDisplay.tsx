import React, { useState } from 'react';
import D from '@joemiddie13/date-lib';

const DateDisplay: React.FC = () => {
  const [date, setDate] = useState(new D());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDate(new D(event.target.value));
  };

  return (
    <div>
      <h1>Date Library Demo</h1>
      <input type="date" onChange={handleDateChange} />
      <p>Formatted Date: {date.format('Y-M-D')}</p>
      <p>When: {date.when()}</p>
    </div>
  );
};

export default DateDisplay;