import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App.tsx';

describe('the generator page', () => {
  it('shows the logo and the small sizes', () => {
    render(<App />);
    expect(screen.getByRole('img', { name: 'The logo as it will be exported' })).toBeInTheDocument();
    expect(screen.getByText('16 px')).toBeInTheDocument();
  });

  it('switches to custom when the layout is changed by hand', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('radio', { name: 'Stacked' }));
    expect(screen.getByRole('combobox', { name: 'Preset' })).toHaveValue('');
  });

  it('warns when the colours leave the brand', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Accent'), { target: { value: '#ff0000' } });
    expect(screen.getByText(/Off-brand/)).toBeInTheDocument();
  });
});
