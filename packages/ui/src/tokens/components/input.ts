import { baseTokens } from '../base/tokens';

/**
 * Input 组件 token 负责收敛输入框的结构和交互状态。
 */
export const inputTokens = {
  fontSize: baseTokens.fontSize.md,
  borderRadius: baseTokens.radius.sm,
  heightSm: '32px',
  heightMd: '40px',
  heightLg: '48px',
  paddingInline: baseTokens.spacing.sm,
  bg: 'var(--ui-semantic-bg-container)',
  bgDisabled: 'var(--ui-semantic-bg-disabled)',
  borderColor: 'var(--ui-semantic-border)',
  borderColorHover: 'var(--ui-semantic-border-strong)',
  borderColorFocus: 'var(--ui-semantic-primary)',
  placeholderColor: 'var(--ui-semantic-text-secondary)',
} as const;
