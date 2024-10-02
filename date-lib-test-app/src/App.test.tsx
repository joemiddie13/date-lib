import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Date Library Demo', () => {
  render(<App />);
  const headingElement = screen.getByText(/Date Library Demo/i);
  expect(headingElement).toBeInTheDocument();
});
