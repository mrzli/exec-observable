# Shell Exeuction Utilities Using Observable Pattern

This project is a collection of utilities for executing shell commands. It uses the observable pattern.

## Installation

```bash
npm install --save @gmjs/exec-observable
```

## API

- ```
  fromExec(
    command: string,
    args?: readonly string[],
    options?: ExecOptions
  ): Observable<ExecEventAny>
  ```
  - Description - Execute a command in a child process, and stream the resulting output.
  - Parameters
    - `command: string` - Command.
    - `args?: readonly string[]` - Command arguments.
    - `options: ExecOptions`
      - Description - Options for exec. See more [here](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback).
      - Fields
        - `cwd?: string`
          - Description - Current working directory of the child process.
          - Default - `process.cwd()`.
        - `env?: NodeJS.ProcessEnv`
          - Description - Environment key-value pairs.
          - Default - `process.env`.
        - `shell?: string | boolean`
          - Description - Shell to execute the command with. See Shell requirements and Default Windows shell.
          - Default - `'/bin/sh'` on Unix, `process.env.ComSpec` on Windows.
        - `timeout?: number`
          - Description - In milliseconds the amount of time the process is allowed to run. If exceeded, the child process is terminated and any output is truncated.
          - Default - `0`.
