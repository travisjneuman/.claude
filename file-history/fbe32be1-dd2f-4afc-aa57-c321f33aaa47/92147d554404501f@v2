import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Widget } from '../Widget';

describe('Widget', () => {
  it('should render with title', () => {
    render(
      <Widget id="test-widget" title="Test Widget" category="Testing">
        <div>Content</div>
      </Widget>
    );

    expect(screen.getByText('Test Widget')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <Widget id="test-widget" title="Test Widget" category="Testing">
        <div>Test Content</div>
      </Widget>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render category when provided', () => {
    render(
      <Widget id="test-widget" title="Test Widget" category="Navigation">
        <div>Content</div>
      </Widget>
    );

    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('should not render category when not provided', () => {
    render(
      <Widget id="test-widget" title="Test Widget">
        <div>Content</div>
      </Widget>
    );

    expect(screen.queryByText(/Navigation|Testing|Planning/)).not.toBeInTheDocument();
  });

  it('should have correct data attributes', () => {
    const { container } = render(
      <Widget id="map-widget" title="Map" category="Navigation">
        <div>Content</div>
      </Widget>
    );

    const widget = container.querySelector('[data-widget-id="map-widget"]');
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveAttribute('data-category', 'Navigation');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Widget
        id="test-widget"
        title="Test"
        category="Testing"
        className="custom-class"
      >
        <div>Content</div>
      </Widget>
    );

    const widget = container.querySelector('#test-widget');
    expect(widget).toHaveClass('custom-class');
  });

  it('should have widget base classes', () => {
    const { container } = render(
      <Widget id="test-widget" title="Test" category="Testing">
        <div>Content</div>
      </Widget>
    );

    const widget = container.querySelector('#test-widget');
    expect(widget).toHaveClass('h-full');
    expect(widget).toHaveClass('flex');
    expect(widget).toHaveClass('flex-col');
    expect(widget).toHaveClass('rounded-button');
  });

  it('should render header with correct structure', () => {
    render(
      <Widget id="test-widget" title="Test Widget" category="Testing">
        <div>Content</div>
      </Widget>
    );

    // Title should be in an h2 element
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Widget');
  });

  it('should render content area with children', () => {
    render(
      <Widget id="test-widget" title="Test" category="Testing">
        <div data-testid="widget-content">Content</div>
      </Widget>
    );

    expect(screen.getByTestId('widget-content')).toBeInTheDocument();
  });

  // Loading/Error state tests
  it('should show loading spinner when loading is true', () => {
    render(
      <Widget id="test-widget" title="Test" loading={true}>
        <div>Content that should not appear</div>
      </Widget>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Content that should not appear')).not.toBeInTheDocument();
  });

  it('should show error message when error is provided', () => {
    render(
      <Widget id="test-widget" title="Test" error="Something went wrong">
        <div>Content that should not appear</div>
      </Widget>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Content that should not appear')).not.toBeInTheDocument();
  });

  it('should show retry button when error and onRefresh provided', () => {
    const mockRefresh = vi.fn();
    render(
      <Widget id="test-widget" title="Test" error="Error occurred" onRefresh={mockRefresh}>
        <div>Content</div>
      </Widget>
    );

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should call onRefresh when retry button is clicked', async () => {
    const user = userEvent.setup();
    const mockRefresh = vi.fn();
    render(
      <Widget id="test-widget" title="Test" error="Error occurred" onRefresh={mockRefresh}>
        <div>Content</div>
      </Widget>
    );

    await user.click(screen.getByText('Try Again'));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('should show refresh button in header when onRefresh provided', () => {
    const mockRefresh = vi.fn();
    render(
      <Widget id="test-widget" title="Test" onRefresh={mockRefresh}>
        <div>Content</div>
      </Widget>
    );

    expect(screen.getByTitle('Refresh')).toBeInTheDocument();
  });

  it('should prioritize loading state over error state', () => {
    render(
      <Widget id="test-widget" title="Test" loading={true} error="Error">
        <div>Content</div>
      </Widget>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
});
