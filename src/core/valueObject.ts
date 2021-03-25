export type ValueObject<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };
