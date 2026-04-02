import type { CSSProperties, PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { cx } from '@ui-lib/utils';

import type { ThemeOverrides } from './types';
import { mergeThemeOverrides, themeToStyle } from './utils';

const ThemeOverrideContext = createContext<ThemeOverrides | undefined>(undefined);

export interface ThemeProviderProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  theme?: ThemeOverrides;
}

/**
 * ThemeProvider 负责把主题覆盖转换为作用域变量，并支持嵌套局部换肤。
 */
export function ThemeProvider({
  children,
  className,
  style,
  theme,
}: ThemeProviderProps) {
  const parentTheme = useContext(ThemeOverrideContext);
  const mergedTheme = mergeThemeOverrides(parentTheme, theme);
  const themeStyle = {
    ...style,
    ...themeToStyle(mergedTheme),
  } as CSSProperties;

  return (
    <ThemeOverrideContext.Provider value={mergedTheme}>
      <div className={cx('ui-theme-root', className)} data-ui-theme-provider="" style={themeStyle}>
        {children}
      </div>
    </ThemeOverrideContext.Provider>
  );
}
