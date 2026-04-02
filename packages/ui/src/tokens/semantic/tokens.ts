import { baseTokens } from '../base/tokens';

/**
 * 语义 token 将基础值映射为跨组件复用的视觉语义。
 */
export const semanticTokens = {
  primary: baseTokens.color.blue6,
  primaryHover: baseTokens.color.blue7,
  text: baseTokens.color.gray11,
  textSecondary: baseTokens.color.gray8,
  textDisabled: baseTokens.color.gray6,
  border: baseTokens.color.gray4,
  borderStrong: baseTokens.color.gray6,
  bgContainer: baseTokens.color.white,
  bgElevated: '#fcfdff',
  bgDisabled: baseTokens.color.gray1,
  danger: baseTokens.color.red6,
  focusRing: baseTokens.shadow.focus,
} as const;
