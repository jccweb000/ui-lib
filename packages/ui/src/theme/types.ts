import type { buttonTokens } from '../tokens/components/button';
import type { inputTokens } from '../tokens/components/input';
import type { semanticTokens } from '../tokens/semantic/tokens';

type WidenTokenValues<T extends Record<string, string>> = {
  [Key in keyof T]: string;
};

export type SemanticTokens = WidenTokenValues<typeof semanticTokens>;
export type ButtonTokens = WidenTokenValues<typeof buttonTokens>;
export type InputTokens = WidenTokenValues<typeof inputTokens>;

/**
 * 组件 token 按组件维度分组，便于局部覆盖和后续扩展。
 */
export interface ComponentTokens {
  button: ButtonTokens;
  input: InputTokens;
}

/**
 * 完整主题是 ThemeProvider 在运行时最终注入的 token 结构。
 */
export interface ResolvedTheme {
  semantic: SemanticTokens;
  components: ComponentTokens;
}

/**
 * ThemeProvider 对外暴露部分覆盖能力，避免业务方维护整套 token。
 */
export interface ThemeOverrides {
  semantic?: Partial<SemanticTokens>;
  components?: {
    button?: Partial<ButtonTokens>;
    input?: Partial<InputTokens>;
  };
}
