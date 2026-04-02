/**
 * 基础 token 只承载稳定的视觉原子值，不直接暴露给业务侧覆盖。
 */
export const baseTokens = {
  color: {
    white: '#ffffff',
    gray1: '#f5f6f8',
    gray2: '#eef0f3',
    gray4: '#d9dee7',
    gray6: '#aab4c3',
    gray8: '#667085',
    gray11: '#1f2937',
    blue6: '#1677ff',
    blue7: '#0958d9',
    blue1: '#eff6ff',
    red6: '#e5484d',
  },
  fontSize: {
    sm: '12px',
    md: '14px',
    lg: '16px',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
  },
  radius: {
    sm: '8px',
    md: '12px',
  },
  shadow: {
    focus: '0 0 0 3px rgb(22 119 255 / 18%)',
  },
} as const;
