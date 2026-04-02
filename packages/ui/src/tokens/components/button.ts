import { baseTokens } from '../base/tokens';

/**
 * Button 组件 token 负责收敛尺寸、形态和状态的最终值。
 */
export const buttonTokens = {
  fontSize: baseTokens.fontSize.md,
  fontWeight: '600',
  gap: '8px',
  borderRadius: baseTokens.radius.md,
  heightSm: '32px',
  heightMd: '40px',
  heightLg: '48px',
  paddingInlineSm: baseTokens.spacing.sm,
  paddingInlineMd: baseTokens.spacing.md,
  paddingInlineLg: baseTokens.spacing.lg,
  disabledOpacity: '0.56',
  primaryBg: 'var(--ui-semantic-primary)',
  primaryBgHover: 'var(--ui-semantic-primary-hover)',
  primaryText: 'var(--ui-base-color-white)',
  secondaryBg: 'var(--ui-semantic-bg-container)',
  secondaryBgHover: 'var(--ui-semantic-bg-elevated)',
  secondaryText: 'var(--ui-semantic-text)',
  secondaryBorder: 'var(--ui-semantic-border)',
  ghostText: 'var(--ui-semantic-primary)',
  ghostBgHover: 'var(--ui-base-color-blue-1)',
} as const;
