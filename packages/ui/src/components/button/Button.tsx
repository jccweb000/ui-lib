import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cx } from '@jccnpm/utils';

export type ButtonVariant = 'ghost' | 'primary' | 'secondary';
export type ButtonSize = 'lg' | 'md' | 'sm';

/**
 * Button 对外暴露稳定的尺寸、变体和加载态能力。
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

/**
 * Button 通过统一 class 规范承载结构、状态和变体，而不是依赖内联样式。
 */
export function Button({
  children,
  className,
  disabled,
  icon,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...restProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      aria-busy={loading || undefined}
      className={cx('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className, {
        'has-icon': Boolean(icon),
        'is-disabled': isDisabled,
        'is-loading': loading,
      })}
      disabled={isDisabled}
      type={type}
      {...restProps}
    >
      {loading ? <span aria-hidden="true" className="ui-button__spinner" /> : null}
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
      <span className="ui-button__content">{children}</span>
    </button>
  );
}
