import type { InputHTMLAttributes } from 'react';

import { cx } from '@jccnpm/utils';

export type InputSize = 'lg' | 'md' | 'sm';

/**
 * Input 对外暴露统一尺寸和校验态，便于主题系统稳定收口。
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean;
  size?: InputSize;
}

/**
 * Input 保持原生输入行为，只通过 class 组合管理结构和状态。
 */
export function Input({
  className,
  disabled,
  invalid = false,
  size = 'md',
  ...restProps
}: InputProps) {
  return (
    <input
      className={cx('ui-input', `ui-input--${size}`, className, {
        'is-disabled': disabled,
        'is-invalid': invalid,
      })}
      disabled={disabled}
      {...restProps}
    />
  );
}
