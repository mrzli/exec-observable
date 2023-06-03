export const KINDS_OF_EXEC_EVENT = [
  'data-stdout',
  'data-stderr',
  'close',
] as const;

export type ExecEventKind = (typeof KINDS_OF_EXEC_EVENT)[number];

export interface ExecEventBase {
  readonly kind: ExecEventKind;
}

export interface ExecEventDataStdout extends ExecEventBase {
  readonly kind: 'data-stdout';
  readonly data: string;
}

export interface ExecEventDataStderr extends ExecEventBase {
  readonly kind: 'data-stderr';
  readonly data: string;
}

export interface ExecEventClose extends ExecEventBase {
  readonly kind: 'close';
  readonly code: number | undefined;
}

export type ExecEventAny =
  | ExecEventDataStdout
  | ExecEventDataStderr
  | ExecEventClose;
