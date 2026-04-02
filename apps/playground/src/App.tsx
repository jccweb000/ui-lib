import { useState } from 'react';

import { Button, Input, ThemeProvider } from '@ui-lib/ui';
import type { ThemeOverrides } from '@ui-lib/ui';
import { clamp, isNil } from '@ui-lib/utils';

import './App.css';

type ThemeMode = 'default' | 'ocean';

function createOceanTheme(hue: number): ThemeOverrides {
  return {
    semantic: {
      primary: `hsl(${hue} 76% 42%)`,
      primaryHover: `hsl(${hue} 78% 34%)`,
      focusRing: `0 0 0 3px hsl(${hue} 82% 40% / 0.22)`,
    },
    components: {
      button: {
        ghostBgHover: `hsl(${hue} 86% 95%)`,
      },
    },
  };
}

const inversePanelTheme: ThemeOverrides = {
  semantic: {
    bgContainer: '#0f172a',
    bgElevated: '#111c34',
    border: 'rgb(148 163 184 / 0.24)',
    borderStrong: 'rgb(125 211 252 / 0.45)',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
  },
  components: {
    button: {
      primaryBg: '#f8fafc',
      primaryBgHover: '#dbe4f5',
      primaryText: '#0f172a',
      secondaryBg: 'transparent',
      secondaryBorder: 'rgb(148 163 184 / 0.3)',
      secondaryText: '#f8fafc',
    },
    input: {
      bg: 'rgb(15 23 42 / 0.72)',
      bgDisabled: 'rgb(15 23 42 / 0.4)',
      borderColor: 'rgb(148 163 184 / 0.24)',
      borderColorHover: 'rgb(125 211 252 / 0.42)',
      borderColorFocus: '#7dd3fc',
      placeholderColor: '#94a3b8',
    },
  },
};

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('ocean');
  const [brandHue, setBrandHue] = useState(188);
  const [note, setNote] = useState<string | null>(null);

  const safeHue = clamp(brandHue, 0, 360);
  const activeTheme = themeMode === 'ocean' ? createOceanTheme(safeHue) : undefined;

  return (
    <ThemeProvider theme={activeTheme}>
      <main className="playground-shell">
        <section className="hero-panel">
          <div>
            <span className="eyebrow">Nx + Rollup + Lerna</span>
            <h1>ui-lib playground</h1>
            <p className="hero-copy">
              当前页面直接消费 <code>@ui-lib/ui</code> 与 <code>@ui-lib/utils</code>，用于验证
              三层 token、运行时主题切换和局部换肤链路。
            </p>
          </div>

          <div className="hero-actions">
            <Button
              variant={themeMode === 'ocean' ? 'primary' : 'secondary'}
              onClick={() => setThemeMode('ocean')}
            >
              海岸主题
            </Button>
            <Button
              variant={themeMode === 'default' ? 'primary' : 'secondary'}
              onClick={() => setThemeMode('default')}
            >
              默认主题
            </Button>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="surface-card">
            <div className="section-heading">
              <span className="section-tag">Global Theme</span>
              <h2>主题调试面板</h2>
            </div>

            <div className="control-stack">
              <label className="control-field">
                <span>品牌色 Hue</span>
                <input
                  className="hue-slider"
                  max="360"
                  min="0"
                  onChange={(event) =>
                    setBrandHue(clamp(Number(event.target.value) || 0, 0, 360))
                  }
                  type="range"
                  value={safeHue}
                />
              </label>

              <label className="control-field">
                <span>数值输入</span>
                <Input
                  aria-label="brand-hue-input"
                  onChange={(event) =>
                    setBrandHue(clamp(Number(event.target.value) || 0, 0, 360))
                  }
                  size="sm"
                  type="number"
                  value={String(safeHue)}
                />
              </label>
            </div>

            <div className="stat-row">
              <div className="stat-card">
                <span className="stat-label">clamp 结果</span>
                <strong>{safeHue}</strong>
              </div>
              <div className="stat-card">
                <span className="stat-label">isNil(note)</span>
                <strong>{String(isNil(note))}</strong>
              </div>
            </div>

            <div className="preview-block">
              <div className="button-row">
                <Button>Primary CTA</Button>
                <Button variant="secondary">Secondary</Button>
                <Button loading variant="ghost">
                  Loading
                </Button>
              </div>

              <label className="control-field">
                <span>备注输入</span>
                <Input
                  aria-label="note-input"
                  onChange={(event) => setNote(event.target.value.trim() ? event.target.value : null)}
                  placeholder="留空时会被视为 null"
                  value={note ?? ''}
                />
              </label>
            </div>
          </article>

          <ThemeProvider theme={inversePanelTheme}>
            <article className="surface-card surface-card--inverse">
              <div className="section-heading">
                <span className="section-tag">Local Override</span>
                <h2>局部换肤区域</h2>
              </div>

              <p className="inverse-copy">
                这里通过嵌套 <code>ThemeProvider</code> 只覆盖当前面板，不影响外层主题。
              </p>

              <div className="button-row">
                <Button>Inverse Primary</Button>
                <Button variant="secondary">Secondary</Button>
              </div>

              <label className="control-field">
                <span>局部输入框</span>
                <Input placeholder="局部换肤下的 Input" />
              </label>
            </article>
          </ThemeProvider>
        </section>
      </main>
    </ThemeProvider>
  );
}
