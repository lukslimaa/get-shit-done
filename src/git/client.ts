/**
 * Git client for repository operations
 */

import { spawn } from 'child_process';

export interface CloneOptions {
  depth?: number;
  timeout?: number;
}

export class GitClient {
  /**
   * Clone a repository to a target directory
   */
  async clone(repoUrl: string, targetDir: string, options: CloneOptions = {}): Promise<void> {
    const { depth = 1, timeout = 30000 } = options;

    return new Promise((resolve, reject) => {
      const args = ['clone'];

      if (depth) {
        args.push('--depth', depth.toString());
      }

      args.push(repoUrl, targetDir);

      const proc = spawn('git', args, {
        stdio: 'pipe',
      });

      let stderr = '';

      proc.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      const timer = setTimeout(() => {
        proc.kill();
        reject(new Error(`Git clone timed out after ${timeout}ms`));
      }, timeout);

      proc.on('close', (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Git clone failed: ${stderr}`));
        }
      });

      proc.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
}
