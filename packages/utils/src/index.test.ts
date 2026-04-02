import { clamp, cx, isNil } from './index';

describe('@jccnpm/utils', () => {
  it('should merge nested class name values', () => {
    expect(cx('ui-button', ['is-loading', { 'is-disabled': true }], 0, false)).toBe(
      'ui-button is-loading is-disabled 0',
    );
  });

  it('should clamp with reversed bounds', () => {
    expect(clamp(12, 0, 8)).toBe(8);
    expect(clamp(-2, 0, 8)).toBe(0);
    expect(clamp(4, 8, 0)).toBe(4);
  });

  it('should detect nullable values', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil('')).toBe(false);
  });

  it('should keep helper types stable', () => {
    expectTypeOf(cx('ui')).toEqualTypeOf<string>();
    expectTypeOf(clamp(1, 0, 2)).toEqualTypeOf<number>();
    expectTypeOf(isNil(null)).toEqualTypeOf<boolean>();
  });
});
