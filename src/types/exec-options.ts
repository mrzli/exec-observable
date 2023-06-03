export interface ExecOptions {
  readonly cwd?: string;
  readonly env?: NodeJS.ProcessEnv;
  readonly shell?: string | boolean;
  readonly timeout?: number;
}
