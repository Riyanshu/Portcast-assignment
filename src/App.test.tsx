import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders app correctly', () => {
    render(<App />);
    expect(screen.getByText("Crypto Tracker")).toBeInTheDocument();
  });
});
