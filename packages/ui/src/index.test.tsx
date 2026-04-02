import { fireEvent, render, screen } from '@testing-library/react';

import { Button, Input, ThemeProvider } from './index';

describe('@ui-lib/ui', () => {
  it('should render button classes for size, variant and loading state', () => {
    render(
      <Button loading size="lg" variant="secondary">
        提交
      </Button>,
    );

    const button = screen.getByRole('button', { name: '提交' });

    expect(button).toHaveClass('ui-button', 'ui-button--secondary', 'ui-button--lg', 'is-loading');
    expect(button).toBeDisabled();
  });

  it('should render input invalid state', () => {
    render(<Input invalid placeholder="请输入内容" size="sm" />);

    const input = screen.getByPlaceholderText('请输入内容');

    expect(input).toHaveClass('ui-input', 'ui-input--sm', 'is-invalid');
  });

  it('should pass through native events', () => {
    const onChange = vi.fn();
    render(<Input aria-label="name" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'name' }), {
      target: { value: 'ui-lib' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should inject semantic variables into theme provider scope', () => {
    const { container } = render(
      <ThemeProvider theme={{ semantic: { primary: '#13c2c2' } }}>
        <Button>主题按钮</Button>
      </ThemeProvider>,
    );

    const provider = container.querySelector<HTMLElement>('.ui-theme-root');

    expect(provider).not.toBeNull();
    expect(provider?.style.getPropertyValue('--ui-semantic-primary')).toBe('#13c2c2');
  });

  it('should merge nested provider overrides', () => {
    const { container } = render(
      <ThemeProvider theme={{ semantic: { primary: '#13c2c2' } }}>
        <ThemeProvider theme={{ components: { button: { primaryBg: '#0055aa' } } }}>
          <Button>局部换肤</Button>
        </ThemeProvider>
      </ThemeProvider>,
    );

    const providers = container.querySelectorAll<HTMLElement>('.ui-theme-root');
    const innerProvider = providers.item(1);

    expect(innerProvider.style.getPropertyValue('--ui-semantic-primary')).toBe('#13c2c2');
    expect(innerProvider.style.getPropertyValue('--ui-component-button-primary-bg')).toBe('#0055aa');
  });
});
