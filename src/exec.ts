import { spawn, SpawnOptions } from 'node:child_process';
import { Observable } from 'rxjs';
import { ExecEventAny, ExecOptions } from './types';
import { ENCODING_UTF8 } from '@gmjs/fs-shared';

export function fromExec(
  command: string,
  args?: readonly string[],
  options?: ExecOptions,
): Observable<ExecEventAny> {
  return new Observable<ExecEventAny>((subscriber) => {
    const { cwd, env, shell, timeout } = options ?? {};

    const finalOptions: SpawnOptions = {
      cwd,
      env,
      shell,
      timeout,
    };

    const childProcess = spawn(command, args ?? [], finalOptions);
    childProcess.stdout?.on('data', (data) => {
      subscriber.next({ kind: 'data-stdout', data: bufferToString(data) });
    });
    childProcess.stderr?.on('data', (data) => {
      subscriber.next({ kind: 'data-stderr', data: bufferToString(data) });
    });
    childProcess.on('error', (error) => {
      subscriber.error(error);
    });
    childProcess.on('close', (code) => {
      subscriber.next({ kind: 'close', code: code ?? undefined });
      subscriber.complete();
    });

    return () => {
      childProcess.kill();
    };
  });
}

function bufferToString(buffer: Buffer): string {
  return buffer.toString(ENCODING_UTF8);
}
