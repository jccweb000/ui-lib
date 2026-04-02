import type { CSSProperties } from 'react';

import { defaultTheme } from './defaultTheme';
import type {
  ButtonTokens,
  InputTokens,
  ResolvedTheme,
  SemanticTokens,
  ThemeOverrides,
} from './types';

function camelToKebab(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function mergeTokenSection<T extends Record<string, string>>(
  base: T,
  override?: Partial<T>,
): T {
  return {
    ...base,
    ...override,
  };
}

/**
 * 深度合并父层和当前层覆盖，保证嵌套 ThemeProvider 的覆盖语义稳定。
 */
export function mergeThemeOverrides(
  parentTheme?: ThemeOverrides,
  currentTheme?: ThemeOverrides,
): ThemeOverrides {
  return {
    semantic: {
      ...parentTheme?.semantic,
      ...currentTheme?.semantic,
    },
    components: {
      button: {
        ...parentTheme?.components?.button,
        ...currentTheme?.components?.button,
      },
      input: {
        ...parentTheme?.components?.input,
        ...currentTheme?.components?.input,
      },
    },
  };
}

/**
 * 将部分覆盖解析成完整主题，便于统一注入 CSS Variables。
 */
export function resolveTheme(theme?: ThemeOverrides): ResolvedTheme {
  return {
    semantic: mergeTokenSection<SemanticTokens>(defaultTheme.semantic, theme?.semantic),
    components: {
      button: mergeTokenSection<ButtonTokens>(
        defaultTheme.components.button,
        theme?.components?.button,
      ),
      input: mergeTokenSection<InputTokens>(
        defaultTheme.components.input,
        theme?.components?.input,
      ),
    },
  };
}

function appendTokenVars(
  target: Record<string, string>,
  prefix: string,
  values: Record<string, string>,
): void {
  Object.entries(values).forEach(([key, value]) => {
    target[`--${prefix}-${camelToKebab(key)}`] = value;
  });
}

/**
 * 将主题对象转换为作用域容器可直接消费的内联 CSS Variables。
 */
export function themeToStyle(theme?: ThemeOverrides): CSSProperties {
  const resolvedTheme = resolveTheme(theme);
  const styleMap: Record<string, string> = {};

  // 1. 注入语义 token，组件层默认值会依赖这些变量。
  appendTokenVars(styleMap, 'ui-semantic', resolvedTheme.semantic);

  // 2. 注入组件 token，允许当前作用域覆盖组件局部表现。
  appendTokenVars(styleMap, 'ui-component-button', resolvedTheme.components.button);
  appendTokenVars(styleMap, 'ui-component-input', resolvedTheme.components.input);

  return styleMap as CSSProperties;
}
