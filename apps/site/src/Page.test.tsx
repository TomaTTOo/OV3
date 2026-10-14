import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Page } from './Page.tsx';
import { content } from './content.ts';

describe('the site', () => {
  it('says what Outcome Vault is in its main heading', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(content.hero.title);
  });

  it('shows every section', () => {
    render(<Page />);
    for (const title of [content.how.title, content.trust.title, content.pilot.title]) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { level: 2, name: /over capacity/ })).toBeInTheDocument();
  });

  it('leads every "Join the pilot" to the pilot section, and the pilot section to an email', () => {
    render(<Page />);
    for (const link of screen.getAllByRole('link', { name: content.pilotCta })) {
      expect(link).toHaveAttribute('href', '#pilot');
    }
    expect(screen.getByRole('link', { name: content.pilot.button }).getAttribute('href')).toMatch(/^mailto:/);
  });

  it('names what the red means, never colour alone', () => {
    render(<Page />);
    expect(screen.getByText(content.planning.legend.over)).toBeInTheDocument();
    expect(screen.getByText(content.how.chart.legend.over)).toBeInTheDocument();
  });

  it('describes the chart in words for screen readers', () => {
    render(<Page />);
    const chart = screen.getByRole('img', { name: new RegExp(content.how.chart.title) });
    expect(chart.getAttribute('aria-label')).toContain(content.how.chart.likely(41));
  });

  it('keeps the cubes out of what screen readers read', () => {
    const { container } = render(<Page />);
    const canvases = container.querySelectorAll('canvas');
    expect(canvases).toHaveLength(2);
    canvases.forEach((canvas) => expect(canvas.closest('[aria-hidden="true"]')).not.toBeNull());
  });
});
