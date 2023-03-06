import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';


test('userID', () => {
  render(<App />);
  const linkElement = screen.getByText(/userID/i);
  expect(linkElement).toBeInTheDocument();

});

test('add button', () => {
  render(<App />);
  const addBtn = screen.getByText(/New Duty/i);
  fireEvent.click(addBtn);
  const addForm = screen.getByText(/text/i);
  expect(addForm).toBeInTheDocument();
});