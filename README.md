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
      - Description - Options for exec. Empty object for now.
      - Fields - None.
