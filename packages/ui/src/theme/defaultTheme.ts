import { buttonTokens } from '../tokens/components/button';
import { inputTokens } from '../tokens/components/input';
import { semanticTokens } from '../tokens/semantic/tokens';
import type { ResolvedTheme } from './types';

/**
 * 默认主题将语义 token 和组件 token 收敛成完整主题快照。
 */
export const defaultTheme: ResolvedTheme = {
  semantic: { ...semanticTokens },
  components: {
    button: { ...buttonTokens },
    input: { ...inputTokens },
  },
};
