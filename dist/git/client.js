"use strict";
/**
 * Git client for repository operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitClient = void 0;
const child_process_1 = require("child_process");
class GitClient {
    /**
     * Clone a repository to a target directory
     */
    async clone(repoUrl, targetDir, options = {}) {
        const { depth = 1, timeout = 30000 } = options;
        return new Promise((resolve, reject) => {
            const args = ['clone'];
            if (depth) {
                args.push('--depth', depth.toString());
            }
            args.push(repoUrl, targetDir);
            const proc = (0, child_process_1.spawn)('git', args, {
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
                }
                else {
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
exports.GitClient = GitClient;
//# sourceMappingURL=client.js.map