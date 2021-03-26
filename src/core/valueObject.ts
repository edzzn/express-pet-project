export type ValueOrFailure<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };
