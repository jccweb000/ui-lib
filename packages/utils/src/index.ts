export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | boolean
  | null
  | number
  | string
  | undefined;

function appendClassName(buffer: string[], value: ClassValue): void {
  if (!value && value !== 0) {
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    buffer.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => appendClassName(buffer, entry));
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, enabled]) => {
      if (enabled) {
        buffer.push(key);
      }
    });
  }
}

/**
 * 合并字符串、数组和对象形式的类名输入。
 */
export function cx(...values: ClassValue[]): string {
  const classNames: string[] = [];

  values.forEach((value) => appendClassName(classNames, value));

  return classNames.join(' ');
}

/**
 * 将数值限制在指定区间内，并自动处理反向区间入参。
 */
export function clamp(value: number, min: number, max: number): number {
  const [lower, upper] = min <= max ? [min, max] : [max, min];

  return Math.min(Math.max(value, lower), upper);
}

/**
 * 判断值是否为 `null` 或 `undefined`。
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
