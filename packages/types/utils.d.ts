// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObj = Record<string, any>;

export type Combine<T, K> = T & Omit<K, keyof T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunc = (...args: any[]) => any;
