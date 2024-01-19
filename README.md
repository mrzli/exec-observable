# Shell Execution Utilities Using Observable Pattern

This project is a collection of utilities for executing shell commands. It uses the observable pattern.

## Installation

```bash
npm install --save @gmjs/exec-observable
```

## API

#### `fromExec`

Executes a command in a child process, and stream the resulting output.

##### Parameters

`command: string` - Command to execute.

`args?: readonly string[]` - Command arguments.

`options: ExecOptions`

Options for exec. See more [here](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback).

```ts
export interface ExecOptions {
  // Current working directory of the child process.
  // Default - `process.cwd()`.
  readonly cwd?: string;
  // Environment key-value pairs.
  // Default - `process.env`.
  readonly env?: NodeJS.ProcessEnv;
  // Shell to execute the command with. See Shell requirements and Default Windows shell.
  // Default - `'/bin/sh'` on Unix, `process.env.ComSpec` on Windows.
  readonly shell?: string | boolean;
  // The amount of time the process is allowed to run (in milliseconds).
  //   If exceeded, the child process is terminated and any output is truncated.
  // Default - `0`.
  readonly timeout?: number;
}
```

##### Examples:

```ts
async function exec(cmd: string, args?: readonly string[], options?: ExecOptions): Promise<void> {
  await lastValueFrom(
    fromExec(cmd, args, options).pipe(
      tap((event) => {
        if (event.kind === 'data-stdout') {
          console.log(event.data);
        } else if (event.kind === 'data-stderr') {
          console.error(event.data);
        }
      }),
    ),
  );
}

exec('ls', ['-al']).then(() => {
  console.log('Done!');
});

// Example Output:
//
// total 195
// drwxr-xr-x 1 user 197121      0 Jan 19 23:02 .
// drwxr-xr-x 1 user 197121      0 Aug 17 17:28 ..
// -rw-r--r-- 1 user 197121    245 Aug 17 17:28 .editorconfig
// ...
// -rw-r--r-- 1 user 197121   1760 Jan 19 23:10 README.md
//
// Done!
```
