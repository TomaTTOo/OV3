import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { content } from '../content.ts';
import { ContactForm } from './ContactForm.tsx';

const copy = content.contact.form;
const fill = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
const fillAll = () => {
  fill(copy.labels.name, 'Ana');
  fill(copy.labels.email, 'ana@example.com');
  fill(copy.labels.message, 'We plan our next PI in March.');
};

describe('the contact form', () => {
  it('says what is wrong once a field is left, never before', () => {
    render(<ContactForm copy={copy} send={vi.fn()} />);
    expect(screen.queryByText(copy.problems.required)).toBeNull();
    fireEvent.blur(screen.getByLabelText(copy.labels.name));
    expect(screen.getByText(copy.problems.required)).toBeInTheDocument();
  });

  it('sends nothing while something is missing, and points at it', () => {
    const send = vi.fn();
    render(<ContactForm copy={copy} send={send} />);
    fireEvent.click(screen.getByRole('button', { name: copy.send }));
    expect(send).not.toHaveBeenCalled();
    expect(screen.getAllByText(copy.problems.required)).toHaveLength(3);
  });

  it('sends a complete message and thanks the visitor', async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm copy={copy} send={send} />);
    fillAll();
    fireEvent.click(screen.getByRole('button', { name: copy.send }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(copy.sent));
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ana', email: 'ana@example.com' }));
  });

  it('says so when sending fails, keeping what was written', async () => {
    render(<ContactForm copy={copy} send={vi.fn().mockRejectedValue(new Error('offline'))} />);
    fillAll();
    fireEvent.click(screen.getByRole('button', { name: copy.send }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(copy.failed));
    expect(screen.getByLabelText(copy.labels.name)).toHaveValue('Ana');
  });

  it('pretends to send what a bot filled in, sending nothing', async () => {
    const send = vi.fn();
    const { container } = render(<ContactForm copy={copy} send={send} />);
    fillAll();
    const trap = container.querySelector('input[name="website"]');
    if (!trap) throw new Error('No trap field');
    fireEvent.change(trap, { target: { value: 'spam' } });
    fireEvent.click(screen.getByRole('button', { name: copy.send }));
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(send).not.toHaveBeenCalled();
  });
});
