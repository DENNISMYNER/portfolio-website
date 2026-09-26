import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('renders all navigation links', () => {
    render(<Header />);
    for (const label of [
      'Home',
      'About',
      'Skills',
      'Services',
      'Projects',
      'Experience',
      'Education',
      'Contact',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('toggles the theme and updates the button label', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const themeButton = screen.getByRole('button', { name: /switch to light theme/i });
    await user.click(themeButton);
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
    expect(document.body).toHaveClass('light-theme');
  });
});
